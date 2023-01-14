var customers = []


$(document).ready(function() {
    console.log("Welcome to GG Store!!")
    // load data
    $.ajax({
        url: "data.json",
    }).done(function (data) {
        //$(this).addClass("done");
        
        for(let d in data) {
            customers.push(data[d])
            let dataStr = `<tr> 
                <td><img style="width: 1.5em;" src='delete.png' onclick='deleteCustomer("${d}")'>${data[d].name}</td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
            $("#data-table tr:last").after(dataStr)
        }

        console.log(customers)
    });
});    

function deleteCustomer(index) {
    console.log("Delete " + index)
    delete customers[index]

    console.log(customers)

    var count = $('#data-table tr').length;
    //To count how many rows are there in a table...
    //console.log(count)

    while (count > 1) {
        document.getElementById("data-table").deleteRow(1);
        count--;
    }

    for (let c in customers) {
        let csData = `<tr>
        <td><img style="width: 1.5em;" src='delete.png' onclick='deleteCustomer("${c}")'>${customers[c].name}</td>
        <td>${customers[c].email}</td>
        <td>${customers[c].phone}</td>
        </tr>`
        $("#data-table tr:last").after(csData)
    }
}

function addCustomer() {
    let newName = (document.getElementById("exampleFormControlInput1")).value
    console.log(newName)

    let newCustomer = {
        name: $('#exampleFormControlInput1').val(),
        email: $('#exampleFormControlInput2').val(),
        phone: $('#exampleFormControlInput3').val()
    }

    customers.push(newCustomer)
    console.log(customers)

    let newData =  `<tr>
    <td><img style="width: 1.5em;" src='delete.png' onclick='deleteCustomer("${(customers.length)-1}")'>${newCustomer.name}</td>
    <td>${newCustomer.email}</td>
    <td>${newCustomer.phone}</td>
    </tr>`

    $("#data-table tr:last").after(newData)
}