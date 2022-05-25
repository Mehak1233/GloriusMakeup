$(function(){
    const queryString = location.search;    
    console.log("Query String : ", queryString);

    const selectedProduct = queryString.substring(queryString.indexOf("=")+1);
    console.log(`Selected Country ${selectedProduct}`);

    const productURL = `${selectedProduct}`;
    console.log(productURL);

    $.ajax({
        type: "GET",
        url: productURL,
        dataType: "json",
        success: fetchProductDetails,
        error: function(request, error){
            console.error("Unable to fetch product details ", error);
        }
    });
});

class Product{
    constructor(id, name, price,quantity,tprice){
        this.id = id;
        this.quantity = quantity;
        this.tprice = tprice
        this.pName = name;
        this.pPrice = price;
       
    }
}

//global declaration
var CartProductList = new Array();
const KEY = "Cart_Products";
var quantity = 1;

function addProductToCart(newProduct){
    console.log(`product add to cart ${newProduct}`);
    // localStorage.setItem(newCountry.cName, JSON.stringify(newCountry));

    if (KEY in localStorage){
        //KEY exist in local storage
        const ProductList = JSON.parse(localStorage.getItem(KEY));
    
        //findIndex() - will check if any of the array element matches the given condition
        //if matches, returns the index of the element; otherwise, return -1
        var indexOfObject = ProductList.findIndex(elem => elem.pName === newProduct.pName);

        // if (isExist){
        if (indexOfObject !== -1){
            // alert("The country is already added to the fav list");
           
            var objectToUpdate = ProductList[indexOfObject];
            objectToUpdate.quantity = quantity+1;
            var pPrice = objectToUpdate.pPrice
            objectToUpdate.tprice = (objectToUpdate.quantity*pPrice)+((objectToUpdate.quantity*pPrice)*0.13);
            ProductList[indexOfObject] = objectToUpdate;
        }else{
            //Add newCountry into existing list (temporary) and write it to local storage
            ProductList.push(newProduct);
        }
        localStorage.setItem(KEY, JSON.stringify(ProductList));

    }else{
        //KEY doesn't exist...create a new one
       //add to array or cart list
        CartProductList.push(newProduct);

        //when sending the data to localstorage, the data needs to be in string format
        //convert the JS object into string using JSON.stringify()
        localStorage.setItem(KEY, JSON.stringify(CartProductList));
    }

}

function fetchProductDetails(data){
    //because data is an object
    console.log(`product details ${data.id}`);

    var productHTML = `
        <img id="image" src="${data.image_link}">
        <h1  id="pName"> ${data.name} </h1>
        <h3 id="pPrice"> Price : ${data.price} $</h3>
        <p id="description">${data.description}</p>
        <a id="plink" href="${data.product_link}">
        <h3> For futher details visit<b> here</b></h3></a>
        <br><br>
        <button id="addCartBtn"> Add To CART </button>
    `;

    $("#product").append(productHTML);


    $("#addCartBtn").on("click", function(){
        console.log("Add to Cart clicked")
        var newCart = new Product(data.id.toString(), data.name, data.price, quantity.toString(),data.price);
        console.log(newCart);
        addProductToCart(newCart);
        alert("added to cart");
    });
}