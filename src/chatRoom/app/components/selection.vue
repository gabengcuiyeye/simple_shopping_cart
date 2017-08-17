<style lang="sass">
    .msgTypeList{
        li{
            list-style: none;
            font-size: 10px;
        }
    }
</style>

<template>
    <!--<img src="/src/chatRoom/app/img/avatar_default.png">-->
    <ul class="msgTypeList">
        <li>
            图片
            <input id="sendImage" type="file" name="myPhoto" @change="changeEvent"/>
        </li>
    </ul>
    <form name="uploadForm" class="imgUpload">
        <table>
            <tbody>
            <tr>
                <td><img id="uploadPreview" style="width: 100px; height: 100px;" src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E" alt="Image preview" /></td>
            </tr>
            </tbody>
        </table>
        <p><input type="submit" value="Send" /></p>
    </form>
    <div class="msgTypeContent"></div>
</template>
<script>
    import Vue from 'vue'
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
                msg:''
            }
        },
        methods:{
            changeEvent:function(e){
                //检查是否有文件被选中
                console.log(e.target.files);
                if (e.target.files.length != 0) {
                    //获取文件并用FileReader进行读取
                    var file = e.target.files[0],
                        reader = new FileReader();
                    if (!reader) {
                        e.target.value = '';
                        return;
                    };
                    reader.onload = function(e) {
                        //读取成功，显示到页面并发送到服务器
                        console.log('读取图片数据成功');
                        e.target.value = '';
                        console.log(e.target.result);
                        socket.emit('img', e.target.result);
                        store.dispatch('getUploadImgSrc',e.target.result);
                    };
                    reader.readAsDataURL(file);
                };
            }
        }

    }
</script>
