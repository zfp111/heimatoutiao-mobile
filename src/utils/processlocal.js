
//添加localstorage
function addLocalStarage (key,val){
    window.localStorage.setItem(key,JSON.stringify(val))
}

//获取localstorage
function getLocalStarage (key){
    return JSON.parse(window.localStorage.getItem(key))
}
//清除localstorage
function clearLocalStarage (key){
    window.localStorage.removeItem(key)
}

//按需导出
export {
    addLocalStarage,
    getLocalStarage,
    clearLocalStarage
}