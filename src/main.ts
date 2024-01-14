import { createApp } from "vue";
import "./style/index.scss";
import App from "./App.vue";
import "animate.css";
import lazyPlugin from "vue3-lazy";

createApp(App)
  .use(lazyPlugin, {
    loading: new URL("./assets/images/all.png", import.meta.url).href, // 图片加载时默认图片
  })
  .mount("#app");
