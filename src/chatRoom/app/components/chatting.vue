<style lang="sass">
    .content{
        width: 600px;
        margin: 0 auto;
    }
    .header{
        width: 100%;
        background-color: #00a0e9;
        color: #fff;
        text-align: center;
    }
    .dialog_wrap{
        width: 100%;
        .dialog{
        overflow:hidden;
        width:100%;
            img{
                width: 70px;
                height:70px;
                float: left;
            }
            .dialog_text{
                float: left;
                max-width: 300px;
                font-size: 13px;
                margin-left: 10px;
                background-color: #e2e0e0;
                padding: 5px 10px;
                border-radius: 5px;
                margin-top: 2px;
                word-wrap: break-word;
                word-break: normal;
            }
            .dialog_text:before{
                position: absolute;
                content: "";
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 5px 5px;
                border-color: transparent #e2e0e0 transparent transparent;
                border-style: solid;
                margin-left: -20px;
            }
        }
        .dialog:after{
            overflow: hidden;
        }
        .dialog_others{
            overflow:hidden;
            width:100%;
            img{
                width: 70px;
                height:70px;
                float: right;
            }
            .dialog_text{
                float: right;
                max-width: 300px;
                font-size: 13px;
                margin-left: 10px;
                background-color: lightskyblue;
                padding: 5px 10px;
                border-radius: 5px;
                margin-top: 2px;
                word-wrap: break-word;
                word-break: normal;
            }
            .dialog_text:before{
                position: absolute;
                content: "";
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 5px 5px;
                border-color: transparent  transparent transparent lightskyblue;
                border-style: solid;
                margin-left: 192px;
            }
        }
    }
    .input_box{
        width: 100%;
        position:fixed;
        bottom:0;
    input{
        width: 450px;
        outline: none;
        height:20px;
        border-width: 1px;
    }
    .send{
        width: 100px;
        background-color: #00a0e8;
        color: #fff;
        text-align: center;
        border: none;
        height: 22px;
        line-height: 22px;
    }
    }
</style>

<template>
    <div class="content">
        <div class="header">
            张晓明
        </div>
        <div class="dialog_wrap" id="dialog_wrap">
            <!--<div class="dialog">-->
                <!--<img src="/chatRoom/app/avatar_default.png">-->
                <!--<div class="dialog_text">测测测测是</div>-->
            <!--</div>-->
        </div>
        <div class="input_box">
            <input type="text" placeholder="请输入文字..." v-model="msg">
            <button class="send" @click="postMsg">发送</button>
        </div>
    </div>
</template>
<script>
    var socket = io.connect();
    class Chatting{
        constructor(){
            socket.on('newMsg', function(msg) {
                this.my_msg =msg;
                this.render = function(my_msg){
                    let div =document.createElement('div');
                    div.className = 'dialog_others';
                    let str =
                        '<img src="/chatRoom/app/avatar_default.png">'+
                        `<div class="dialog_text">${this.my_msg}</div>`;
                    div.innerHTML= str;
                    return div;
                };
                document.getElementById('dialog_wrap').appendChild(this.render());
            });
        }
        init(){
            socket.emit('room1');
        }

    }
    var chatting = new Chatting();
    chatting.init();

    import Vue from 'vue'
    export default {
        data(){
            return {
                msg:''
            }
        },
        methods:{
            postMsg:function () {
                let msg = this.msg;
                document.getElementById('dialog_wrap').appendChild(this.render());
                socket.emit('postMsg', msg);
                this.msg='';
            },
            render:function(){
                let div =document.createElement('div');
                div.className = 'dialog';
                let str =
                    '<img src="/chatRoom/app/avatar_default.png">'+
                    `<div class="dialog_text">${this.msg}</div>`;
                div.innerHTML= str;
                return div;
            }
        },
        init:function(){
        }
    }
</script>
