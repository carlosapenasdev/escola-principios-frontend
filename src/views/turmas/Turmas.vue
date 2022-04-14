<template>
  <div>
    <div class="pageTitle">
            <span class="title">Minhas Turmas</span>
            <span class="dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>

        <div class="content">
            <ul class="listTurmas">
                <card-turma
                  class="animate__animated animate__headShake"
                  v-for="turma in turmas"
                  :key="turma.id"
                  :bgName="'laravel'"
                  :turma="turma">
                </card-turma>
            </ul>
        </div>
  </div>
</template>

<script>

import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CardTurma from './components/CardTurma.vue'

export default {
  name: "Turma",
  setup() {
    const store = useStore()

    const turmas = computed(() => store.state.turmas.myTurmas)

    onMounted(() => store.dispatch('getTurmas'))

    return {
      turmas
    }
  },
  components: {
    CardTurma
  }
};
</script>