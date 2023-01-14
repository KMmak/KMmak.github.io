var products = [];

var total_discount = 0;

var total_amount = 0;

var final_amount = 0;

$(document).ready(function () {
  console.log("ready!");
  // load data
  $.ajax({
    url: "products.json",
  }).done(function (data) {
    //$(this).addClass("done");
    console.log("DONE", data);
    for (let d in data) {
      // save the data record into global variable
      products.push(data[d]);
      let dataStr = `<tr id="row${d}">
                <td style="width:40px"><img src='image/icondelete.png' class='icon' onclick="deleteProduct(${d})"></td>
                <td>${parseFloat(data[d].qty)}</td>
                <td>${data[d].item}</td>
                <td>${parseFloat(data[d].PricePerUnit).toFixed(2)}</td>
                <td>${parseFloat(data[d].discount).toFixed(2)}</td>
                <td>${parseFloat(
                  parseFloat(data[d].qty) * parseFloat(data[d].PricePerUnit)
                ).toFixed(2)}</td>
                <td>${parseFloat(
                  parseFloat(data[d].qty) * parseFloat(data[d].PricePerUnit) -
                    parseFloat(data[d].discount)
                ).toFixed(2)}</td>
            </tr>`;
      $("#data-table tr:last").after(dataStr);
      total_discount = total_discount + parseFloat(data[d].discount);
      $("#total_discount").html(total_discount.toFixed(2));
      total_amount =
        total_amount + parseFloat(data[d].qty) * parseFloat(data[d].PricePerUnit);
      $("#total_amount").html(total_amount.toFixed(2));
      final_amount =
        final_amount +
        parseFloat(
          parseFloat(data[d].qty) * parseFloat(data[d].PricePerUnit) -
            parseFloat(data[d].discount)
        );
      $("#final_amount").html(final_amount.toFixed(2));
    }
  });
});

$("#clearBtn").click(function () {
  for (let i = 0; i < products.length; i++) {
    delete products[i];
    let deletedRow = "#row" + i;
    $(deletedRow).remove();
  }
  total_discount = 0;
  total_amount = 0;
  final_amount = 0;
  $("#total_discount").html(total_discount.toFixed(2));
  $("#total_amount").html(total_amount.toFixed(2));
  $("#final_amount").html(final_amount.toFixed(2));
});



function addProduct() {
  let newProductQty = $("#newProductQty").val();
  let newProductItem = $("#newProductItem").val();
  let newProductPPU = $("#newProductPPU").val();
  let newProductDiscount = $("#newProductDiscount").val();
  let newProductAmount = parseFloat(
    parseFloat(newProductQty) * parseFloat(newProductPPU)
  ).toFixed(2);
  let amountAfterDiscount = parseFloat(
    parseFloat(newProductAmount) - parseFloat(newProductDiscount)
  ).toFixed(2);

  let ProductObject = {
    qty: newProductQty,
    item: newProductItem,
    PricePerUnit: newProductPPU,
    discount: newProductDiscount,
    amount: newProductAmount,
    amountAfterDiscount: amountAfterDiscount,
  };

  products.push(ProductObject);

  let newProductIndex = products.length - 1;
  let newProduct = products[newProductIndex];

  let dataStr = `<tr id="row${newProductIndex}">
        <td style="width:40px"><img src='image/icondelete.png' class='icon' onclick="deleteProduct(${newProductIndex})"></td>
        <td>${parseFloat(newProduct.qty)}</td>
        <td>${newProduct.item}</td>
        <td>${parseFloat(newProduct.PricePerUnit).toFixed(2)}</td>
        <td>${parseFloat(newProduct.discount).toFixed(2)}</td>
        <td>${newProduct.amount}</td>
        <td>${newProduct.amountAfterDiscount}</td>
    </tr>`;
  $("#data-table tr:last").after(dataStr);
  total_discount = total_discount + parseFloat(newProduct.discount);
  $("#total_discount").html(total_discount.toFixed(2));
  total_amount = total_amount + parseFloat(newProduct.amount);
  $("#total_amount").html(total_amount.toFixed(2));
  final_amount =
    final_amount + parseFloat(newProduct.amountAfterDiscount);
  $("#final_amount").html(final_amount.toFixed(2));
}

function deleteProduct(index) {
  total_discount = total_discount - parseFloat(products[index].discount);
  $("#total_discount").html(total_discount.toFixed(2));
  total_amount =
    total_amount -
    parseFloat(products[index].qty) * parseFloat(products[index].PricePerUnit);
  $("#total_amount").html(total_amount.toFixed(2));
  final_amount =
    final_amount -
    parseFloat(
      parseFloat(products[index].qty) * parseFloat(products[index].PricePerUnit) -
        parseFloat(products[index].discount)
    );
  $("#final_amount").html(final_amount.toFixed(2));
  delete products[index]; // Delete element from array
  let deletedRow = "#row" + index;
  $(deletedRow).remove(); //Delete row
}