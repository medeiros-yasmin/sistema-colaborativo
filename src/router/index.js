import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PodcastView from '../views/PodcastView.vue'
import VideoView from '../views/VideoView.vue'
import ArtigoView from '../views/ArtigoView.vue'
import AuxilioView from '../views/AuxilioView.vue'
import SiteView from '../views/SiteView.vue'
import Publicacao from '../views/Publicacao.vue'
import CriarPublicacaoView from '../views/CriarPublicacaoView.vue'
import EditarPublicacaoView from '../views/EditarPublicacaoView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, 

  {
    path: '/podcast',
    name: 'podcast',
    component: PodcastView
  },

  {
    path: '/artigo',
    name: 'artigo',
    component: ArtigoView
  },

  {
    path: '/video',
    name: 'video',
    component: VideoView
  },

  {
    path: '/auxilio',
    name: 'auxilio',
    component: AuxilioView
  },

  {
    path: '/site',
    name: 'site',
    component: SiteView
  },

  {
    path: '/criar',
    name: 'criarPublicacao',
    component: CriarPublicacaoView
  },

  {
    path: '/editar/:id',
    name: 'editarPublicacao',
    component: EditarPublicacaoView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao }),
  },

  {
    path: '/publicacao/:id',
    name: 'publicacao',
    component: Publicacao,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  }
]

const router = new VueRouter({
  routes
})

export default router
