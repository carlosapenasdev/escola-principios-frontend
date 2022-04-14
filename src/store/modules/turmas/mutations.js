const mutations = {
    ADD_MY_TURMAS (state, myTurmas) {
        state.myTurmas = myTurmas
    },

    SET_TURMA_SELECTED (state, turma) {
        state.turmaSelected = turma
    },
}

export default mutations