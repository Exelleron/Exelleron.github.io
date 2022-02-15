'use strict';

let itemsContainer = document.getElementById('items');
itemsContainer.innerHTML = '';


function innerModalCard (item){
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

                    <div class="modal-card_info--specifications">

                        <span class="specifications_color">${item.color}</span>

                        <span class="specifications_os">${item.os}</span>

                        <span class="specifications_chip">${item.chip.name}</span>

                        <span class="specifications_height">${item.size.height}</span>

                        <span class="specifications_width">${item.size.width}</span>

                        <span class="specifications_depth">${item.size.depth}</span>

                        <span class="specifications_weight">${item.size.weight}</span>

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
        </div>`
    document.body.insertAdjacentHTML('afterbegin', currentCard);
}

function removeModalCard(event) {
    if (event.target.className.includes('grey-background')){
        event.currentTarget.remove()
    }
}

items.map(item => {
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

                    <button class="card_button button ${!item.orderInfo.inStock ? 'gray-button' : ''}">
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

// document.querySelectorAll('.filter input').forEach(elem => {
//     elem.addEventListener('change', function () {
//         const filter = {memory: [], color: [], os:[], price: {min: 0, max: 10000}};
//
//         document.querySelectorAll('.filter_memory input:checked').forEach(elem => {
//             filter.memory.push(elem.value)
//         });
//         document.querySelectorAll('.filter_color input:checked').forEach(elem => {
//             filter.color.push(elem.value)
//         });
//         filter.price.min = document.querySelector('.filter_price--min').value
//         items.map(item => {
//             if (filter.memory.length && !filter.memory.includes(item.storage)){
//                 return
//             }
//             if (filter.color.length && !filter.color.includes(item.color)){
//                 return
//             }
//             if (filter.price.min > item.price){
//                 return
//             }
//
//             const card = `<div class="card">
//                     <div class="card_like">
//                         <img src="images/like.svg" alt="like">
//                     </div>
//
//                     <div class="card_image">
//                         <img
//                             class="main-image"
//                             src="${item.imgUrl}"
//                             alt="product_image"
//                         >
//                     </div>
//
//                     <div class="card_header">
//                         <span class="card_header--title">${item.name}</span>
//                     </div>
//
//                     <div class="card_info">
//                         <p class="card_info--stock">
//                             <img
//                                 class="card_info--true-false"
//                                 src="${item.orderInfo.inStock ? 'images/true.svg' : 'images/false.svg'}"
//                                 alt="true"
//                             >
//                             <span class="count-in-stock">${item.orderInfo.inStock}</span> left in stock
//                         </p>
//                         <p class="card_info--price">
//                             Price: <strong>${item.price}</strong> $
//                         </p>
//                     </div>
//
//                     <button class="card_button button ${!item.orderInfo.inStock ? 'gray-button' : ''}">
//                         Add to cart
//                     </button>
//
//                     <div class="card_footer">
//                         <div>
//                             <img
//                                 src="images/red-like.svg"
//                                 alt=""
//                                 class="card_footer--red-like"
//                             >
//                             <p class="card_footer--reviews">
//                                 <strong>${item.orderInfo.reviews}%</strong>
//                                 Positive reviews
//                                 <br>
//                                 Above avarage
//                             </p>
//                         </div>
//                         <div>
//                             <p class="card_footer--orders">
//                                 <strong>${Math.round(0.5 + Math.random() * 10000)}</strong>
//                                 <br>
//                                 orders
//                             </p>
//                         </div>
//                     </div>
//                 </div>`;
//
//             itemsContainer.innerHTML += card;
//
//         });
//     })
// });
