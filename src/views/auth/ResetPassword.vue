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
                            <p class="welcome-p">Vamos alterar sua senha</p>
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            <p style="font-size:0.9em; margin-bottom: 2vh;">
                                Preencha seu email abaixo e sua nova senha, depois clique em Mudar senha.
                            </p>
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
                                <span v-if="loading">Alterando...</span>
                                <span v-else>Mudar Senha</span>
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
import { ref, onBeforeMount } from 'vue'
import { notify } from "@kyvg/vue3-notification"

import router from '@/router'
import ResetPasswordService from '@/services/password.reset.service'
import { LOGIN_TITLE } from '@/configs'

export default {
    name: 'ResetPassword',
    props: {
        token: {
            require: true,
        }
    },
    setup(props) {
        const email = ref("")
        const password = ref("")
        const loading = ref(false)

        const typePassword = ref('password')
        const toggleShowPassword = () => typePassword.value = typePassword.value === 'password' ? 'text' : 'password'

        const auth = () => {
            loading.value = true

            ResetPasswordService.reset({
                email: email.value,
                password: password.value,
                token: props.token,
            })
            .then(() => {
                notify({
                    title: 'Sucesso',
                    text: 'Senha Atualizada com sucesso'
                })

                router.push({name: 'auth'})
            })
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
            auth,
            email,
            password,
            loading,
            typePassword,
            toggleShowPassword
        }
    }
}
</script>