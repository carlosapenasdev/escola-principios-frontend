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
        :teste="origin+'/presenca/'+lesson.id"
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
      if(canvas.height == 400)
      {
        var newCanvas   = document.createElement("canvas");
        var ctx         = newCanvas.getContext('2d');
        var image       = new Image();

        newCanvas.width    = canvas.width
        newCanvas.height   = canvas.height+(canvas.height/8)
        ctx.globalCompositeOperation = 'destination-under'
        ctx.beginPath();
        ctx.rect(0, 0, newCanvas.width, newCanvas.height);
        ctx.fillStyle = "white";
        ctx.fill();
        let self = this;

        image.onload = function() {

          ctx.drawImage(image, 0, 0);
          
          var randomtxt = canvas.id.replace("qrcode-", "").replace(/-/g, " ").toUpperCase();
          ctx.font = "30px Arial";
          ctx.fillStyle = "#000000";
          ctx.strokeStyle = "#fff";
          let posX = (newCanvas.width/6)
          let posY = (newCanvas.width)
          ctx.fillText(randomtxt, posX, posY);

          var dataURL = newCanvas.toDataURL();
          
          let data = {
            src: dataURL,
            id: canvas.id
          }
          canvas.src = dataURL
          self.app.appContext.config.globalProperties.globalVar =  data
        };
        image.src = canvas.src;
      }
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
      var link        = document.createElement("a");
      
      document.body.appendChild(link);

      link.setAttribute("href", globalLocal.src);
      link.setAttribute("download", globalLocal.id);
      link.click();
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