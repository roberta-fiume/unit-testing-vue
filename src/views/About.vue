<template>
  <div class="about">
    <h1>This the about page</h1>
    <p>This the value passed from sibling: {{fromSibling}} </p>
  </div>
</template>

<script>
import { EventBus } from '@/eventBus.js';
export default {
  name: 'about',
  data() {
    return {
      fromSibling: "hello",
      example: ""
    }
  },


 
 mounted() {  
    console.log("I am mounted shit",this.fromSibling)  
  },
  created() {
    console.log("I am CREATED shit")
     EventBus.$on('i-got-clicked', inputValue => {
      // let example = inputValue;
      this.fromSibling = inputValue
      
      console.log(" I AM FROM SIBLING FROMSIBLING",this.fromSibling);
    })
  },
//  mounted() {
//      console.log("i am the changed value in MOUNTED:", this.fromSibling)
//   },



  methods: {
    // getValueFromSibling() {
     
    //   return this.fromSibling
    // }
  }

  
    
 
}
</script>
