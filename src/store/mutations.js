export default {
  SET_GOODS_LIST(state, goods_list){
    // for (let i in goods_list) {
    //   state.goodsList.no.push(goods_list[i].no)
    //   state.goodsList.name.push(goods_list[i].name)
    //   state.goodsList.title.push(goods_list[i].title)
    //   state.goodsList.descriptions.push(goods_list[i].descriptions)
    // }
    state.goodsList = goods_list
      // goods_list.forEach((list) => {
      //   console.log(list)
      //   state.goodsList.name.push(list.name)
      //   state.goodsList.title.push(list.title)
      //   state.goodsList.descriptions.push(list.descriptions)
      // })
    // state.gList.name = goods_list[0].nameo
    // state.goodsList.title = goods_list[0].title
    // state.goodsList.descriptions = goods_list[0].descriptions
  },
  SET_GOODS_INFO(state, goods_info){
    console.log(goods_info)
    state.goodsinfo = goods_info
  },
  SET_ORDER_INFO(state, order_info){
    console.log(order_info)
    state.orderinfo = order_info
  },
  SET_MEMBER_INFO(state, member_info){
    // console.log('SET_memberinfo'+member_info.data)    
    state.memberinfo = member_info.data
  },
  SET_LOGIN_STATUS(state, login_flag){
    state.memberinfo.is_login = login_flag
  },
  USER_LOGOUT(state){
    state.memberinfo = false
    // state.memberinfo.is_login = false
  },
  SET_ORDER_START(state, orderinfo){
    state.orderinfo = orderinfo
  },
  SET_ORDER_STEP(state, orderinfo){
    state.orderinfo = orderinfo
  },
  SET_ORDER_STEP_10(state, orderinfo){
    // state.orderinfo = null
    state.orderinfo.order_id = orderinfo.id
    state.orderinfo.order_status = orderinfo.order_status
  },
  SET_ORDER_RESET: () => {},
  SET_ORDER_ID(state, orderinfo){
    state.orderinfo = orderinfo
  },
}