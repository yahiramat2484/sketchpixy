'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _all = require('react-prop-types/lib/all');

var _all2 = _interopRequireDefault(_all);

var _elementType = require('react-prop-types/lib/elementType');

var _elementType2 = _interopRequireDefault(_elementType);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var _bootstrapUtils = require('react-bootstrap/lib/utils/bootstrapUtils');

var _createChainedFunction = require('react-bootstrap/lib/utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _PropTypes = require('react-bootstrap/lib/utils/PropTypes');

var _ValidComponentChildren = require('react-bootstrap/lib/utils/ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOGGLE_ROLE = _DropdownToggle2.default.defaultProps.bsRole;
var MENU_ROLE = _DropdownMenu2.default.defaultProps.bsRole;

var propTypes = {
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: _propTypes2.default.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

  componentClass: _elementType2.default,

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: (0, _all2.default)((0, _PropTypes.requiredRoles)(TOGGLE_ROLE, MENU_ROLE), (0, _PropTypes.exclusiveRoles)(MENU_ROLE)),

  /**
   * Whether or not component is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: _propTypes2.default.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: _propTypes2.default.bool,

  /**
   * A callback fired when the Dropdown closes.
   */
  onClose: _propTypes2.default.func,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value.
   *
   * ```js
   * function(Boolean isOpen) {}
   * ```
   * @controllable open
   */
  onToggle: _propTypes2.default.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: _propTypes2.default.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: _propTypes2.default.string
};

var defaultProps = {
  componentClass: _ButtonGroup2.default
};

var Dropdown = function (_React$Component) {
  (0, _inherits3.default)(Dropdown, _React$Component);

  function Dropdown(props, context) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);

    _this._focusInDropdown = false;
    _this.lastOpenEventType = null;
    return _this;
  }

  (0, _createClass3.default)(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.focusNextOnOpen();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (!nextProps.open && this.props.open) {
        this._focusInDropdown = (0, _contains2.default)(_reactDom2.default.findDOMNode(this.menu), (0, _activeElement2.default)(document));
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var open = this.props.open;

      var prevOpen = prevProps.open;

      if (open && !prevOpen) {
        this.focusNextOnOpen();
      }

      if (!open && prevOpen) {
        // if focus hasn't already moved from the menu lets return it
        // to the toggle
        if (this._focusInDropdown) {
          this._focusInDropdown = false;
          this.focus();
        }
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (this.props.disabled) {
        return;
      }

      this.toggleOpen('click');
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      if (this.props.disabled) {
        return;
      }

      switch (event.keyCode) {
        case _keycode2.default.codes.down:
          if (!this.props.open) {
            this.toggleOpen('keydown');
          } else if (this.menu.focusNext) {
            this.menu.focusNext();
          }
          event.preventDefault();
          break;
        case _keycode2.default.codes.esc:
        case _keycode2.default.codes.tab:
          this.handleClose(event);
          break;
        default:
      }
    }
  }, {
    key: 'toggleOpen',
    value: function toggleOpen(eventType) {
      var open = !this.props.open;

      if (open) {
        this.lastOpenEventType = eventType;
      }

      if (this.props.onToggle) {
        this.props.onToggle(open);
      }
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      if (!this.props.open) {
        return;
      }

      this.toggleOpen(null);
    }
  }, {
    key: 'focusNextOnOpen',
    value: function focusNextOnOpen() {
      var menu = this.menu;

      if (!menu.focusNext) {
        return;
      }

      if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
        menu.focusNext();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      var toggle = _reactDom2.default.findDOMNode(this.toggle);

      if (toggle && toggle.focus) {
        toggle.focus();
      }
    }
  }, {
    key: 'renderToggle',
    value: function renderToggle(child, props) {
      var _this2 = this;

      var ref = function ref(c) {
        _this2.toggle = c;
      };

      if (typeof child.ref === 'string') {
        (0, _warning2.default)(false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
      } else {
        ref = (0, _createChainedFunction2.default)(child.ref, ref);
      }

      return (0, _react.cloneElement)(child, (0, _extends3.default)({}, props, {
        ref: ref,
        bsClass: (0, _bootstrapUtils.prefix)(props, 'toggle'),
        onClick: (0, _createChainedFunction2.default)(child.props.onClick, this.handleClick),
        onKeyDown: (0, _createChainedFunction2.default)(child.props.onKeyDown, this.handleKeyDown)
      }));
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu(child, _ref) {
      var _this3 = this;

      var id = _ref.id,
          onClose = _ref.onClose,
          onSelect = _ref.onSelect,
          props = (0, _objectWithoutProperties3.default)(_ref, ['id', 'onClose', 'onSelect']);

      var ref = function ref(c) {
        _this3.menu = c;
      };

      if (typeof child.ref === 'string') {
        (0, _warning2.default)(false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
      } else {
        ref = (0, _createChainedFunction2.default)(child.ref, ref);
      }

      return (0, _react.cloneElement)(child, (0, _extends3.default)({}, props, {
        ref: ref,
        labelledBy: id,
        bsClass: (0, _bootstrapUtils.prefix)(props, 'menu'),
        onClose: (0, _createChainedFunction2.default)(child.props.onClose, onClose, this.handleClose),
        onSelect: (0, _createChainedFunction2.default)(child.props.onSelect, onSelect, this.handleClose)
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _classes,
          _this4 = this;

      var _props = this.props,
          Component = _props.componentClass,
          id = _props.id,
          dropup = _props.dropup,
          disabled = _props.disabled,
          pullRight = _props.pullRight,
          open = _props.open,
          onClose = _props.onClose,
          onSelect = _props.onSelect,
          role = _props.role,
          bsClass = _props.bsClass,
          className = _props.className,
          children = _props.children,
          props = (0, _objectWithoutProperties3.default)(_props, ['componentClass', 'id', 'dropup', 'disabled', 'pullRight', 'open', 'onClose', 'onSelect', 'role', 'bsClass', 'className', 'children']);


      delete props.onToggle;

      var classes = (_classes = {}, (0, _defineProperty3.default)(_classes, bsClass, true), (0, _defineProperty3.default)(_classes, 'open', open), (0, _defineProperty3.default)(_classes, 'disabled', disabled), _classes);

      if (dropup) {
        classes[bsClass] = false;
        classes.dropup = true;
      }

      // This intentionally forwards bsSize and bsStyle (if set) to the
      // underlying component, to allow it to render size and style variants.

      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({}, props, {
          className: (0, _classnames2.default)(className, classes)
        }),
        _ValidComponentChildren2.default.map(children, function (child) {
          switch (child.props.bsRole) {
            case TOGGLE_ROLE:
              return _this4.renderToggle(child, {
                id: id, disabled: disabled, open: open, role: role, bsClass: bsClass
              });
            case MENU_ROLE:
              return _this4.renderMenu(child, {
                id: id, open: open, pullRight: pullRight, bsClass: bsClass, onClose: onClose, onSelect: onSelect
              });
            default:
              return child;
          }
        })
      );
    }
  }]);
  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

(0, _bootstrapUtils.bsClass)('dropdown', Dropdown);

var UncontrolledDropdown = (0, _uncontrollable2.default)(Dropdown, { open: 'onToggle' });

UncontrolledDropdown.Toggle = _DropdownToggle2.default;
UncontrolledDropdown.Menu = _DropdownMenu2.default;

exports.default = UncontrolledDropdown;