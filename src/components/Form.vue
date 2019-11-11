<template>
  <div class="hello">
    <h1>Form</h1>
    <label for="one" class="labelField">Enter value:</label>
    <input type="text" v-model="firstName" class="inputField">
    <input type="radio" id="yes" value="Yes" v-model="radios" class="radioYes">
    <label for="one">Yes</label>
    <br>
    <input type="radio" id="no" value="No" v-model="radios"  class="radioNo">
    <label for="two">No</label>

    <div class="selected">Selected: {{radios}}</div>
    <button class="butt" @click="showValue($event)">Submit</button>
    <span class="spanElem" v-if="isFirstNameDisplayed"> {{firstName}}</span>
    <p v-if="error" class="errorMessage">Error! Please enter a value!</p>
    <button v-if="clearButton" class="clearButt" @click="clear"> CLEAR </button>
  </div>
</template>

<script>
export default {
 
  name: 'Form',
  props: {
    msg: String
  },

  data() {
    return {
      firstName: "",
      error: false,
      isFirstNameDisplayed: false,
      clearButton: false,
      radios: ""
    }
  },

  mounted() {
    console.log("ERROR MESSAGE IN MOUNTED:", this.error);
      console.log("CLEAR BUTTON IN MOUNTED:", this.clearButton);
  },

  // updated() {
  //    console.log("ERROR MESSAGE IN UPDATED:", this.error);
  //    console.log("CLEAR BUTTON IN UPDATED", this.clearButton);
  // },

  methods: {
    showValue(event) {
      console.log("event1111111111111111111111111", event);
      // console.log("clearrr1", this.clearButton);
      this.isFirstNameDisplayed = true;
      this.clearButton = true;
      // console.log("clearrr2", this.clearButton);
      this.showErrorMessage();
    },

    showErrorMessage() {
      if(this.firstName == "") {
        this.isFirstNameDisplayed = false;
         this.clearButton = false;
         this.error = true;
          this.firstName.onkeyup = setTimeout(() => {
            this.deleteErrorMessage() 
        }, 3500);     
        //  console.log("THE ERROR APPEARS:", this.error)
          // console.log("VALUE IN SPAN WHEN THERE'S ERROR:", this.isFirstNameDisplayed);
      } else {
        this.error = false;
          // console.log("THERE IS NO ERROR:", this.error)
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
    }
  }
}
</script>


<style>

</style>
