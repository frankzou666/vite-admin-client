
//reducer模块

const initState ={}
function UserReducer (preState =initState,action) {
    switch (action.type) {
        case 'set':
            return preState=action.data;
            break;
        default:
            return preState;
            break;      
    }

}

export default UserReducer