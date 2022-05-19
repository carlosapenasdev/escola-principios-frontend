<template>
  <div>
    <div class="pageTitle">
            <span class="title">Presença Registrada!</span>
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

import CardTurma from '../turmas/components/CardTurma.vue'

export default {
  name: "Turma",
  setup() {

    const turmas = [
        {
            id:'',
            image:'',
            referencia:'',
            course:{
                id: "",
                name: "A presença foi registrada para lição do qrcode escaneado",
                referencia: "",
            }
        }
    ]

    return {
      turmas
    }
  },
  components: {
    CardTurma
  }
};
</script>