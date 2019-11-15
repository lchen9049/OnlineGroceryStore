import Api from '@/services/Api'


// api -> axios -> send data to the same route at backend
export default {
    register (credentials) {
        return Api().post('register', credentials)
    }
}

// AuthenticationService.register({
//     email:
//     password
// })