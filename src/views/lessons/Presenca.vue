<template>
    <section id="loginPage"
        :style="{
            backgroundImage: 'url(' + require('@/assets/images/bgLogin.jpg') + ')'
        }">
        <div class="loginContent">
            <div class="loginCard">
                <div class="decor" style="background-image: url('./assets/images/building.jpg');">
                    <div class="content">
                        <span class="logo">
                            <img :src="require('@/assets/images/logo.png')" alt="Renovo">
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            <p>
                                Mensagem sobre a escola de princípios
                            </p>
                        </span>
                        <span class="copyright fontSmall">
                            Desenvolvido por - <a href="https://www.linkedin.com/in/carlosapenasdev/" target="__blank"><b>Carlos Santos</b></a>
                        </span>
                    </div>
                </div>
                <div class="login">
                    <div class="content">
                        <span class="logo"
                            ><img :src="['./assets/images/logoDark.png']" alt="" />
                        </span>
                        <span>
                            <p class="welcome-p">Seja muito bem vindo(a)!</p>
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description presenca">
                            Informe seus dados para registrarmos sua presença!
                        </span>
                        <form action="/dist/index.html" method="">
                            <div class="groupForm">
                                <i class="far fa-envelope"></i>
                                <input type="email" name="email" placeholder="E-mail" v-model="email" required>
                            </div>
                            <div class="groupForm">
                                <i class="far fa-key"></i>
                                <input :type="typePassword" name="password" placeholder="Senha" v-model="password" required>
                                <i class="far fa-eye buttom" @click="toggleShowPassword"></i>
                            </div>
                            <button
                                :class="[
                                    'btn',
                                    'primary',
                                    loading ? 'loading' : ''
                                ]"
                                type="submit"
                                @click.prevent="auth">
                                <span v-if="loading">Entrando...</span>
                                <span v-else>Registar Presença</span>
                            </button>
                        </form>
                    </div>
                    <span class="copyright fontSmall">
                        Desenvolvido por - <a href="https://www.linkedin.com/in/carlosapenasdev/" target="__blank"><b>Carlos Santos</b></a>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { notify } from "@kyvg/vue3-notification";
import CourseService from '@/services/course.service'
import router from '@/router'

export default {
    name: 'Presenca',
    props: {
        aula: {
            require: true,
        }
    },
    setup(props) {
        const store = useStore()
        const email = ref("")
        const password = ref("")
        const loading = ref(false)

        const loadingStore = computed(() => store.state.loading)

        watch(
            () => store.state.users.loggedIn,
            (loggedIn) => {
                if (loggedIn) {
                    //router.push({name: 'campus.home'})
                }
            }
        )

        const typePassword = ref('password')
        const toggleShowPassword = () => typePassword.value = typePassword.value === 'password' ? 'text' : 'password'

        const auth = () => {
            loading.value = true

            store.dispatch('auth', {
                email: email.value,
                password: password.value,
                device_name: 'vue3_web'
            })
            //.then(() => router.push({name: 'campus.home'}))
            .then(function(){
                CourseService.markLessonViewed(props.aula)
                .then(function(){
                    router.push({name: 'campus.presenca'})
                })
            })
            .catch(error => {
                let msgError = 'Falha na requisição'

                if (error.status === 422){
                    if (typeof error.data.errors.email !== 'undefined') {
                        msgError = error.data.errors.email.join()
                    }
                    else
                        msgError = 'Dados Inválidos'
                        
                }
                if (error.status === 404) msgError = 'Usuário Não Encontrado'

                notify({
                    title: 'Falha ao autenticar',
                    text: msgError,
                    type: "warn"
                });
            })
            .finally(() => loading.value = false)
        }

        return {
            auth,
            email,
            password,
            loading,
            typePassword,
            toggleShowPassword,
            loadingStore,
        }
    }
}
</script>