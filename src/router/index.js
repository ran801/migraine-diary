import { createRouter, createWebHashHistory } from 'vue-router'
import ReportView from '../views/ReportView.vue'
import ReportView2 from '../views/ReportView2.vue'
import ReportView3 from '../views/ReportView3.vue'
import ReportView4 from '../views/ReportView4.vue'

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
  },
  {
    path:'/3',
    name:'reportTest2',
    component: ReportView3
  },
  {
    path:'/4',
    name:'reportTest4',
    component: ReportView4
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
