import { createRouter, createWebHashHistory } from 'vue-router'
import ReportView from '../views/ReportView.vue'
import ReportView2 from '../views/ReportView2.vue'
const routes = [
  {
    path: '/',
    name: 'report',
    component: ReportView
  },
  {
    path:'/2',
    name:'reportTest',
    component: ReportView2
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
