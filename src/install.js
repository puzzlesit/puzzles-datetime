import PuzzlesDatetime from "./components/PuzzlesDatetime.vue";

const PuzzlesDatetimeSimple = {
    install(Vue) {
        Vue.component("puzzles-datetime", PuzzlesDatetime);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PuzzlesDatetimeSimple);
}

export default PuzzlesDatetimeSimple;