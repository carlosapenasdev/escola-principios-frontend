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
                            Desenvolvido por - <a href="https://www.linkedin.com/in/carlossantoswd/" target="__blank"><b>Carlos Santos</b></a>
                        </span>
                    </div>
                </div>
                <div class="login">
                    <div class="content">
                        <span class="logo"
                            >
                        </span>
                        <span>
                            <p class="welcome-p">Esqueceu sua senha?</p>
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description" style="text-align:left">
                            <p style="font-size:0.9em; margin-bottom: 2vh;">
                                Nós te ajudamos com isso:<br />
                                Preencha seu email abaixo e clique em recuperar senha.
                            </p>
                            <p style="font-size:0.9em; margin-bottom: 2vh;">
                            Verifique sua caixa de entrada para proceder com a mudança de senha.
                            </p>
                            <p style="font-size:0.9em; margin-bottom: 2vh;">
                            Caso não localize o email, por favor verifique o Spam.
                            </p>
                        </span>
                        <form action="/dist/index.html" method="">
                            <div class="groupForm">
                                <i class="far fa-envelope"></i>
                                <input type="email" name="email" placeholder="E-mail" v-model="email" required>
                            </div>
                            <button
                                :class="[
                                    'btn',
                                    'primary',
                                    loading ? 'loading' : ''
                                ]"
                                type="submit"
                                @click.prevent="forgetPassword">
                                <span v-if="loading">Recuperando...</span>
                                <span v-else>Recuperar Senha</span>
                            </button>
                        </form>
                        <span>
                            <p class="fontSmall">Acessar?
                                <router-link :to="{name: 'auth'}" class="link primary">Clique aqui</router-link>
                            </p>
                        </span>
                    </div>
                    <span class="copyright fontSmall">
                        Desenvolvido por - <a href="https://www.linkedin.com/in/carlossantoswd/" target="__blank"><b>Carlos Santos</b></a>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { notify } from "@kyvg/vue3-notification"
import { LOGIN_TITLE } from '@/configs'

export default {
    name: 'ForgetPassword',
    setup() {
        const store = useStore()
        const email = ref("")
        const loading = ref(false)

        const forgetPassword  = () => {
            loading.value = true

            store
                .dispatch('forgetPassword', {email: email.value})
                .then(() => notify({
                    title: 'Sucesso',
                    text: 'Confira o seu e-mail'
                }))
                .catch(() => notify({
                    title: 'Falha',
                    text: 'Falha ao recuperar o usuário',
                    type: "warn"
                }))
                .finally(() => loading.value = false)
        }

        onBeforeMount(() => {
            document.title = LOGIN_TITLE
        })


        return {
            email,
            loading,
            forgetPassword
        }
    }
}
</script>