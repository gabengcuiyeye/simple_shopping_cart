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
                right:90px;
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
                <!--<img :src="userAvatar">-->
                <!--<div class="dialog_text">{{msgText}}</div>-->
            <!--</div>-->

        </div>
        <div class="input_box">
            <input type="text" placeholder="请输入文字..." v-model="msg">
            <selector></selector>
            <button class="send" @click="postImg">传图</button>
            <button class="send" @click="postMsg">发送</button>
        </div>
    </div>
</template>
<script>
    var socket = io.connect();
    import Vue from 'vue'
    import selector from './selection.vue'
    import { mapState } from 'vuex'
    import store from '../vuex/store'

    export default {
        store,
        vuex: {
            getters: {
                msgType: state => state.msgType,
            }
        },
        data(){
            return {
                msg:'',//v-model
                msgText:'',
                userAvatar:'',
                isText:true,
                dialogBox:[],
                imgData:''
            }
        },
        components: {
            selector
        },
        methods:{
            postMsg:function () {//文本消息模板
                let msg = this.msg;
                document.getElementById('dialog_wrap').appendChild(this.renderSelfDialog(msg));
                socket.emit('postMsg', msg);
                this.msg='';
            },
            renderSelfDialog:function(msg){//自己发的文本消息模板
                let div =document.createElement('div');
                div.className = 'dialog';
                let str =
                    '<img src="/src/chatRoom/app/img/avatar_default.png">'+
                    `<div class="dialog_text">${msg}</div>`;
                div.innerHTML= str;
                return div;
            },
            renderOthersDialog:function(msg){//对方发的文本消息模板
                let div =document.createElement('div');
                div.className = 'dialog_others';
                let str =
                    '<img src="/src/chatRoom/app/img/avatar_default.png">'+
                    `<div class="dialog_text">${msg}</div>`;
                div.innerHTML= str;
                return div;
            },
            postImg:function(){//自己发的图片消息模板
                let msg = this.imgData;
                var div = document.createElement('div');
                var str = `<div class="dialog"><img src="/src/chatRoom/app/img/avatar_default.png"><img src="${msg}"></div>`;
                div.innerHTML = str;
                document.getElementById('dialog_wrap').appendChild(div);
            }
        },
        watch:{
            'msgType'(){
                if(store.state.msgType=='text')
                    this.isText=true;
                if(store.state.msgType=='msg')
                    this.isText=false;
            }
        },
        init:function(){
            var that = this;
            //普通文本消息监听
            socket.on('newMsg', function(msg) {
                document.getElementById('dialog_wrap').appendChild(that.renderOthersDialog(msg));
                //加入房间
                 socket.emit('room1');

                //图片消息监听
                socket.on('newImg', function(msg) {
                console.log('前端监听图片上传事件');
                that.imgData = msg;

            });
        }
    }
</script>
