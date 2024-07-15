function signup() {
    var firstName=document.getElementById("firstName").value;
    if (firstName.length < 3) {
        document.getElementById("firstNameError").innerHTML="first must have at least 3 chars";
        document.getElementById("firstNameError").style.color="red"; } 
    else {document.getElementById("firstNameError").innerHTML="";
        
    }
    var lastName=document.getElementById("lastName").value;
    if (lastName.length < 5) {
        document.getElementById("lastNameError").innerHTML="first must have at least 5 chars";
        document.getElementById("lastNameError").style.color="red"; } 
    else {document.getElementById("lastNameError").innerHTML="";
        
    }
    var email=document.getElementById("email").value;
    var verifEmail=validateEmail(email);
    if (verifEmail) { document.getElementById('emailError').innerHTML="";
       } else { 
            document.getElementById('emailError').innerHTML="Invalid email";
            document.getElementById('emailError').style.color="red";
    } 
    if (emailExiste(email) ) {
        document.getElementById('emailExisteError').innerHTML="Email already exists";
        document.getElementById('emailExisteError').style.color="red";
     } else

     {   document.getElementById('emailExisteError').innerHTML="";

    }
    var tel=document.getElementById("tel").value;
    if ( isNaN(tel) || tel.length!=8) {
            document.getElementById("telError").innerHTML="Invalid tel";
            document.getElementById("telError").style.color="red";
            
        } else {document.getElementById("telError").innerHTML="";
            
        }
    var password=document.getElementById("password").value;
    var verifPassword=checkPassword(password);
    if (verifPassword) { document.getElementById('passworError').innerHTML="";
       } else { 
            document.getElementById('passworError').innerHTML="Invalid password";
            document.getElementById('passworError').style.color="red";
    }
    var confirmPassword=document.getElementById("confirmPassword").value;
    if (confirmPassword == password) {
        document.getElementById("confirmPasswordError").innerHTML=" "
     } else {
        document.getElementById("confirmPasswordError").innerHTML="Confirm Password must match password "
        document.getElementById("confirmPasswordError").style.color="red"
     }
     if ((firstName.length >=3) && (lastName.length >= 5) && verifEmail && (!isNaN(tel) || tel.length==8) && confirmPassword && (password == confirmPassword &&(!emailExiste(email)))) { 
        var idUser=JSON.parse(localStorage.getItem("idUser")||"10") 
        var user ={
            id:idUser ,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            password: password,
            role:"client"
        }
        var users=JSON.parse(localStorage.getItem("users")||"[]");
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("idUser",idUser+1);
       
     }
    location.replace("login.html");
  } 
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function checkPassword(password){
      var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return re.test(password);

  }
  function emailExiste(email) {
    var users= JSON.parse(localStorage.getItem("users")||"[]");
    var existe= false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email==email) {
            existe=true;
            break;
            
        }
        
        
    }
       return existe ;  
  }
function addProduct(){
    var ProductName=document.getElementById("ProductName").value; 
    if (ProductName.length <3) {
        document.getElementById("ProductNameError").innerHTML="plat Name must have at least 3 characters";
        document.getElementById("ProductNameError").style.color="red";
        return;
        
    } else {
        document.getElementById("ProductNameError").innerHTML="";
    }
    var price=document.getElementById("price").value;
    if (price <= 0) {
        document.getElementById("priceError").innerHTML="price must be greater than 0 ";
        document.getElementById("priceError").style.color="red";
        return;
    } else {
        document.getElementById("priceError").innerHTML="";
    }
    var category=document.getElementById("category").value;
    if (category.length ==0 ) {
        document.getElementById("categoryError").innerHTML="category is required";
        document.getElementById("categoryError").style.color="red";
        return;
    } else {
        document.getElementById("categoryError").innerHTML="";
    }

    var image=document.getElementById("image").value;
    var newImage= replacech(image);
        console.log(image);
       
       
    if (( ProductName.length >=3) && (price> 0) && (category.length !=0)){

        var idProduct=JSON.parse(localStorage.getItem("idProduct")||"1") 
       
        
    var Product ={
        id:idProduct ,
        ProductName:ProductName,
        price: price,
        category: category,
        image:newImage
        
        
    }
    var Products=JSON.parse(localStorage.getItem("Products")||"[]");
    Products.push(Product);
    localStorage.setItem("Products",JSON.stringify(Products));
    localStorage.setItem("idProduct",idProduct+1);
    location.reload(); 
    
        
    }
  }
function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var users=JSON.parse(localStorage.getItem("users")||"[]");
    var findedUser;
    for (let i = 0; i < users.length; i++) {
       if (users[i].email == email && users[i].password == password ) {
        findedUser = users[i]
            break;
       }
        
    }
    
    if (findedUser) { 
        //user exist
        document.getElementById("loginError").innerHTML="";
        localStorage.setItem("connectedUser",JSON.stringify(findedUser));
        // redirection 
        switch (findedUser.role) {
            case "client":
                location.replace("index.html");
                break;
        
            case "admin":
                location.replace("dashboardAdmin.html");
                break;
        }

    } else {
        //user not exist 
        document.getElementById("loginError").innerHTML="Wrong informations";
        document.getElementById("loginError").style.color="red";
    }
    
  }
function insertAdmins() {
    var admin1 ={
    id: 1 ,
    firstName: "admin1" ,
    lastName: "admin1" ,
    email: "admin1@gmail.com" ,
    tel:"25890744" ,
    password: "admin1@2050",
    role: "admin"
}
var admin2 ={
    id: 2 ,
    firstName: "admin2" ,
    lastName: "admin2" ,
    email: "admin2@gmail.com" ,
    tel:"25890966" ,
    password: "admin2@2090",
    role: "admin"
}
var users=JSON.parse(localStorage.getItem("users")||"[]");
users.push(admin1,admin2);
localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("adminsAdded",true);
    
  } 
function displayUsers() {
    var users=JSON.parse(localStorage.getItem("users")||"[]");
    var usersTable=`
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Tel</th>
        <th scope="col">Role</th>
        <th scope="col">Actions</th>
        
      </tr>
    </thead>
    <tbody>`;
    for (let i =0 ; i< users.length ; i++) {
     usersTable = usersTable + `
     <tr>
     <th>${users[i].firstName}</th>
     <td>${users[i].lastName}</td>
     <td>${users[i].email}</td>
     <td>${users[i].tel}</td>
     <td>${users[i].role}</td>
     <td>
        <button type="button" class="btn btn-outline-warning"  onclick="editUser(${users[i].id})">Edit</button>
        <button type="button" class="btn btn-outline-danger"   onclick="deleteObject(${users[i].id},'users')">Delete</button>
     </td>

   </tr> `
   

 }
    usersTable = usersTable+`
</tbody>
</table>`
      
   document.getElementById('usersTable').innerHTML=usersTable;

  }
function editUser(id) {
    var user = searchById(id,"users")
    console.log(user);
    var editUserForm=` 
    <div class="col-lg-6" style="margin:auto;">
    <div class="login_form_inner">
    <h4>Edit User</h4>
    <div class="row login_form"  method="post" id="contactForm" novalidate="novalidate">
        <div class="col-md-12 form-group">
            <input type="tel" class="form-control" id="tel" value="${user.tel}" placeholder="Phone" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Phone'">
            <span id="telError"> </span>
        </div>
        <div class="col-md-12 form-group">
            <button type="button" value="submit" class="btn btn-outline-secondary" 	onclick="editUserValidate(${user.id})">validate</button>
        </div>
    </div>
</div>
</div>
    `
    document.getElementById("editUserForm").innerHTML= editUserForm ;
  }
function searchById(id,key) {
    var objets=JSON.parse(localStorage.getItem(key)||"[]");
    var object;
    for (let i = 0; i < objets.length; i++) {
        if (objets[i].id == id) {
            object=objets[i];
            break;
            
        }
        
    }
    return object;
  }
function editUserValidate(id) {
    var newTel= document.getElementById("tel").value;
    if (newTel.length !=8 || isNaN(newTel)) {
        document.getElementById("telError").innerHTML="New tel invalid";
        document.getElementById("telError").style.color="red";
        
    } else {
        document.getElementById("telError").innerHTML="";
        
    }
    // sauvegarde edit
    if (newTel.length == 8 && !isNaN(newTel)) {
        var users=JSON.parse(localStorage.getItem("users") || "[]");
        for (let i =0; i < users.length; i++) {
            if (users[i].id == id ) {
                users[i].tel = newTel;
                break;
               
            }
            
        }
       
        localStorage.setItem("users",JSON.stringify(users));
        location.reload();
    }
  }
function displayProducts() {
    var Products=JSON.parse(localStorage.getItem("Products")||"[]");
    var ProductsTable=`
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Product Name</th>
        <th scope="col">Price</th>
        <th scope="col">Category</th>
        <th scope="col">Actions</th>
        
      </tr>
    </thead>
    <tbody>`;
    for (let i =0 ; i< Products.length ; i++) {
        ProductsTable = ProductsTable + `
     <tr>
     <th>${Products[i].ProductName}</th>
     <td>${Products[i].price}</td>
     <td>${Products[i].category}</td>
     <td>
        <button type="button" class="btn btn-outline-warning"  onclick="editProduct(${Products[i].id})">Edit</button>
        <button type="button" class="btn btn-outline-danger"   onclick=" deleteObject(${Products[i].id},'Products')">Delete</button>
     </td>

   </tr> `
   

 }
 ProductsTable = ProductsTable+`
</tbody>
</table>`
      
   document.getElementById('ProductsTable').innerHTML=ProductsTable;

  }

function editProduct(id) {
    var Product = searchById(id,"Products");
    console.log(Product);
    var editProductForm=` 
    <div class="col-lg-6" style="margin:auto;">
    <div class="login_form_inner">
    <h4>Edit Product</h4>
    <div class="row login_form"  method="post" id="contactForm" novalidate="novalidate">
        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="price" value="${Product.price}" placeholder="Price" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Price'">
            <span id="priceError"> </span>
        </div>
        <div class="col-md-12 form-group">
            <button type="button" value="submit" class="btn btn-outline-secondary" 	onclick="editProductValidate(${Product.id})">validate</button>
        </div>
    </div>
</div>
</div> 
    `
    document.getElementById("editProductForm").innerHTML= editProductForm ;
  }
function editProductValidate(id) {
    var newPrice= document.getElementById("price").value;
    if (newPrice <= 0) {
        document.getElementById("priceError").innerHTML="price must be greater than 0 ";
        document.getElementById("priceError").style.color="red";
       
    } else {
        document.getElementById("priceError").innerHTML="";
    }

    if (newPrice>0) {
        var Products=JSON.parse(localStorage.getItem("Products") || "[]");
    
        for (let i =0; i < Products.length; i++) {
            if (Products[i].id == id ) {
                Products[i].price = newPrice
                break;
               
            }
        
        }
       
        localStorage.setItem("Products",JSON.stringify(Products));
        location.reload();
    }
  }
// function deleteUser(id) {
//     var users=JSON.parse(localStorage.getItem("users")||"[]"); 
//     //serach pos
//     var index = searchPosition(id,"users")
//     // suppression 
//     users.splice(index,1);
//     localStorage.setItem("users",JSON.stringify(users));
//     location.reload();
//   }

// function deleteProduct(id) {
//     var Products=JSON.parse(localStorage.getItem("Products")||"[]"); 
//     //serach pos
//     var index = searchPosition(id,"Products")
//     // suppression 
//     Products.splice(index,1);
//     localStorage.setItem("Products",JSON.stringify(Products));
//     location.reload();
    
//   }

function searchPosition(id,key) {
    var tab=JSON.parse(localStorage.getItem(key) || "[]");
    var pos ;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i ;
            break;
            
        }
    }
   return pos ; 
  }
function deleteObject(id,key) {
    var tab=JSON.parse(localStorage.getItem(key)||"[]"); 
    var index = searchPosition(id,key)
    
    tab.splice(index,1);

    localStorage.setItem(key,JSON.stringify(tab));
    location.reload();
    
  }
function displayShop() {
    var Products=JSON.parse(localStorage.getItem("Products")||"[]");
    var shop = ``;
    for (let i = 0; i < Products.length; i++) {
       shop += `
       <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg">
                        <img  class="product__item__pic set-bg" src="${Products[i].image}"  alt="">
                            <div class="product__label">
                                <span>${Products[i].ProductName}</span>
                            </div>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#"></a></h6>
                            <div class="product__item__price">${Products[i].price} TND </div>
                            <div class="product__item__price">${Products[i].category}  </div>
                            <div class="cart_add">
                            <button type="button" value="submit"class="btn btn-outline-secondary"  onclick="goToDisplayProduct(${Products[i].id})">Ordre</button>
                            </div>
                        </div>
                    </div>
                </div>
       `
        
    }
    document.getElementById("shop").innerHTML= shop;
}

function goToDisplayProduct(id) {
    localStorage.setItem( "idPrToReserve",id)
    location.replace("displayProdutDetails.html");
    
}

function displayProdutDetails() {
    var idProduct = localStorage.getItem("idPrToReserve");
    
    var product = searchById(idProduct ,"Products");
    
    document.getElementById("ProductName").innerHTML= product.ProductName
    document.getElementById("price").innerHTML= product.price +"DT"
    document.getElementById("category").innerHTML= product.category
}

 function replacech(ch) {

     return "img/shop/"+ch.replace("C:\\fakepath\\","");
    
 }
  
function validateOrder() {
    var quantity = Number(document.getElementById('quantity').value);
    // console.log(quantity);
    var idProduct = localStorage.getItem("idPrToReserve");
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
        var connectedUser = JSON.parse(localStorage.getItem("connectedUser"))
        var order = {
            id : idOrder,
            idProduct : idProduct,
            idUser : connectedUser.id,
            quantity : quantity
        }

        var orders  = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(order);
        localStorage.setItem("orders",JSON.stringify(orders));
        localStorage.setItem("idOrder",idOrder+1)

        location.replace("Basket.html");

}
function displayBasket() {
    var orders  = JSON.parse(localStorage.getItem("orders") || "[]"); 
    var myOrders=[];
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
   
    //Filtrage pour les utilisateurs 
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUser.id) {
            myOrders.push(orders[i])
            
        }
        
    }
    // console.log("myOrders",myOrders);

    var basket =` <table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
            
        </tr>
    </thead>
    <tbody>`
    var Subtotal = 0 ; 
    for (let i = 0; i < myOrders.length; i++) {
    var product = searchById( myOrders[i].idProduct ,"Products");  
    var Total = Number(product.price) * Number(myOrders[i].quantity) 
    Subtotal = Subtotal + Total
    basket = basket+` <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img src="img/shop/cart/cart-3.jpg" alt="">
                </div>
                <div class="product__cart__item__text">
                    <h5>${product.ProductName}</h5>
                   
                </div>

            </td>
            <td> <h6> ${product.price} TND </h6> </td>
            <td class="quantity__item">
                <h6>${myOrders[i].quantity}</h6>
            </td>
            <td class="cart__price">${Total.toFixed(2)} TND</td>
            <td>
            <button type="button" class="btn btn-outline-warning"  onclick="editOrder(${myOrders[i].id})">Edit</button>
            <button type="button" class="btn btn-outline-danger"   onclick=" deleteObject(${myOrders[i].id},'orders')">Delete</button>
            </td>
        </tr>`
    }
        basket = basket+`
        <tr>
            <td>

            </td>
            <td> 

            </td>
            <td>
                <h5> Subtotal</h5> 

            </td>
            <td>
                <h6>${Subtotal.toFixed(2)} TND</h6>
            </td>
            <td>
            <button type="button" class="btn btn-outline-dark" onclick="goToAddformulaireAdress()">Confirmation</button>

        </td>
        </tr>
    </tbody>
</table>`
    document.getElementById("basket").innerHTML= basket;
}

function editOrder(id) {
    var order = searchById(id,"orders")
    var editOrderForm = `
    <div class="login_form_inner">
    <h3>Edit Order</h3>
    <div class="row login_form">
      
   
        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="quantity" name="name" value="${order.quantity}" placeholder="quantity"  onfocus="this.placeholder = ''" onblur="this.placeholder = 'quantity'">
        </div>
        <span id="quantityError"></span>
        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="btn btn-outline-secondary" onclick="validateEditOrder(${order.id})" >Edit</button>
        
        </div>
    </div>
</div>
    `;

    document.getElementById('editOrderForm').innerHTML = editOrderForm;
}
function validateEditOrder(id) {
    var newQty = document.getElementById("quantity").value;
    if (newQty <= 0) {
        document.getElementById('quantityError').innerHTML = "quantity not available"
        document.getElementById('quantityError').style.color = "red"
    } else {
        document.getElementById('quantityError').innerHTML = ""

        // Mise à jour de la commande
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].id == id) {
            orders[i].quantity = newQty;
          }   
        }
        localStorage.setItem("orders",JSON.stringify(orders))
        location.reload();
    }
}
function goToAddformulaireAdress() {
    location.replace("formAdresse.html");
    
}
  function AddformulaireAdress(id) {
    var adresses = JSON.parse(localStorage.getItem("adresses"))
    console.log(id);
    var country = document.getElementById("country").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    // console.log(city);
    var postcode = document.getElementById("postcode").value;
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var adresse = {
        country: country,
        street: street,
        city: city,
        postcode: postcode,
        idUser: connectedUser.id,
    }
    console.log(adresse);
    adresses.push(adresse)
    localStorage.setItem("adresses", JSON.stringify(adresse))
    location.replace("confirmOrders.html");
}
function confirmOrders() {
    var adresses = JSON.parse(localStorage.getItem("adresses")||"[]")
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    for (let i = 0; i < adresses.length; i++) {
        if (adresses[i].idUser==connectedUser) {

            document.getElementById("city").innerHTML = adresses[i].city
    document.getElementById("street").innerHTML = adresses[i].street
    document.getElementById("country").innerHTML = adresses[i].country
    document.getElementById("postcode").innerHTML = adresses[i].postcode
            break;
        }
        
    }
    
    
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var confirmOrdersForm = ""
    var Subtotal = 0;
    for (let i = 0; i < orders.length; i++) {
        if (condition) {
            
        }
        var product = searchById(orders[i].idProduct, "Products")
        console.log(product);
        var total = Number(product.price) * Number(orders[i].quantite);
        Subtotal += total
        confirmOrdersForm += `<tr>
            <td>
                <p>${product.productName}</p>
            </td>
            <td>
                <h5>x ${orders[i].quantite}</h5>
            </td>
            <td>
                <p>${total}</p>
            </td>
        </tr>`

    }
    var tva = Subtotal * 0.19
    var ttc = Subtotal + tva
    confirmOrdersForm += `<tr>
 <td>
     <h4>Subtotal</h4>
 </td>
 <td>
     <h5></h5>
 </td>
 <td>
     <p>${Subtotal}</p>
 </td>
</tr>
<tr>
<td>
    <h4>TVA </h4>
</td>
<td>
    <h5></h5>
</td>
<td>
    <p>${tva}</p>
</td>
</tr>
<tr>
<td>
    <h4>Total</h4>
</td>
<td>
    <h5></h5>
</td>
<td>
    <p>${ttc}</p>
</td>
</tr>`
console.log(confirmOrdersForm);
    document.getElementById("ordersDeatils").innerHTML = confirmOrdersForm;

}
function searchProduct(e) {
    var code = e.keyCode ;
    console.log(code);
    if (code == 13) {
        var category = document.getElementById('search_input').value;
        localStorage.setItem("categoryToSearch",category)
        location.replace("Result.html")
    }

}
function displayResult() {
    var categoryToSearch = localStorage.getItem("categoryToSearch")
    var Products = JSON.parse(localStorage.getItem("Products") || "[]");

    var result = [];
    // console.log(result);

    for (let i = 0; i < Products.length; i++) {
        if (categoryToSearch == Products[i].category) {
            result.push(Products[i])
        }
        
    }
    console.log (result)
    var shop = ``;
    for (let i = 0; i < result.length; i++) {
        
        shop += `
        <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="product__item">
            <div class="product__item__pic set-bg">
            <img  class="product__item__pic set-bg" src="${result[i].image}"  alt="">
                <div class="product__label">
                    <span>${result[i].ProductName}</span>
                </div>
            </div>
            <div class="product__item__text">
                <h6><a href="#"></a></h6>
                <div class="product__item__price">${result[i].price} TND </div>
                <div class="product__item__price">${result[i].category}  </div>
                <div class="cart_add">
                <button type="button" value="submit"class="btn btn-outline-secondary"  onclick="goToDisplayProduct(${result[i].id})">Ordre</button>
                </div>
            </div>
        </div>
    </div>
       `;
    }
   
    document.getElementById("shop").innerHTML = shop;

}

function generateHeader() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser")) ;
    var header = ``;
    console.log(connectedUser.role)
    if (connectedUser) {
      if (connectedUser.role == "admin") {
        header = `
      
     <li class="active"><a href="./index.html">Home</a></li>
     <li><a href="Shop-category.html">Shop</a></li>
     
     <li><a href="addProduct.html">Add Product</a></li>
     <li><a href="dashboardAdmin.html">Dashboard Admin</a></li>
     <li class="nav-item"><a class="nav-link" onclick="logout()">Logout</a></li>
      `
  
      }
      else  {
        header = `
       <li class="active"><a href="./index.html">Home</a></li>
       <li><a href="Shop-category.html">Shop</a></li>
       <li><a href="Basket.html">Basket</a></li>
        <li class="nav-item"><a class="nav-link" onclick="logout()" >Logout</a></li>
      `
    }  
    } else {   
       header = `
    
     <li class="active"><a href="./index.html">Home</a></li>
     <li><a href="Shop-category.html">Shop</a></li>
     <li><a href="./contact.html">Contact</a></li>
     <li><a href="Signup.html">Signup</a></li>
     <li><a href="login.html">login </a></li>
     `
    }
    document.getElementById("headerId").innerHTML = header;
  }
function logout() {
    localStorage.removeItem("connectedUserId");
    location.replace("login.html")
    
  }