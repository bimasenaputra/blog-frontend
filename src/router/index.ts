import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '../store/useStore'
import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Login from '../pages/Login.vue'
import Posts from '../pages/admin/Posts.vue'

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
		component: Login
	},
	{
		path:'/admin/posts',
		name: 'admin.posts',
		component: Posts,
		beforeEnter: (to, from, next) => {
			const store = useStore()

			console.log(store.getAuthenticated)

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