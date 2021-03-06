import Api from '@/services/Api'


// api -> axios -> send data to the same route at backend
export default {
    register(credentials) {
        return Api().post('register', credentials)
    },
    addAddress(credentials) {
        return Api().post('addAddress', credentials)
    },
    addPayment(credentials) {
        return Api().post('addPayment', credentials)
    },
    addStock(credentials) {
        return Api().put('updateQuantity', credentials)
    },
    addProduct(credentials) {
        return Api().post('addProduct', credentials)
    },
    updateProduct(credentials) {
        return Api().put('updateProduct', credentials)
    },
    addOrder(credentials) {
        return Api().post('addOrder', credentials)
    },
    deleteAddress(credentials) {
        return Api().delete('deleteAddress', credentials)
    },
    deletePayment(credentials) {
        return Api().delete('deletePayment', credentials)
    }
}

// AuthenticationService.register({
//     email:
//     password
// })