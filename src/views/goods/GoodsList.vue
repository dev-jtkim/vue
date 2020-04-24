<template>
  <v-card>
    <v-card-title>
      상품 리스트 페이지
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="goods"
      :items-per-page="5"
      :search="search"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{row.item.id}}</td>
          <td>{{row.item.name}}</td>
          <td>{{row.item.description}}</td>
          <td>{{row.item.price}}</td>
          <td>
            <router-link :to="`/goods/view/${row.item.id}`">
              <v-btn color="success" >
                주문하기
              </v-btn>
            </router-link>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

  export default {
    data () {
      return {
        search : "",
        headers: [
          {
            text: 'no',
            align: 'start',
            value: 'id',
          },
          { text: '상품명', value: 'name' },          
          { text: '상품설명', value: 'description' },
          { text: '상품가격', value: 'price', sortable: true },
          { text: '주문'}
          // { text: '등록일', value: 'created_at' },
          // { text: '수정일', value: 'updated_at' },
        ],
        goods:[],
      }
    },
    async created() {
      // let list = async this.$store.dispatch('GET_GOODS_LIST')
      // console.log(list)
      // console.log(this.$store.getters.getGoodsList)
      // this.goods = this.$store.getters.getGoodsList
      // let list = this.goods_list()
      // this.goods_list().then((result)=>{
      //   console.log(this.$store.getter.getGoodsList)
      // })

      //action state insert
      

      //getter state get
      // this.goods = this.$store.getters.getGoodsList
      let res_goods_list = await this.goods_list()

      // async awiat로 데이터 동신 이후 현재 컴포넌트에 data 입력      
      this.goods = res_goods_list
      // 이후 vuex state 전달 (mutation)
      this.$store.commit('SET_GOODS_LIST' , res_goods_list)

      // console.log(this.$store.getters.getGoodsList)
      // console.log('2')
    },
    methods: {
      async goods_list(){
        // this.$store.dispatch('GET_GOODS_LIST')
        // return (await this.$axios.post('/api/test')).data
        return (await this.$axios.get('/api/product')
          .then( res => {            
            if( res.data.message == "Success" && res.status == 200){
              // console.log(res.data.data)
              return res.data.data
            }else{
              return "err"
            }
          })
        )
      }      
    }
  }
</script>