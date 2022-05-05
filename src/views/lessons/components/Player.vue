<template>
  <div class="training">
    <div class="card bg-laravel">
      <span class="icon">
        <img src="images/icons/laravel.svg" alt="" />
      </span>
      <span class="title">{{ lesson.name }}</span>
      <router-link :to="{ name: 'campus.home' }" class="btn laravel">
        <i class="fas fa-chevron-left"></i>
        Voltar
      </router-link>
    </div>
    <div class="videoSpace" v-if="lesson.video && course.modalidade == 'R'">
      <vue-plyr
        ref="plyr"
        @player="setPlayer"
        :options="options"
      >
        <div class="plyr__video-embed">
          <iframe
            ref="ifram"
            :src="lesson.video"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <div class="qrcodeSpace" v-if="course.modalidade == 'P' && lesson.id && user.tipo==1" style="margin-top:2vh">
      
      <vue-qrcode
        v-bind="qrcodeProps" 
        tag="img"
        @ready="onReady"
        ref="qrcode"
        v-if="lesson.id"
        :key="lesson.id"
        :value="origin+'/presenca/'+lesson.id"
        :options="{ width: 400 }"
        :id="'qrcode-'+lesson.url"
      >
      </vue-qrcode>
      
      <div class="btnDownloadQrCode" style="margin:5vh 0">
        <a href="#" @click.prevent="downloadImg()" :class="['btn', 'laravel']">Salvar Qrcode</a>
      </div>
    </div>
  </div>

  <div class="description-lesson" v-if="lesson.description">
    {{ lesson.description }}
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import store from "@/store"
import { useStore } from "vuex";
import VuePlyr from 'vue-plyr';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import 'vue-plyr/dist/vue-plyr.css';

import { getCurrentInstance } from 'vue'

export default {
  name: "Player",
  components:{
    VuePlyr,
    VueQrcode
  },
  methods: {
    onReady(canvas) {
      this.app.appContext.config.globalProperties.globalVar =  canvas
    }
  },
  setup()
  {
    const origin  = window.location.origin;
    const plyr    = ref(null);
    const course  = computed(() => store.state.courses.courseSelected).value
    const user    = store.state.users.user
    const app     = getCurrentInstance()

    const downloadImg = () => {
      let globalLocal =  app.appContext.config.globalProperties.globalVar
      
      var link = document.createElement("a");

      document.body.appendChild(link);

      link.setAttribute("href", globalLocal.src);
      link.setAttribute("download", globalLocal.id);
      link.click();

      console.log('downloadImg');
      console.log(globalLocal);
    }
    watch(
      () => store.state.courses.lessonPlayer,
      () => {

        if(plyr.value !== null)
        {
          const lesson = computed(() => store.state.courses.lessonPlayer);
          
          let player = plyr.value.player
          player.source = {
            type: 'video',
            sources: [
              {
                src: lesson.value.video,
                provider: 'youtube',
              },
            ],
          }
        }
      }
    );
    return {
      downloadImg,
      plyr,
      course,
      origin,
      app,
      user,
    };
  },
  data() {
    const store = useStore();
    const lesson = computed(() => store.state.courses.lessonPlayer);
    return {
      lesson: lesson,
      player: {},
      myVar: this.globalVar
    };
  },
  mounted () {
    if(this.$refs.plyr !== undefined)
    {
      let player = this.$refs.plyr.player
      player.on('ended', () => {
        const store = this.$store
        store.dispatch('markLessonViewed')
      });
    }
  }
};
</script>