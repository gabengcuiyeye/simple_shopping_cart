<style lang="sass">
    .content_wrap{
        width: 800px;
        margin: 0 auto;
    }
    .content_left{
        float:left;
        width: 50%;
        .img_wrap{
            width: 120px;
            height: 120px;
        }
    }
    .item{
        width: 120px;
        float:left;
        text-align:center;
        margin-right:20px;
        font-size:12px;
        list-style:none;
        margin-bottom:20px;
        img{
            width: 120px;
        }
    }
    .content_right{
        float: left;
        width: 50%;
        background-color: #e3e3e3;
        min-height: 800px;
        .delete_layer{
            height: 136px;
            background-color: rgba(54, 54, 54, 0.9);
            position: absolute;
            top:0;
            left:0;
            width:100%;
            display:none;
            p{
                text-align: center;
                font-size: 14px;
                position: relative;
                top:50%;
                margin-top: -10px;
                height: 20px;
                line-height: 20px;
                color: #fff;
            }
        }
        .item{
            position: relative;
        }
        .item:hover{
            .delete_layer{
                display: block;
            }
        }
    }
</style>
<template>
    <div class="content_wrap">
        <div class="content_left">
            <h3>商品列表</h3>
            <div class="item" v-for="list in mess" @click="add_to_cart" data-id="{{list.f_id}}">
                <div class="img_wrap">
                    <img :src='list.f_avatar' >
                </div>
                <span>{{list.f_name}}</span>
            </div>
        </div>
        <div class="content_right" id="content_right" @click="delete_item">
            <h3>购物车</h3>
            <div class="item" v-for="list in cart_mess" data-id="{{list.f_id}}">
                <div class="img_wrap">
                    <img :src='list.f_avatar'>
                </div>
                <span>{{list.f_name}}</span>
                <div class="delete_layer">
                    <p class="delete">删除</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        props: {
            voting_desc: {
                type: Number,
                default: function() {
                    return{
                        voting_desc: 0,
                    }
                }
            },
            teacher_group_id: {
                type: Number,
                default: function() {
                    return{
                    }
                }
            },
        },
        data(){
            return {
                totaltime:9,
                mess:[],
                cart_mess:[]
            }
        },
        methods:{
            add_to_cart:function (e) {
                let item_id = parseInt(e.currentTarget.getAttribute('data-id'));//vue获取当前dom对象
                let data = {id:2333,item_id:item_id};
                $.ajax({
                    type: "post",
                    url: "/add_to_cart",
                    dataType: "json",
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (response) {
                        if(response.errcode ===1 ){
                            console.log('加入购物车成功');
                            let div = document.createElement('div');
                            div.setAttribute('class','item');
                            div.setAttribute('data-id',item_id);
                            let img_src;
                            if(e.target.nodeName==='IMG'){
                                img_src = e.target.getAttribute('src');
                            }else if(e.target.nodeName==='SPAN'){
                                img_src = e.target.previousSbiling.getAttribute('src');
                            }
                            let str = '<div class="img_wrap"> '+'<img src="'+ img_src +'">'
                                    + '</div><span>test1</span>'+'<div class="delete_layer">'
                                +'<p class="delete">删除</p>'+ '</div>';
                            div.innerHTML = str;
                            document.getElementById('content_right').appendChild(div);
                        }else if(response.errcode ===2){
                            alert('已经添加过了哦');
                        }
                    },
                    error: function (request) {
                    }
                });
            },
            delete_item:function(e){
                if(e.target.className=='delete'){
                    let parent_dom = e.target.parentNode.parentNode,
                        item_id = parseInt(parent_dom.getAttribute('data-id'));
                    this.$http.post('/delete_item',{user_id:2333,item_id:item_id}).then(response => {
                        if(response.data.errcode===0){
                            parent_dom.parentNode.removeChild(parent_dom);
                        }
                    }, response => {

                    });
                }else{
                    console.log(e.target);
                }
            },
        },
        init:function(){
            let self = this;
            //初始化商品列表
            this.$http.get('/item_list').then(response => {
                // success callback
                self.mess=response.data;
            }, response => {
                // error callback
            });
            //初始化购物车
            this.$http.post('/search_cart',{user_id:2333}).then(response => {
                if(response.data.errcode===0){
                    let data = response.data;
                    self.cart_mess = data.data;
                }
            }, response => {
                // error callback
            });
        }
    }
</script>
