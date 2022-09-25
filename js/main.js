const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                });
        },
        addProduct(item) {
            const find = this.cart.find(product => item.id == product.id);
            if (find) {
                find.quantity++;
            } else {
                //this.$set(item, 'quantity', 1);
                const n = Object.assign({ quantity: 1 }, item);
                this.cart.push(n);
            }
            console.log(this.cart);
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element)
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element)
                }
            });
    }
});