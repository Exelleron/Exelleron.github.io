'use strict';

let itemsContainer = document.getElementById('items');
itemsContainer.innerHTML = '';


function innerModalCard(item) {
    const currentCard = `<div class="grey-background" onclick="removeModalCard(event)">
            <div class="modal-card container">
                <div class="modal-card_img">
                    <img src="${item.imgUrl}" alt="name">
                </div>

                <div class="modal-card_info">
                    <div class="modal-card_info--name">${item.name}</div>

                    <div class="modal-card_info--comments">
                        <div>
                            <img
                                src="images/red-like.svg"
                                alt=""
                                class="card_footer--red-like"
                            >
                        </div>
                        <div>
                            
                            <p class="card_footer--reviews modal_card--reviews">
                                <strong>${item.orderInfo.reviews}%</strong>
                                Positive reviews
                                <br>
                                Above avarage
                            </p>
                        </div>
                        <div>
                            <p class="card_footer--orders">
                                <strong>${Math.round(0.5 + Math.random() * 10000)}</strong>
                                <br>
                                orders
                            </p>
                        </div>
                    </div>

                    <div class="modal-card_info--specifications">

                        <span class="specifications_color">Color<b>: ${item.color}</b></span>

                        <span class="specifications_os">Operating System<b>: ${item.os}</b></span>

                        <span class="specifications_chip">Chip: <b>: ${item.chip.name}</b></span>

                        <span class="specifications_height">Height<b>: ${item.size.height}</b></span>

                        <span class="specifications_width">Width<b>: ${item.size.width}</b></span>

                        <span class="specifications_depth">Depth<b>: ${item.size.depth}</b></span>

                        <span class="specifications_weight">Weight<b>: ${item.size.weight}</b></span>

                    </div>
                </div>

                <div class="modal-card_buy">
                    <div class="modal-card_buy--price">
                        $ ${item.price}
                    </div>

                    <div class="modal-card_buy--stock">
                        Stock: <b>${item.orderInfo.inStock} pcs.</b>
                    </div>

                    <button class="button modal-card_buy--button ${!item.orderInfo.inStock ? 'gray-button' : ''}">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('afterbegin', currentCard);
}

function removeModalCard(event) {
    if (event.target.className.includes('grey-background')) {
        event.currentTarget.remove()
    }
}

const defaultFilterValue = {
    price: {from: 0, to: 0},
    color: [],
    memory: [],
    os: [],
    display: [],
};

let filter = JSON.parse(JSON.stringify(defaultFilterValue));

document.querySelectorAll('.filter input').forEach(elem => {
    elem.addEventListener('change', function () {

       filter = JSON.parse(JSON.stringify(defaultFilterValue));
        document.querySelectorAll('.filter_display input:checked').forEach(elem => {
            filterUpdate(elem, 'display')
        });
        document.querySelectorAll('.filter_memory input:checked').forEach(elem => {
            filterUpdate(elem, 'memory')
        });
        document.querySelectorAll('.filter_color input:checked').forEach(elem => {
            filterUpdate(elem, 'color')
        });
        document.querySelectorAll('.filter_os  input:checked').forEach(elem => {
            filterUpdate(elem, 'os')
        });

        filter.price.from = Number(document.querySelector('.filter_price--min').value);
        filter.price.to = Number(document.querySelector('.filter_price--max').value);
        cardRender(items)
    });

    elem.addEventListener('keyup', function () {
        filter.price.from = Number(document.querySelector('.filter_price--min').value);
        filter.price.to = Number(document.querySelector('.filter_price--max').value);
        cardRender(items)
    })
});

function filterUpdate(el, key) {
    let defaultValue = el.value;
    if (el.checked) {
        let index = filter[key].findIndex(filterValue => filterValue.id === defaultValue);
        if (index === -1) {
            filter[key].push(filterParmsHandler[key](defaultValue));
        }
    }
}

const filterParmsHandler = {
    color: (val) => ({id: val}),
    memory: (val) => ({id: val}),
    os: (val) => ({id: val}),
    display: (val) => ({id: val, from: val.split("-")[0], to: val.split("-")[1]}),
};

function filtration(items) {
    return items.filter(item => filteredData(item));
}

function filteredData(device) {
    let res = 0;
    for (let key in filter) {
        switch (key) {
            case 'price':
                if (filter[key].from && filter[key].to) {
                    res = (filter[key].from <= device.price && filter[key].to >= device.price) ? 1 : -1;
                }
                break;
            case 'storage':
            case 'os':
                if (filter[key].length > 0) {
                    res = filter[key].findIndex(filterStorage => String(device[key]) === filterStorage.id);
                }
                break;
            case 'color':
                if (filter[key].length > 0) {
                    res = filter[key].findIndex(filterColor => device.color.includes(filterColor.id));
                }
                break;

            case 'display':
                if (filter[key].length > 0) {
                    res = filter[key].findIndex(filterItem => device.display > filterItem.from && device.display < filterItem.to)
                }
                break
        }
        if (res === -1) {
            break
        }
    }
    return (res > -1);
}

function cardRender(devices) {
    let resArray =  filtration(devices);
    itemsContainer.innerHTML = '';
    resArray.map(item => {
        const element = document.createElement('div');
        const card = () => {
            return (`<div class="card_like">
                        <img src="images/like.svg" alt="like">
                    </div>

                    <div class="card_image">
                        <img
                            class="main-image"
                            src="${item.imgUrl}"
                            alt="product_image"
                        >
                    </div>

                    <div class="card_header">
                        <span class="card_header--title">${item.name}</span>
                    </div>

                    <div class="card_info">
                        <p class="card_info--stock">
                            <img
                                class="card_info--true-false"
                                src="${item.orderInfo.inStock ? 'images/true.svg' : 'images/false.svg'}"
                                alt="true"
                            >
                            <span class="count-in-stock">${item.orderInfo.inStock}</span> left in stock
                        </p>
                        <p class="card_info--price">
                            Price: <strong>${item.price}</strong> $
                        </p>
                    </div>

                    <button class="card_button button ${!item.orderInfo.inStock ? 'gray-button' : ''}" onclick="event.stopPropagation()">
                        Add to cart
                    </button>
                    <div class="card_footer">
                        <div>
                            <img
                                src="images/red-like.svg"
                                alt=""
                                class="card_footer--red-like"
                            >
                            <p class="card_footer--reviews">
                                <strong>${item.orderInfo.reviews}%</strong>
                                Positive reviews
                                <br>
                                Above avarage
                            </p>
                        </div>
                        <div>
                            <p class="card_footer--orders">
                                <strong>${Math.round(0.5 + Math.random() * 10000)}</strong>
                                <br>
                                orders
                            </p>
                        </div>
                    </div>`)
        };
        element.onclick = () => innerModalCard(item);
        element.classList.add('card');
        element.insertAdjacentHTML('beforeend', card());
        itemsContainer.insertAdjacentElement('beforeend', element);
    });
}

cardRender(items);


document.querySelector('.cart-icon').addEventListener('change', function () {
    const cart = document.querySelector('.cart');
    cart.classList.toggle('cart-opener');
});

document.querySelector('.main_search-bar--filter').addEventListener('click', function () {
    document.querySelector('.filter').classList.toggle('open');
    document.querySelector('.main_cards').classList.toggle('open');
});

document.querySelectorAll('.filter_arrow').forEach(elem => {
    elem.addEventListener('click', function (event) {
        event.target.closest('.filter_header').classList.toggle('colored');
        event.target.closest('.filter_header').nextElementSibling.classList.toggle('closed')
    })
});
