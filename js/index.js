


const apiURL = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl";

// to feta data from api
$.ajax({
    type: "GET",
    url: apiURL,
    dataType: "json",
    success: fetchAllProducts,
    
    error: function(request, error){
        alert("Unable to fetch data " + error);
    }
});

function fetchAllProducts(allProducts){
     console.log("data is fetched");

    for (i=0 ; i<allProducts.length; i++){
        console.log("Product Name : " + allProducts[i].name);
        console.log("Product price : " + allProducts[i].price);
        console.log("productsapi="+allProducts[i].product_api_url);
        
      //  creating html for products to be display
        var outputElements =  
        `<div class="column productCard">
        <h4> ${allProducts[i].name} </h4>
        
            <img src = "${allProducts[i].image_link}" class = "imageCard"> 
        
        <p>${(allProducts[i].price)+` $`}</p>
        <a href="productInfo.html?product_api_url=${allProducts[i].product_api_url}" class="link">
        <button class="showMore">show more</button>
        </a>
        </div><br>`;
         
        console.log(outputElements);
       
         $("#productData").append(outputElements);
       
    }
   
}