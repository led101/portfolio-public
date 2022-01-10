<template>
  <div class="contact">
    <div class="form-wrapper">
        <div class="done" v-if="done">
            <p style="text-align: center;">Your contact request has been sent successfully! I will get back to you shortly.</p>
        </div>
        <div class="submitError" v-if="submitError!==''">
            <p style="text-align: center;">
              Sorry your request could not be completed for the reason below:
              <br>
              {{submitError}}
              <br>
              Please try again later
            </p>
        </div>
        <div class="title" v-if="submitError==='' && done!==true"><h1>Contact Form</h1></div>
        <form class="contactForm" v-if="submitError==='' && done!==true" @submit.prevent="submitForm" >

                <label class="input-label" for="input_name"><p>Name</p></label>
                <input v-model="name" id="input_name">
                <div class="error" v-if="name==='' && errors">This field is required</div>
            
                <label class="input-label" for="input_email"><p>Email</p></label>
                <input v-model="email" id="input_email">
                <div class="error" v-if="email==='' && errors">This field is required</div>
                <div class="error" v-if="emailError && errors && (email!=='')">Please enter a valid email address</div>

                <label class="input-label" for="input_phone"><p>Phone Number (optional)</p></label>
                <input v-model="phone" id="input_phone">

                <label class="input-label" for="input_content"><p>What's up?</p></label>
                <textarea v-model="content" id="input_content"></textarea>
                <div class="error" v-if="content==='' && errors">This field is required</div>

            <button class="submitButton" type="submit"><h1>Submit</h1></button>
        </form>
    </div>
  </div>
</template>

<script>
 export default {
        data() {
            return {
                name: "",
                phone: "",
                content: "",
                errors: false,
                emailError: false,
                submitError: '',
                done: false
            }
        },
        methods: {
            async submitForm(){
                this.validateForm();
                if(this.errors){
                    return;
                }
                const requestOptions = {
                    method: "POST",
                    headers: { 
                        "Accept": 'application/json',
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        content: this.content  
                    })
                };
                fetch("https://formcarry.com/s/elX71oqwucv", requestOptions)
                .then(async response => {
                    const data = await response;
                    // console.log(data);
                    if (!response.ok) {
                    // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    this.done=true;
                })
                .catch(error => {
                    this.submitError = error;
                });


            
            },
            validateForm(){
                this.errors = false;
                this.emailError = false;
                if(this.name === ""){
                    this.errors = true;
                }
                if(this.email === ""){
                    this.errors = true;
                }
                if(!this.validateEmail(this.email)){
                    this.errors = true
                    this.emailError = true;
                }
            },
            validateEmail(email){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        },
        mounted (){
            window.scrollTo(0, 0)
        }
    }
</script>
<style lang="scss" scoped>
  .contact{
    text-align: left;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    @media screen and (max-width: 500px) {
      padding-left: 5%;
      padding-right: 5%;
    }
    h1{
      // margin-top: 0;
      margin: 0;
    }
    p{
      font-weight: 450;
      font-size: 1.1rem;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }
    .contactForm{
      input, textarea{
        padding: 12px 20px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 1.2rem;
        font-family: Avenir, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
      }
      textarea{
        resize: vertical;
      }
      .submitButton{
        h1{
          font-size: 20px;
          // margin: 5px;
        }
        border: solid;
        border-width: 1px;
        background-color: white;
        text-align: center;
        color: black;
        margin-top: 1em;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 0.8em;
        padding-bottom: 0.8em;
        transition: 0.3s;
        &:hover{
            color: #485c70;
            cursor: pointer;
            background-color: rgb(249, 249, 249);
        }
      }
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

</style>