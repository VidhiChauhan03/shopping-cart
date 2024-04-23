let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(shopData);
// console.log(basket);

let calculation = () => {
    // console.log("calculation function is running")
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
    // console.log();
    // console.log(cartIcon);
}
calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            // console.log(x);
            let { id, item } = x;
            let search = shopData.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
            <img width="100" src="${search.img}" alt="" />
            <div class="details">
            <div class="tittle-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">$ ${search.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x"></i>
            </div>
            <div class="buttons">
            <i onclick="decrement(${x.id})" class="bi bi-dash"></i>
            <div id=${x.id} class="quantity">${item}</div>
            <i onclick="increment(${x.id})" class="bi bi-plus"></i>
            </div>
            <h3>$ ${item*search.price}</h3>
            </div>
            </div>
            `;
        }).join("");
    }
    else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class ="HomeBtn">Back to home</button>
        </a>
        `;
    }
}
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => {
        return x.id === selectedItem;
    })
    if (search === undefined) {
        basket.push({
            id:selectedItem,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selectedItem);
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => {
        return x.id === selectedItem;
    });
    if(search === undefined) return
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem); 
    basket = basket.filter((x) => x.item != 0);
    generateCartItems();
    // console.log(basket);
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log("search ",search);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id)=> {
    let selectedItem = id;
    // console.log(selectedItem);
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

}

// let removeItem = (id) => {
//     let selectedItem = id;
//     // console.log(selectedItem);
//     basket = basket.filter((x) => {
//         if(x.id === selectedItem){
//             console.log(x.item);
//             x.item = 0;
//             generateCartItems();
//             localStorage.setItem("data", JSON.stringify(basket));
//             generateCartItems();
//             // console.log(x.item);
//         }
//         // console.log("stop")
//     })
// }
// generateCartItems();
// localStorage.setItem("data", JSON.stringify(basket));

let totalAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopData.find((y) => y.id === id) || [];
            // console.log(search.price)
             item = search.price*item;
             return item;
        })
        .reduce((x,y) => x+y, 0);
        // console.log(amount);
        label.innerHTML = `<h2>Total Bill:$ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeButton">Clear Cart</button>
        `;
    }
    else return;
}
totalAmount();

let clearCart = ()=> {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}