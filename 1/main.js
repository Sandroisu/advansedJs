let app = new Vue({
    el: '#app',
    data: {
        name: 'Рамзан',
        name2: 'Серёга'
    },
    methods: {
        showAge(age) {
            alert(new Date().getFullYear() - age)
        }
    }
});