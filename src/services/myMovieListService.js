import axios from "axios"

export class MyMovieListService {
    baseUrl = "http://localhost:3001/myMovieList/"

    async getMyMovieList() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async addMyList(model) {
        await axios.post(this.baseUrl, model);
    }

    async deleteMovies(id) {
        await axios.delete(this.baseUrl + id);
    }
    async updateMovie(id, model) {
        const response = await axios.put(this.baseUrl + id, model);
        return response.data;
    }
}