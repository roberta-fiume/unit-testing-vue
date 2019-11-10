<template>
  <div class="hello">
    <h1>Form</h1>
    <label for="one" class="labelField">Enter value:</label>
    <input type="text" v-model="firstName" class="inputField">
    <button class="butt" @click="showValue(),showErrorMessage()">Submit</button>
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
      clearButton: false
    }
  },

  methods: {
    showValue() {
       console.log("clearrr1", this.clearButton);
      this.isFirstNameDisplayed = true;
      this.clearButton = true;
      console.log("clearrr2", this.clearButton);
    },

    showErrorMessage() {
      if(this.firstName == "") {
        this.isFirstNameDisplayed = false;
         this.clearButton = false;
         this.error = true;
          this.firstName.onkeyup = setTimeout(() => {
            this.deleteErrorMessage() 
        }, 3500);
        //  this.setTimeoutForInputField();
         
         console.log("THE ERROR APPEARS:", this.error)
          console.log("VALUE IN SPAN WHEN THERE'S ERROR:", this.isFirstNameDisplayed);
      } else {
        this.error = false;
          console.log("THERE IS NO ERROR:", this.error)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
