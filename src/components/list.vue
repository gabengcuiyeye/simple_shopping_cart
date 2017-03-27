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
                    url: "/add_to_cart",

                    dataType: "json",
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (response) {
                        if(response.errcode ===1 ){
                            console.log('加入购物车成功');
                            let div = document.createElement('div');
                            div.setAttribute('class','item');
                            let img_src;
                            if(e.target.nodeName==='IMG'){
                                img_src = e.target.getAttribute('src');
                            }else if(e.target.nodeName==='SPAN'){
                                img_src = e.target.previousSbiling.getAttribute('src');
                            }
                            let str = '<div class="img_wrap"> '+'<img src="'+ img_src +'">'
                                    + '</div><span>test1</span>';
                            div.innerHTML = str;
                            document.getElementById('content_right').appendChild(div);
                        }else if(response.errcode ===2){
                            alert('已经添加过了哦');
                        }
                    },
                    error: function (request) {
                    }
                });
            }
        },
        init:function(){
            let self = this;
            this.$http.get('/item_list').then(response => {
                // success callback
                self.mess=response.data;
            }, response => {
                // error callback
            });
            this.$http.post('/search_cart',{user_id:2333}).then(response => {
                if(response.data.errcode===0){
                    let data = response.data;
                    for(let i=0,len=data.data.length;i<len;i++){
                        let content_right = document.getElementById('content_right'),
                            div = document.createElement('div');
                        div.setAttribute('class','item');
                        let str = '<div class="img_wrap"> '+'<img src="'+ data.data[i].f_avatar +'">'

                            + '</div><span>'+data.data[i].f_name+'</span>';
                        div.innerHTML = str;
                        content_right.appendChild(div);
                    }
                }
            }, response => {
                // error callback
            });
        }
    }
</script>
