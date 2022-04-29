<template>
    <div>
        <header-component/>

        <section>
            <router-view></router-view>
        </section>

        <footer-component/>
    </div>
</template>

<script>
import { onBeforeMount } from 'vue'

import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { LOGIN_TITLE } from '@/configs'

export default {
    name: 'DefaultTemplate',

    setup() {
        onBeforeMount(() => {
            document.body.classList.add('page')
            document.body.classList.add('dark')

            document.title = LOGIN_TITLE
        })
    },

    components: {
        HeaderComponent,
        FooterComponent
    }
}
</script>