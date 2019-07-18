<template>
    <div id="mainpage" class="mainpage">
		<!-- <p>{{ message }}</p> -->
		
		<!-- 头部导航 start -->
		<header class="header" :class="{ 'header-fixed' : headerFixed }">
		<el-row>
			<el-col :span="24">
			  <el-menu default-active="/mainpage/dataWiki/netMining" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
				<el-menu-item index="/mainpage/dataWiki/netMining">数据维基</el-menu-item>
				<el-menu-item index="/mainpage/papersWiki/netMining">文献维基</el-menu-item>
				<el-menu-item index="/mainpage/codeZone/netMining">代码空间</el-menu-item>
				<!-- <el-menu-item index="/StarLinkProj">星链计划</el-menu-item>
				<el-menu-item index="/DevProj">开发者计划</el-menu-item> -->
			  </el-menu>
			</el-col>
		</el-row>
		</header>
		<div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
		<!-- 头部导航 end -->
		
		<!-- 主内容区 start -->
		<main>
			<!-- 左侧导航 -->
			<!-- <div class="main-left">
				<el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">
					<el-menu-item index="/activePublic" :class="{'isActive': active}">菜单项A</el-menu-item>
					<el-menu-item index="/activeManage" :class="{'isActive': !active}">菜单项B</el-menu-item>
				</el-menu>
			</div> -->

			<!-- 右侧主内容区 -->
			<!-- <div  class="main-right" >
				<transition name="fade">
					<router-view class="view"></router-view>
				</transition>
			</div> -->
			<transition name="fade">
				<router-view class="view"></router-view>
			</transition>
		</main>
		<!-- 主内容区 end -->
		
		
    </div>
</template>

<script>
export default {
    name: 'mainpage',
    data() {
        return {
			// message: ""
			headerFixed : true,
        }
    },
	created: function() {
		// this.query();
		// this.$router.push('/activePublic');
	},
	methods: {
		// query: function() {
		// 	var _this = this;
		// 	axios.post('/api/protected/test', {
		// 		params: {
		// 			
		// 		}
		// 	}).then(function(response) {
		// 		_this.message = response.data;
		// 	}).catch(function(err) {
		// 		console.log(err);
		// 		alert("查询失败");
		// 	});
		// }
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	},
	// watch: {
	// 	'$route': function (to,from) {
	// 		if(to.path == '/activePublic'){
	// 			this.active = true ;
	// 		}else if(to.path == '/activeManage'){
	// 			this.active = false ;
	// 		}
	// 	}
	// }
};
</script>

<style>
/* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
} */

body{margin: 0;}
#mainpage {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
header .el-menu-demo{padding-left: 300px!important;}
/* 主内容区 */
/* main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
main .el-menu{background-color: transparent!important;}
 */
</style>
