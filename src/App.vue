<template>
  <div id="app">
    <Navigation orientation="nav-top"/>
    <div class="content-wrapper">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'app',
    components: {
      Navigation,
      Footer
    },
  }

</script>

<style>
  .content-wrapper{
    padding:3%;
    padding-bottom: 200px;
  }

</style>