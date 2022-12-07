var products = [

    {

        name: "Samsung TV 50",

        quantity: 1,

        ppu: 15000

    },

    {

        name: "Xiaomi Fan",

        quantity: 2,

        ppu: 500

    },

    {

        name: "iPhone 14 Pro Max Ultra",

        quantity: 1,

        ppu: 50000

    },

    {

        name: "Logitec Gaming Mouse",

        quantity: 1,

        ppu: 4000

    }

]
function loadData() {

    let elem = document.getElementById("myName")

    elem.innerHTML = "KAR MINE"



    let productList = document.getElementById("productList")



    for (let p in products) {

        let row = document.createElement("tr")

        let productName = document.createElement("td")

        productName.innerHTML = products[p].name



        let quantity = document.createElement("td")

        quantity.innerHTML = products[p].quantity

        quantity.classList.add("text-right")



        let ppu = document.createElement("td")

        ppu.innerHTML = products[p].ppu

        ppu.classList.add("text-right")



        let total = document.createElement("td")

        total.innerHTML = products[p].ppu * products[p].quantity

        total.classList.add("text-right")



        row.appendChild(productName)

        row.appendChild(quantity)

        row.appendChild(ppu)

        row.appendChild(total)

        productList.appendChild(row)

    }




}