import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION, useToast } from "vue-toastification";
import { setToastInstance, showToast } from "./plugins/toast.js";
import i18n from "./i18n";
import "vue-toastification/dist/index.css";
import './assets/main.css'
//Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import store from "../store";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const app = createApp(App);

app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 2000,
});

app.directive('color', {
    mounted(el, binding) {
        el.style.color = binding.value;
    }
});

app.directive("tooltip", {
  mounted(el, binding) {
    const tooltip = document.createElement("div");
    tooltip.innerText = binding.value;
    tooltip.className = "custom-tooltip";
    el.style.position = "relative";
    tooltip.style.position = "absolute";
    tooltip.style.bottom = "125%";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.background = "rgba(0,0,0,0.8)";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "6px 10px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.fontSize = "13px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.3s ease";
    tooltip.style.zIndex = "1000";

    el.appendChild(tooltip);

    el.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
    });
    el.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  },
});

//Toast
app.mixin({
  mounted() {
    const toast = useToast();
    setToastInstance(toast);
  },
});

app.directive("copy", {
  mounted(el, binding) {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      navigator.clipboard.writeText(binding.value).then(() => {
        showToast("📋 Скопировано!");
      });
    });
  },
});

app.use(store)
app.use(i18n)
app.use(router);
app.mount("#app");
