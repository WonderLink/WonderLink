<template>
	<div id="dataWiki">
		<!-- 主内容区 start -->
		
		<!-- 左侧导航 -->
		<div class="main-left">
			<el-menu default-active="/mainpage/dataWiki/netMining" class="el-menu-vertical-demo" :router="true">
				<el-menu-item index="/mainpage/dataWiki/netMining">图数据挖掘</el-menu-item>
				<!-- <el-menu-item index="/mainpage/dataWiki/dataWikiB">DataWikiB</el-menu-item> -->
			</el-menu>
		</div>
	
		<!-- 右侧主内容区 -->
		<div  class="main-right" >
			<transition name="fade">
				<router-view class="view"></router-view>
			</transition>
		</div>
		
		<!-- 主内容区 end -->
	</div>
</template>

<script>
	export default {
	    name: 'dataWiki',
	    data() {
	        return {
				
	        }
	    },
		created: function() {
			
		},
		methods: {
			
		},
		watch: {
			
		}
	};
</script>

<style>
	/* 主内容区 */
	#dataWiki{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
	#dataWiki .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
	#dataWiki .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
	#dataWiki .el-menu{background-color: transparent!important;}
</style>
