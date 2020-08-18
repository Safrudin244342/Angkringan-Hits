function showProducts(listProduct){
    listProduct.forEach(value => {
        let newItem = document.createElement("div")
        let name = value.name;
        let sortName = name.length > 16 ? `${name.split('').splice(0, 13).join('')}...` : name;
        
        newItem.setAttribute("class", "item select")
        newItem.setAttribute("id", `product${value.id}`)
        newItem.setAttribute("onclick", `addCart(${value.id})`)
        newItem.innerHTML = `
            <div class="img" id="productImage${value.id}">
                <img src="${value.image}">
            </div>
            <div class="name">
                ${sortName}
            </div>
            <div class="price">
                Rp. ${changeToRupiah(value.price)}
            </div>
        `;

        document.getElementById('listFood').appendChild(newItem);
    })
}

function showAddItem(){
    document.getElementById("modal").style.setProperty("display", "block");
    document.getElementById("addItem").style.setProperty("display", "block");
}

function closeModal(id){
    document.getElementById("modal").style.setProperty("display", "none");
    document.getElementById(id).style.setProperty("display", "none");

    if(id == "checkout"){

        listOrders.forEach(value => {
            let remOrder = document.getElementById(`checkoutItem${value.id}`)
            remOrder.parentNode.removeChild(remOrder)
        })

        let remOrder = document.getElementById(`checkoutItemtax`)
        remOrder.parentNode.removeChild(remOrder)
    }
}

function showCheckout(){

    document.getElementById("modal").style.setProperty("display", "block");
    document.getElementById("checkout").style.setProperty("display", "block");

    let payAll = 0;

    listOrders.forEach(value => {
        let pay = parseInt(value.price) * parseInt(value.estimasi)
        payAll += parseInt(pay)

        let newItem = document.createElement("div")
        newItem.setAttribute("class", "item")
        newItem.setAttribute("id", `checkoutItem${value.id}`)
        newItem.innerHTML = `
            <div class="name">
                ${value.name} ${value.estimasi}x
            </div>
            <div class="price">
                Rp. ${changeToRupiah(pay)}
            </div>
        `

        document.getElementById("checkoutList").appendChild(newItem)
    })

    let tax = (parseInt(payAll) * 10) / 100
    payAll += parseInt(tax)

    let newItem = document.createElement("div")
    newItem.setAttribute("class", "item")
    newItem.setAttribute("id", `checkoutItemtax`)
    newItem.innerHTML = `
        <div class="name">
            Ppn 10%
        </div>
        <div class="price">
            Rp. ${changeToRupiah(tax)}
        </div>
    `
    document.getElementById("checkoutList").appendChild(newItem)

    if((listOrders.length + 1) > 3){
        document.getElementById("checkoutList").style.setProperty("overflow", "scroll")
    }else{
        document.getElementById("checkoutList").style.setProperty("overflow", "hidden")
    }

    document.getElementById("checkoutPrice").innerHTML = `Total: Rp. ${changeToRupiah(payAll)}`;
}

function showMenu(){
    document.getElementById("menu").style.setProperty("display", "flex");
    document.getElementById("btnMenu").setAttribute("onclick", "hideMenu()");
}

function hideMenu(){
    document.getElementById("menu").style.setProperty("display", "none");
    document.getElementById("btnMenu").setAttribute("onclick", "showMenu()");
}

function showListOrder(){
    document.getElementById("formOrder").style.setProperty("display", "flex");
    document.getElementById("btnOrder").setAttribute("onclick", "hideListOrder()");
}

function hideListOrder(){
    document.getElementById("formOrder").style.setProperty("display", "none");
    document.getElementById("btnOrder").setAttribute("onclick", "showListOrder()");
}

showProducts(listProducts)