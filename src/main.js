let shop = document.getElementById('shop');
// let minus = document.querySelector('.bi-dash');
// let plus = document.querySelector('.bi-plus');

    let basket = JSON.parse(localStorage.getItem("data")) || [];

    let generateshop = () => {
        return (shop.innerHTML = shopData.map((x) => {
            let search = basket.find((y) => y.id === x.id) || []
            return `<div id= product-id-${x.id} class="item">
            <img width="220" src="${x.img}" alt="">
            <div class="details">
                <h3>${x.name}</h3>
                <p>${x.desc}</p>
                <div class="price-quantity">
                    <h2>$ ${x.price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash"></i>
                        <div id=${x.id} class="quantity">${search.item === undefined? 0: search.item}</div>
                        <i onclick="increment(${x.id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
            </div>`
        }).join(""));
    }
    generateshop();

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
    // console.log(basket);
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log("search ",search);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    // console.log("calculation function is running")
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
    // console.log();
    // console.log(cartIcon);
}
calculation();