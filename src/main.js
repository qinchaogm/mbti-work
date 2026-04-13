import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';

// 动态导入非关键页面
const lazyLoadPage = (path) => {
  return () => import(`../pages/${path}/${path}.vue`)
}

export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia());
	return {
		app,
	};
}