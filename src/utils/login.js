 import store from '../store/index'

 export default{
    install: function(Vue){
        Vue.prototype.$login = function(){
            let user = store.state.userInfo
            if(!user || ! user.token){
                this.$router.push('/otherlogin')
                return false
            }
            return true
        }
    }
 }