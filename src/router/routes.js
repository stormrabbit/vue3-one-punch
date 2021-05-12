import HomePage from "../containers/HomePage.vue";
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "主页", component: HomePage },
];

export default routes;
