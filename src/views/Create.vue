<template>
    <div id="mainDiv">
        <form id="mainForm" @submit.prevent="submitForm">
            <br>
            <div v-for="(error, index) in errors" :key="index">{{error}}</div>
            <input v-model="title" type="text" id="title" placeholder="title" />
            <br>
            <input v-model="subtitle" type="text" id="subtitle" placeholder="subtitle" maxlength = "100"/>
            <br>
            <input v-model="tags" type="text" id="tags" placeholder="tags... (separate by comma)" />
            <br>
            <br><br>
            <quill-editor
                v-bind:style="{width: '100%'}"
                v-model:value="content"
                :options = "editorOption"
            />
            <!-- <textarea v-model="content" id="post" placeholder="start writing here" ></textarea> -->
            <br><br>
            <button id="publishButton" type="submit">publish</button>
        </form>

    </div>
</template>

<script>
    import firebase from "firebase/app";
    import 'firebase/firestore';
    import 'firebase/storage';
    import { quillEditor, Quill } from 'vue3-quill'
    import 'quill/dist/quill.snow.css'
    import ImageUploader from "quill-image-uploader";
    Quill.register("modules/imageUploader", ImageUploader);
    
    export default {
        data() {
            return{
                errors: [],
                title: "",
                subtitle: "",
                tags: "",
                content: "",
                created: Date.now(),
                editorOption: {  
                    modules: {
                        imageUploader: {
                            upload: (file) => {
                                return new Promise((resolve, reject) => {
                                    console.log(file);
                                    let ref = firebase.storage().ref().child('media/' + file.name);
                                    let filelink;
                                    ref.put(file).then((snapshot) => {
                                        console.log("uploaded" + snapshot);
                                    })
                                    .then(async function(){
                                        filelink = await firebase.storage().ref().child('media/' + file.name);
                                    })
                                    .then(async function() {
                                        const publicUrl = await filelink.getDownloadURL();
                                        console.log(publicUrl);
                                        resolve(publicUrl)
                                    })
                                });
                            }
                        }
                    }
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onInput(event){
                this.content = event.target.innerHTML;
            },
            handleHtml(){
                console.log("I am here")
                return this.content;
            },
            async submitForm(){
                this.errors=[];
                if(this.title === ""){
                    this.errors.push("Please enter a title!");
                }
                if(this.subtitle === ""){
                    this.errors.push("Please enter a subtitle!");
                }
                if(this.content === ""){
                    this.errors.push("Blog cannot be empty!");
                }
                if(this.errors.length){
                    return;
                }
                let slug = this.title.replace(/\s/g, "-");
                let unsplitTag = this.tags.replace(/\s/g, "");
                let tags = unsplitTag.split(",");
                firebase.firestore().collection("blogposts").doc(slug).set({
                    title: this.title,
                    subtitle: this.subtitle,
                    content: this.content,
                    slug: slug,
                    created: firebase.firestore.Timestamp.fromDate(new Date(this.created)),
                    rank: firebase.firestore.Timestamp.fromDate(new Date((-1)*this.created)),
                    tags: tags
                })
                .then(() => {

                    let writeBatch = firebase.firestore().batch();

                    for(let i=0; i<tags.length; i++){
                        writeBatch.set(firebase.firestore().collection("tags").doc(tags[i]), {
                            tagName: tags[i]
                        })

                    }
                    writeBatch.commit();
                })
                .then(() => {
                    alert("Blog published!");
                })
                .catch((error) => {
                    alert("Error writing document");
                });

            }
        }
    }
</script>

<style lang="scss" scoped>

// textarea{
//     outline:none;
//     resize: none;
//     width: 100%;
//     // height: 100%;
//     flex-grow: 1;

//     font-size: 24px;
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// }





#tags, #title, #subtitle{
    width: 100%;
    font-size: 1.5rem;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#mainDiv{
    // padding: 0;
    width: 60%;
    height: calc(100vh - 130px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // .editor{
    //     flex-grow: 1;
    //     // background-color: grey;
    //     border: solid 1px black;
    //     outline: none;
    //     width: 100%;
    //     text-align: left;
    //     font-size: 1.2rem;
    // }
} 

#uploadButton{
    border: solid;
    border-width: 1px;
    background-color: white;
    text-align: center;
    color: black;
    font-size: 15px;
    padding: 6px 32px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

#uploadButton:hover{
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2);
    color: #485c70;
    cursor: pointer;
}

#publishButton{
    // justify-content: center;
    width: 50%;
    border: solid;
    border-width: 1px;
    background-color: white;
    text-align: center;
    color: black;
    font-size: 24px;
    padding: 15px 32px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

#publishButton:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    color: #485c70;
    cursor: pointer;
}


#mainForm{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    
}

</style>