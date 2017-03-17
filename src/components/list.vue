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
    }
</style>
<template>
    <div class="content_wrap">
        <div class="content_left">
            <div class="item" v-for="list in mess" @click="add_to_cart" data-id="{{list.f_id}}">
                <div class="img_wrap">
                    <img :src="list.f_avatar" >
                </div>
                <span>{{list.f_name}}</span>
            </div>
        </div>
        <div class="content_right" id="content_right">

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
                mess:[]
            }
        },
        methods:{
            add_to_cart:function (e) {
                let item_id = parseInt(e.currentTarget.getAttribute('data-id'));//vue获取当前dom对象
                let data = {id:2333,item_id:item_id};
                $.ajax({
                    type: "post",
                    url: "http://localhost:4444/post",
                    dataType: "json",
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (response) {
                        if(response.errcode ===1 ){
                            console.log('加入购物车成功');
                            let div = document.createElement('div');
                            div.setAttribute('class','item');
                            let img_src = document.getElementById('img_src').getAttribute('src');
                            let str = '<div class="img_wrap"> '+'<img src="'+ img_src +'">'
                                    + '</div><span>test1</span>';
                            div.innerHTML = str;
                            document.getElementById('content_right').appendChild(div);

                        }
                    },
                    error: function (request) {
                    }
                });
            }
        },
        init:function(){
            let self = this;
            this.$http.get('http://localhost:4444/listUsers').then(response => {
                // success callback
                console.log(response.data);
                self.mess=response.data;
            }, response => {
                // error callback
            });
        }
    }
</script>
