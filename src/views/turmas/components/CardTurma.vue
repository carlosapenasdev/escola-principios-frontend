<template>
  <li>
    <span :class="['card', 'bg-' + bgName]">
      <span class="icon">
        <img :src="[(turma.image != '' && turma.image != undefined) ? turma.image : require('@/assets/images/icons/default.png')]" :alt="title" />
      </span>
      <span class="title">{{turma.referencia}} - {{turma.course.name}}</span>
      <span class="action">
        <a href="#" v-if="turma.id!=''" @click.prevent="setTurma" :class="['btn', bgName]">Acessar</a>
      </span>
    </span>
    <span class="dots">
      <span></span>
      <span></span>
      <span></span>
    </span>
  </li>
</template>

<script>
import { useStore } from 'vuex'

import router from '@/router'

export default {
  name: "CardTurma",
  props: ['turma', 'bgName'],
  setup(props) {
    const store = useStore()
    
    const setTurma = () => {
       store.commit('SET_COURSE_SELECTED', props.turma.course)
       store.commit('SET_TURMA_SELECTED', props.turma)

       router.push({name: 'campus.modules'})
    }

    return {
      setTurma
    }

  }
};
</script>