<template>
  <div class="home">
    <Form :stringPassedProp="stringPassed"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'

export default {
  name: 'home',
  components: {
    Form
  },

  data(){
    return {
     stringPassed: "I am the prop!"
    }
  }
}
</script>
