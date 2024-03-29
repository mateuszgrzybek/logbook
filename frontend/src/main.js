import * as components from 'vuetify/components'
import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { createVuetify } from 'vuetify'
import App from "./App.vue";
import router from "./router";
import userStore from "./store";
import 'vuetify/styles';
import "./assets/sass/main.scss";
import "./helpers/validation/validationHelpers";

library.add(fas);
library.add(fab);
library.add(far);
dom.watch();

const app = createApp(App);
const vuetify = createVuetify({
    components,
});

app.use(vuetify);
app.use(router);
app.use(userStore);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
