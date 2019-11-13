<template>
  <div class="about">
    <h1>This the about page {{myProperty}}</h1>
    <p>This the value passed: </p>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      myProperty: "hello"
    }
  }
}
</script>
