

const USER_KEY ='user_key'

export default  storeUtils={
    saveUser(user){
        //key和
        window.localStorage.setItem(USER_KEY,JSON.stringify(user))
    },
    getUser() {
        return JSON.parse(window.localStorage.getItem(USER_KEY)||'{}')
    },
    removeUser(){
        window.localStorage.removeItem(USER_KEY)
    }
}