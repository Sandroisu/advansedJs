Vue.component('test', {
    props: ['name', 'age'],
    data() {
        return {
            name: 'Анна',
            age: 25
        }
    },
    template: `<div>Привет, {{name}} и {{$data.name}}, ваш возраст {{age}}
    <inner-comp></inner-comp>
    </div>`
});

Vue.component('inner-comp', {
    template:
        `<div>
            <h1>Привет, {{$root.name}}  </h1>
            <button @click="$root.showAge($parent.age)">Ok</button>
        </div>`
});