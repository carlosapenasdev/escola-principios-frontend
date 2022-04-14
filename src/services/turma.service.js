import BaseService from "./base.service"

export default class TurmaService extends BaseService {
    static async getTurmas () {
        return new Promise((resolve, reject) => {
            this.request({auth: true})
                .get('/meus-cursos')
                .then(response => resolve(response.data))
                .catch(error => reject(error.response))
        })
    }
}