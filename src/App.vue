<template>
  <div id="nav">
    <router-link to="/">home</router-link>
    <router-link to="/contact">contact</router-link>
    <router-link to="/projects">projects</router-link> 
    <router-link to="/blog">blog</router-link>
    <router-link to="/create" v-if="isLoggedIn">create</router-link>
    <a v-if="isLoggedIn" @click="logout">logout</a>
  </div>
  <router-view @loggedin="loginFunc"/>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
    data(){
        return{
            isLoggedIn: false
        };
    },
    mounted() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
        }
        else{
          this.isLoggIn = false;
        }
      });      
    },
    methods: {
      logout(){
        firebase.auth().signOut().then(() => {
          this.isLoggedIn = false;
        })
      },
      loginFunc(event){
        this.isLoggedIn = event;
      }
    }
    

}
</script>

<style lang="scss">
// #header h1{
//     margin:0px;
// }
// body{
//     margin:0;
// }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  text-align: center;

}

#nav {
  padding: 10px;
  overflow: hidden;
  background-color: white;
  a {
    text-decoration: none;
    text-align: center;
    padding: 30px;
    @media screen and (max-width: 420px) {
      padding: 5px;
      border-style: none;
    }
    @media screen and (max-width: 520px) and (min-width: 420px) {
      padding: 20px;
      border-style: none;
    }

    // font-size: 30px;
    font-size: clamp(1.3rem, 2.5vw, 2.8rem);
    border-style: solid;
    border-width: 2px;
    border-color: white;
    color: #000000;
    &:hover{
      color: #485c70;
      text-decoration: underline;
      cursor: pointer;
    }
    &.router-link-active {
      // text-decoration: underline; 
      @media screen and (min-width: 520px) {
        border-color: black;
      }
      @media screen and (max-width: 520px) {
        text-decoration: underline;
      }
    }
    
  }
}


</style>
