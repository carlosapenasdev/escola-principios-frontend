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
    <div class="videoSpace" id="player" v-if="lesson.video && course.modalidade == 'R'">
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
import { computed } from "vue";
import store from "@/store"
import { useStore } from "vuex";
import VueQrcode from '@chenfengyuan/vue-qrcode';

import { getCurrentInstance } from 'vue'

export default {
  name: "Player",
  components:{
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
    },
    youTube() {
      var YouTubeIframeLoader = require('youtube-iframe');
      let self = this
      YouTubeIframeLoader.load(function(YT) {
        if(self.playerIframe != null) {
          self.playerIframe.destroy()
        }
        self.playerIframe = new YT.Player('player', {
              height: '400',
              width: '100%',
              videoId: self.lesson.video.replace('https://www.youtube.com/watch?v=', ''),
              playerVars:{
                'modestbranding':0,
                'autohide':1,
                'showinfo':0,
                'controls':0,
                'autoplay':1,
                'fs':1,
                'rel':0,
                'loop':1,
              },
              events: {
                'onReady': self.onPlayerReady,
                'onStateChange': self.onPlayerStateChange
              }
          });
      });
    },
    onPlayerReady(event) {
      event.target.playVideo();
    },
    onPlayerStateChange(event) {
      var YouTubeIframeLoader = require('youtube-iframe');
      let self = this
      YouTubeIframeLoader.load(function(YT) {
        if (event.data == YT.PlayerState.ENDED && !self.done) {
            const store = self.$store
            store.dispatch('markLessonViewed')
            self.done = true;
        }
      });
    },
    stopVideo() {
      this.playerIframe.stopVideo();
    }
  },
  setup()
  {
    const origin  = window.location.origin;
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

    return {
      downloadImg,
      course,
      origin,
      app,
      user,
    };
  },
  watch: {
    lesson: function () {
      this.youTube();
    }
  },
  data() {
    const store = useStore();
    const lesson = computed(() => store.state.courses.lessonPlayer);
    return {
      lesson: lesson,
      player: {},
      playerIframe: null,
      done:false,
      myVar: this.globalVar
    };
  },
  mounted () {
    this.youTube();
  }
};
</script>