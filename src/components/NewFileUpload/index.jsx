import React from "react";
import { Upload, Modal, Icon , notification} from "antd";
import  uploadObj  from "@/components/TXCloudUpload.ts"; 

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    const { getInstance } = this.props;
    if (typeof getInstance === "function") {
      getInstance(this);
    }
  }

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    // defaultOption: {
    //   data: { appId: appId, domain: domain },
    //   action: `${upLoadUrl}`
    // }
  };

  componentDidMount() {
    const { fileList = [] } = this.props;

    this.setState({
      fileList: fileList.map((item, index) => {
        return {
          uid: index,
          url: item.url,
          status: "done"
        };
      })
    });
  }

  reset = () => {
    this.setState({
      fileList: []
    });
  };

  handleCancel = () => { 
      this.setState({ previewVisible: false });
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  uploadFile = ( options ) => {
    const { onSuccess, onError, file, onProgress } = options;
    // console.log("options" , options)
    uploadObj && uploadObj.uploadFile({ file: file , progressCallback: ( value )=> { 
        onProgress({ percent: value  , file }); 
        console.log("progressCallback" , value+"%" )} 
    }).then( res => {
        console.log("uploadFile.then" , res);
        onSuccess( res , file );
    }).catch( onError);
  }

  handleChange = ({ fileList , file}) => {
    const formatFileList = fileList.map(item => {
      if (item.response) {
        return {
          uid: item.uid,
          url: item.response,
          status: item.status
        };
      } else {
        return item;
      }
    });
    this.setState({ fileList });
    this.triggerChange(formatFileList);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const {
      previewVisible,
      previewImage,
    //   defaultOption
    } = this.state;
    const { maxPicLength = 8, fileList = [], ...resProps } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          {...resProps}
        //   {...defaultOption}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.uploadFile}
        >
          {fileList.length >= maxPicLength ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          style={{ minWith: "50%" }}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
