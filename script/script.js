const list = document.querySelector('.shopItemsContainer');
const currentNumberCart = document.querySelector('.bagNumber');
const menubar = document.querySelector(".listCon");

menubar.addEventListener('click', function(){

    this.classList.toggle("open");
});

const notify = function(text, time) {
    checkmark.innerText = text;
    checkmark.style.opacity = '1';
    setTimeout(()=>{
    checkmark.style.opacity = '0';    
        }, time);
};


if(localStorage.getItem('itemsForCart') === null)
currentNumberCart.innerText = " 0";
else{
    currentNumberCart.innerText = JSON.parse(localStorage.getItem('itemsForCart')).length;
}
///////////////-----icon Hovers-----///////////////
const LogoLink = document.querySelector('.logoLink');
const imgLogo = document.querySelector(".logoImg");
const bagIcon = document.querySelector('.bagIcon');
const bagImg = document.querySelector('.bagImg');
const Nef = document.querySelector('.Nef');
const ef = document.querySelector('.ef');
const fbImg = document.querySelector('.fbImg');
const igImg = document.querySelector('.igImg');

const iconHover = function (tag, after, before){

    tag.addEventListener("mouseenter", _=>{
  
        tag.classList.remove('Nef');
        tag.classList.add('ef');
        setTimeout(()=>{
 
            tag.src = `${after}`;
            tag.classList.remove('ef');
            tag.classList.add('Nef');
            },75);
    });
    tag.addEventListener("mouseleave", _=>{
        tag.classList.remove('Nef');
        tag.classList.add('ef');
        setTimeout(()=>{
 
            tag.src = `${before}`;
            tag.classList.remove('ef');
            tag.classList.add('Nef');
            },75);
        
    });
    
};

iconHover(imgLogo, "img/logoH.png","img/logo.png")
iconHover(bagImg, "img/cartH.png", "img/cart.png");
iconHover(fbImg, "img/fbH.svg","img/fb.svg");
iconHover(igImg, "img/igH.svg","img/ig.svg");

///////////////-----Top to Page btn-----///////////////

const checking = (location.href.includes("contact")) || (location.href.includes("about"));

if(checking != true)
{
    const topArrow = document.querySelector(".topArrow");

    window.addEventListener("scroll", e=>{
        if(window.scrollY >= 200)
        {
           
            topArrow.style.display = "inline";
            topArrow.style.opacity = "1";
        }
        else
        {
        topArrow.style.display = "none";
          topArrow.style.opacity = "0";
        }
    });
    
        topArrow.addEventListener("click", e=>{
    
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
}


///////////////-----SEARCH FIELD-----///////////////
const btn = document.querySelector('.searchField');


const findItem = textFieldBar =>{
    Array.from(list.children)
    .forEach(item =>{
        if(item.childNodes[3].innerText.toLowerCase().includes(textFieldBar) || item.childNodes[5].innerText.toLowerCase().includes(textFieldBar))
        {
            item.classList.remove('filtered');
        }else{
            item.classList.add('filtered');
        }
    });
};


btn.addEventListener('keyup',e=>{
    const newBtn = btn.value.toLowerCase().trim();
    findItem(newBtn);
});
///////////////-----END OF SEARCH FIELD-----///////////////




///////////////-----ADD BAG AND REMOVE-----///////////////
const cartBtn = document.querySelectorAll('.addBag');
const cartContent = document.querySelector('.shopItemsContainer');
const checkmark = document.querySelector('.Notification');

let newItemToCart = [];

if(localStorage.getItem('itemsForCart') !== null)
newItemToCart = JSON.parse(localStorage.getItem('itemsForCart'));


cartBtn.forEach(item=>{

    item.addEventListener('click', e=>{

        e.target.parentElement.classList.add('cart');

        const  itemDetail = {
        
            "img": e.target.parentElement.childNodes[1].getAttribute('src'),
            "name": e.target.parentElement.childNodes[3].innerText,
            "price": e.target.parentElement.childNodes[5].innerText
        };
 
        newItemToCart.push(itemDetail);
        localStorage.setItem('itemsForCart', JSON.stringify(newItemToCart));
        notify("ITEM ADDED TO YOUR CART.", 700);
        currentNumberCart.innerText = JSON.parse(localStorage.getItem('itemsForCart')).length;

      
        
    });
});



const itemInBag = (img, name, price)=>{
    
    const htmlTag = `
    <div class="itemContainer cart">
    <img src="${img}" class="imgTag" alt="" />
    <label class="nameTag">${name}</label>
    <label class="priceTag">${price}</label>
    <label class="addBag rm">Remove</label>
    </div>`;  
    return htmlTag;
};


if(window.location.href.includes('cart'))
{
    const removeItemFromCart = document.getElementsByClassName('rm');
    const parseItemFromLocal = JSON.parse(localStorage.getItem('itemsForCart'));
    let cartBodyHTMLTags = "";
    let emptyTextCart = document.querySelector('.emptyCart');

if(newItemToCart.length >0)
{
    emptyTextCart.classList.add('filtered');
parseItemFromLocal.forEach(item=>cartBodyHTMLTags += itemInBag(item.img, item.name, item.price));
}
else{
    emptyTextCart.classList.remove('filtered');
}

cartContent.innerHTML += cartBodyHTMLTags;

if(localStorage.length >= 1)
{
    
   Array.from(removeItemFromCart).forEach(item=>{

   item.addEventListener('click', e=>{

    const getName = e.target.parentElement.childNodes[3].innerText;
    e.target.parentElement.remove();
   
    

    for(let i=0; i<newItemToCart.length; i++)
    {
        if(newItemToCart[i].name === getName)
        {
        const indexTarget = newItemToCart.indexOf(newItemToCart[i]);
        newItemToCart.splice(indexTarget, 1);
           
         break;
        }
    } 
    //const newArray = JSON.stringify(newItemToCart); You can copy it to a new array or instantly use it. remember OPTIMIZATION.
    localStorage.setItem('itemsForCart', JSON.stringify(newItemToCart));  
    
    currentNumberCart.innerText = JSON.parse(localStorage.getItem('itemsForCart')).length;
    notify("ITEM REMOVED", 700);
    console.log(newItemToCart.length);
    if(newItemToCart.length === 0)
   {
       emptyTextCart.classList.remove('filtered');
       location.reload();
   }
    
   });
   });

   

}


}



///////////////-----END OF ADD BAG AND REMOVE-----///////////////


///////////////-----DROP DOWN MENU + CONTACT FORM-----///////////////
const dropdownBtn = document.querySelector('.dropbtn');

dropdownBtn.addEventListener('click', e=>{e.preventDefault();});

if(window.location.href.includes('contact'))
{
const contactFormEvent = document.querySelector("#contactForm");
const contactContainerElement = document.querySelector('.contactContainer');


contactFormEvent.addEventListener('submit', e=>{
    e.preventDefault();   
    
    
    notify('Thank you for contacting us! We will get back to you soon.', 3000);  
});
}

/////////////-----END OF DROP DOWN MENU + CONTACT FORM-----////////////



// const sendAMsg = text=>{

//     const sendLabel = `<label class="sendMsg">${text}</label>`;
    
//     contactContainerElement.innerHTML += sendLabel;
//     contactFormEvent.reset();
// };
// sendAMsg("Thank you for contacting us! We will get back to you soon.");


///////-----REGEX FOR CONTACT FORM.-----////////////
// const emailField = document.querySelector('.email');
// const email = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/;

// emailField.addEventListener("keyup",e=>{

 
//   if(emailField.value.match(email))
//       {emailField.style.color = 'green';}
//         else{
//             emailField.style.color = 'red';
            
//         }
// });