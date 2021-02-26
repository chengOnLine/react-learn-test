// 引用：import PropTypes from 'prop-types';

// 规则：
MyComponent.propTypes = {
    // 可以声明prop是特定的JS基本类型
    // 默认情况下这些prop都是可选的
    optionalArray:PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
   
    // 任何可以被渲染的事物：numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: PropTypes.node,
   
    // A React element.
    optionalElement: PropTypes.element,
   
    // 声明一个prop是某个类的实例，用到了JS的instanceof运算符
    optionalMessage: PropTypes.instanceOf(Message),
   
    // 用enum来限制prop只接受特定的值
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
   
    // 指定的多个对象类型中的一个
    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message)
    ]),
   
    // 指定类型组成的数组
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
   
    // 指定类型的属性构成的对象
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
   
    // 一个指定形式的对象
    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),
   
    // 你可以用以上任何验证器链接‘isRequired’，来确保prop不为空
    requiredFunc: PropTypes.func.isRequired,
   
    // 不可空的任意类型
    requiredAny: PropTypes.any.isRequired,
   
    // 自定义验证器，如果验证失败，必须返回一个Error对象
    // 不要直接使用console.warn或者throw，这些在oneOfType中都没用
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },
   
    // 你也可以为arrayOf和objectOf提供一个验证器
    // 如果验证失败，它也应该返回一个Error对象
    // 在array或者object中，验证器对于每个key都会被调用The first two
    // 验证器的前两个arguments是array或者object自身以及当前的key值
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    })
  };