import {createRouter, createWebHistory} from 'vue-router'
import routes from '../router/routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const  installRouter = (app) => {
    app.use(router)
}
export default installRouter;