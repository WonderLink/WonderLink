<template>
    <div id="netMining" class="netMining">
		<p>Welcome to codeZone:netMining ~ </p>
		<p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'netMining',
    data() {
        return {
			message: ""
        }
    },
	created: function() {
		this.query();
	},
	methods: {
		query: function() {
			var _this = this;
			axios.post('/api/protected/test', {
				params: {
					
				}
			}).then(function(response) {
				_this.message = response.data;
			}).catch(function(err) {
				console.log(err);
				alert("查询失败");
			});
		}
	}
};
</script>

<style>

</style>
