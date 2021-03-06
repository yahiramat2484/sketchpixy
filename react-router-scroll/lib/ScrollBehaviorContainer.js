'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ScrollBehavior = require('@sketchpixy/scroll-behavior/lib/ScrollBehavior');

var _ScrollBehavior2 = _interopRequireDefault(_ScrollBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollBehaviorContainer = function (_React$Component) {
  _inherits(ScrollBehaviorContainer, _React$Component);

  function ScrollBehaviorContainer() {
    _classCallCheck(this, ScrollBehaviorContainer);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ScrollBehaviorContainer.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var routerProps = this.props.routerProps;


    this.scrollBehavior = new _ScrollBehavior2.default(routerProps.router, function () {
      return _this2.props.routerProps.location;
    });

    this.onUpdate(null, routerProps);
  };

  ScrollBehaviorContainer.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var routerProps = this.props.routerProps;

    var prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.onUpdate(prevRouterProps, routerProps);
  };

  ScrollBehaviorContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.scrollBehavior.stop();
  };

  ScrollBehaviorContainer.prototype.onUpdate = function onUpdate(prevRouterProps, routerProps) {
    var shouldUpdateScroll = this.props.shouldUpdateScroll;


    var scrollPosition = void 0;
    if (!shouldUpdateScroll) {
      scrollPosition = true;
    } else {
      scrollPosition = shouldUpdateScroll.call(this.scrollBehavior, prevRouterProps, routerProps);
    }

    this.scrollBehavior.updateScroll(scrollPosition);
  };

  ScrollBehaviorContainer.prototype.render = function render() {
    return this.props.children;
  };

  return ScrollBehaviorContainer;
}(_react2.default.Component);

ScrollBehaviorContainer.propTypes = {
  shouldUpdateScroll: _react2.default.PropTypes.func,
  routerProps: _react2.default.PropTypes.object.isRequired,
  children: _react2.default.PropTypes.node.isRequired
};
exports.default = ScrollBehaviorContainer;
module.exports = exports['default'];
