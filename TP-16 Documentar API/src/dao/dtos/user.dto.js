export default class userDTO {
    constructor(user){
        this.first_name = user.user.first_name
        this.last_name = user.user.last_name
        this.email = user.user.email
        this.role = user.user.role
    }
}