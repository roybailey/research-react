webpackHotUpdate(0,{

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getPrototypeOf = __webpack_require__(194);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(206);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(207);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(211);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(236);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(243);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(400);
	
	var _reactRouter = __webpack_require__(401);
	
	var _createBrowserHistory = __webpack_require__(450);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _About = __webpack_require__(451);
	
	var _About2 = _interopRequireDefault(_About);
	
	var _Repos = __webpack_require__(452);
	
	var _Repos2 = _interopRequireDefault(_Repos);
	
	var _RepoDetails = __webpack_require__(454);
	
	var _RepoDetails2 = _interopRequireDefault(_RepoDetails);
	
	var _Home = __webpack_require__(455);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _ServerError = __webpack_require__(456);
	
	var _ServerError2 = _interopRequireDefault(_ServerError);
	
	var _App = __webpack_require__(457);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Package = __webpack_require__(474);
	
	var _Package2 = _interopRequireDefault(_Package);
	
	var _Packages = __webpack_require__(513);
	
	var _Packages2 = _interopRequireDefault(_Packages);
	
	var _Home3 = __webpack_require__(516);
	
	var _Home4 = _interopRequireDefault(_Home3);
	
	var _App3 = __webpack_require__(519);
	
	var _App4 = _interopRequireDefault(_App3);
	
	var _KanbanBoardContainer = __webpack_require__(642);
	
	var _KanbanBoardContainer2 = _interopRequireDefault(_KanbanBoardContainer);
	
	var _KanbanBoard = __webpack_require__(661);
	
	var _KanbanBoard2 = _interopRequireDefault(_KanbanBoard);
	
	var _EditCard = __webpack_require__(817);
	
	var _EditCard2 = _interopRequireDefault(_EditCard);
	
	var _NewCard = __webpack_require__(820);
	
	var _NewCard2 = _interopRequireDefault(_NewCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = function (_Component) {
	  (0, _inherits3.default)(App, _Component);
	
	  function App() {
	    (0, _classCallCheck3.default)(this, App);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'header',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: '/' },
	            'App'
	          )
	        ),
	        _react2.default.createElement(
	          'menu',
	          null,
	          _react2.default.createElement(
	            'ul',
	            null,
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/about', activeClassName: 'active' },
	                'About'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/repos', activeClassName: 'active' },
	                'Repos'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/chart', activeClassName: 'active' },
	                'Chart'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/kanban', activeClassName: 'active' },
	                'Kanban'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/simple', activeClassName: 'active' },
	                'Simple'
	              )
	            )
	          )
	        ),
	        this.props.children
	      );
	    }
	  }]);
	  return App;
	}(_react.Component);
	
	(0, _reactDom.render)(_react2.default.createElement(
	  _reactRouter.Router,
	  { history: (0, _createBrowserHistory2.default)() },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default, title: 'About Page' }),
	    _react2.default.createElement(
	      _reactRouter.Route,
	      { path: 'repos', component: _Repos2.default },
	      _react2.default.createElement(_reactRouter.Route, { path: '/repo/:repo_name', component: _RepoDetails2.default })
	    ),
	    _react2.default.createElement(_reactRouter.Route, { path: 'chart', component: _App2.default, title: 'Chart App' }),
	    _react2.default.createElement(
	      _reactRouter.Route,
	      { path: 'kanban', component: _KanbanBoardContainer2.default, title: 'Kanban App' },
	      _react2.default.createElement(_reactRouter.IndexRoute, { component: _KanbanBoard2.default }),
	      _react2.default.createElement(_reactRouter.Route, { path: 'new', component: _NewCard2.default }),
	      _react2.default.createElement(_reactRouter.Route, { path: 'edit/:card_id', component: _EditCard2.default })
	    ),
	    _react2.default.createElement(
	      _reactRouter.Route,
	      { path: 'simple', component: _App4.default, title: 'Simple Router' },
	      _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home4.default }),
	      _react2.default.createElement(_reactRouter.Route, { path: 'packages', component: _Packages2.default }),
	      _react2.default.createElement(_reactRouter.Route, { path: '/package/:id/:name', component: _Package2.default })
	    ),
	    _react2.default.createElement(_reactRouter.Route, { path: 'error', component: _ServerError2.default })
	  )
	), document.getElementById('root'));

/***/ }

})
//# sourceMappingURL=0.a84ef79939222508822f.hot-update.js.map