<template>
  <v-card
    color="grey lighten-4"
    flat
    height="50px"
    tile
  >
    <v-toolbar 
     color="#90CAF9"
     dense>
      <v-toolbar-title>DILabs Test Page</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="is_login == false">
        <v-dialog v-model="register_modal"  max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" rounded dark v-on="on">회원가입</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">회원가입</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                :rules="nameRules"
                v-model="memberinfo.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                :rules="emailRules"
                v-model="memberinfo.email"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                :rules="passwordRules"
                v-model="memberinfo.password"
                type="password"
                label="password"
                required
              ></v-text-field>

              <v-text-field
                :rules="passwordRules2"
                v-model="memberinfo.password_confirmation"
                type="password"
                label="passwordConfirm"
                required
              ></v-text-field>

              <v-btn
                color="error"
                class="mr-4"
                @click="register_modal = false"
              >
                취소
              </v-btn>

              <v-btn
                color="warning"
                @click="register()"
              >
                회원가입
              </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="login_modal" persistent max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="secondry" rounded dark v-on="on">로그인</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">로그인</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Email" v-model="logininfo.email" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Password*" v-model="logininfo.password" type="password" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="login_modal = false">취소</v-btn>
              <v-btn color="blue darken-1" text @click="login">로그인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div v-else>
        <v-card-text>
          {{ memberinfo.name }}({{ memberinfo.email }}) 님어서오세요        
          <v-btn rounded color="warning" @click="logout">
            로그아웃
          </v-btn>
        </v-card-text>
      </div>
    </v-toolbar>
  </v-card>
</template>
<script>

export default {
  data: () => ({
    register_modal : false,
    login_modal : false,
    is_login : false,
    memberinfo : {
      id : null,
      name : null,
      email : null,
      password : null,
      password_confirmation : null
    },
    logininfo : {
      email : null,
      password : null
    },

    nameRules: [
      v => !!v || 'Name 은 필수값입니다.',
      v => (v && v.length < 100) || 'Name 은 길이가 100보다 작아야합니다'
    ],
    emailRules: [
      v => !!v || 'E-mail 필수 입력값입니다',
      v => /.+@.+\..+/.test(v) || 'Email 형태가 아닙니다'
    ],
    passwordRules: [
      v => !!v || 'Password 는 필수값입니다',
      v => (v && v.length > 8 && v.length < 255) || 'Password길이는 8글자이상 255이하 이어야 합니다',
    ],
    passwordRules2: [
      v => !!v || 'Password 는 필수값입니다',
      v => (v && v.length > 8 && v.length < 255) || 'Password길이는 8글자이상 255이하 이어야 합니다'
    ]
  }),
  created() {
    this.is_login = this.$store.getters.getMemberInfo.is_login

    if(this.is_login)
      this.memberinfo = this.$store.getters.getMemberInfo

    console.log(this.memberinfo)
  },
  methods: {
    login(){
      //action
      //login 체크
      this.$store.dispatch('USER_LOGIN', this.logininfo)
        .then( (res) =>{
          //login 정보가 맞으면 email로 유저정보 갖고옴
          this.$store.dispatch('GET_USER_INFO', this.logininfo.email)
            .then( (res2) => {
              //갖고온 유저정보로 state 변경
              this.$store.commit('SET_MEMBER_INFO', res2.data)
              // console.log('start' + JSON.stringify(res2.data.data))
              this.memberinfo = res2.data.data
              // 로그인 state 변경
              this.$store.commit('SET_LOGIN_STATUS', true)
              this.is_login = true
            })          
          this.login_modal = false
        })
        .catch( (res) => {          
          alert(res + '로그인 실패 하였습니다.')
          this.login_modal = false
        })
    },
    register(){
      if(this.memberinfo.password != this.memberinfo.password_confirmation){
        alert('입력한 패스워드와 패스워드컨펌이 서로 다릅니다')
        return
      }

      //action
      this.$store.dispatch('USER_REGISTER', this.memberinfo)
        .then( (res) => {
          // console.log(res)
          if(res.data.message == 'Success'){
            alert(res.data.data.email + '회원가입이 완료 되었습니다')
            //mutation
            this.$store.commit('SET_MEMBER_INFO', res.data.data)
            this.$store.commit('SET_LOGIN_STATUS', true)
            this.is_login = true
            this.register_modal = false
          }
        }).catch( (res) =>{          
          alert(res + '회원가입이 실패 하였습니다.')
          this.register_modal = false          
        })
    },
    logout(){
      this.$store.dispatch('USER_LOGOUT')
        .then( (res) => {
          this.is_login = false
          this.memberinfo = false
        }) 

    }
  }
}
</script>
