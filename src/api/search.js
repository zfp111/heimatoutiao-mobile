import { instance } from '../utils/http'

//搜索文章
function apiSearchKey(keyword){
    return instance({
        url:"/suggestion",
        method:'get',
        params:{
            q:keyword
        }
    })
}

//搜索结果
function apiSearchResults ({key,page, perpage}){
    return instance({
        url:'/search',
        params:{
            q:key,
            page:page,
            per_page: perpage
        }
    })
}

export {
    apiSearchKey,
    apiSearchResults
}