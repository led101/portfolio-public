<template>
    <div class="blog" v-if="isExactRoute">
        <div id="container">
            <div class="selectTag">
                <h1>Select topic: </h1>
                <select v-model="selectedTag" @change="tagChange()">
                    <option v-for="tag in tags" :key="tag" :value="tag">
                        {{tag}}
                    </option>
                </select>
            </div>
            <div v-if="posts.length===0" id="loading">loading...</div>
            <div class="posts" v-for="post in posts" :key="post.slug">
                <router-link :to="{path: '/blog/' + post.slug}">
                    <div class="card">
                        <div class="card-body">
                            <h1 class="card-title">
                                {{post.title}}
                            </h1>
                            <p class="subtitle">
                                {{sbString(post.subtitle, 200)}}
                            </p>
                        </div>
                    </div>
                </router-link>
            </div>
                <button id="button" v-if="ifLoadMore" v-on:click="fetchPosts"><h1>load more</h1></button>
                <!-- <button id="button" v-if="ifLoadMore" v-on:click="fetchPosts">Load More</button> -->
                <div id="noMore" v-else-if="posts.length!==0">no more posts!</div>
        </div>
    </div>
    <router-view/>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/firestore'
    
    export default {

        data(){
            return {
                posts: [],
                latestDoc: null,
                tags: [],
                selectedTag: null
            }
        },
        mounted(){
            this.fetchPosts();
            this.fetchTags();
        },
        computed: {
            isExactRoute() {
                return (typeof this.$route.params.slug === 'undefined');
            },
            ifLoadMore(){
                return !(this.latestDoc==null);
            },
        },
        components: {
            // InfiniteLoading
        },
        methods: {
            async fetchTags(){
                const db = firebase.firestore();
                const ref = db.collection("tags")
                const tagSnap = await ref.get();
                // console.log(tagSnap);
                this.tags.push(...tagSnap.docs.map(p => p.data().tagName));
                this.tags.unshift("all");
                // console.log(this.tags);
            },
            async tagChange(){
                this.posts = [];
                if(this.selectedTag === "all"){
                    this.latestDoc = null;
                    this.fetchAll();
                    return;
                }
                this.latestDoc = null;
                this.fetchWithTag();
            },
            async fetchPosts(){
                // console.log("HERE!")
                if(this.selectedTag === "all" || this.selectedTag === null) this.fetchAll();
                else this.fetchWithTag();
            },
            async fetchWithTag(){
                const db = firebase.firestore();
                const ref = db.collection("blogposts")
                .orderBy("rank")
                .where("tags", "array-contains", this.selectedTag)
                .startAfter(this.latestDoc || 0)
                .limit(10);
                const postSnap = await ref.get();
                // console.log(postSnap.docs[0].data());
                this.posts.push(...postSnap.docs.map(p => p.data()));
                this.latestDoc = postSnap.docs[postSnap.docs.length-1];
            },
            async fetchAll(){
                console.log("fetched all");
                const db = firebase.firestore();
                const ref = db.collection("blogposts")
                .orderBy("rank")
                .startAfter(this.latestDoc || 0)
                .limit(10);
                const postSnap = await ref.get();
                console.log(postSnap);
                this.posts.push(...postSnap.docs.map(p => p.data()));
                this.latestDoc = postSnap.docs[postSnap.docs.length-1];
            },
            sbString(content, maxLength){
                if(content.length < maxLength){
                    return content;
                }
                return content.substring(0, maxLength) + "...";
            }
        }        
    }
</script>

<style lang="scss" scoped>
    h1{
        font-size: 20px;
        margin: 10px;
    }
    .selectTag{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        select{
            outline: none;
            background-color: rgb(249, 249, 249);
            // border-radius: 4px;
            // width: 100%;
            height: 25px;
            text-align: center;
        }
    }
    .posts{
        margin-top: 20px;
        margin-bottom: 20px;
        .card{
            border: solid 1px lightgrey;
            transition: 0.3s;
            text-align: left;
            &:hover {
                background-color: rgb(249, 249, 249);
                color: #485c70;
            }
            
            .card-body{
                margin: 1%;
                font-size: 20px;
                .subtitle{
                    margin: 10px;
                }
            }
        }
    }
    #loading{
        font-size: 24px;
        padding: 20px;
        color: black;       
    }

    #container{
        padding-left: 10%;
        padding-right: 10%;
        margin:auto;
        margin-top: 20px;
        // margin-bottom: 20px;
        @media screen and (max-width: 500px) {
            padding-left: 5%;
            padding-right: 5%;
        }
        
    }
    a{
        text-decoration: none;
        color: #000000;
    }
    #button{
        border: solid;
        border-width: 1px;
        background-color: white;
        text-align: center;
        color: black;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 0.8em;
        padding-bottom: 0.8em;
        transition: 0.3s;
        margin-bottom: 20px;
        h1{
            margin: 0;
        }
        &:hover{
            color: #485c70;
            cursor: pointer;
            background-color: rgb(249, 249, 249);
        }
    }
    #noMore{
        font-size: 24px;
        padding: 10px;
        color: black;
    }


    

</style>