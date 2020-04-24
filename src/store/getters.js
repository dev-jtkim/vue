export default {
  getGoodsList(state){
    // console.log(state)
    // let goodsLists = []
    // for(let i in state){
    //   goodsLists.push({
    //     no : state.goodsList.no[i],
    //     name : state.goodsList.name[i],
    //     title : state.goodsList.title[i],
    //     descriptions : state.goodsList.descriptions[i],
    //   })
    // }
    // console.log('1')
    // console.log(goodsLists)
    // console.log('2')
    // // return [
    // //   {
    // //     no : state.goodsList.no,
    // //     name : state.goodsList.name,
    // //     title : state.goodsList.title,
    // //     descriptions : state.goodsList.descriptions
    // //   }
    // // ]
    console.log(state.goodsList)
    return state.goodsList
  },
  getGoodsInfo(state){
    return state.goodsinfo
  },
  getOrderInfo(state){
    return state.orderinfo
  },
  getMemberInfo(state){
    return state.memberinfo
  },
}