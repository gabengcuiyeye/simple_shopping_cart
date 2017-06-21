<style lang="sass">
    .login{
        width: 500px;
        margin: 0 auto;
    font-size:14px;
    position:absolute;
    transform:translateY(-50%) translateX(-50%);
    top:50%;
    left:50%;
    border:1px solid #eee;
    padding:30px;

        .username,.password{
            border-width: 1px;
            width: 350px;
            height:20px;
            border:none;
            background-color: #fff;
            padding-left: 3px;
        }
        .loginBtn{
            width: 80px;
            height: 22px;
            line-height: 22px;
            background-color: #00a0e9;
            color: #fff;
            text-align: center;
            border:none;
            margin-top: 20px;
        }
        label{
            text-align: right;
            width: 60px;
            display:inline-block;;
        }
        .name,.passwordWrap{
            margin-top: 20px;
        }
    }
</style>

<template>
    <div class="login" v-if="needLogin">
        <div class="name"><label>用户名：</label><input type="text" placeholder="请输入用户名" class="username" v-model="username"></div>
        <div class="passwordWrap"><label>密码：</label><input type="password" placeholder="请输入密码" class="password" v-model="password"></div>
        <button class="loginBtn" @click="login" v-link="{ path: '/chatting'}">登录</button>
    </div>
    <router-view v-if="!needLogin"></router-view>
</template>
<script>
    import Vue from 'vue'
    export default {
        data(){
            return {
                username:'',
                password:'',
                needLogin:true
            }
        },
        methods:{
            login:function(){
                console.log(this.username);
                this.$http.post('/login',{userName:this.username,password:this.password}).then(response => {
                    if(response.data.errcode ===1 ){
//                        window.open('http://localhost:3333/chatting');//页面跳转用vue
                        this.needLogin=false;
                    }else if(response.data.errcode ===2){
                        console.log('登录不上')
                    }
                }, response => {
                    // error callback
                });
            }
        },
        init:function(){
        }
    }
</script>
