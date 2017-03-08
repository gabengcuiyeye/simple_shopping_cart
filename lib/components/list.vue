<style lang="sass">

</style>
<template>
    <!--<div class="content_wrap" v-if="voting_desc">-->
        <!--<div class="header">-->
            <!--<img :src="voting_list.header">-->
        <!--</div>-->
        <!--<div class="teacher_list">-->
            <!--<a  v-for="teacher_regular_list in teacher_regular_lists" :href="href_param" @click="save_teacher_mes" data-id="{{teacher_regular_list.f_uid}}" data-name="{{teacher_regular_list.f_nick}}">-->
                <!--<div class="teacher_list_content">-->
                    <!--<img class="teacher_list_avatar" :src="teacher_regular_list.f_avatar">-->
                    <!--<p class="teacher_name">{{teacher_regular_list.f_nick}}</p>-->
                <!--</div>-->
            <!--</a>-->
            <!--<a  v-for="teacher_list in teacher_lists" :href="href_param" @click="save_teacher_mes" data-id="{{teacher_list.f_uid}}" data-name="{{teacher_list.f_nick}}">-->
                <!--<div class="teacher_list_content">-->
                    <!--<img class="teacher_list_avatar" :src="teacher_list.f_avatar">-->
                    <!--<p class="teacher_name">{{teacher_list.f_nick}}</p>-->
                <!--</div>-->
            <!--</a>-->
        <!--</div>-->
    <!--</div>-->
    <div>test</div>
</template>
<script>
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
                voting_list:{header:"//img.mdcdn.cn/wp/src/gg_live/img/teacher_voting_list_header.jpg?t=20161216"},
                teacher_regular_lists:[],
                teacher_lists:[],
                href_param:"",
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
//            $.ajax({
//                type: "get",
//                url: "//wx54540d14c1b298c1.mgeek.com.cn/act/teacher_voting_index/get_teacher_message?live_id="+ 17,
//                dataType: "json",
//                error: function (request) {
//                    alert("系统繁忙");
//                },
//                success: function (response) {
//
//                }
//            });
        }
    }
</script>
