Vue.component('attention', {
    template: `<div v-show="$parent.error">Ошибка при загрузке данных</div>`
});