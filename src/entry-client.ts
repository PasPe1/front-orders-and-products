import { createApp } from './main'
import router from './router';
import { store } from './store/store';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const { app } = createApp();

app.use(router);
app.use(store);

app.mount('#app')