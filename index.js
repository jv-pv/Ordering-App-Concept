import { menuArray } from "./data.js"; 

const foodItemsFeed = document.getElementById("food-item-feed");
const orderDetails = document.getElementById("order-details");
const orderList = document.getElementById("order-list");
const totalPriceEl = document.querySelector(".order-total .item-price");
const modal = document.getElementById("modal");
const cardPaymentForm = document.getElementById("card-payment-form");
let selectedItems = [];

document.addEventListener('click', function(e){
    if (e.target.matches(".add-btn") || e.target.matches(".fa-plus")){
        handleAddBtnClick(e.target.dataset.food);
    } else if (e.target.matches('.remove-btn')) {
        handleRemoveBtnClick(e.target.dataset.food);
    } else if (e.target.matches('.modal-close-btn')){
        modal.style.display = "none";
    } else if (e.target.matches(".complete-btn")) {
        modal.style.display = "block";
    } else if (e.target.matches(".modal-pay-btn")){
        console.log('click')
    }
})

cardPaymentForm.addEventListener('submit', function(e){
    e.preventDefault();

    const paymentFormData = new FormData(cardPaymentForm);
    const customerName = paymentFormData.get("cardHolderName");

    const confirmationDiv = document.createElement('div');
    confirmationDiv.innerHTML = `
    <div class="order-confirm-msg">
        <h3> Thank you, <span class="customer-name">${customerName}</span>! Your order is confirmed :)</h3>
    </div>
    `;

    orderDetails.replaceWith(confirmationDiv);

    modal.style.display = "none";

    console.log(customerName);
})

function handleAddBtnClick(foodId) {
    const numericFoodId = parseInt(foodId, 10);
    const selectedItem = menuArray.find(function(food){
        return food.id === numericFoodId;
    })
    selectedItems.push(selectedItem);
    updateOrderList();
    updateTotalPrice();
    render();
}

function handleRemoveBtnClick(foodId){
    const numericFoodId = parseInt(foodId, 10);
    const indexToRemove = selectedItems.findIndex(function(items){
        return items.id === numericFoodId;
    })

    if (indexToRemove !== -1){
        selectedItems.splice(indexToRemove, 1);
    }
    updateOrderList();
    updateTotalPrice()
    render();
}

function getFoodHtml(){
    let foodHtml = '';
    menuArray.forEach(function(food){
        foodHtml += `
    <div class="item-container">
        <div class="emoji">${food.emoji}</div>
        <div class="food-data">
            <h3>${food.name}</h3>
            <p>${food.ingredients}</p>
            <p>$${food.price}</p>
        </div>
        <div class="button-container align-right">
            <button type="button" class="add-btn" data-food="${food.id}"><i class="fa-thin fa-plus" data-food="${food.id}"></i></button>
        </div>
    </div>
        `;
    })
    return foodHtml;
}

function toggleOrderDetailsVisibilty() {
    if (selectedItems.length > 0){
        orderDetails.style.display = "block";
    } else {
        orderDetails.style.display = "none";
    }
}

function updateOrderList(){
    let orderListHtml = '';
    selectedItems.forEach(function(item){
        orderListHtml += `
            <li class="order-contents">
                <h3>${item.name}</h3>
                <button class="remove-btn" data-food="${item.id}">remove</button>
                <p class="align-right item-price">$${item.price}</p>
            </li>
        `;
    });
    return orderListHtml;
}

function updateTotalPrice() {
    const totalPrice = selectedItems.reduce(function(total, item){
        return total + item.price;

    }, 0);
    totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
}

function render() {
    foodItemsFeed.innerHTML = getFoodHtml();
    orderList.innerHTML = updateOrderList();
    toggleOrderDetailsVisibilty();
}

render()