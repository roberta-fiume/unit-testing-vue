<template>
  <div class="home">
    <p>I'm the parent Home</p>
    <Form :stringPassedProp="stringPassed" @first-name="firstName"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'
// import { EventBus } from '@/eventBus.js';

export default {
  name: 'home',
  components: {
    Form
  },

  data(){
    return {
     stringPassed: "I am the prop!",
    //  valueFromForm: ""

    }
  },

  methods: {
    firstName(value) {
      this.$emit('updateFirstName', value);
    }

  }
}
</script>

<style>
  .home{
    border: 2px solid green;
  }
</style>
