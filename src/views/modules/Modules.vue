<template>
    <div>
        <div class="pageTitle">
            <span class="title">{{ course.name }}</span>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

import ListModules from './components/ListModules.vue'
import router from "@/router"

export default {
    name: 'Modules',
    setup() {
        const store = useStore()

        const course = computed(() => store.state.courses.courseSelected)

        if (course.value.id === '') {
            router.push({name: 'campus.home'})
        }

        return {
            course
        }
    },
    components: {
        ListModules
    }
}
</script>