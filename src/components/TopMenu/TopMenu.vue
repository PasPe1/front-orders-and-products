<template>
  <div class="top-menu">
    <RedirectLink to="orders">
      <div class="top-menu_logo">
        <img
          class="top-menu_logo_image"
          src="../../assets/icons/user-shield.svg"
          alt="My SVG Image"
        />
        <h1 class="top-menu_title">{{ 'Inventory'.toUpperCase() }}</h1>
      </div>
    </RedirectLink>
    <div class="top-menu_search">
      <CustomInput v-model="text" :placeholder="$t('topMenu.search')" :isLabel="false" />
    </div>
    <div>
      <p>
        {{ $t('topMenu.activeTabs') }}: <span>{{ activeTabs }}</span>
      </p>
    </div>
    <div class="top-menu_date">
      <p>{{ currentDay }}</p>
      <div class="top-menu_date_time">
        <p>{{ currentDate }}</p>
        <i class="bi bi-clock-fill top-menu_date_time_icon"></i>
        <p>{{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineAsyncComponent } from 'vue'
import websocketService from '@/services/websocket.service'
// import { useI18n } from 'vue-i18n'
import 'dayjs/locale/uk'
// import i18n from '@/locales/i18n'
// import { io } from 'socket.io-client'

interface TopMenuData {
  text: string
  currentDay: string
  currentDate: string
  currentTime: string
  intervalId: any
  activeTabs: number
}

// const socket = io('http://localhost:3001')

// const locale = i18n.mode.

export default {
  name: 'TopMenu',
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
    RedirectLink: defineAsyncComponent(
      () => import('@/components/UI/RedirectLink/RedirectLink.vue')
    )
  },
  data(): TopMenuData {
    return {
      text: '',
      currentDay: dayjs().format('dddd'),
      currentDate: dayjs().format('DD MMM, YYYY'),
      currentTime: dayjs().format('HH:mm'),
      intervalId: null,
      activeTabs: 0
    }
  },
  methods: {
    updateTime() {
      // const { locale } = useI18n()
      // dayjs.locale(locale.value === 'ua' ? 'uk' : locale.value)
      this.currentDay = dayjs().format('dddd')
      this.currentDate = dayjs().format('DD MMM, YYYY')
      this.currentTime = dayjs().format('HH:mm')
    },
    updateActiveTabs(count: number) {
      console.log('activeTabs', count)
      this.activeTabs = count
    }
  },
  async mounted() {
    this.updateTime()
    this.intervalId = setInterval(this.updateTime, 1000)
    websocketService.onUpdateActiveTabs(this.updateActiveTabs)
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
    websocketService.notifyTabClosed()
  }
}
</script>

<style scoped>
.top-menu {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  background-color: #ffffff;
  width: 100%;
  padding: 10px;
  position: relative;
  z-index: 2;
  box-shadow: 13px 0px 10px 15px rgba(34, 34, 34, 0.096);
}

.top-menu_logo {
  display: flex;
  align-items: center;
  gap: 20px;
}

.top-menu_logo_image {
  width: 50px;
  height: 50px;
}

.top-menu_title {
  line-height: 14px;
  font-size: 16px;
  color: #03943a;
  margin-bottom: 0px;
}

.top-menu_search {
  max-width: 200px;
}

.top-menu_date_time {
  display: flex;
  gap: 10px;
}

.top-menu_date_time_icon {
  color: var(--primary-green-color);
}
</style>
