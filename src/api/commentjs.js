import {instance} from '../utils/http'


//获取文章评论
function getArticleComment({artid,offset,limit}){
   return instance({
    url:"/comments",
    method:"get",
    params:{
        type:"a",
        source:artid,
        offset:offset,
        limit:limit
    }
   })
}

//发表评论
function publishArticleComment({aid,value}) {
    return instance({
        url:'/comments',
        method:'POST',
        data:{
            target:aid,
            content:value
        }
    })
}

//获取评论回复
function getArticleCommentReplay({commid,offset,limit}){
    return instance({
     url:"/comments",
     method:"get",
     params:{
         type:"c",
         source:commid,
         offset:offset,
         limit:limit
     }
    })
 }

 //发表评论回复
function apiAddCommentReply({artid,comid,value}) {
    return instance({
        url:'/comments',
        method:'POST',
        data:{
            art_id:artid,
            target:comid,
            content:value
        }
    })
}

export {
    getArticleComment,
    publishArticleComment,
    getArticleCommentReplay,
    apiAddCommentReply
}