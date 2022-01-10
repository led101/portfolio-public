<template>
  <div class="home">
    <div class="left">
      <div class="text-wrapper">
        <h1>Hey it's Kevin Ma! I'm a fullstack developer.</h1>
        <p>I have experience with <b>React</b>, <b>Vue</b>, <b>Node.js</b>, <b>Electron.js</b>, <b>jQuery</b>, <b>MySQL</b>, <b>Google Cloud Platform</b> and more. I have built <b>web apps</b> and shipped <b>desktop applications (Windows and Mac)</b> for clients. See my resume <a href="/Kevin_Ma_Resume.pdf" target="_blank">here</a>.</p>
        <p>I'm looking for a software internship for summer 2022!</p>
      </div>
      <button @click="$router.push('contact')"><h1>contact me</h1></button>
    </div>
    <div class=right>
      <img src="../assets/photo.jpg" />
    </div>
  </div>
</template>

<script>


</script>



<style lang="scss" scoped>

  .home{
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    display: grid;
    grid-template-columns: 2.7fr 3fr;
    @media screen and (max-width: 500px) {
      padding-left: 5%;
      padding-right: 5%;
      display: flex;
      flex-direction: column;
    }
  }
  .left{
    text-align: left;
    margin-bottom: 10%;
    margin-right: 5%;
    @media screen and (max-width: 500px) {
      margin-right: 0;
    }
    p{
      font-weight: 450;
      font-size: 1.1rem;
    }
    h1{
      margin: 0;
    }
  }
  .text-wrapper{
    margin-bottom: 10%;
  }
  .right{
    // width: 100%;
    margin-left: 5%;
    @media screen and (max-width: 500px) {
      margin-left: 0;
    }
    img{
      max-width: 90%;
    }
  }
  button{
    border: solid;
    border-width: 1px;
    background-color: white;
    text-align: center;
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    transition: 0.3s;
    &:hover{
        color: #485c70;
        cursor: pointer;
        background-color: rgb(249, 249, 249);
    }
    h1{
      font-size: 20px;
      margin: 5px;
    }
  }



</style>