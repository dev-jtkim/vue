<template>
  <v-container fluid class="pa-0">
    <v-row align="center">
      <v-col cols="12" sm="6">
        <div class="text-center">
          <div class="my-2">
            <v-btn color="warning" fab x-large dark>
              {{ message }}
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="error" fab x-large dark v-on:click="test1">
              test1
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="success" fab x-large dark v-on:click="test2">
              test2
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="success" fab x-large dark v-on:click="test3">
              test3
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {    
  components: {

  },
  computed: {
      
  },
  data() {
    return {
      message : 'bcbc'
    }
  },
  methods: {
    test1 () {
        console.log(this.message)
    //   alert('test1')
    },
    test2: () => {
        console.log(this.message) // error , this > 찾을수 없음. arrow function의 this는 Vue 인스턴스를 가리키지않는다. window 객체에서 찾아야함..
    //   alert('test2')
    },

    test3 () {
      let a = () => {
          console.log('test3 ' + this.message)
      }
      a()
    }
    
  },

  beforeCreate: function() {
    console.log('Beforcreate : ' + this.message)
  },
  created: function() {
    this.message = this.message + '1'
    console.log('Create : ' + this.message)
  },
  beforeMount() {
    this.message = this.message + '2'
    console.log('BeforMout:' + this.message)
  },
  mounted() {
    this.message = this.message + '3'
    console.log('mounted:' + this.message)
  },
  beforeUpdate() {
    this.message = this.message + '4'
    console.log('before updated:' + this.message)
  },
  
  updated() {
  },



}
</script>

<style>

</style>