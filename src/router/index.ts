import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import { useStore } from '../store/useStore'
import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Login from '../pages/Login.vue'
import Posts from '../pages/admin/Posts.vue'
import Edit from '../pages/admin/Edit.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path:'/posts/:slug',
		name: 'post',
		component: Post,
		props: true
	},
	{
		path:'/admin/login',
		name: 'admin.login',
		component: Login,
		beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: (props?: object) => void) => {
			const store = useStore()

			if (store.getAuthenticated) {
				return next({ name: 'admin.posts' })
			}

			return next()
		}
	},
	{
		path:'/admin/posts',
		name: 'admin.posts',
		component: Posts,
		beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: (props?: object) => void) => {
			const store = useStore()

			if (!store.getAuthenticated) {
				return next({ name: 'admin.login' })
			}

			return next()
		}
	},
	{
		path:'/admin/posts/:uuid/edit',
		name: 'admin.posts.edit',
		component: Edit,
		props: true,
		beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: (props?: object) => void) => {
			const store = useStore()

			if (!store.getAuthenticated) {
				return next({ name: 'admin.login' })
			}

			return next()
		}
	},
]

export default createRouter({
	history: createWebHistory(),
	routes
})