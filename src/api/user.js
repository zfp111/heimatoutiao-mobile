import { instance } from '../utils/http'


//用户登录
function loginCheck({ mobile, code }) {
    return instance({
        url: '/authorizations',
        method: 'post',
        data: {
            mobile: mobile,
            code: code
        }
    })

}

//关注用户
function followsUser(autid) {
    return instance({
        url: '/user/followings',
        method: "POST",
        data: {
            target: autid
        }
    })
}
//取消关注用户
function apifollowsUser(autid) {
    return instance({
        url: `/user/followings/${autid}`,
        method: "delete"

    })
}

// 得到用户的个人资料
function apiGetUserInfo() {
    return instance({
        url: "/user"
    });
}

// 得到用户个人信息
function apiGetUserProfile() {
    return instance({
        url: "/user/profile"
    });
}

//上传用户头像
function apiUploadUserIcon(photo){
    var fd = new FormData()
    fd.append('photo',photo)
    return instance ({
        url:"/user/photo",
        method:"PATCH",
        data:fd  
    })
}
//修改用户信息
function apiProflie({ name, gender, birthday }) {
    return instance({
      url: "/user/profile",
      method: "PATCH",
      data: {
        name,
        gender,
        birthday,
       
      }
    });
  }

export { loginCheck, followsUser, apifollowsUser, apiGetUserInfo, apiGetUserProfile,apiUploadUserIcon,apiProflie } 
