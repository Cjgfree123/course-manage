import {SetUserInfo} from './mutation-types'

let mutations={ 
    SetUserInfo(state,payload){ 
        console.log(payload)
        return {
            ...state,
            userName:payload.userName,
            isAdmin:payload.isAdmin,
            userId:payload.userId,
        }
    },
};

module.export = mutations;


