import React, { useState, useEffect } from "react";
import { Spin, Select } from "antd";

// 防抖
export function useDebounce(fn, delay, dep = []) {
  const { current } = React.useRef({ fn, timer: null });
  React.useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return React.useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}

// 节流
export function useThrottle(fn, delay, dep = []) {
  const { current } = React.useRef({ fn, timer: null });
  React.useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return React.useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}

const { Option } = Select;
const FetchSelect = function (props) {
  const {
    responseFormat = (res) => {
      const { data } = res;
      if (data) {
        data.map((i) => ({ value: i.id, text: i.name }));
      } else {
        return [];
      }
    }, // 返回数据映射函数
    request, // 请求接口
    showSearch = false, // 是否支持关键词搜素
    onChange, // 将value暴露出去
    searchName, // 支持关键词搜索时请求的参数名
    params = {}, // 请求的 参数对象
    preLoad = false, // 在select聚焦前请求
    isCache = false, // 缓存请求结果
    value = undefined,
    isExportData = false, // 是否需要暴露dataList
    ...other
  } = props;
  const [dataList, setDataList] = useState([]);
  const [selectValue, setSelectValue] = useState(undefined);
  const [loading, setLoading] = useState(false);
  let lastFetchId = 0; //标志请求，避免不必要的渲染

  useEffect(() => {
    console.log("preLoad", preLoad);
    preLoad && handleFocus(params);
    preLoad && showSearch && handleSearch("");
  }, []);

  useEffect(() => {
    if (isExportData) {
      const { val } = value || {};
      setSelectValue(val);
    } else {
      setSelectValue(value);
    }
  }, [value]);

  const fetchData = useDebounce((params) => {
    if (typeof request === "function" && responseFormat) {
      const fetchId = ++lastFetchId;
      setLoading(true);
      request(params).then((response) => {
        if (fetchId !== lastFetchId) return;
        setDataList(responseFormat(response));
        setLoading(false);
      });
    }
  }, 200);

  const handleFocus = () => {
    if (showSearch) return;
    if (dataList.length === 0 || !isCache) {
      setDataList([]);
      fetchData(params);
    }
  };

  const handleSearch = (value) => {
    if (!showSearch || !searchName) return;
    const p = Object.assign(params, { [searchName]: value });
    setDataList([]);
    fetchData(p);
  };

  const handleChange = (value) => {
    console.log("value", value);
    setSelectValue(value);
    if (isExportData) {
      triggerChange({
        val: value,
        dataList
      });
    } else {
      triggerChange(value);
    }
  };

  const triggerChange = (value) => {
    typeof onChange === "function" && onChange(value);
  };
  return (
    <Select
      // labelInValue
      showSearch={showSearch}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      value={selectValue}
      notFoundContent={loading ? <Spin size="small" /> : undefined}
      filterOption={false}
      onFocus={handleFocus}
      onChange={handleChange}
      onSearch={handleSearch}
      allowClear
      {...other}
    >
      {dataList &&
        dataList.map((i) => (
          <Option value={i.value} key={i.value}>
            {i.text}
          </Option>
        ))}
    </Select>
  );
};
export default FetchSelect;
