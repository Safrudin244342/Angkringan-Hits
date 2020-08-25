const listProducts = [
    {
        "id": "1",
        "name": "Espresso",
        "price": "10000",
        "quantity": "100",
        "image": "img/product/jeremy-ricketts-6ZnhM-xBpos-unsplash.png"
    },{
        "id": "2",
        "name": "Coffe Lattte",
        "price": "15000",
        "quantity": "100",
        "image": "img/product/bear.png"
    },{
        "id": "3",
        "name": "Cappucino",
        "price": "5000",
        "quantity": "100",
        "image": "img/product/firdaus-roslan-pN769u0KHNA-unsplash.png"
    },{
        "id": "4",
        "name": "Red Velvet Latte",
        "price": "33000",
        "quantity": "100",
        "image": "img/product/redvelvet.png"
    },{
        "id": "5",
        "name": "Choco Rhum",
        "price": "28000",
        "quantity": "100",
        "image": "img/product/chocorum.png"
    },{
        "id": "6",
        "name": "Black Forest",
        "price": "30000",
        "quantity": "100",
        "image": "img/product/blackforest.png"
    },{
        "id": "7",
        "name": "Chicken Katsu Dabu-dabu",
        "price": "60000",
        "quantity": "100",
        "image": "img/product/chickenkatsu.png"
    },{
        "id": "8",
        "name": "Salmon Truffle Teriyaki",
        "price": "60000",
        "quantity": "100",
        "image": "img/product/salmon.png"
    },{
        "id": "9",
        "name": "Wiener Schnitzel",
        "price": "69000",
        "quantity": "100",
        "image": "img/product/wiener.png"
    }
]

let listOrders = [];

function changeToRupiah(value){
    let	number_string = value.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
    if (ribuan) {
	    separator = sisa ? '.' : '';
	    rupiah += separator + ribuan.join('.');
    }

    return rupiah
}

function clearOrder(){

    listOrders.forEach(value => {
        let remOrder = document.getElementById(`order${value.id}`)
        remOrder.parentNode.removeChild(remOrder)

        let remSelect = document.getElementById(`selectProduct${value.id}`)
        remSelect.parentNode.removeChild(remSelect)
    })

    listOrders = []
    upadatePriceOrder();

    document.getElementById("noOrder").style.setProperty("display", "flex");
    document.getElementById("order").style.setProperty("display", "none");
    document.getElementById("listOrder").style.setProperty("overflow", "hidden")
}

function changeUpEstimasi(id){
    
    let product = listProducts.filter(value => value.id == id)[0]
    let order = listOrders.filter(value => value.id == id)[0]
    console.log(listOrders)
    
    if(parseInt(order.estimasi) < parseInt(product.quantity)){
        order.estimasi = parseInt(order.estimasi) + 1
        document.getElementById(`estimasiOrder${id}`).innerHTML = order.estimasi
        document.getElementById(`itemOrderPrice${id}`).innerHTML = `Rp. ${changeToRupiah(parseInt(order.price) * parseInt(order.estimasi))}`
    
        listOrders[listOrders.findIndex(value => value.id == id)] = order

        upadatePriceOrder();
    }else{
        console.log("Persedian barang menipis")
    }
}

function changeDownEstimasi(id){
    let order = listOrders.filter(value => value.id == id)[0]
    
    if (parseInt(order.estimasi) > 1){
        order.estimasi = parseInt(order.estimasi) - 1

        document.getElementById(`estimasiOrder${id}`).innerHTML = order.estimasi
        document.getElementById(`itemOrderPrice${id}`).innerHTML = `Rp. ${changeToRupiah(parseInt(order.price) * parseInt(order.estimasi))}`

        listOrders[listOrders.findIndex(value => value.id == id)] = order

        let setCookie = {
            "listProducts": listProducts,
            "listOrders": listOrders
        }

        document.cookie = JSON.stringify(setCookie);
        upadatePriceOrder();
    }else{
        let remOrder = document.getElementById(`order${id}`)
        remOrder.parentNode.removeChild(remOrder)

        let remSelect = document.getElementById(`selectProduct${id}`)
        remSelect.parentNode.removeChild(remSelect)

        let newListOrders = listOrders.filter(value => value.id != id)
        listOrders = newListOrders;

        upadatePriceOrder();

        if (newListOrders.length == 0){
            document.getElementById("noOrder").style.setProperty("display", "flex");
            document.getElementById("order").style.setProperty("display", "none");
        }else if(newListOrders.length <= 3){
            document.getElementById("listOrder").style.setProperty("overflow", "hidden")
        }
    }
}

function upadatePriceOrder(){
    let newPrice = 0;

    for(value of listOrders){
        newPrice += (parseInt(value.price) * parseInt(value.estimasi))
    }

    document.getElementById("pay").innerHTML = `Rp. ${changeToRupiah(newPrice)}*`;
    document.getElementById("countOrder").innerHTML = listOrders.length;
    let elmCounts = document.querySelectorAll("[id='countOrder']");

    for(elmCount of elmCounts){
        elmCount.innerHTML = listOrders.length;
    }
}

function addCart(id){

    let product = listProducts.filter(value => value.id == id)[0]
    
    if (listOrders.filter(value => value.id == id).length == 0){
        document.getElementById("noOrder").style.setProperty("display", "none");
        document.getElementById("order").style.setProperty("display", "flex");

        let newOrder = document.createElement("div");
        newOrder.setAttribute("class", "item")
        newOrder.setAttribute("id", `order${product.id}`)
        newOrder.innerHTML = `
            <img src="${product.image}">
            <div class="detail">
                <div class="title">
                    ${product.name}
                </div>
                <div class="navigation">
                    <div class="action">
                        <button onclick="changeDownEstimasi(${product.id})">-</button>
                        <div id="estimasiOrder${product.id}" class="estimasi">
                            1
                        </div>
                        <button onclick="changeUpEstimasi(${product.id})">+</button>
                    </div>
                    <div class="price" id="itemOrderPrice${product.id}">
                        Rp. ${changeToRupiah(product.price)}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('listOrder').appendChild(newOrder);

        let selectProduct = document.createElement("div");
        selectProduct.setAttribute("class", "select")
        selectProduct.setAttribute("id", `selectProduct${product.id}`)
        selectProduct.innerHTML = `<img src="img/icon/tick (1).png">`;

        document.getElementById(`productImage${product.id}`).appendChild(selectProduct);

        listOrders.push({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "estimasi": 1
        })
        upadatePriceOrder();

        if(listOrders.length > 3){
            document.getElementById("listOrder").style.setProperty("overflow", "scroll")
        }
    }else{
        let remOrder = document.getElementById(`order${product.id}`)
        remOrder.parentNode.removeChild(remOrder)

        let remSelect = document.getElementById(`selectProduct${product.id}`)
        remSelect.parentNode.removeChild(remSelect)

        let newListOrders = listOrders.filter(value => value.id != product.id)

        listOrders = newListOrders
        console.log(listOrders)
        upadatePriceOrder()

        if (newListOrders.length == 0){
            document.getElementById("noOrder").style.setProperty("display", "flex");
            document.getElementById("order").style.setProperty("display", "none");
        }else if(newListOrders.length <= 3){
            document.getElementById("listOrder").style.setProperty("overflow", "hidden")
        }
    }
}

function printCheckout(){
    let restorePage = document.body.innerHTML;
    let documentPrint = document.createElement("div");
    let allPay = 0;
    
    documentPrint.innerHTML = `
        <center><h1>Angkringan Hits<h1></center><br>
    `;
    
    listOrders.forEach(value => {
        allPay += (parseInt(value.price) * parseInt(value.estimasi)) 
        let item = document.createElement("div")
        item.style.setProperty("display", "flex")
        item.style.setProperty("justify-content", "space-between")
        item.style.setProperty("padding", "10px")
        item.innerHTML = `
            <div>${value.name} ${value.estimasi}x</div> <div>Rp. ${changeToRupiah(parseInt(value.price) * parseInt(value.estimasi))}</div>
        `

        documentPrint.appendChild(item)
    });

    let tax = (allPay * 10) / 100;
    allPay += tax;
    let itemTax = document.createElement("div");
    itemTax.style.setProperty("display", "flex");
    itemTax.style.setProperty("justify-content", "space-between");
    itemTax.style.setProperty("padding", "10px");
    itemTax.innerHTML = `<div>Ppn 10%</div> <div>Rp. ${changeToRupiah(tax)}</div>`;
    documentPrint.appendChild(itemTax);

    let itemAllPay = document.createElement("div");
    itemAllPay.style.setProperty("text-align", "right")
    itemAllPay.style.setProperty("padding", "10px");
    itemAllPay.innerHTML = `Total: Rp. ${changeToRupiah(allPay)}`;
    documentPrint.appendChild(itemAllPay);

    document.body.innerHTML = documentPrint.innerHTML;
    window.print();
    document.body.innerHTML = restorePage;
}
