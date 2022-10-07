import axios from "axios"

export class UserListServices {
    baseUrl = "http://localhost:3001/userList/"

    async getUserList() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }
    async addUser(model) {
        await axios.post(this.baseUrl, model);
    }
}