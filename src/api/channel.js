import { instance } from '../utils/http'


//获取用户频道信息
function apiGetChannel() {
    return instance({
        url: '/user/channels'
    })
}

//获取所有频道
function apiGetAllChannels() {
    return instance({
        url: '/channels'
    })
}

//重置用户频道
function apiResetChannels(channels) {
    return instance({
        url: 'user/channels',
        method: 'PUT',
        data: {
            channels: channels
        }

    })
}

export {
    apiGetChannel,
    apiGetAllChannels,
    apiResetChannels
}