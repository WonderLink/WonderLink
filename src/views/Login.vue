<template>
	<div id="app_login" class="login-form">
		<el-form ref="inputtext" :model="inputtext" ><!--:rules="rules"-->
			
			<el-form-item prop="username">
				<el-input id="username" name="username" v-model="inputtext.username" placeholder="请输入帐号" style="width: 300px;">
					<template slot="prepend">帐号</template>
				</el-input> 
			</el-form-item>
			
			<el-form-item prop="password">
				<el-input id="password" name="password" v-model="inputtext.password" show-password placeholder="请输入密码" style="width: 300px;">
					<template slot="prepend">密码</template>
				</el-input>
			</el-form-item>
			
			<el-form-item prop="inputCode">
				<el-row>
					<el-col :span="15">
						<el-input id="inputCode" name="inputCode" v-model="inputtext.inputCode">
							<template slot="prepend">验证码</template>
						</el-input>
					</el-col>
					<el-col class="line" :span="1">&nbsp;</el-col>
					<el-col :span="8">
						<div class="s-canvas" @click="refreshCode" style="float: right;">
							<SIdentify :identify-code="identifyCode" :content-width="contentWidth" :content-height="contentHeight"></SIdentify>
						</div>
					</el-col>
				</el-row>
			</el-form-item>
			
			<el-form-item>
				<el-button id="login" v-on:click="login" type="primary" style="width: 300px;">登录</el-button>
			</el-form-item>
			
		</el-form>
		
	</div>
</template>

<script>
import SIdentify from '@/components/SIdentify.vue'
// token验证：
// 1.第一次登录的时候，前端调后端的登陆接口，发送用户名和密码
// 2.后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token
// 3.前端拿到token，将token存储到localStorage和vuex中，并跳转路由页面
// 4.前端每次跳转路由，就判断 localStroage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面
// 5.每次调后端接口，都要在请求头中加token
// 6.后端判断请求头中有无token，有token，就拿到token并验证token，验证成功就返回数据，验证失败（例如：token过期）就返回401，请求头中没有token也返回401
// 7.如果前端拿到状态码为401，就清除token信息并跳转到登录页面
import { mapMutations } from 'vuex'

export default {
	name: 'login',
	components: {
		SIdentify
	},
	data() {
		return {
			
			//表单数据对象
			inputtext: {
				username: '',
				password: ''
			},
			
			//验证码
			inputCode: '',
			identifyCodes: "1234567890",
			identifyCode: "",
			contentWidth: 90,
			contentHeight: 40,
			
		}
		
	},
	methods: {
		...mapMutations(['changeLogin']),
		login: function() {
			
			if ($("#username").val() == null || $("#username").val() == "") {
				this.$message({
					type: 'error',
					message: "请输入您的账号"
				});
				return false;
			}
			if ($("#password").val() == null || $("#password").val() == "") {
				this.$message({
					type: 'error',
					message: "请输入您的密码"
				});
				return false;
			}
			if ($("#inputCode").val() == null || $("#inputCode").val() == "") {
				this.$message({
					type: 'error',
					message: "请输入验证码"
				});
				return false;
			}
			if ($("#inputCode").val().toUpperCase() != this.identifyCode) {
				this.$message({
					type: 'error',
					message: "验证码错误"
				});
				return false;
			}
			
			var _this = this;
			axios.post('/api/login',this.inputtext)
			.then(function(response) {
				if(response.data.success){
					_this.userToken = response.data.message;
					// 将用户token保存到vuex中
					_this.changeLogin({ Authorization: _this.userToken });
					_this.$router.push({
						path: `/mainpage/dataWiki/netMining`,
					})
				}else{
					_this.$message({
						type: 'error',
						message: response.data.message
					});
					_this.refreshCode();
				}
			})
			.catch(function() {
				_this.inputCode = '';
				_this.refreshCode();
			})
		},
		
		//验证码
		randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},
		refreshCode() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		makeCode(o, l) {
			for (let i = 0; i < l; i++) {
				this.identifyCode += this.identifyCodes[
					this.randomNum(0, this.identifyCodes.length)
				];
			}
			//console.log(this.identifyCode);
		},
		// 验证所输入验证码是否一致，不区分大小写
		checkCode() {
			this.inputCode = this.login.inputCode;

			if (!this.inputCode == '') {
				this.inputCode.toUpperCase(); //取得输入的验证码并转化为大写   
			}

			if (this.inputCode == '' || !this.inputCode) {
				this.$refs.login.validateField('inputCode');
				//this.$message.info('请输入验证码');
				//alert('请输入验证码');
				return false;
			} else if (!this.inputCode == '' && this.inputCode.toUpperCase() != this.identifyCode) {
				this.$message.info('验证码输入错误');
				this.refreshCode(); //刷新验证码 
				this.inputCode = '';
				this.refreshCode(); //刷新验证码 
				//alert('验证码输入错误');
				return false;
			} else {
				//输入正确时 
				return true;
			}
		}
	},
	mounted: function() {
		this.refreshCode();
	}
}
</script>

<style>
	.login-form {
		width: 300px;
		margin:15% auto; /*在页面水平居中*/
		margin-top:15%;
	}
</style>
