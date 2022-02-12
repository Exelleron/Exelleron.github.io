'use strict';

let itemsContainer = document.getElementById('items');
itemsContainer.innerHTML = '';


items.map(item => {
    // let newElement = document.createElement('div');
    // newElement.classList.add('card_image');
    // let tvImage = card.querySelector('.main-image');
    // tvImage[0].src = item.imgUrl;
    //
    // let header = card.getElementsByClassName('card_header--title');
    // header[0].textContent = item.name;
    //
    // let count = document.getElementsByClassName('count-in-stock');
    // count.textContent = item.orderInfo.inStock;
    //
    // newElement.innerHTML = card.innerHTML;

    const card = `<div class="card">
                    <div class="card_like">
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

                    <button class="card_button button">
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
                    </div>
                </div>`;
    itemsContainer.innerHTML += card;

});
