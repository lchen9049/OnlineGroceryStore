
export class userInfo {
    admin = false;
    userName = null;
    passWord = null;
    authenticated = false;
    firstName = null;
    lastName = null;
    address = null;
    city = null;
    state = null;
    email = null;
    payment = null;
    orders = [];
}

export default class NewApplication {
    userInfo = new userInfo();
    productType = null;
    products = [];
    cart = [];

}