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
    <!-- youtube iframe with progressive enhancement (extra queries after the url to optimize the embed) -->
    <vue-plyr
      v-if="lesson.video"
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

  <div class="description-lesson" v-if="lesson.description">
    {{ lesson.description }}
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
export default {
  name: "Player",
  components:{
    VuePlyr
  },
  setup() {
    const store = useStore();
    
    const plyr = ref(null);
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
      plyr,
    };
  },
  data() {
    const store = useStore();
    const lesson = computed(() => store.state.courses.lessonPlayer);
    return {
      lesson: lesson,
      player: {},
    };
  },
  mounted () {
    let player = this.$refs.plyr.player
    player.on('ended', () => {
      const store = this.$store
      store.dispatch('markLessonViewed')
    });
  }
};
</script>