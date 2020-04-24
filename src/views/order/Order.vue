<template>
  <v-form>
    주문자 정보
    <v-text-field
      v-model="memberinfo.name"
      label="이름"
      required
    ></v-text-field>
    <v-text-field
      v-model="memberinfo.email"
      label="이메일"
      required
    ></v-text-field>
    <v-text-field
      v-model="memberinfo.address"
      label="주소"
      required
    ></v-text-field>

    주문 상품 정보
    <v-text-field
      v-model="orderinfo.goods_no"
      label="상품번호"
      disabled
      required
    ></v-text-field>
    <v-text-field
      v-model="orderinfo.goods_price"
      label="상품 가격"
      prefix="₩"
      disabled
      required
    ></v-text-field>
    <v-text-field
      v-model="orderinfo.select_qty"
      disabled
      label="주문 수량"
      required
    ></v-text-field>
    <div v-if="orderinfo.select_opt">
      <v-text-field
      disabled
      label="선택 옵션명"
      v-model="orderinfo.select_opt.name"
      ></v-text-field>
      <v-text-field
      disabled
      label="선택 옵션 설명"
      v-model="orderinfo.select_opt.description"
      ></v-text-field>
      <v-text-field
      disabled
      label="선택 옵션가격"
      v-model="orderinfo.select_opt.price"
      > </v-text-field>
      
    </div>
    <div v-else>
      <v-text-field
      disabled
      label="주문 옵션"
      value="선택된 옵션이 없습니다"
      ></v-text-field>
    </div>
    <v-text-field
      v-model="orderinfo.total_price"
      disabled
      label="총 주문 금액"
      type="number"
      prefix="₩"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      label="구매 동의"
      required
    ></v-checkbox>

    <v-btn color="error" :disabled="!formIsValid" @click="submit_bind">주문하기</v-btn>
    <router-link :to="`/goods/goodslist`"><v-btn color="info" >상품 리스트 페이지</v-btn></router-link>
    <router-link :to="`/goods/view/${orderinfo.goods_no}`"><v-btn color="success" >상품 상세 페이지</v-btn></router-link>
    <!-- <v-btn @click="clear">clear</v-btn> -->
    <v-text-field>
      {{orderinfo}} {{memberinfo}}
    </v-text-field>
  </v-form>
  
  
</template>


<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      checkbox : false,
      orderinfo : {},
      memberinfo : {},
      orderinfo_10 : {},
    }
  },
  created() {
    this.orderinfo = this.$store.getters.getOrderInfo
    this.memberinfo = this.$store.getters.getMemberInfo
    // console.log(this.orderinfo.select_opt)
  },
  computed:{
    formIsValid : function() {
      return (
        this.memberinfo.name &&
        this.memberinfo.email &&
        this.memberinfo.address &&
        this.checkbox
      )
    }
  },
  methods:{
    ...mapActions({
      submit : 'SET_ORDER_STORE'
    }),

    submit_bind(){
      console.log('submit')
      // this.orderinfo_10 = orderinfo
      
      let orderinfo_10 = {        
        "order_status" : 10,
        "user_id" : this.memberinfo.id,
        "address" : this.memberinfo.address,
        "total_price" : this.orderinfo.total_price,
      }

      console.log(orderinfo_10)

      if(this.orderinfo.select_opt){
        orderinfo_10 = Object.assign(orderinfo_10, {"order_item" : [{ 
          "option_id" : this.orderinfo.select_opt.id,
          "product_id" : this.orderinfo.goods_no,
          "qty" : this.orderinfo.select_qty,
        }]})
      }else{
        orderinfo_10 = Object.assign(orderinfo_10, {"order_item" : [{ 
          "option_id" : null,
          "product_id" : this.orderinfo.goods_no,
          "qty" : this.orderinfo.select_qty,
        }]})
      }

      this.submit(orderinfo_10)
        .then( res => {
          alert('결제페이지로 이동됩니다')
          this.$router.push('/order/orderpayment')
        //   this.$router.push({
        //       path : '/order/orderpayment', 
        //       params: {'order_id':res.data.id,'order_status':res.data.order_status} 
        //   })
          
        })
      
    //   this.$store.dispatch('SET_ORDER_LOG',orderinfo_10)
    //     .then( (res) => {
    //       console.log('success')
    //       console.log(JSON.stringify(res))
    //     })
    //     .catch( (res) => {
    //       alert("주문실패"+res)
    //     })

    //   this.$axios.post('/api/order/',order_body)
    //     .then( res => {
    //       console.log('return')
    //       console.log(res)
    //   })
    },
    numberFormat(number) {
      let a = new Intl.NumberFormat('ko-KR', {style: 'currency', currency: 'KRW'}).format(number)
      console.log(a)
      return a
    },
  }
}
</script>