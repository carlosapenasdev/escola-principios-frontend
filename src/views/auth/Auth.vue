<template>
    <section id="loginPage"
        :style="{
            backgroundImage: 'url(' + require('@/assets/images/bgLogin.jpg') + ')'
        }">
        <div class="loginContent">
            <div class="loginCard">
                <div class="decor" style="">
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
                                Salvação, Temor a Deus e Palavra
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
                            >
                        </span>
                        <span>
                            <p class="welcome-p">Seja muito bem vindo(a)!</p>
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            Acesse nossa plataforma e desfrute de cursos completos para o seu crescimento
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
                                    loading || loadingStore ? 'disabled' : ''
                                ]"
                                type="submit"
                                @click.prevent="auth">
                                <span v-if="loading">Enviando...</span>
                                <span v-else-if="loadingStore">Validando Acesso...</span>
                                <span v-else>Login</span>
                            </button>
                        </form>
                        <span>
                            <p class="fontSmall">
                                Esqueceu sua senha?
                                <router-link :to="{name: 'forget.password'}" class="link primary">Clique aqui</router-link>
                            </p>
                        </span>
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
import { computed, ref, watch, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { notify } from "@kyvg/vue3-notification";

import router from '@/router'
import { LOGIN_TITLE } from '@/configs'

export default {
    name: 'Auth',
    setup() {
        const store = useStore()
        const email = ref("")
        const password = ref("")
        const loading = ref(false)

        const loadingStore = computed(() => store.state.loading)

        watch(
            () => store.state.users.loggedIn,
            (loggedIn) => {
                if (loggedIn) {
                    router.push({name: 'campus.home'})
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
            .then(() => router.push({name: 'campus.home'}))
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

        onBeforeMount(() => {
            document.title = LOGIN_TITLE
        })

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