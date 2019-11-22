<template>
  <div class="about">
    <h1>This the about page</h1>
    <p class="text">This the value passed from sibling: {{status}} </p>
  </div>
</template>

<script>
// import { EventBus } from '@/eventBus.js';
export default {
  props: {
    status: String
  },
  name: 'about',
  data() {
    return {
      fromSibling: "hello",
      example: ""
    }
  }
}
</script>

<style>
  .about {
    border: 2px solid lightseagreen;
  }
</style>
