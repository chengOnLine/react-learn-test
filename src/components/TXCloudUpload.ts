// <reference types="./types" />

import COS from 'cos-js-sdk-v5';
import SparkMD5 from 'spark-md5';
import { isFile, isBlob } from 'beauty-tools';
import request from '@/utils/request';
import { appId } from "@/config";

const DEFAULTCOSCONFIG = {
  Bucket: 'skip-app-1251053011', //存储桶
  Region: 'ap-guangzhou', //地域
  Domain: 'skinsecret.clife.cn',
};
const UPLOADTCAUTH = 'uploadTC_auth';
const DEFAULTCOSAUTHURL = '/v1/web/manage/credential/getTempUpFileCedential';

type CosConfig = typeof DEFAULTCOSCONFIG;
type FileType = File | Blob;

abstract class Upload {
  // private readonly UPLOADTCAUTH = 'uploadTC_auth';
  cosConfig: CosConfig;
  cosAuthUrl = DEFAULTCOSAUTHURL;

  constructor(params: any) {
    this.cosConfig = params.cosConfig || DEFAULTCOSCONFIG;
    this.cosAuthUrl = params.cosAuthUrl || this.cosAuthUrl;
  }
  abstract getAuth(): Promise<any>;
  abstract handleError(errMsg: string): void;

  /** 小文件直接上传-通过putObject上传 */
  uploadFile({
    file,
    progressCallback,
  }: {
    file: any;
    progressCallback?: (percent: number) => void;
  }) {
    return this.upload(file, progressCallback, 'putObject');
  }

  /** 大文件分片上传 */
  uploadFileSlice({
    file,
    progressCallback,
  }: {
    file: any;
    progressCallback?: (percent: number) => void;
  }) {
    return this.upload(file, progressCallback, 'sliceUploadFile');
  }

  /** 上传公共方法 */
  async upload(file: any, progressCallback: any, type: string) {
    
    if (!isBlob(file) && !isFile(file)) {
      throw new Error('file is incorrect');
    }
    const md5File = await this.getFileMD5(file);
    // 存储文件的md5码
    file.md5 = md5File;
    // console.log("md5" , md5File);
    const subfix =
      typeof file.name !== 'undefined'
        ? file.name.substr(file.name.lastIndexOf('.'))
        : file.type
        ? `.${file.type.split('/')[1]}`
        : '.jpeg';

    const key = file.md5 + subfix;
    const cos = this.getCos()!;
    console.log(key , cos ,);
    // const isExist = false;
    const isExist = await this.checkImageUrlIsExist(cos, key);
    // console.log(key , cos , isExist);
    return new Promise(async (resolve, reject) => {
      if (isExist) {
        progressCallback && progressCallback(100);
        try {
          const imageUrl = await this.getObjectUrl(cos, key);
          resolve(imageUrl);
        } catch (errMsg) {
          reject(errMsg);
        }
        return;
      }
      cos[type](
        {
          Bucket: this.cosConfig.Bucket,
          Region: this.cosConfig.Region,
          Key: key,
          Body: file,
          CORSRules: [{
            "AllowedOrigin": ["*"],
            "AllowedMethod": ["GET", "POST", "PUT", "DELETE", "HEAD"],
            "AllowedHeader": ["*"],
            "ExposeHeader": ["ETag", "x-cos-acl", "x-cos-version-id", "x-cos-delete-marker", "x-cos-server-side-encryption"],
            "MaxAgeSeconds": "5"
          }],
          onProgress: (progressData: any) => {
            const { percent } = progressData;
            progressCallback && progressCallback(percent);
          },
        },
        (err: any, data: any) => {
          console.log(" upload err" , err , "data" , data);
          if (err) {
            if (typeof err.error === 'object') {
              const errMsg = `${err.error.Code || ''} ${err.error.Message || ''}`;
              reject(errMsg);
              return;
            }

            if (err.error) {
              const errMsg = `${err.statusCode ? '状态码：' + err.statusCode : ''} ${err.error ||
                ''}`;
              reject(errMsg);
              return;
            }

            reject(err);
            return;
          }
          const imageUrl = this.getDomainUrl(`https://${data.Location}`);
          resolve(imageUrl);
        },
      );
    }).catch((errMsg: string) => {
      this.handleError(errMsg);
      return Promise.reject(errMsg);
    });
  }

  /** 查询图片是否已存在 */
  checkImageUrlIsExist(cos: any, key: string) {
    return new Promise(resolve => {
      cos.headObject(
        {
          Bucket: this.cosConfig.Bucket,
          Region: this.cosConfig.Region,
          Key: key,
          CORSRules: [{
            "AllowedOrigin": ["*"],
            "AllowedMethod": ["GET", "POST", "PUT", "DELETE", "HEAD"],
            "AllowedHeader": ["*"],
            "ExposeHeader": ["ETag", "x-cos-acl", "x-cos-version-id", "x-cos-delete-marker", "x-cos-server-side-encryption"],
            "MaxAgeSeconds": "5"
          }]
        },
        (err: any, data: any) => {
          console.log(" checkImageUrlIsExist err" , err , "data" , data)
          if (!err && data) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
      );
    });
  }

  /** 腾讯云图片链接替换为公司域名地址 */
  getDomainUrl(url: string) {
    const reg = `${this.cosConfig.Bucket}.cos.${this.cosConfig.Region}.myqcloud.com`;
    return url.replace(reg, this.cosConfig.Domain);
  }

  /** 获取cos存储的图片地址 */
  getObjectUrl(cos: any, key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cos.getObjectUrl(
        {
          Bucket: this.cosConfig.Bucket,
          Region: this.cosConfig.Region,
          Key: key,
          Sign: false,
        },
        (error: any, data: any) => {
          if (!error && data) {
            const imageUrl = this.getDomainUrl(data.Url);
            resolve(imageUrl);
          } else {
            const errMsg = '获取图片地址失败！';
            reject(errMsg);
          }
        },
      );
    });
  }

  getCos() {
    // 初始化实例
    const cos = new COS({
      getAuthorization: async (_options: any, callback: (data: any) => unknown) => {
        /**
         * 签名计算放在前端会暴露 SecretId 和 SecretKey
         * 我们把签名计算过程放在后端实现，前端通过 ajax 向后端获取签名结果
         * 正式部署时请再后端加一层自己网站本身的权限检验。
         * 异步获取临时密钥
         */
        let auth: any = window.sessionStorage.getItem(UPLOADTCAUTH);
        auth = auth ? JSON.parse(auth) : {};
        const { ExpiredTime } = auth;
        if (!ExpiredTime || Number(ExpiredTime) - Date.now() < 60 * 1000) {
          try {
            console.log("getAuthorization ing...")
            const res = await this.getAuth();
            console.log( "getAuthorization" , res);
            if (res.code === 0) {
              auth = {
                TmpSecretId: res.data.tmpSecretId,
                TmpSecretKey: res.data.tmpSecretKey,
                XCosSecurityToken: res.data.sessionToken,
                ExpiredTime: res.data.expiredTime, // 在ExpiredTime时间前，不会再次调用getAuthorization
              };
              window.sessionStorage.setItem(UPLOADTCAUTH, JSON.stringify(auth));
            }
          } catch (error) {
            console.log('获取授权失败！');
          }
        }
        callback(auth);
      },
    });
    return cos;
  }

  /** 获得文件md5 */
  getFileMD5(file: FileType) {
    return new Promise(resolve => {
      // 声明必要的变量
      const fileReader = new FileReader();
      // 文件每块分割2M，计算分割详情
      const chunkSize = 2 * 1024 * 1024;
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;

      // 创建md5对象（基于SparkMD5）
      const spark = new SparkMD5();

      // 每块文件读取完毕之后的处理
      fileReader.onload = function(e) {
        // 每块交由sparkMD5进行计算
        spark.appendBinary((e.target || {}).result);
        currentChunk++;

        // 如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
          loadNext();
        } else {
          resolve(spark.end());
        }
      };

      // 处理单片文件的上传
      function loadNext() {
        const start = currentChunk * chunkSize;
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsBinaryString(file.slice(start, end));
      }
      loadNext();
    });
  }
}

// notification.config({
//   top: 24,
//   duration: 3,
//   placement: 'topRight',
// });

class UploadTc extends Upload{
  appId: number;
  constructor(params: any) {
    super(params);
    this.validateInitParams(params);
    const { appId } = params;
    this.appId = appId;
  }

  getAuth() {
    return request({
      method:"get",
      url:this.cosAuthUrl,
      params: { data: { appId : this.appId }},
      isTableData:false
    })
  }

  handleError(errMsg: string) {
    throw new Error(errMsg);
    // notification.error({
    //   message: '提示',
    //   description: errMsg,
    // });
  }

  // 校验参数
  validateInitParams(params: any) {
    const { appId } = params;
    if (typeof appId !== 'number') {
      throw new Error('appId must be a number');
    }
  }
}

var uploadobj = window.uploadObj;
if( !uploadobj ){
  uploadobj = window.uploadObj = new UploadTc({ cosConfig: undefined , cosAuthUrl : undefined , appId : appId});
}

export default uploadobj;


