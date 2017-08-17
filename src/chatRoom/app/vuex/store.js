import Vue from 'vue'
import Vuex from 'vuex'
// 引入mapGtters，很重要
import { mapGetters } from 'vuex'

Vue.use(Vuex);

const state = {
    msgType:'text',
    uploadImgSrc:''
};

const mutations = {

    getMsgType:function (type) {//传递参数，叫载荷，获取搜索框的值
        state.msgType = type;
    },
    getUploadImgSrc:function(src){
        state.uploadImgSrc = src;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions: {
        getMsgType(context,type){
            context.commit('getMsgType',type);
        },
        getUploadImgSrc(context,src){
            context.commit('getUploadImgSrc',src)
        }
    }
})

