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
    if (event.target.className.includes('grey-background')) {
        event.currentTarget.remove()
    }
}

let filter = {
    price: {from: 0, to: 0},
    color: [],
    memory: [],
    os: [],
    display: [],
};


document.querySelectorAll('.filter input').forEach(elem => {
    elem.addEventListener('change', function () {

        document.querySelectorAll('.filter_display input:checked').forEach(elem => {
            filter.display.push(elem.value)
        });
        document.querySelectorAll('.filter_memory input:checked').forEach(elem => {
            filter.memory.push(elem.value)
        });
        document.querySelectorAll('.filter_color input:checked').forEach(elem => {
            filter.color.push(elem.value)
        });
        document.querySelectorAll('.filter_os input:checked').forEach(elem => {
            filter.os.push(elem.value)
        });
        filter.price.min = document.querySelector('.filter_price--min').value;
        items.map(item => {

            //////

            let isFilterEmpty = true;

            const filtration = (items)=> {
                return isFilterEmpty ? items : items.filter(item => filteredData(item));



                    let res = 0;
                    for (let key in filter) {
                        switch (key) {
                            case 'price':
                                res = (filter[key].from < item.price && filter[key].to > item.price) ? 1 : -1;
                                break;
                            case 'color':
                                res = filter[key].findIndex(filterColor => item.color.findIndex(color => filterColor === color) > -1);
                                break;
                            case 'display':
                                res = filter[key].findIndex(filterItem => item.display > filterItem.from && item.display < filterItem.to)
                                break;
                        }

                        if (res === -1) {
                            break;
                        }
                    }
                    return (res > -1);
                };


            /////

            // if (filter.memory.length && !filter.memory.includes(item.storage)){
            //     return
            // }
            // if (filter.color.length && !filter.color.includes(item.color)){
            //     return
            // }
            // if (filter.display.length && !filter.display.includes(item.display)){
            //     return
            // }
            // if (filter.os.length && !filter.os.includes(item.os)){
            //     return
            // }
            // if (filter.price.min > item.price){
            //     return
            // }

            /////

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
    })
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


// const filter = {
//     display:[]
// };

// function filterUpdate(key,value){
//     console.log(key,value.srcElement.defaultValue)
//     if(value.srcElement.checked){
//         let index = filter[key].find(filterValue => filterValue.id === value.srcElement.defaultValue)
//         if(!index){
//             filter[key].push({id:value.srcElement.defaultValue, from :value.srcElement.defaultValue.split("-")[0],to :value.srcElement.defaultValue.split("-")[1]});
//         } }else{
//         let index = filter[key].findIndex(filterValue => filterValue.id === value.srcElement.defaultValue)
//         if(index>-1){
//             filter[key].splice(index);
//         }
//
//     }
//     if(filter[key].length===0){
//         createCard(items)
//         return;
//     }
//     runFilter()
// }
//
// function runFilter(){
//
//     let filterObjects = items.filter(device => filteredData(device));
//     cardsContainer.innerHTML = "";
//     createCard(filterObjects)
// }
//
//
// function filteredData(device){
//     let filterDevice = filter.display;
//     let res = filterDevice.find(filterItem=>  device.display > filterItem.from && device.display < filterItem.to)
// //let allKeys =filter.keys()
//     console.log(res);
//     return !!res
// }
