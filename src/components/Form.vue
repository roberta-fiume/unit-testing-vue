<template>
  <div class="hello">
    <h1>I'm the Form child</h1>
    <p class="prop-parag"> I am the prop passed: {{stringPassedProp}}</p>
    <label for="one" class="labelField">Enter value:</label>
    <input type="text" v-model="firstName" class="inputField">
    <input type="radio" id="yes" value="Yes" v-model="radios" class="radioYes">
    <label for="one">Yes</label>
    <br>
    <input type="radio" id="no" value="No" v-model="radios"  class="radioNo">
    <label for="two">No</label>

    <div class="selected">You chose: {{radios}}</div>
    <button class="butt" @click="showValue()">Submit</button>
    <button class="getData" @click="fetchResults">Get Data</button>
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
      error: false,
      isFirstNameDisplayed: false,
      clearButton: false,
      radios: "",
      result: null,
      // errorApi: null
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

    fetchResults() {
        const getPromise = axios.get("http://dummy.restapiexample.com/api/v1/employees");

        getPromise.then(response => {
          this.result = response.data[0].employee_name
        })

        return getPromise
    }


      // async fetchResults() {
      //   let url = "http://dummy.restapiexample.com/api/v1/employees";
      //   const response = await axios.get(url);
      //   // console.log("THIS IS RESPONSE:", response)
      //   this.result = response.data[0].employee_name
      // }



    //  fetchResults() {
    //   const axios = require('axios'); // sin async
    //   let url = "http://dummy.restapiexample.com/api/v1/employees";
    //   axios.get(url)
    //     .then(response => {
    //       this.result = response.data[0].employee_name
    //     })
    //     .catch(e => {
    //       this.errorApi = e
    //     })
    //  }

    //   const axios = require('axios');
    //   let url = "http://dummy.restapiexample.com/api/v1/employees";
    //   try {
    //     const response = await axios.get(url);
    //     this.result = response.data[0].employee_name
    //   } catch(e) {
    //     this.errorApi = e
    //   }
    // }
  }
}
</script>


<style>

.hello {
  border: 2px solid blue;
}

</style>
