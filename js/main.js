const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cartItems: [],
        imgProduct: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/50x100',
        error: false

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
                    console.log(error);
                    this.error = true;
                });
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result !== 1) {
                        return;
                    }
                    const itemId = item.id_product;
                    const find = this.cartItems.find(product => itemId === product.id_product);
                    if (find) {
                        find.quantity++;
                    } else {
                        const newCartItem = Object.assign({ quantity: 1 }, item);
                        this.cartItems.push(newCartItem);
                    }
                });
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result !== 1) {
                        return;
                    }
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                });
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element)
                    this.filtered.push(element)
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