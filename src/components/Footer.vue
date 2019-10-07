<template>
  <div id="footer">
    <div class="mini">
      <Navigation orientation="nav-bottom"/>
      <img src="@/assets/img/me.jpg" alt="">
      <p>Developed by <a href="https://github.com/eddrichjanzzenang">Eddrich Janzzen Ang</a> made with <a href="https://vuejs.org/">Vue.js</a></p>
    </div>
  </div>
</template>

<script>

  import Navigation from '@/components/Navigation.vue'
  export default {

    name: 'footer',
    components:{
      Navigation
    } 
  }

</script>
<style>
  #footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: #f0f0f5;
    text-align: center;
  }


  #footer img {
    display: block;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    margin-bottom: 3px;
    margin:auto;
  }


</style>