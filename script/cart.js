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