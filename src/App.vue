<template>
  <v-app>
    <AppHeader></AppHeader>
    <router-view></router-view>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import AppHeader from './components/Header'
import AppFooter from './components/Footer'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  a {
    text-decoration: none;
  }
  router-link {
    text-decoration: none;
  }
  router-link a{
    text-decoration: none;
  }
</style>
