import axios from 'axios'

const apiServerHost = 'http://localhost:8000'
const api ={
  goodsList: apiServerHost + '/goods',
  goodsInfo: apiServerHost + '/goods/',
  userLogin : apiServerHost + '/api/user/login',
  userRegister : apiServerHost + '/api/user/register',
  orderStore : apiServerHost + '/api/order/',
  orderUpdate : apiServerHost + '/api/order/',
  orderInfo : apiServerHost + '/api/order/order_no/',
  userInfo : apiServerHost + '/api/user/email/',
  testInfo : apiServerHost + '/api/test'
}

export default {
  GET_GOODS_LIST({ commit }) {
    // console.log(goods_no)
    const res = axios.post(api.testInfo)
    commit('SET_GOODS_LIST' , res.data)
    return res;
  },  
  GET_GOODS_INFO({ commit }, goodsno) {
    console.log(goods_no)
    return axios.post(api.goodsinfo, goodsno)
      .then( res => {
        console.log(res.data)
        commit('' , res.data)
      })
      .catch( res => console.log(res))
  },
  USER_LOGIN({ commit }, logininfo) {
    return axios.post(api.userLogin, logininfo)
  },
  GET_USER_INFO({ commit }, username) {
    console.log(username)
    const get_user_url = api.userInfo + username
    return axios.get(get_user_url)
  },
  USER_REGISTER({ commit }, userinfo) {
    //promise
    return axios.post(api.userRegister, userinfo)
  },
  USER_LOGOUT({ commit }) {
    commit('USER_LOGOUT')
  },
  /*** 
  * 0 : 주문취소 
  * 10 : 주문 등록
  * 20 : 결제 완료
  * 30 : 배송
  * 100 : 주문완료
  ***/
  SET_ORDER_START( { commit }, orderinfo){
    commit('SET_ORDER_START', orderinfo)
  },
  SET_ORDER_STORE( { commit }, orderinfo){
    console.log(orderinfo)
    return axios.post(api.orderStore, orderinfo)
      .then(res => {
        if(res.data.status_code == 200)
        {
          // console.log('SET_RODE_SC',res.data.data)
          commit('SET_ORDER_START',res.data.data)
        }        
      })
      .catch(res => {
        console.log('err' + res)
      })
  },
  GET_ORDER_INFO( { commit }, orderno){
    const get_order_info_url = api.orderInfo + orderno
    return axios.get(get_order_info_url)
  },
  SET_ORDER_UPDATE( { commit }, orderinfo){
    console.log(orderinfo)
    return axios.put(api.orderUpdate, orderinfo)
      .then(res => {
        console.log(res)
      })
      .catch(RES => {
        console.log(res)
      })
  }

}
