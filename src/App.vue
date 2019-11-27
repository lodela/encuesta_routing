<template>
  <div id="app" class="flex-container">
    <router-view/>
  </div>
</template>

<script>

export default {
  components:{
    
  }

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Condensed&display=swap');
#app {
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;

  &.flex-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
}
.footer {
  padding: 10px 0;
  text-align: center;
  color:white;
  
  &.bg-dark {
    background-color: #222222 !important;
  }

  

  .copyright{
    margin: 0;
    text-align: left;
    margin: 10px 0;

    &.font-alt {
      font-family: "Open Sans", sans-serif;
      text-transform: uppercase;
      letter-spacing: 2px;

      a{
        font: 400 14px/1.8 "Open Sans", sans-serif;
        color: #666;
        -webkit-font-smoothing: antialiased;
        color:white;
      }
    }
  }
  .footer-social-links{
    text-align: right;

    a{
      display: inline-block;
      padding: 0 6px;
      color:white !important;
    }
  }
}

</style>
