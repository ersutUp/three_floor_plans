import React, { Component } from 'react';

import ScrollToTop from './component/scroolTop/ScrollToTop';

import { Switch, Router, Route, Redirect, withRouter } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Loadable from 'react-loadable';
import Loading from './component/loading/Loading';

import history from './utils/history';

import './static/css/reset.less';

// const AsyncHome = Loadable({
// 	loader: () => import('./pages/home/Home'),
// 	loading: Loading
// });
// const AsyncLogin = Loadable({
// 	loader: () => import('./pages/login/Login'),
// 	loading: Loading
// });
const AsyncFloorOne = Loadable({
	loader: () => import('./pages/FloorOne/FloorOne'),
	loading: Loading
});
const AsyncFloorTwo = Loadable({
	loader: () => import('./pages/FloorTwo/FloorTwo'),
	loading: Loading
});
const AsyncFloorThree = Loadable({
	loader: () => import('./pages/FloorThree/FloorThree'),
	loading: Loading
});
//电教楼
const AsyncDjFloorTwo = Loadable({
	loader: () => import('./pages/dj/FloorTwo/FloorTwo'),
	loading: Loading
});
const AsyncDjFloorThree = Loadable({
	loader: () => import('./pages/dj/FloorThree/FloorThree'),
	loading: Loading
});
const AsyncDjFloorFour = Loadable({
	loader: () => import('./pages/dj/FloorFour/FloorFour'),
	loading: Loading
});

//2教
const AsyncPublic22F = Loadable({
	loader: () => import('./pages/public2/2F/2F'),
	loading: Loading
});

class App extends Component {
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo, 'react-err-eric');
	}
	render() {
		const { location } = this.props;
		return (
			<ConfigProvider locale={zh_CN}>
				<div className="main">
					<Router history={history}>
						<ScrollToTop>
							{/*<TransitionGroup>*/}
								{/*<CSSTransition*/}
									{/*key={ location.pathname }*/}
									{/*timeout={ 3000 }*/}
									{/*classNames="chang"*/}
									{/*in={ true }*/}
									{/*appear={true}*/}
								{/*>*/}
									<Switch location={ location }>
										{/*<Route path="/:id" exact component={AsyncFloorOne} />*/}
										{/*<Route path="/login" component={AsyncLogin} />*/}
										{/*<Route path="/home" component={AsyncHome} />*/}
										<Route path="/floor-one/:position" component={AsyncFloorOne} />
										<Route path="/floor-one/:position" component={AsyncFloorOne} />
										<Route path="/floor-two/:position" component={AsyncFloorTwo} />
										<Route path="/dj/floor-two" component={AsyncDjFloorTwo} />
										<Route path="/dj/floor-three" component={AsyncDjFloorThree} />
										<Route path="/dj/floor-four" component={AsyncDjFloorFour} />
                    {/* 2教 */}
										<Route path="/public2/2F" component={AsyncPublic22F} />
                    
										<Redirect to="/dj/floor-two"/>
									</Switch>
								{/*</CSSTransition>*/}
							{/*</TransitionGroup>*/}
						</ScrollToTop>
					</Router>
				</div>
			</ConfigProvider>
		);
	}
}

export default withRouter(App);
