<template>
    <div id="dataWikiB" class="dataWikiB">
		<p>this is vue page in dataWikiB ~ </p>
		<p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'dataWikiB',
    data() {
        return {
			message: ""
        }
    },
	created: function() {
		// this.query();
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
