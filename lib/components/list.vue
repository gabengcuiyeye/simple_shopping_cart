<style lang="sass">
    .content_wrap{
        width: 800px;
        margin: 0 auto;
    }
    .list{
        overflow: hidden;
        margin-bottom: 50px;
    }
    .pic{
        float: left;
        width: 100px;
        img{
            width: 100px;
        }
    }
    .text{
        float: left;
        width: 500px;
        line-height: 100px;
        margin-left: 20px;
    }
</style>
<template>
    <div class="content_wrap">
        <div class="list" v-for="list in mess">
            <div class="pic" >
                <img :src="list.f_avatar">
            </div>
            <div class="text">
                testhhhhhh
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
                voting_list:{header:"https://img.mdcdn.cn/wp/src/gg_live/img/teacher_voting_list_header.jpg?t=20161216"},
                teacher_regular_lists:[],
                teacher_lists:[],
                href_param:"",
                mess:[]
            }
        },
        methods:{
            save_teacher_mes(event){//把老师分组和id传到下一页,现在又不需要分组了，先注释
                let uid = $(event.currentTarget).attr("data-id");
                let name = $(event.currentTarget).attr("data-name");
                this.href_param = 'http://wx54540d14c1b298c1.mgeek.com.cn/act/teacher_voting_detail/index?uid=' + uid +'&name=' + name;
            },
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
