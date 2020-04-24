<template>
  <v-card
    width="100%"
    class="mx-auto"
  >
    <v-card-title>
      <span class="display-3 red lighten-1">{{ goods_info.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-row
        align="center"
        class="mx-auto"
      >
        <span class="display-2 red lighten-2 ">{{ goods_info.price }} 원</span>
      </v-row>
      <v-row
        align="center"
        class="mx-auto"
      >
        상품 설명 : <span class="display-1 red lighten-3 ">{{ goods_info.description }}</span>
      </v-row>
      <v-row
        align="center"
        class="mx-auto"
      >
        등록일 :{{ goods_info.created_at }}
      </v-row>
      <v-row
        align="center"
        class="mx-auto"
      >
        수정일 :{{ goods_info.updated_at }}
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-flex xs2>
        <v-select
        :items= "qty"
        label="수량"
        class="input-group--focused"
        item-text="name"
        item-value="id"
        v-on:change="selectQty"
        ></v-select>
      </v-flex>
      <v-flex xs2>
        <v-select
        :items= "goods_info.options"
        label="옵션"
        class="input-group--focused"
        item-text="name"
        item-value="id"
        v-on:change="selectOption"
        ></v-select>
      </v-flex>
    </v-card-text>
    <v-card-text v-if="selected_opt">
      <v-row
        align="center"
        class="mx-auto"
      >
        선택 옵션 : <span class="body-1 pink lighten-2 ">{{ selected_opt.name }} ( {{ selected_opt.description }} )</span>
      </v-row>
      <v-row
        align="center"
        class="mx-auto"
      >
        옵션 가격 : <span class="body-1  pink lighten-2 ">{{ selected_opt.price }} 원 </span>
      </v-row>
    </v-card-text>
    
    <v-card-text v-if="select_qty">
      <v-row
        align="center"
        class="mx-auto"
      >
        선택 수량 : <span class="body-1 pink lighten-2 ">{{ select_qty }} </span>
      </v-row>
      <v-row
        align="center"
        class="mx-auto"
      >
        
        <span class="body-1  pink lighten-2 " v-if="selected_opt"> 
          상품 금액 : {{ goods_info.price }} 원 <br/>
          옵션 금액 : {{ selected_opt.price }} 원 <br/>
          총 주문 금액 : {{ (goods_info.price + selected_opt.price) * select_qty }} 원 
        </span>
        <span class="body-1  pink lighten-2 " v-else>
          상품 금액 : {{ goods_info.price }} 원 <br/>
          총 주문 금액 : {{ goods_info.price * select_qty }} 원 
        </span>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="success"
        @click="orderInsert"
      >
        주문하기
      </v-btn>
      <router-link :to="`/goods/goodslist`">
        <v-btn
          color="info"
        >
          상품 리스트가기
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  data(){
    return {
      goods_info : {},
      selected_opt : false,
      qty : [1,2,5,10,20,50,100],
      select_qty : false,
      order_info : {
        goods_no : null,
        goods_price : null,
        select_opt : null,
        select_qty : null,
        total_price : null,
        // order_status : false,
      }
    //   this.$route.params.goods_info
    }
  },
  created() {
    this.get_goods_info(this.$route.params.id)
    // console.log(this.goods_info)
  },
  methods: {
    get_goods_info(id){
      let goods_list = this.$store.getters.getGoodsList
      if(goods_list)
      {
        goods_list.forEach((goodsInfo) => {
          if( id == goodsInfo.id)
          {
            this.goods_info = goodsInfo
          }
        })      
      }
      else {
        // axios get goods info
        
      }
    },
    selectOption(opt_id){
      let opt_list = this.goods_info.options
    //   console.log(typeof(opt_list))
      opt_list.forEach((optInfo) => {
        // console.log('optInfo' + optInfo)
        // console.log('opt_id' + opt_id)
          if( opt_id == optInfo.id){
            // console.log('matched')
            this.selected_opt = optInfo
          }
      })
      // console.log(this.selected_opt)
    },
    selectQty(select_qty){
      this.select_qty = select_qty
    },
    orderInsert(){
      // console.log('order complete')
      // this.$store.dispatch('')
      if(!this.$store.getters.getMemberInfo.is_login){
        alert('회원만 주문이 가능합니다')
        return
      } else if(!this.select_qty) {
        alert('수량을 선택해 주세요')
        return
      } else if(!this.goods_info.price){
        alert('금액이 없습니다')
        return
      }

      let total_price = 0
      
      if(this.selected_opt) {
        total_price = ( this.goods_info.price + this.selected_opt.price) * this.select_qty
      }else{
        total_price = this.goods_info.price* this.select_qty
      }

      this.order_info.goods_no = this.goods_info.id
      this.order_info.select_opt = this.selected_opt
      this.order_info.select_qty = this.select_qty
      this.order_info.total_price = total_price
      this.order_info.goods_price = this.goods_info.price

      this.$store.dispatch('SET_ORDER_START', this.order_info)
        .then(() => {
          console.log('orderComplete')
          this.$router.push('/order/order')
        })
      
    }
    
  }

}
</script>