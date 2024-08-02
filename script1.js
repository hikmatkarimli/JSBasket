document.addEventListener('DOMContentLoaded', function () {
    let itemCount = 0;

    const allButtons = document.querySelectorAll('.button');

    allButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            itemCount++;
            updateBasketCount(itemCount);
        });
    });

    function updateBasketCount(count) {
        const itemCountNew = document.getElementById('item-count');
        itemCountNew.textContent = count;
    }
});

let basketItems = [];

function loadBasketFromLocalStorage() {
    let storedItems = JSON.parse(localStorage.getItem('basketItems'));
    if (storedItems) {
        basketItems = storedItems;
    } else {
        basketItems = [
            { product: 'Watch', quantity: 0, price: 10, totalPrice: 0 },
            { product: 'Smartphone', quantity: 0, price: 200, totalPrice: 0 },
            { product: 'Sunglasses', quantity: 0, price: 5, totalPrice: 0 },
            { product: 'Wallet', quantity: 0, price: 7, totalPrice: 0 },
            { product: 'Backpack', quantity: 0, price: 30, totalPrice: 0 },
            { product: 'Earbuds', quantity: 0, price: 150, totalPrice: 0 }
        ];
    }
}

function saveBasketToLocalStorage() {
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
}

function addToBasket(productName, price) {
    let existingItem = basketItems.find(item => item.product === productName);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * price;
    }

    updateBasket();
    saveBasketToLocalStorage();
}

function updateBasket() {
    let basketElement = document.getElementById('basket-items');
    let totalAmountElement = document.getElementById('total-amount');

    basketElement.innerHTML = '';

    let totalPrice = 0;
    basketItems.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('basket-item');

        let productNameElement = document.createElement('span');
        productNameElement.textContent = item.product;

        let quantityElement = document.createElement('input');
        quantityElement.type = 'number';
        quantityElement.value = item.quantity;
        quantityElement.min = 0;
        quantityElement.addEventListener('change', () => {
            item.quantity = parseInt(quantityElement.value) || 0;
            item.totalPrice = item.quantity * item.price;
            updateBasket();
            saveBasketToLocalStorage();
        });

        let priceElement = document.createElement('span');
        priceElement.textContent = `$${item.price}`;

        let totalElement = document.createElement('span');
        totalElement.textContent = `$${item.totalPrice}`;

        itemElement.appendChild(productNameElement);
        itemElement.appendChild(document.createTextNode(' - '));
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(document.createTextNode(' - Price: '));
        itemElement.appendChild(priceElement);
        itemElement.appendChild(document.createTextNode(' - Total: '));
        itemElement.appendChild(totalElement);

        basketElement.appendChild(itemElement);

        totalPrice += item.totalPrice;
    });

    totalAmountElement.textContent = totalPrice.toFixed(2);
}

function initializeBasket() {
    loadBasketFromLocalStorage();
    updateBasket();
}
initializeBasket();
