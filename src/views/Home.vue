<template>
  <div class="home">
		<!-- <img alt="WLink logo" src="../assets/logo.png"> -->
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/views/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
