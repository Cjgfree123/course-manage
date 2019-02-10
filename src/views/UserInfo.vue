<template>
 <div id="user-info">
    <div class="header">
        <img :src="avatarUrl" class="avatar"/>
        <p class="user-name">用户名:&nbsp;{{userName}}</p>
        <p class="user-role">身份:&nbsp;{{isAdmin?'管理员':'学生'}}</p>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import {mapState} from 'vuex';
export default {
    name:'UserInfo',
    data () {
        return {
            avatarUrl:require('@/common/image/avatar.png'),
        };
    },
    components: {},

    computed: {
        ...mapState(['userName','isAdmin','userId'])
    },

    mounted() {},

    methods: {},
}

</script>
<style lang="less" scoped>
#user-info{
    .header{
        height:200px;
        padding-top:35px;
        background:#D8EEDE;
        .avatar{
            width:70px;
            margin:0 auto;
        }
        .user-name,.user-role{
            margin-top:12px;
            text-align:center;
            font-size:16px;
            color:#333;
        }
    }
}
</style>