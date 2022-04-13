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
const AsyncPublic23F = Loadable({
	loader: () => import('./pages/public2/3F/3F'),
	loading: Loading
});
const AsyncPublic24F = Loadable({
	loader: () => import('./pages/public2/4F/4F'),
	loading: Loading
});
const AsyncPublic25F = Loadable({
	loader: () => import('./pages/public2/5F/5F'),
	loading: Loading
});
const AsyncPublic26F = Loadable({
	loader: () => import('./pages/public2/6F/6F'),
	loading: Loading
});
const AsyncPublic27F = Loadable({
	loader: () => import('./pages/public2/7F/7F'),
	loading: Loading
});
const AsyncPublic28F = Loadable({
	loader: () => import('./pages/public2/8F/8F'),
	loading: Loading
});
const AsyncPublic29F = Loadable({
	loader: () => import('./pages/public2/9F/9F'),
	loading: Loading
});

//1教
const AsyncPublic12F = Loadable({
	loader: () => import('./pages/public1/2F/2F'),
	loading: Loading
});
const AsyncPublic13F = Loadable({
	loader: () => import('./pages/public1/3F/3F'),
	loading: Loading
});
const AsyncPublic14F = Loadable({
	loader: () => import('./pages/public1/4F/4F'),
	loading: Loading
});
const AsyncPublic15F = Loadable({
	loader: () => import('./pages/public1/5F/5F'),
	loading: Loading
});
const AsyncPublic16F = Loadable({
	loader: () => import('./pages/public1/6F/6F'),
	loading: Loading
});
const AsyncPublic17F = Loadable({
	loader: () => import('./pages/public1/7F/7F'),
	loading: Loading
});
const AsyncPublic18F = Loadable({
	loader: () => import('./pages/public1/8F/8F'),
	loading: Loading
});
const AsyncPublic19F = Loadable({
	loader: () => import('./pages/public1/9F/9F'),
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
										<Route path="/public2/3F" component={AsyncPublic23F} />
										<Route path="/public2/4F" component={AsyncPublic24F} />
										<Route path="/public2/5F" component={AsyncPublic25F} />
										<Route path="/public2/6F" component={AsyncPublic26F} />
										<Route path="/public2/7F" component={AsyncPublic27F} />
										<Route path="/public2/8F" component={AsyncPublic28F} />
										<Route path="/public2/9F" component={AsyncPublic29F} />

										<Route path="/public1/2F" component={AsyncPublic12F} />
										<Route path="/public1/3F" component={AsyncPublic13F} />
										<Route path="/public1/4F" component={AsyncPublic14F} />
										<Route path="/public1/5F" component={AsyncPublic15F} />
										<Route path="/public1/6F" component={AsyncPublic16F} />
										<Route path="/public1/7F" component={AsyncPublic17F} />
										<Route path="/public1/8F" component={AsyncPublic18F} />
										<Route path="/public1/9F" component={AsyncPublic19F} />
                    
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
