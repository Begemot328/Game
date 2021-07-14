"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var complexity = [{
  level: 0,
  size: 100,
  name: "Level 1",
  aimQuantity: 5
}, {
  level: 1,
  size: 50,
  name: "Level 2",
  aimQuantity: 10
}, {
  level: 2,
  size: 20,
  name: "Level 3",
  aimQuantity: 15
}];

var aim = {
  top: 0,
  left: 0
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.shotMissed = _this.shotMissed.bind(_this);
    _this.shotAim = _this.shotAim.bind(_this);
    _this.changeComplexity = _this.changeComplexity.bind(_this);
    _this.calculateAccuracy = _this.calculateAccuracy.bind(_this);
    _this.replaceAims = _this.replaceAims.bind(_this);
    _this.createAims = _this.createAims.bind(_this);

    _this.state = {
      accuracy: 0,
      complexityLevel: 0,
      totalShots: 0,
      successfulShots: 0,
      sceneryWidth: 0,
      sceneryHeight: 0,
      aims: [{
        top: 0,
        left: 0
      }]
    };
    return _this;
  }

  _createClass(App, [{
    key: "shotMissed",
    value: function shotMissed() {

      this.setState(function (prevState) {
        return {
          totalShots: prevState.totalShots + 1
        };
      });
    }
  }, {
    key: "shotAim",
    value: function shotAim(aim) {

      this.setState(function (prevState) {
        var aims = [].concat(_toConsumableArray(prevState.aims));
        return {
          totalShots: prevState.totalShots + 1,
          successfulShots: prevState.successfulShots + 1,
          aims: aims.filter(function (currentAim) {
            return !(currentAim.left === aim.left && currentAim.top === aim.top);
          })
        };
      });
    }
  }, {
    key: "changeComplexity",
    value: function changeComplexity(level) {
      this.setState(function (prevState) {
        return {
          complexityLevel: level
        };
      }, this.createAims);
    }
  }, {
    key: "check",
    value: function check() {
      var _this2 = this;

      this.setState(function (prevState) {
        return {
          accuracy: calculateAccuracy(_this2.state.successfulShots, _this2.state.totalShots, _this2.state.aims)
        };
      });

      if (this.state.aims.length === 0) {
        this.endGame();
      }
    }
  }, {
    key: "endGame",
    value: function endGame() {
      document.body.classList.remove('game-mode');
      document.body.classList.add('endgame-mode');
      this.alertUser();
    }
  }, {
    key: "alertUser",
    value: function alertUser() {
      window.setTimeout(function () {
        alert('That\'s all, Folks!');
      }, 500);
    }
  }, {
    key: "calculateAccuracy",
    value: function calculateAccuracy() {
      if (this.state.aims.length === 0) {
        this.endGame();
      }
      return this.state.successfulShots === 0 ? 0 : (this.state.successfulShots * 100 / this.state.totalShots).toFixed(0);
    }
  }, {
    key: "replaceAims",
    value: function replaceAims() {
      var _this3 = this;

      var aimSize = complexity[this.state.complexityLevel].size;
      var sceneryBack = document.getElementById('scenery-back');

      if (sceneryBack.width <= aimSize || sceneryBack.height <= aimSize) {
        window.resizeTo(this.state.sceneryWidth + 100, this.state.sceneryHeight + 100);
      } else {
        var maxWidth = sceneryBack.width - aimSize;
        var maxHeight = sceneryBack.height - aimSize;
        var aims = [].concat(_toConsumableArray(this.state.aims));

        aims.map(function (aim) {
          aim.top = aim.top * (sceneryBack.height - aimSize) / (_this3.state.sceneryHeight - aimSize);
          aim.left = aim.left * (sceneryBack.width - aimSize) / (_this3.state.sceneryWidth - aimSize);
          return aim;
        });
        this.setState(function (prevState) {
          return {
            aims: aims,
            sceneryWidth: document.getElementById('scenery-back').width,
            sceneryHeight: document.getElementById('scenery-back').height
          };
        });
      }
    }
  }, {
    key: "createAims",
    value: function createAims() {

      window.addEventListener("resize", this.replaceAims);

      var aimSize = complexity[this.state.complexityLevel].size;
      var sceneryBack = document.getElementById('scenery-back');
      var maxWidth = sceneryBack.width - aimSize;
      var maxHeight = sceneryBack.height - aimSize;
      var aims = [];

      for (var i = 0; i < complexity[this.state.complexityLevel].aimQuantity; i++) {
        aims.push({
          top: (Math.random() * maxHeight).toFixed(0),
          left: (Math.random() * maxWidth).toFixed(0)
        });
      }

      this.setState(function (prevState) {
        return {
          aims: aims,
          sceneryWidth: document.getElementById('scenery-back').width,
          sceneryHeight: document.getElementById('scenery-back').height
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Test"
        ),
        React.createElement(Header, {
          accuracy: this.calculateAccuracy()
        }),
        React.createElement(ComplexityLevel, {
          options: complexity,
          complexityLevel: this.state.complexityLevel,
          changeComplexity: this.changeComplexity
        }),
        React.createElement(Timer, null),
        React.createElement(
          "div",
          { id: "scenery", style: { position: "relative" } },
          React.createElement(Scenery, {
            createAims: this.createAims,
            replaceAims: this.replaceAims,
            shotMissed: this.shotMissed
          }),
          React.createElement(Aims, {
            aims: this.state.aims,
            shotAim: this.shotAim,
            size: complexity[this.state.complexityLevel].size
          })
        )
      );
    }
  }]);

  return App;
}(React.Component);

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "menu-button", style: { margin: "0 5% 0 0%;" } },
        React.createElement(
          "h1",
          null,
          "The game is a game"
        ),
        React.createElement(
          "h2",
          { id: "accuracy" },
          " Your accuracy is ",
          this.props.accuracy ? this.props.accuracy + "%" : "unknown",
          " "
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Timer = function (_React$Component3) {
  _inherits(Timer, _React$Component3);

  function Timer() {
    _classCallCheck(this, Timer);

    return _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).apply(this, arguments));
  }

  _createClass(Timer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "menu-button" },
        React.createElement(
          "h2",
          null,
          "Current time: ",
          this.props.accuracy ? this.props.time : "unknown"
        )
      );
    }
  }]);

  return Timer;
}(React.Component);

var Scenery = function (_React$Component4) {
  _inherits(Scenery, _React$Component4);

  function Scenery() {
    _classCallCheck(this, Scenery);

    return _possibleConstructorReturn(this, (Scenery.__proto__ || Object.getPrototypeOf(Scenery)).apply(this, arguments));
  }

  _createClass(Scenery, [{
    key: "render",
    value: function render() {
      return React.createElement("img", { id: "scenery-back", className: "scenery", src: "/img/scenery.jpg",
        onClick: this.props.shotMissed, onLoad: this.props.createAims,
        onresize: this.props.replaceAims });
    }
  }]);

  return Scenery;
}(React.Component);

var Aims = function (_React$Component5) {
  _inherits(Aims, _React$Component5);

  function Aims() {
    _classCallCheck(this, Aims);

    return _possibleConstructorReturn(this, (Aims.__proto__ || Object.getPrototypeOf(Aims)).apply(this, arguments));
  }

  _createClass(Aims, [{
    key: "render",
    value: function render() {
      var _this8 = this;

      return this.props.aims.map(function (aim) {
        return React.createElement(Aim, { top: aim.top, left: aim.left, size: _this8.props.size,
          shotAim: _this8.props.shotAim });
      });
    }
  }]);

  return Aims;
}(React.Component);

var Aim = function (_React$Component6) {
  _inherits(Aim, _React$Component6);

  function Aim(props) {
    _classCallCheck(this, Aim);

    var _this9 = _possibleConstructorReturn(this, (Aim.__proto__ || Object.getPrototypeOf(Aim)).call(this, props));

    _this9.handleClick = _this9.handleClick.bind(_this9);
    return _this9;
  }

  _createClass(Aim, [{
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();

      var aim = {
        top: this.props.top,
        left: this.props.left
      };
      this.props.shotAim(aim);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("img", { id: "sample-aim", src: "/img/aim-target-svgrepo-com.svg", height: this.props.size,
        style: {
          position: "absolute",
          top: this.props.top + 'px',
          left: this.props.left + 'px'
        }, onClick: this.handleClick });
    }
  }]);

  return Aim;
}(React.Component);

var ComplexityLevel = function (_React$Component7) {
  _inherits(ComplexityLevel, _React$Component7);

  function ComplexityLevel(props) {
    _classCallCheck(this, ComplexityLevel);

    var _this10 = _possibleConstructorReturn(this, (ComplexityLevel.__proto__ || Object.getPrototypeOf(ComplexityLevel)).call(this, props));

    _this10.handleChange = _this10.handleChange.bind(_this10);
    return _this10;
  }

  _createClass(ComplexityLevel, [{
    key: "handleChange",
    value: function handleChange(e) {
      e.preventDefault();

      var level = e.target.value;
      this.props.changeComplexity(level);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "menu-button" },
        React.createElement(
          "select",
          { id: "complexity", name: "complexity",
            style: {
              display: "inline-block",
              fontSize: "large"
            },
            onChange: this.handleChange
          },
          this.props.options.map(function (option) {
            return React.createElement(
              "option",
              { value: option.level },
              option.name
            );
          })
        ),
        React.createElement(
          "label",
          { htmlFor: "complexity", style: { display: 'inline-block' } },
          React.createElement(
            "h2",
            null,
            "Level"
          )
        )
      );
    }
  }]);

  return ComplexityLevel;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app2'));
