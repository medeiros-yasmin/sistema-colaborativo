import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PodcastView from '../views/PodcastView.vue'
import VideoView from '../views/VideoView.vue'
import ArtigoView from '../views/ArtigoView.vue'
import AuxilioView from '../views/AuxilioView.vue'
import LivroView from '../views/LivroView.vue'
import SiteView from '../views/SiteView.vue'
import Publicacao from '../views/Publicacao.vue'
import CriarPublicacaoView from '../views/CriarPublicacaoView.vue'
import EditarPublicacaoView from '../views/EditarPublicacaoView.vue'
import CadastroView from '../views/CadastroView.vue'
import EntrarView from '../views/EntrarView.vue'
import AvisoAutenticacaoView from '../views/AvisoAutenticacaoView'
import Teste from '../views/Teste'
import { auth } from '../firebase/firebase-config'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    props: true,
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView,
    props: true,
  },
  {
    path: '/entrar',
    name: 'entrar',
    component: EntrarView,
    props: true,
  },

  {
    path: '/teste',
    name: 'teste',
    component: Teste,
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
    component: PodcastView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  },

  {
    path: '/artigo',
    name: 'artigo',
    component: ArtigoView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  },

  {
    path: '/livro',
    name: 'livro',
    component: LivroView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  },

  {
    path: '/video',
    name: 'video',
    component: VideoView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  },

  {
    path: '/auxilio',
    name: 'auxilio',
    component: AuxilioView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  },

  {
    path: '/site',
    name: 'site',
    component: SiteView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
  },

  {
    path: '/aviso',
    name: 'aviso',
    component: AvisoAutenticacaoView
  },

  {
    path: '/criar',
    name: 'criarPublicacao',
    component: CriarPublicacaoView,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/editar/:id',
    name: 'editarPublicacao',
    component: EditarPublicacaoView,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao }),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/publicacao/:id',
    name: 'publicacao',
    component: Publicacao,
    props: route => ({id: route.params.id, tipoPublicacao: route.params.tipoPublicacao}),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  
  if (to.meta.requiresAuth && !currentUser) {
    // O usuário não está autenticado e a rota requer autenticação
    next(false); // Redireciona para a página de login ou outra página adequada
  } else {
    next();
  }
});

export default router
