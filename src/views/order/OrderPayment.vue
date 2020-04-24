<template>
  <v-card
    v-if="orderinfo_20.user">
    주문자 정보
    <v-text-field
      v-model="orderinfo_20.user.name"
      label="이름"
      disabled
      required
    ></v-text-field>
    <v-text-field
      v-model="orderinfo_20.user.email"
      label="이메일"
      disabled
      required
    ></v-text-field>
    <v-text-field
      v-model="orderinfo_20.address"
      label="주소"
      disabled
      required
    ></v-text-field>

    주문 상품 정보
    <div
      v-for="orderitem in orderinfo_20.order_item"      
      v-bind:key="orderitem.id">
      <v-text-field
      v-model="orderitem.product.name"
      label="상품명"
      disabled
      required
      ></v-text-field>
      
      <v-text-field
      v-model="orderitem.product.price"
      label="상품 가격"
      prefix="₩"
      disabled
      required 
      ></v-text-field>
      <v-text-field
      v-model="orderitem.qty"
      disabled
      label="주문 수량"
      required
      ></v-text-field>
      <div 
        v-if="orderitem.option">
      <v-text-field
      disabled
      label="선택 옵션명"
      v-model="orderitem.option.name"
      ></v-text-field>
      <v-text-field
      disabled
      label="선택 옵션 설명"
      v-model="orderitem.option.description"
      ></v-text-field>
      <v-text-field
      disabled
      label="선택 옵션가격"
      v-model="orderitem.option.price"
      > </v-text-field>    
      </div>    
      <div v-else>
      <v-text-field
      disabled
      label="주문 옵션"
      value="선택된 옵션이 없습니다"
      ></v-text-field>
      </div>
    </div>
    <v-text-field
      v-model="orderinfo_20.total_price"
      disabled
      label="총 주문 금액"
      type="number"
      prefix="₩"
      required
    ></v-text-field>

    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">결제하기</v-btn>
      </template>
        <v-card>
          <v-card-title>결제 종류</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-radio-group  v-model="dialogm1">
              <v-radio label="카드결제" value="카드결제"></v-radio>
              <v-radio label="무통장입금" value="무통장입금"></v-radio>
              <v-radio label="계좌이체" value="계좌이체"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">취소</v-btn>
            <v-btn color="blue darken-1" text @click="submit(dialogm1)">결제</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-card>
  
  
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      dialogm1: '',
      dialog: false,
      orderinfo_10 : {},
      orderinfo_20 : {},
    }
  },
  beforeCreate(){
    this.orderinfo_10 = this.$store.getters.getOrderInfo
    console.log(this.orderinfo_10)
  },
  computed:{
  },
  created(){
    this.$store.dispatch('GET_ORDER_INFO', this.$store.getters.getOrderInfo.order_no)
      .then(res => {
        if(res.data.message == 'Success'){
          // this.orderinfo_20 = Object.assign({}, res.data.data)
          this.$set(this, 'orderinfo_20', res.data.data)
          //   this.orderinfo_20_array = res.data.data.order_item.map(item => {
          //     return item.product.name
          //   }).join(', ')
          console.log('222')
        }
      })
      .catch(res =>{
        console.log('fail2' + res)
      })

  },
  methods:{
    submit(paymethod){
      if(!paymethod){
        alert("결제방법을 선택해주세요")
        return
      }
      this.dialog = false
      alert(paymethod + ' 완료 되었습니다')
      this.orderinfo_20 = Object.assign(this.orderinfo_20, {
        order_status : 20
      })
      // console.log(this.orderinfo_20)
      // console.log(JSON.stringify(this.orderinfo_20))

      this.$axios.put("/api/order/"+this.orderinfo_20.id, this.orderinfo_20)
        .then(res=>{
          console.log(res)
          if(res.data.message == "Success" && res.status == 200){

            this.$store.commit("SET_ORDER_STEP",this.orderinfo_20)
            this.$router.push("/order/payend")
          }

        })
        .catch(res=>{
          console.log("err"+res)
        })
    }
  }
}
</script>