<template>
  <div class="home">
    <Form :stringPassedProp="stringPassed"  v-on:childToParent="onChildClick"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'
import { EventBus } from '@/eventBus.js';

export default {
  name: 'home',
  components: {
    Form
  },

  data(){
    return {
     stringPassed: "I am the prop!",
     valueFromForm: ""
    }
  },

  methods: {
    onChildClick(value) {
     this.valueFromForm = value;
     
      console.log("THIS IS VALUE OF THE FORM IN THE PARENT", this.valueFromForm)
    },

  foo() {
       EventBus.$emit('i-got-clicked', this.valueFromForm);
       console.log("I am emittedddd")
    }
  }
}
</script>
