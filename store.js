import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 99
        }
    }
})

export default store