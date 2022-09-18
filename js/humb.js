class HamburgerList {
    constructor() {
        this.humbs = [
            new Humburger(1, 'Big', 100, 40, 'img/big_humb.png'),
            new Humburger(2, 'Small', 50, 20, 'img/small_humb.png')
        ];
    }

    render() {
        let listHtml = '';
        this.humbs.forEach(humb => {
            listHtml += humb.render();
        });
        document.querySelector('.humbs-list').innerHTML = listHtml;
    }

}

class Humburger {
    constructor(id, title, price, cals, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cals = cals;
        this.img = img;
        this.fillingList = new FillingList();
        this.toppingsList = new ToppingsList();
    }

    getTotalPrice() {
        const filings = this.fillingList.getFillingSelectedPrice();
        const toppings = this.toppingsList.getToppingsSelectedPrice();
        return this.price + filings + toppings;
    }

    getTotalCalories() {
        return this.cals + this.fillingList.getFillingSelectedCals() + this.toppingsList.getToppingsSelectedCals();
    }

    render() {
        return `<div
    class="humb-item" id=${this.id}>
    <div class="humb-img">
        <img src=${this.img}>
    </div>
    <div class="humb-adj">
    <h3>${this.title}</h3><h3>${this.price}$</h3>
    </div>
    <div class="humb-adj">
    ${this.fillingList.render()}
    ${this.toppingsList.render()}
    </div>
    <h2 class='total-price'>Total price: ${this.getTotalPrice()}$</h2>
    <h3 class='total-calories'>Total calories: ${this.getTotalCalories()}cals.</h3>
    </div>`;
    }
}

class FillingList {
    constructor() {
        this.fillings = [
            new Filling(1, 'Cheese', 10, 20),
            new Filling(2, 'Salad', 20, 5),
            new Filling(3, 'Potato', 15, 10)
        ];
        this.selectedId = 1;
    }

    getFillingSelectedPrice() {
        let price = 0;
        this.fillings.forEach(item => {
            if (this.selectedId === item.id) {
                price = item.price;
            }
        });
        return price;
    }

    getFillingSelectedCals() {
        let cals = 0;
        this.fillings.forEach(item => {
            if (this.selectedId === item.id) {
                cals = item.cals;
            }
        });
        return cals;
    }

    render() {
        let listHtml = '';
        this.fillings.forEach(filling => {
            listHtml += filling.render();
        });
        return `
        <fieldset class="humb-inner-adj">
        <legend>Choose filling:</legend>
        <select name="fillings" id="fillings">
        ${listHtml}
        </select>
        </fieldset>
        `
    }


}

class Filling {
    constructor(id, title, price, cals) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cals = cals;
    }

    render() {
        return `<option class= "filling-element"
     value=${this.id}>${this.title} (${this.price}$, ${this.cals}cal.)</option>`;
    }
}

class ToppingsList {
    constructor() {
        this.toppings = [
            new Topping(1, 'Pepper', 15, 0),
            new Topping(2, 'Mayo', 20, 5)
        ];
    }

    findToppingById(id) {
        let topping = null
        this.toppings.forEach(element => {
            if (id === element.id) {
                topping = element;
            }
        });
        return topping;
    }

    getToppingsSelectedPrice() {
        let price = 0;
        this.toppings.forEach(item => {
            if (item.selected) {
                price += item.price;
            }
        });
        return price;
    }

    getToppingsSelectedCals() {
        let cals = 0;
        this.toppings.forEach(item => {
            if (item.selected) {
                cals += item.cals;
            }
        });
        return cals;
    }

    render() {
        let listHtml = '';
        this.toppings.forEach(filling => {
            listHtml += filling.render();
        });
        return `
        <fieldset>
        <legend>Choose toppings:</legend>
        ${listHtml}
        </fieldset>
        `
    }


}

class Topping {
    constructor(id, title, price, cals) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cals = cals;
        this.selected = false;
    }

    render() {
        return `<input type="checkbox" name="${this.id}" value="${this.id}"> ${this.title} (${this.price}$, ${this.cals}cal.)<br> `;
    }
}


let list = new HamburgerList();
list.render()
document.querySelectorAll('.humb-item').forEach(humbItem => {
    humbItem.addEventListener('input', event => {
        const target = event.target;
        const currentTarget = event.currentTarget;
        let humburgerItem = null;
        list.humbs.forEach(element => {
            const idl = element.id
            if (element.id === +currentTarget.id) {
                humburgerItem = element;
            }
        });
        if (humburgerItem === null) {
            return;
        }
        if (target.nodeName === 'SELECT') {
            const newSelection = +target.value;
            humburgerItem.fillingList.selectedId = newSelection;
        }

        if (target.nodeName === 'INPUT') {
            const newSelection = +target.value;
            const topping = humburgerItem.toppingsList.findToppingById(newSelection);
            if (topping != null) {
                topping.selected = target.checked;
            }
        }
        currentTarget.querySelector('.total-price').textContent = `Total price: ${humburgerItem.getTotalPrice()}$`;
        currentTarget.querySelector('.total-calories').textContent = `Total calories: ${humburgerItem.getTotalCalories()}cals.`;
    });
});
