// المتغيرات
const itemContien = document.getElementById("item-contain");
const cartContien = document.getElementById("cart");
const Numberof = document.getElementById("Number");
const totalPrice = document.getElementById("total price")
const confirmButtons = document.getElementById("confirm")
const continerall = document.getElementsByClassName("continer")
const item_cart= document.querySelector(".cart > div")
let total_item =0


//dowload data from JSON
let dataJson = new XMLHttpRequest();
dataJson.open("get", "data.json");
dataJson.send();
dataJson.onload = function () {
    let mainData = JSON.parse(this.responseText);
  
  
    Numberof.textContent=`${ allitemCount()}`
    totalPrice.textContent =`${totallpriceforAll()}`
    displayaddtocart(allitemCount())
    
//create elements
    mainData.forEach((el, index) => {
        const item = document.createElement("div");
        const imageitem = document.createElement("img");
        imageitem.src = el.image.desktop;
     
        const addButton = document.createElement("div");
        const iconAddToCart = document.createElement("img");
        iconAddToCart.src = "./assets/images/icon-add-to-cart.svg";
        const addButtonText = document.createElement("p");
        addButtonText.textContent = "Add to cart";
        addButton.appendChild(iconAddToCart);
        addButton.appendChild(addButtonText);

        const itemCategory = document.createElement("p");
        itemCategory.textContent = `${el.category}`;
        const itemName = document.createElement("p");
        itemName.textContent = `${el.name}`;
        const itemPrice = document.createElement("p");
        itemPrice.textContent = `$${el.price}`;

        item.appendChild(imageitem);
        item.appendChild(addButton);
        item.appendChild(itemCategory);
        item.appendChild(itemName);
        item.appendChild(itemPrice);

        const add = document.createElement("span");
        const remove = document.createElement("span");
        const count = document.createElement("p");
        add.textContent = `+`;
        remove.textContent = `-`;
        let countOfItem = 0;
count.id =`count_${index}`
count .className ="count"
        addButton.appendChild(remove);
        addButton.appendChild(count);

        addButton.appendChild(add);
        add.style.display = "none";
        remove.style.display = "none";
        count.style.display = "none";
        item.id ="item"
        itemContien.appendChild(item);
// add click event to add
        add.addEventListener("click", (event) => {
            event.stopPropagation();
            if (add.previousSibling.textContent === "0")
                {
                    countOfItem = 0;
                }
            countOfItem++;
            totallpriceforAll()
           
            if (countOfItem === 1) {
                addToCart(itemName.textContent, countOfItem, parseFloat(el.price), index);
             
            } else {
                updateCartItem(index, countOfItem, parseFloat(el.price));
           
Numberof.textContent = `${total_item}`;

            }
         

            count.textContent = `${countOfItem}`;
            Numberof.textContent=`${ allitemCount()}`;
            displayaddtocart(allitemCount());
        displayaddtocart(allitemCount());
totalPrice.textContent =` ${totallpriceforAll()} $`

        });

// add click event to remove
        remove.addEventListener("click", (event) => {
            event.stopPropagation();
if (remove.nextSibling.textContent === "0")
{
    countOfItem = 0;
}
            if (countOfItem > 0) {
                countOfItem--;
                count.textContent = `${countOfItem}`;
                updateCartItem(index, countOfItem, parseInt(el.price));
                
              
            }
            if (countOfItem===0 )
            {
              removeFromCart(index)
            }
         
          Numberof.textContent=`${ allitemCount()}`
          totalPrice.textContent =`${totallpriceforAll()}`
          displayaddtocart(allitemCount())
        });

        addButton.addEventListener("click", () => {
            toggleAddButton(addButton, add, remove, count, addButtonText, iconAddToCart);
        });

        count.textContent = `${countOfItem}`;
  
       
    });
};
confirmButtons.addEventListener(`click`,()=>{
    showconfirm()
});


//add items to the cart
function addToCart(name, count, price, index) {
    const divItem = document.createElement("div");
    divItem.setAttribute("data-index", index);
const removebuutonfromcart = document.createElement("span")
    const rightSec = document.createElement("div");
    const nameElement = createTextElement("p", name);
    const countElement = createTextElement("p", count);
    countElement.id = `refresh-${index}`; // id for count
    const priceElement = createTextElement("p", `$${price}`);
    const totalPriceElement = createTextElement("p", `$${count * parseFloat(price)}`);
    totalPriceElement.id = `refrishTotal-${index}`; // id for total price
removebuutonfromcart.id ="delete"
    rightSec.appendChild(nameElement);
    rightSec.appendChild(countElement);
    rightSec.appendChild(totalPriceElement);
    rightSec.appendChild(priceElement);

    divItem.appendChild(rightSec);
    divItem.appendChild(removebuutonfromcart)
    removebuutonfromcart.addEventListener(`click`, ()=>{
        removebuutonfromcart.parentElement.remove()
       zerocounter(index)
       displayaddtocart (allitemCount());
       
         Numberof.textContent=`${ allitemCount()}`
         totalPrice.textContent =`${totallpriceforAll()}`
    })
    cartContien.appendChild(divItem);
}
function removeFromCart (index)
{
    const cartItem = document.querySelector(`[data-index='${index}']`);
    if (cartItem) {
        cartContien.removeChild(cartItem); 
     
 
    } 
}

// update item in the cart
function updateCartItem(index, countOfItem, price) {
    const refresh = document.getElementById(`refresh-${index}`);
    const refrishTotal = document.getElementById(`refrishTotal-${index}`);

    if (refresh && refrishTotal) {
        refresh.textContent = `${countOfItem} x`;
        refrishTotal.textContent = `$${parseFloat(price) * countOfItem}`;
    }
}

// toggle add button on click
function toggleAddButton(button, add, remove, count, text, icon) {
    if (button.className !== "activebutton") {
        add.style.display = "block";
        remove.style.display = "block";
        count.style.display = "block";
        text.style.display = "none";
        icon.style.display = "none";
        button.className = "activebutton";
        button.style.backgroundColor = "hsl(14, 86%, 42%)";
        button.style.justifyContent = "space-between";
    } else {
        add.style.display = "none";
        remove.style.display = "none";
        count.style.display = "none";
        text.style.display = "block";
        icon.style.display = "block";
        button.className = "";
        button.style.backgroundColor = "white";
        button.style.justifyContent = "center";
    }
}

//create text element
function createTextElement(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
}
//function to cheak all element count
function allitemCount ()
{ let  alldiv = document.querySelectorAll(".count")
    let all =0
    alldiv.forEach((el)=>{
        all+= +el.textContent

    })
return all ;
    
}
function totallpriceforAll()
{
    let allprice = document.querySelectorAll(".cart >div>div >p:nth-of-type(3)")
    let all= 0;
    allprice.forEach((el)=>{
all += parseFloat(el.textContent.slice(1));

    })

    return all 
}
// functin to remove addt to cart text or added 
function displayaddtocart (number)
{const image = document.querySelector(".cart > img")
    const empty_text= document.querySelector(".cart > p:last-of-type")
    const button = document.getElementById("confirm")
    if (number > 0)
    {
        image.style.display="none"
        empty_text.style.display="none"
        button.style.display ="block"
        totalPrice.parentElement.style.display ="flex"
    }
    else if (number===0)
    {
            image.style.display="block"
        empty_text.style.display="block"
          button.style.display ="none"
          totalPrice.parentElement.style.display ="none"
    }
}

//function to make the count zero when remove item from the cart
 function zerocounter (index)
 {
    
    const zero = document.getElementById(`count_${index}`)
    zero.textContent ="0"
    zero.parentElement.click()
    
 }
function showconfirm ()
{ const conformBox =document.createElement("div") 
    conformBox.className="conformBox"
    let continer =document.createElement("div")
    const iconRight = document.createElement("img")
    iconRight.src ="./assets/images/icon-order-confirmed.svg"
    const title =createTextElement("h1","order confirmed")
    const paragraph =createTextElement("p","we are happy you enjoy our food")
    const itemcontiner = document.createElement("div")
    conformBox.appendChild(iconRight)
    conformBox.appendChild(title )
    conformBox.appendChild(paragraph)
    let items =document.querySelectorAll(".cart >div")
    items.forEach((el)=>{
        if (el.getAttribute("data-index") != null)
        { const imageitem1 = document.createElement("img");
        const imageitem2  = document.querySelectorAll("#item >img")
        
        imageitem1.src = `${imageitem2[el.getAttribute("data-index")].src}`
            
            const clone =el.cloneNode(true);
            clone.insertBefore(imageitem1, clone.firstChild);
            continer.appendChild(clone)
        }
    })
    const total = document.getElementById("total price").parentElement
    const startNewOrder =createTextElement("button","start new order")
startNewOrder.addEventListener(`click`,()=>{
const deletbutoon= document.querySelectorAll("#delete")
deletbutoon.forEach((el)=>{
    el.click()
    startNewOrder.parentElement.remove()
})
continerall.id =""


})
    continer.appendChild(total.cloneNode(true))
conformBox.appendChild(continer)
conformBox.appendChild(startNewOrder)

document.body.appendChild(conformBox)
 const continerall = conformBox.previousElementSibling.previousElementSibling.previousElementSibling
 continerall.id ==="opacity"? continerall.id ="": continerall.id ="opacity"
  
}



