const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class ProductList {
    constructor(basket, container = '.products') {
        this.container = container;
        this.products = [];
        this._getProducts().then(data => {
            this.products = [...data];
            this.render()
        });
        this.basket = basket;
        this._addListener();
    }


    _addListener() {
        document.querySelector(this.container).addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('buy-btn')) {
                this.basket.addProduct(target)
            }
        });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    getSum() {
        return this.products.reduce((sum, item) => sum += price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const productItem = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productItem.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class ="product-item">
            <img src="${this.img}" alt="some img">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} $</p>
                <button class="buy-btn" data-id="${this.id}"  data-price="${this.price}" data-name="${this.title}">Добавить</button>
            </div>
        </div>`
    }
}

class Basket {
    constructor(container = '.cart-block') {
        this.container = container;
        this.products = []
        this._clickBasket();
    }
    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const basketItem = new BasketItem();
            block.insertAdjacentHTML('beforeend', basketItem.render(product));
        }
    }

    addProduct(productElement) {
        const id = +productElement.dataset['id'];
        const productItem = this.products.find(product => (product.id_product === id))
        if (productItem) {
            productItem.quantity++
            this._update(productItem)
        } else {
            const product = {
                id_product: id,
                price: +productElement.dataset['price'],
                product_name: productElement.dataset['name'],
                quantity: 1
            }
            this.products = [product];
            this.render(product);
        }
    }

    removeProduct(productElement) {
        const id = +productElement.dataset['id'];
        const productItem = this.products.find(product => product.id_product === id);
        if (productItem.quantity > 1) {
            productItem.quantity--;
            this._update(productItem);
        } else {
            this.products.splice(this.products.indexOf(productItem), 1);
            document.querySelector(`.cart-item[data-id="${id}"]`).remove();
        }
    }

    _update(productItem) {
        const block = document.querySelector(`.cart-item[data-id="${productItem.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${productItem.quantity}`;
        block.querySelector('.product-price').textContent = `${productItem.quantity * productItem.price}`;
    }

    _clickBasket() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });

        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('del-btn')) {
                this.removeProduct(event.target);
            }
        });
    }
}

class BasketItem {

    constructor() {
        this.quantity = 0;
    }

    render(product, img = 'https://via.placeholder.com/50x50') {
        return `<div class="cart-item" data-id="${product.id_product}">
                <div class = "product-bio">
                <img src="${img}" alt="some img">
                <div class="product-desc">
                <p class="product-title">${product.product_name}</p>
                <p class="product-quantity">Quantity: ${product.quantity}</p>
                <p class="product-single-price">${product.price} $ each</p>
                </div>
                </div>
                <div class="right-block">
                <p class="product-price">${product.quantity * product.price}$</p>
                <button class="del-btn" data-id="${product.id_product}">x</button>
                </div>
                </div>
        `

    }
}


const basket = new Basket();
let list = new ProductList(basket);