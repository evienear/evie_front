import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/components/Login/Login';

// Pages
import Home from '@/pages/Home/Home';
import Collections from '@/pages/Collections/Collections'; 
import Buy from '@/pages/Buy/Buy';
import Sell from '@/pages/Sell/Sell';
import ChooseNFT from '@/pages/Sell/ChooseNFT';
import ReviewSell from '@/pages/Sell/ReviewSell';
import Stats from '@/pages/Stats/Stats';
import Education from '@/pages/Education/Education';
import NFTProjects from '@/pages/Education/NFTProjects';
import ProjectProposal from '@/pages/Education/ProjectProposal';
import MintCalendar from '@/pages/MintCalendar/MintCalendar';
import Error from "@/pages/Error/Error";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/buy',
        name: 'Buy',
        component: Buy,
      },
      {
        path: '/sell',
        name: 'Sell',
        component: Sell,
      },
      {
        path: '/choose-nft',
        name: 'ChooseNFT',
        component: ChooseNFT,
      },
      {
        path: '/review-sell',
        name: 'ReviewSell',
        component: ReviewSell,
      },
      {
        path: '/stats',
        name: 'Stats',
        component: Stats,
      },
      {
        path: '/education',
        name: 'Education',
        component: Education,
      },
      {
        path: '/nft-projects',
        name: 'NFTProjects',
        component: NFTProjects,
      },
      {
        path: '/project-proposal',
        name: 'ProjectProposal',
        component: ProjectProposal,
      },
      {
        path: '/mint-calendar',
        name: 'MintCalendar',
        component: MintCalendar,
      },
      {
        path: '/collections',
        name: 'Collections',
        component: Collections,
      },
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});
