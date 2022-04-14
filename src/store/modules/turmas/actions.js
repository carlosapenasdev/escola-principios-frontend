import TurmaService from '@/services/turma.service'

const actions = {
    getTurmas ({commit}) {
        TurmaService.getTurmas()
                        .then(response => commit('ADD_MY_TURMAS', response.data))
    },
}

export default actions