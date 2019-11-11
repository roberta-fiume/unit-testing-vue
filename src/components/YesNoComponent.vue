<template>
  <div>
    <div v-if="showHello" class="hello">Hello123</div>
    <button class="yes" @click="callYes">Yes</button>
    <button class="no" @click="callNo">No</button>
  </div>
</template>

<script>
  export default {
    name: 'YesNoComponent',

    data() {
      return {
        showHello: false
      }
    },

    props: {
      callMe: {
        type: Function
      }
    },

    methods: {
      
      callYes() {
        this.showHello = true;
        // console.log("THIS IS HELLOOO", this.showHello)
        this.callMe('yes');
      },
      callNo() {
        this.callMe('no')
      }
    }
  }
</script>