class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchProducts() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getSum() {
        let sum = 0;
        this.goods.forEach(item => {
            sum += item.price;
        });
        return sum;
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div
    class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class Cart {
    constructor() {
        this.date = new Date();
        this.productItems = [];
    }

}

class CartElement {
    constructor(productId, price) {
        this.productId = productId;
        this.price = price;
        this.count = 1;
        this.sum = price;
    }

    addOneMore() {
        this.count++;
        this.sum = this.price * this.count;
    }
}

let list = new GoodsList();
list.fetchProducts();
list.render()



//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);