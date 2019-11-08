<template>
  <div class="hello">
    <h1>Form</h1>
    <label for="one" class="labelField">Enter value:</label>
    <input type="text" v-model="firstName" class="inputField">
    <button class="butt" @click="showValue">Submit</button>
    <span class="spanElem" v-if="valueFromInput">{{firstName}}</span>
    <p v-if="error" class="errorMessage">Error! Please try again</p>
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
      valueFromInput: false
    }
  },

  methods: {
    showValue() {
      this.valueFromInput = true
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
