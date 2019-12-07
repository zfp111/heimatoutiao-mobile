import {instance} from '../utils/http'

//获取所有文章
function apiGetArticleList({channelId,timestamp}){
    return instance({
        url:"http://ttapi.research.itcast.cn/app/v1_1/articles",
        method: 'GET',
        params:{
            channel_id:channelId,
            timestamp:timestamp,
            with_top:0
        }
    })
}

//不感兴趣文章
function apiDislikeArticle (artid){
    return instance({
        url:'/article/dislikes',
        method:"POST",
        data:{
            target:artid
        }
    })
}

//举报文章
function apiReportsArticle({arcid,type}) {
    return instance({
        url:'/article/reports',
        method:'POST',
        data:{
            target:arcid,
            type:type,
            remark:''
        }
    })
}

//拉黑作者
function apiBlacklists(autid){
    return instance({
        url:'/user/blacklists',
        method:'POST',
        data:{
            target:autid
        }
    })
}

//获取文章详情
function apiGetArticleDetails(artid){
    return instance({
        url:`/articles/${artid}`
    })
}
//点赞文章
function apLikeArticle(artid){
 
    return instance({
        url:'/article/likings',
        method:'post',
        data:{
            target:artid
        }
    })
}

//不喜欢文章
function apDisLikeArticle(artid){
    return instance({
        url:'/article/dislikes',
        method:'post',
        data:{
            target:artid
        }
    })
}
export {
    apiGetArticleList,
    apiDislikeArticle,
    apiReportsArticle,
    apiBlacklists,
    apiGetArticleDetails,
    apLikeArticle,
    apDisLikeArticle
}