<style lang="sass">
    .content_wrap{
        width: 800px;
        margin: 0 auto;
    }
    .content_left{
        float:left;
        width: 50%;
        li{
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
    .img_wrap{
        width: 120px;
        height: 120px;
    }
    }
    .content_right{
        float: left;
        width: 50%;
    }
</style>
<template>
    <div class="content_wrap">
        <div class="content_left">
            <ul>
                <li class="" v-for="list in mess" @click="add_to_cart" data-id="{{list.f_id}}">
                    <div class="img_wrap">
                        <img :src="list.f_avatar">
                    </div>
                    <span>test</span>
                </li>
            </ul>
        </div>
        <div class="content_right">

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
                        console.log('333');
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
