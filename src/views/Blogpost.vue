<template>
    <div id="container">
        <div id="left-column">
            <div id="title">
                <h1>
                    {{title}}
                </h1>
            </div>
            <div id="created" v-if="dateCreated!==''">
                <h4>
                    Published on {{dateCreated}}
                </h4>
            </div>
            <div id="edited" v-if="dateEdited!==''">
                <h4>
                    Edited on {{dateEdited}}
                </h4>
            </div>
            <div class="content">
                <!-- <p> -->
                    <!-- {{content}} -->
                    <span v-html="content"></span>
                    <!-- <quill-editor
                    v-model:content="content"
                    :disabled="true"
                    :options="editorOption"
                    style="border: none;"/> -->
                <!-- </p> -->
            </div>
        </div>
        <div v-if="content!==''" id="right-column">
            <h1>
                Share
            </h1>
        </div>
        <!-- <img id="myimg"> -->
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    // import { quillEditor, Quill } from 'vue3-quill'
    // import 'quill/dist/quill.snow.css'
    
    export default {
        data(){
            return {
                slug: this.$route.params.slug,
                title: "",
                dateCreated: "",
                dateEdited: "",
                content: "",
                editorOption: {  
                    modules: {
                        toolbar: false,
                    }
                }
            }
        },
        components: {
            // quillEditor
        },
        methods: {
            async loadPost(){

                const blogpost = await firebase.firestore().collection("blogposts").doc(this.slug).get();
                const blogpostData = blogpost.data();
                this.title = blogpostData.title;
                if(blogpostData.created){
                    this.dateCreated = new Date(blogpostData.created.seconds * 1000).toDateString();
                }
                if(blogpostData.edited){
                    this.dateEdited = blogpostData.edited;
                }
                this.content= blogpostData.content;

            },
        },
        beforeMount(){
            this.loadPost();
        }
    }
</script>

<style lang="scss" scoped>
    #container{
        text-align: left;
        margin:auto;
        padding-left: 10%;
        padding-right: 10%;
        display: flex;
        flex-direction: row;
        @media screen and (max-width: 500px) {
            padding-left: 5%;
            padding-right: 5%;
            flex-direction: column;
        }
        
        
    }
    #left-column{
        // margin:auto;
        // float:left;
        // width: 80%;
        font-size: 18px;
        flex: 8;
        // @media screen and (max-width: 500px) {
        //     width: 100%;
        // }
    }
    #right-column{
        // float:left;
        // width: 20%;
        flex: 2;
        font-size: 18px;
        text-align: right;
        @media screen and (max-width: 500px) {
            text-align: left;
        }
    }

    .content{
        font-family: helvetica;
        word-break: break-all;
        
    }

    :deep() img{
        width: 100%;
    }

    :deep() .ql-video{
        // height: 100%;
        // width: 100%;
        display: block;
        margin: 0 auto;
    }
    :deep() .ql-align-right{
            text-align: right;
    }
    :deep() .ql-align-left{
        text-align: left;
    }
    :deep() .ql-align-center{
        text-align: center;
    }    
    :deep() .ql-align-justify{
        text-align: justify;
    }  
    :deep() .ql-syntax{
        background-color: #23241f;
        color: #f8f8f2;
        margin-bottom: 5px;
        margin-top: 5px;
        padding-top: 5px;
        padding-right: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
        border-radius: 3px;
    }
    :deep() blockquote{
        border-left-width: 5px;
        border-left-style: solid;
        border-left-color: rgb(204, 204, 204);
        margin-bottom: 5px;
        margin-top: 5px;
        padding-left: 16px;
        margin: 0px;
        padding-right: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        box-sizing: border-box;
    }
    :deep() .ql-indent-1{
        padding-left: 3em;
    }
    :deep() .ql-indent-2{
        padding-left: 6em;
    }
    :deep() .ql-indent-3{
        padding-left: 9em;
    }
    :deep() .ql-indent-4{
        padding-left: 12em;
    }
    :deep() .ql-indent-5{
        padding-left: 15em;
    }
    :deep() .ql-indent-6{
        padding-left: 18em;
    }
    :deep() .ql-indent-7{
        padding-left: 21em;
    }
    :deep() .ql-indent-8{
        padding-left: 24em;
    }
    :deep() .ql-indent-9{
        padding-left: 27em;
    }
    :deep() .ql-size-small{
        font-size: 0.75em;
    }
    :deep() .ql-size-large{
        font-size: 1.5em;
    }
    :deep() .ql-size-huge{
        font-size: 2.5em;
    }
    :deep() .ql-font-monospace{
        font-family: Monaco, Courier New, monospace;
    }
    :deep() .ql-font-serif{
        font-family: Georgia, Times New Roman, serif;
    }
    


    
</style>