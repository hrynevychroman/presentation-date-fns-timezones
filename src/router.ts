import { createRouter, createWebHistory } from 'vue-router'
import TimeDisplay from './components/TimeDisplay.vue'
import PracticalExamples from './components/PracticalExamples.vue'

const routes = [
  { path: '/', component: TimeDisplay },
  { path: '/examples', component: PracticalExamples }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})