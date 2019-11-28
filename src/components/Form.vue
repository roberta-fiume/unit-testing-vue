<template>
  <div class="hello">
    <h1>I'm the Form child</h1>
    <p class="prop-parag"> I am the prop passed: {{stringPassedProp}}</p>

    <label for="one" class="labelField">Enter Name:</label>
    <input type="text" v-model="firstName" class="inputField">

    <label for="one" class="labelField">Enter Message:</label>
    <input type="text" v-model="message" class="inputField">

    <input type="radio" id="yes" value="Yes" v-model="radios" class="radioYes">
    <label for="one">Yes</label>
    <br>
    <input type="radio" id="no" value="No" v-model="radios"  class="radioNo">
    <label for="two">No</label>

    <div class="selected">You chose: {{radios}}</div>
    <button class="butt" @click="showValue()">Submit</button>
    <button class="getData" @click="fetchResults()">Get Data</button>
     <button class="getData" @click="sendData">Send Data</button>
    <p class="apiResult">{{result}}</p>
    <!-- <p>{{errorApi}}</p> -->
    <span class="spanElem" v-if="isFirstNameDisplayed">{{firstName}}</span>
    <p v-if="error" class="errorMessage">Error! Please enter a value!</p>
    <button v-if="clearButton" class="clearButt" @click="clear"> CLEAR </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
 
  props: ['stringPassedProp'],

  data() {
    return {
      firstName: "",
      message: "",
      error: false,
      isFirstNameDisplayed: false,
      clearButton: false,
      radios: "",
      result: null,
      idDocument: "",
      myIdResponse: "",
      messageResponse: ""
    }
  },

  methods: {
    showValue() {
      this.isFirstNameDisplayed = true;
      this.clearButton = true;
      this.$emit('first-name', this.firstName)
      this.showErrorMessage();
    },

    showErrorMessage() {
      if(this.firstName == "") {
        this.isFirstNameDisplayed = false;
         this.clearButton = false;
         this.error = true;
        //   this.firstName.onkeyup = setTimeout(() => {
        //     this.deleteErrorMessage() 
        // }, 3500);     
      } else {
        this.error = false;
      }
    },

    deleteErrorMessage() {
      this.error = false;
    },

    clear() {
      this.firstName = "";
      console.log("FIRST NAME WHEN CLEARING:", this.firstName);
      this.isFirstNameDisplayed = false;
      this.clearButton = false;
       console.log("VALUE IN SPAN AFTER CLEARING:", this.isFirstNameDisplayed);
    },


    //   sendData(){
    //     let url = "http://apicreation-260015.appspot.com/document/"
    //     console.log("this is the url:", url)
    //       const getPromisePost = axios.post(url, {
    //       id: this.firstName,
    //       myMessage: this.message
    //     })
    //     getPromisePost.then(response => {
    //       console.log("this is the responseee", response);
    //       let documentId = response.data.documentId;
    //       console.log(documentId);
    //       this.idDocument = documentId;
    //     })

    //     return getPromisePost
    // },



    sendData() {
      const postPromise = axios.post("http://apicreation-260015.appspot.com/document/", {
        id: this.firstName,
        myMessage: this.message
      });
      
      postPromise.then((response) => {
        console.log("this is the responseee", response);
        this.idDocument = response.data.documentId;
      },(error) => {
        console.log(error);
      });
      
      return postPromise;
    },

    fetchResults() {
      let url = "http://apicreation-260015.appspot.com/document/" + this.idDocument;
      const getPromise = axios.get(url);

      getPromise.then(response => {
        this.myIdResponse = response.data.myId;
        this.messageResponse = response.data.myMessage;
      })

      return getPromise
    }


    // fetchResults() {
    //   console.log("THIS ID", this.id)
    //   const getPromise = axios.get("http://dummy.restapiexample.com/api/v1/employees");

    //   getPromise.then(response => {
    //     this.result = response.data[0].employee_name
    //   })

    //   return getPromise
    // },

  }
}
</script>


<style>

.hello {
  border: 2px solid blue;
}

</style>
