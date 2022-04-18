<template>
    <div>
        <div class="pageTitle">
            <span class="title">{{turma.referencia}} - {{course.name}} - Aulas</span>
            <span class="dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>

        <div class="content">
            <div class="container">
                
                <ListModules/>

                <div class="right">
                    <div class="content">
                        <player/>
                        <supports-lesson/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

import ListModules from '@/views/modules/components/ListModules.vue'
import Player from './components/Player.vue'
import SupportsLesson from './components/Supports.vue'

import router from "@/router"

export default {
    name: 'Lessons',
    setup() {
        const store = useStore()

        const course = computed(() => store.state.courses.courseSelected)
        const turma = computed(() => store.state.turmas.turmaSelected)

        const showModule = computed(() => store.state.courses.moduleOpen)

        if (course.value.id === '') {
            router.push({name: 'campus.home'})
        }

        return {
            course,
            showModule,
            turma,
        }
    },
    components: {
        Player,
        SupportsLesson,
        ListModules,
    }
}
</script>