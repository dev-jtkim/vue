<template>
  <v-card>
    {{order_info.info}}
  </v-card>
</template>

<script>
  export default {
    data(){
      return {
        order_info : {info : "info"}
      }
    },
    created() {
    },
    methods:{

    },
  }
</script>