
//reducer模块

const initState = 187
function TestReducer (preState =initState,action) {
    switch (action.type) {
        case 'increment':
            return preState+action.data;
            break;
        case 'decrement':
            return preState-action.data;
            break;  
        default:
            return preState;
            break;      
    }

}

export default TestReducer