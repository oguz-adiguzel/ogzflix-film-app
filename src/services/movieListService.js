import axios from "axios";

export class MovieServices {
    baseUrl = "http://localhost:3001/movies/";

    async getByIdMovies(id) {
        const response = await axios.get(this.baseUrl + id)
        return response.data
    }
    async getMovies() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }
    async deleteMovies(id) {
        await axios.delete(this.baseUrl + id);
    }
    async addMovies(model) {
        await axios.post(this.baseUrl, model);
    }
    async updateMovie(id,model) {
        const response = await axios.put(this.baseUrl + id,model);
        return response.data;
    }
}