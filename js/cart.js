$(function(){
    //fetch data from local storage at loading page
    console.log("fetching.....");
    const KEY = "Cart_Products";
    var cartList = JSON.parse(localStorage.getItem(KEY));
    var tAmount = 0;
    var outputElements
    var cartArray = new Array();
   // console.log(cartList);
     

    // displaying data
    for (i=0 ; i<cartList.length; i++){
        
      //  creating html for products to be display
         outputElements =  
        `<div class="cartItems">
        <span class="id" hidden>${cartList[i].id}</span>
        <h4 class="pname"> ${cartList[i].pName} </h4>
        <div class ="pprice">
        <span>PRICE PER PIECE - </span>
        <span class="price">${(cartList[i].pPrice)}</span>
        <span>$</span>
        </div>
        <label for="quantity">Quantity:</label>
        <button class ="subNum">-</button>
        <input type="number" class="quantity" name="quantity" value="${(cartList[i].quantity)}" min="1">
        <button class="addNum">+</button>
        <button class="btn delete_btn">REMOVE ITEM</button>
        <div class="TpriceContainer">
        <span>TOTAL PRICE INCLUSIVE TAX IS - </span>
        <span class="Tprice">${cartList[i].tprice}</span>
        </div>
        <p class="overallAmpunt"></p>
        </div><br>`;
        
         $(".cartProducts").append(outputElements);
        // cartArray.push(cartList[i].tprice);
         
     }

       console.log(cartArray);
       var totalOutput = `<div class="totalContainer">
          <button class="totalPrice">VIEW TOTAL AMOUNT</button>
          <div class="tAmountContainer" hidden>
           <Span>OVERALL TOTAL AMOUNT AFTER DISCOUNT - </Span>
           <span class="tAmount"></span>
          </div>
           <button class ="buy">BUY</button>
       </div>`

     $(".cartProducts").append(totalOutput);
    
    
     

     $(".totalPrice").on('click', (e) =>{
       
        console.log(cartList);
        console.log("totalclicked");
       for(i=0;i<cartList.length;i++){
            tAmount += Number(cartList[i].tprice)
       }
       if(tAmount<75){
           tAmount = tAmount;
       }
       else if(tAmount>75 && tAmount<100){
            tAmount = tAmount*0.90;
       }
       else if(tAmount>100 && tAmount<150){
           tAmount = tAmount*0.80;
       }
       else{
           tAmount = tAmount*0.70;
       }

       const Amount = e.target.closest('.totalContainer');
       const Amt = Amount.querySelector('.tAmount').innerHTML=`${tAmount}`;
        console.log(tAmount);
        Amount.querySelector('.tAmountContainer').style.display="block";
     });



     function removeItem(id) {
        console.log(id);
        cartList.forEach((item, index) => {
            console.log(item.id);
            if (item.id == id) {
                cartList.splice(index, 1)
            }
            localStorage.setItem(KEY, JSON.stringify(cartList));
        })
    }

    function updateItemToLocal(totalPrice,quantity,id){
        console.log("update called");
        
        if (KEY in localStorage){
            //KEY exist in local storage
            const ProductList = JSON.parse(localStorage.getItem(KEY));
          
            //findIndex() - will check if any of the array element matches the given condition
            //if matches, returns the index of the element; otherwise, return -1
            var indexOfObject = ProductList.findIndex(elem => elem.id == id);
    
            // if (isExist){
            if (indexOfObject !== -1){
                // alert("The country is already added to the fav list");
               
                var objectToUpdate = ProductList[indexOfObject];
                objectToUpdate.quantity = quantity;
                objectToUpdate.tprice = totalPrice;
                ProductList[indexOfObject] = objectToUpdate;
            }else{
                console.log("key doesnot exists");
            }
            localStorage.setItem(KEY, JSON.stringify(ProductList));
    
        }else{
            console.log("key doesnot exists");
        }
    }

    
      
     $(".cartProducts").on('click', (e) =>{
         var price;
        if (e.target.classList.contains('addNum')||e.target.classList.contains('subNum')) {
            const currentItem = e.target.closest('.cartItems');
            let num = Number(currentItem.querySelector('.quantity').value);
            const price =Number(currentItem.querySelector('.price').textContent) ;
           
            if(e.target.classList.contains('addNum')){
                num = num+1;
            }
            else if(e.target.classList.contains('subNum')){
                num = num-1;
            }

            console.log("quantity num"+num);
            console.log("price "+ price);
            let tPrice = (num*price)+((num*price)*0.13);
           console.log(tPrice);
           var pname = currentItem.querySelector('.pname').textContent;
           console.log(pname);
           var id = currentItem.querySelector('.id').textContent;
           var quantity = currentItem.querySelector('.quantity').value =`${num}`;
           var totalPrice = currentItem.querySelector('.Tprice').innerHTML=`${tPrice}`;
           updateItemToLocal(totalPrice,quantity,id);
           
            
            
        }
      
        if (e.target.classList.contains('delete_btn')) {
            console.log("remove clicked");
            const currentItem = e.target.closest('.cartItems');
            currentItem.remove();
            const id = currentItem.querySelector('span').textContent;
            removeItem(Number(id));
          
        }
        
    });

    $(".buy").on('click', (e) =>{
        alert("Thankyou for purchasing");
        localStorage.removeItem(KEY);
        document.location.reload(true);
         
      });
    
});






