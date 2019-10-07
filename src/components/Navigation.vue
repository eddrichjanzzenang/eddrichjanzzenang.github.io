<template>
  <div id="nav">
    <nav>
      <div :class="orientation">        
        <div v-if="orientation === 'nav-top'">
          <div class="hamburger" v-on:click="open">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
        <ul :class="menu">
          <li><router-link to="/">About</router-link></li>
          <li><router-link to="/projects">Projects</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><a href="https://github.com/eddrichjanzzenang" target="_blank">GitHub</a></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </nav>
  <!-- for hamburger menu -->
  <!-- https://www.youtube.com/watch?v=6m6iqN1uynE -->
  </div>
</template>

<script>
  
  export default {
    name: 'navigation',
    props: {
      orientation: String
    },
    data(){
      return {
        menu: "menu"
      }
    },
    methods:{
      open: function(){

        if (this.menu == "menu"){
          this.menu = "menu open";
        } else {
          this.menu = "menu";
        }
      
      }
    }
  }

</script>


<style>
  nav{
    padding-left:3%;
    list-style-type: none;
    background-color: #f0f0f5;
  }

  nav li {
    display:inline-block;
    margin-left: 0px;
    margin-right:20px;
    text-decoration:none;
  }

  .nav-top{
    padding-top:5px;
    font-size: 24px; 
    text-align:right;  
  }

  .nav-bottom{
    font-size: 18px;
    text-align: center;
    padding-bottom:0px;
    margin-bottom:0px; 
  }

  .nav-bottom .menu{
    margin-bottom: 0px;
  }

  @media screen and (max-width: 570px) {
    .hamburger{
      cursor:pointer;
      padding:0px 15px 15px 15px;
      display:block;
    }


    .line{
      width: 35px;
      height: 6px;
      border-bottom: 4px solid #e60000;
    }  

    .line:last-child{
      margin-bottom:0;
    }

    .nav-top li{
      width:100%;
      text-align:center;
    }
    
    .menu {
      height:0;
      overflow:hidden;
      transition: height 0.5s;
    }

    .open{
      height:240px;
    }
  
  }
</style>