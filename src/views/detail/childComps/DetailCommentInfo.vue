<template>
    <div class="comment-info">
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">更多></div>
        </div>
        <div class="info-content" v-if="comment && comment.length">
            <div>
                <div class="user">
                    <span>
                        <img :src="comment.user.avatar" alt="avatar">
                    </span>
                    <span class="name">{{comment.user.uname}}</span>
                </div>
                <div class="comment-detail">
                    <div class="desc">{{comment.content}}</div>
                    <div class="other">
                        <span class="date">{{comment.created | formatDate("yyyy-MM-dd")}}</span>
                        <span class="color">{{comment.style}}</span>
                    </div>
                    <div class="comment-img" v-if="comment.images && comment.images.length">
                        <img 
                        v-for="(item, index) in comment.images" 
                        :key="index"
                         :src="item" alt="avatar">
                    </div>
                </div>
            </div>
        </div>
        <div v-else>暂时没有评论 ≥Ö‿Ö≤ </div>
    </div>
</template>

<script>
export default {
    name:'DetailCommentInfo',
    props: {
        commentInfo:{
            type: Object,
            default(){
                return {};
            }
        }
    },
    computed: {
        comment(){
            return Object.keys(this.commentInfo).length && this.commentInfo.list && this.commentInfo.list[0];
        }
    },
    filters:{
       formatDate(date, fmt) {
        if (typeof date == 'string') {
            return date;
        }

        if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

        if (!date || date == null) return null;
        // 将传入的date准换为时间对象，*1000是为了将秒转成毫秒；
          date = new Date(date *1000);
          var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
          }
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
         for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
         }
            return fmt;
       }

    }
}
</script>

<style scoped>
.comment-info {
    padding: 8px 8px 20px;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-header {
    padding: 10px 0;
    display: flex; 
    justify-content: space-between; 
    border-bottom: 2px solid rgba(100, 100, 100, .1);
}
.info-content {
    margin-top: 8px;
}
.info-content .user img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.info-content .user .name {
    position: relative;
    top: -15px;
    left: 8px;
}
.comment-detail .desc {
    padding: 4px;
    text-indent: 2em;
    color: var(--color-text);
}
.comment-detail .other {
    color: var(--color-text);
}
.comment-detail .other span {
    padding: 4px;
}
.comment-detail .comment-img {
    display: flex;
}
.comment-img img {
    width: 25%;
    padding-right: 6px;
}
</style>
