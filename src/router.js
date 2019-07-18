import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'
// import Login from './views/Login.vue'
// import MainPage from './views/MainPage.vue'
// 
// import dataWiki from './views/dataWiki/index.vue'
// import dataWikiA from './views/dataWiki/page1.vue'
// import dataWikiB from './views/dataWiki/page2.vue'
// 
// import papersWiki from './views/papersWiki/index.vue'
// import papersWikiA from './views/papersWiki/page1.vue'
// import papersWikiB from './views/papersWiki/page2.vue'
// 
// import codeZone from './views/codeZone/index.vue'
// import codeZoneA from './views/codeZone/page1.vue'
// import codeZoneB from './views/codeZone/page2.vue'

Vue.use(Router)

function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const router = new Router({
	// mode: 'history',
	// base: process.env.BASE_URL,
	routes: [
	    {
	      path: '/',
	      name: 'home',
	      component: loadView('Home')
	    },
	    {
				path: '/login',
				name: 'login',
				component: loadView('Login')
	    },
	    {
				path: '/mainpage',
				name: 'mainpage',
				component: loadView('MainPage'),
				meta:{
					requireAuth:true ,//需要登录验证
				},
				children: [
					{
						path: '/mainpage/dataWiki',
						name: 'dataWiki',
						meta:{
							requireAuth:true ,//需要登录验证
						},
						component: loadView('dataWiki/index'),
						children: [
							{
								path: '/mainpage/dataWiki/netMining',
								name: 'netMining',
								meta:{
									requireAuth:true ,//需要登录验证
								},
								component: loadView('dataWiki/netMining')
							},
							{
								path: '/mainpage/dataWiki/dataWikiB',
								name: 'dataWikiB',
								meta:{
									requireAuth:true ,//需要登录验证
								},
								component: loadView('dataWiki/page2')
							}
						]
					},
					{
						path: '/mainpage/papersWiki',
						name: 'papersWiki',
						meta:{
							requireAuth:true ,//需要登录验证
						},
						component: loadView('papersWiki/index'),
						children: [
							{
								path: '/mainpage/papersWiki/netMining',
								name: 'netMining',
								meta:{
									requireAuth:true ,//需要登录验证
								},
								component: loadView('papersWiki/netMining')
							},
							{
								path: '/mainpage/papersWiki/papersWikiB',
								name: 'papersWikiB',
								meta:{
									requireAuth:true ,//需要登录验证
								},
								component: loadView('papersWiki/page2')
							}
						]
					},
					{
						path: '/mainpage/codeZone',
						name: 'codeZone',
						meta:{
							requireAuth:true ,//需要登录验证
						},
						component: loadView('codeZone/index'),
						children: [
							{
								path: '/mainpage/codeZone/netMining',
								name: 'netMining',
								meta:{
									requireAuth:true ,//需要登录验证
								},
								component: loadView('codeZone/netMining')
							},
							{
								path: '/mainpage/codeZone/codeZoneB',
								name: 'codeZoneB',
								meta:{
									requireAuth:true ,//需要登录验证
								},
								component: loadView('codeZone/page2')
							}
						]
					}
				]
	    }
	  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
	if(to.meta.requireAuth){ //是否需要登录权限
		if (to.path === '/login' || to.path === '/') {
			next();
		} else {
			let myToken = localStorage.getItem('Authorization');
			
			if( myToken === null || myToken === '' ){
				next('/login');
			}else{
				var checkLogin = false; //默认为false
				axios.get( '/api/checkToken',{
					params: { token: myToken }
				}).then(function(response) {
					checkLogin = response.data; //如果token验证成功则更新checkLogin为true
					if ( checkLogin === false ) {
						next('/login');
					} else {
						next();
					}
				});
			}
			
		}
	}else{
		next();
	}
});

export default router;