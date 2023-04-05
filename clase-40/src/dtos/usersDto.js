export default class UsersDTO {
    constructor(user) {
        this.id = user.id
        this.name = `${user.first_name} ${user.last_name}`
        this.age = user.age
    }
}