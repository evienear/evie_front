import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login/Login'),
    },
    {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout/Layout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/Home/Home'),
      },
      {
        path: '/buy/:id',
        name: 'buy',
        component: () => import('@/pages/Buy/Buy'),
      },
      {
        path: '/buy-limit',
        name: 'buy-limit',
        component: () => import('@/pages/Buy/Buy-limit'),
      },
      {
        path: '/sell',
        name: 'sell',
        component: () => import('@/pages/Sell/Sell'),
      },
      {
        path: '/choose-nft',
        name: 'chooseNFT',
        component: () => import('@/pages/Sell/ChooseNFT'),
      },
      {
        path: '/review-sell',
        name: 'reviewSell',
        component: () => import('@/pages/Sell/ReviewSell'),
      },
      {
        path: '/stats',
        name: 'stats',
        component: () => import('@/pages/Stats/Stats'),
      },
      {
        path: '/education',
        name: 'education',
        component: () => import('@/pages/Education/Education'),
      },
      {
        path: '/nft-projects',
        name: 'nftProjects',
        component: () => import('@/pages/Education/NFTProjects'),
      },
      {
        path: '/project-proposal',
        name: 'projectProposal',
        component: () => import('@/pages/Education/ProjectProposal'),
      },
      {
        path: '/form',
        name: 'form',
        component: () => import('@/pages/Education/Form'),
      },
      {
        path: '/mint-calendar',
        name: 'mintCalendar',
        component: () => import('@/pages/MintCalendar/MintCalendar'),
      },
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: () => import('@/pages/Error/Error'),
    }
  ],
});
