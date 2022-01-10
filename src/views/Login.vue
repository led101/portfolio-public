<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            Login
            <div class="email">
                <input type="email" v-model="email" placeholder="email">
            </div>
            <div class="password">
                <input type="password" v-model="password" placeholder="password">
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
    data(){
        return{
            email: "",
            password: "",
            error: ""
        };
    },
    methods: {
        async pressed(){
            // let user = firebase.auth().currentUser;
            // console.log("not logged in: ", user);
            let _this = this;
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(async function() {
                    let res = await firebase.auth().signInWithEmailAndPassword(_this.email, _this.password);
                })
                .then(() => {
                    this.$emit('loggedin', true);
                    this.$router.push('/');
                })
                .catch(error =>{
                    console.log(error);
                    this.error = error;
                })
            
            
            //need to add catch for when signin fails
            // .then(() => {
            //     let user = firebase.auth().currentUser;
            //     console.log(user);
            //     if(user){
            //         this.$emit('loggedin', true);
            //         this.$router.push('/');
            //         console.log(user);
            //     }
            //     else{
            //         alert("Sign in failed");
            //     }
            // })
        }
    }
    

}
</script>

<style lang="scss" scoped>

</style>