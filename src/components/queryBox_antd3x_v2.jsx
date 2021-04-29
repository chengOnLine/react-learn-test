import React from "react";
import { Form, Button, Input } from "antd";
const queryConfig = {
  formLayout: {
    layout: "inline"
    // labelCol:{span:5},
    // wrapperCol:{span:18},
  },
  // formItemLayout:{
  //   labelCol:{span:5},
  //   wrapperCol:{span:18},
  // },
  formItemList: [
    {
      label: "姓名",
      key: "name",
      options: {
        initialValue: undefined
      }
      // component:
      // afterComponent:
    }
  ],
  leftBtnList: [
    {
      title: "新增",
      name: "addBtn",
      type: "primary",
      visable: true,
      disabled: false,
      clickEvent: () => {
        console.log("this");
      }
    }
  ],
  rightBtnList: [
    {
      title: "导出",
      name: "exportBtn",
      type: "primary",
      visable: true,
      disabled: false,
      clickEvent: () => {
        console.log("导出");
      }
    }
  ]
};
const { Item } = Form;
class QueryBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { onRef } = this.props;
    onRef && typeof onRef === "function" && onRef(this);
  }
  getFormFieldsValue = () => {
    const {
      form: { getFieldsValue }
    } = this.props;
    return getFieldsValue();
  };
  resetFormFieldsValue = () => {
    const {
      queryConfig,
      form: { setFieldsValue }
    } = this.props;
    const { formItemList } = queryConfig;
    let params = {};
    formItemList &&
      formItemList.forEach((item) => {
        const { options } = item;
        const { initialValue = undefined } = options;
        Object.assign(params, {
          [item.key]: initialValue
        });
      });
    setFieldsValue(params);
  };
  render() {
    const {
      form: { getFieldDecorator },
      style = {},
      queryConfig = {}
    } = this.props;
    const {
      formLayout,
      formItemLayout,
      formItemList,
      leftBtnList,
      rightBtnList
    } = queryConfig;
    return (
      <Form {...formLayout} style={Object.assign(style, {})}>
        {formItemList &&
          formItemList.map((item, index) => {
            const { label, key, options, component, afterComponent } = item;
            const Component = component ? (
              component
            ) : (
              <Input placeholder="请输入"></Input>
            );
            return (
              <Item label={label} key={index} {...formItemLayout}>
                {getFieldDecorator(key, { ...options })(Component)}
                {afterComponent}
              </Item>
            );
          })}
        {leftBtnList && leftBtnList.length > 0 && (
          <Item>
            {leftBtnList.map((btn, index) => {
              const {
                title = "--",
                name,
                visable = true,
                disabled = false,
                type,
                clickEvent
              } = btn || {};
              return (
                visable && (
                  <Button
                    type={type}
                    disabled={disabled}
                    onClick={() => {
                      clickEvent && clickEvent();
                    }}
                    style={{ marginRight: 15 }}
                    key={index}
                  >
                    {title}
                  </Button>
                )
              );
            })}
          </Item>
        )}
        {rightBtnList && rightBtnList.length > 0 && (
          <Item style={{ float: "right" }}>
            {rightBtnList.map((btn, index) => {
              const {
                title = "--",
                name,
                visable = true,
                type,
                disabled = false,
                clickEvent
              } = btn || {};
              return (
                visable && (
                  <Button
                    type={type}
                    disabled={disabled}
                    onClick={() => {
                      clickEvent && clickEvent();
                    }}
                    style={{ marginRight: 15 }}
                    key={index}
                  >
                    {title}
                  </Button>
                )
              );
            })}
          </Item>
        )}
        <div style={{clear:"both"}}></div>
      </Form>
    );
  }
}

export default Form.create()(QueryBox);
