import { createRouter, createWebHistory } from 'vue-router'
import SelectPortfolioView from '../views/SelectPortfolioView.vue';
import PortfolioOverviewView from '../views/PortfolioOverviewView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SelectPortfolio',
      component: SelectPortfolioView
    },
    {
      path: '/overview',
      name: 'PortfolioOverview',
      component: PortfolioOverviewView,
    }
  ],
})

export default router
