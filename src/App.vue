<template>
  <div id="app" class="flex-container">
    <Navbar></Navbar>
    <router-view/>
    <footer class="footer bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <p class="copyright font-alt">© 2020&nbsp;<a href="index.html">Dirección General De La Mujer</a>, Apodaca, N.L.</p>
          </div>
          <div class="col-sm-6">
            <div class="footer-social-links">
              <a><i class="fab fa-facebook-f"></i></a>
              <a><i class="fab fa-twitter"></i></a>
              <a><i class="fab fa-dribbble"></i></a>
              <a><i class="fab fa-skype"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  components:{
    Navbar
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
