var cartContainer = document.getElementById('cartContainer');
var ul= document.getElementById('ul');
// bug in adding data in cart of user from home screen 

    getCart(function(cartProd)
{
    if(cartProd<=0)
    {
        var h4= document.createElement('h4');
        h4.className= 'noProd';
        h4.innerHTML= 'Cart is empty!';
        ul.appendChild(h4);
    }
    else{

        cartProd.forEach(function(element) {
            var li= document.createElement('li');
            var divl= document.createElement('div');
            var divr= document.createElement('div');
            var image= document.createElement('img');
            image.src = element.img;
            var  productQty= document.createElement('h6');
            productQty.innerText= element.qty;
            productQty.className= "productQty";
            var name= document.createElement('h3');
            name.className= 'name';
            name.innerText= element.name+" ✈️";
            var disc= document.createElement('p');
            disc.innerText= element.disc;
            var plusbtn= document.createElement('button');
            plusbtn.className= 'plus';
            plusbtn.id=element.id;
            plusbtn.innerHTML= '&uarr;';
            var minusbtn= document.createElement('button');
            minusbtn.className= 'minus';
            minusbtn.id=element.id;
            minusbtn.innerHTML= '&darr;';
            var btnaction= document.createElement('div');
            btnaction.className= 'btnaction';
            var btnDel= document.createElement('button');
            btnDel.innerText= 'Remove';
            btnDel.className= 'btnDel';
            btnDel.id=element.id;
            var h5= document.createElement('h5');
            h5.style.fontSize= '22px';
            h5.style.color= '#EA8F1C';
            if(localStorage.getItem("dark")==1)
            {
                image.classList.add('nightImg');
                li.classList.add('night')
                li.style.backgroundColor="#292826";
                productQty.style.color="#f4f4f4";
            }
            var divrmost= document.createElement('div');
            h5.innerText= "₹"+Number(element.price)*Number(element.qty);
            btnaction.appendChild(plusbtn);
            btnaction.appendChild(productQty); 
            btnaction.appendChild(minusbtn);
            divl.appendChild(image);
            divl.appendChild(btnaction);
            divr.appendChild(name);
            divr.appendChild(disc);
            divrmost.appendChild(h5);
            divrmost.appendChild(btnDel);
            li.appendChild(divl);
            li.appendChild(divr);
            li.appendChild(divrmost);
            ul.appendChild(li);
        });
    }

});

// getting cart data
function getCart(callback)
{ 
    var request= new XMLHttpRequest();
    request.open('get', '/cart'+'?cal='+1);

    request.send();

    request.addEventListener('load', function()
    {

        callback(JSON.parse(request.responseText));
    });
}

document.addEventListener('click', (e)=>
{
        if(e.target.className=="btnDel")
        {
            deleteFromCart(e.target.id, ()=>
            {
                var ul= document.getElementById('ul')
                ul.removeChild(e.target.parentElement.parentElement);
                if(ul.children.length <=0)
                {
                    var h4= document.createElement('h4');
                    h4.className= 'noProd';
                    h4.innerHTML= 'Cart is empty!';
                    ul.appendChild(h4);
                }
            });
        }
        if(e.target.className=="plus")
        {
            let num= Number(e.target.nextElementSibling.innerText);
            increaseltnumberCart(e.target.id, (item)=>
            {
                if(num< Number(item.left))
                {
                    num++;
                    e.target.nextElementSibling.innerText= num;

                    e.target.parentElement.parentElement.parentElement.children[2].children[0].innerText= "₹"+Number(item.price)*num;
                }
            });

        }


        if(e.target.className=="minus")
        {
            let num= Number(e.target.previousElementSibling.innerText);
            decreaseltnumberCart(e.target.id, (item)=>
            {
                num--;
                if(num> 0)
                {
                    e.target.previousElementSibling.innerText= num;
                    e.target.parentElement.parentElement.parentElement.children[2].children[0].innerText= "₹"+Number(item.price)*num;
                }
            });

        }
        
        if(e.target.id=='night')
        {
            if(localStorage.getItem("dark")=='1')
            {
                var ul= document.getElementById('ul')
            for (let i = 0; i < ul[1].children.length; i++) {
                ul[1].children[i].style.backgroundColor="#f0eeee";
                ul[1].children[i].children[0].children[1].children[1].style.color="black";
            }
            }
            if(localStorage.getItem("dark")=='0')
            {
                var ul= document.getElementById('ul')
            for (let i = 0; i < ul[1].children.length; i++) {
                ul[1].children[i].style.backgroundColor="#292826";
                ul[1].children[i].children[0].children[1].children[1].style.color="#f4f4f4";
            }
            }

        }
});
// ajax to delete elements from cart

function deleteFromCart(num, callback)
{

    var request= new XMLHttpRequest();
    request.open('get', '/deletefromcart'+'?num='+num);
    request.send();
    request.addEventListener('load', ()=>
    {
        callback();
    });

}


// ajax to delete element from cart ends


// ajax call to increase quantity;

function increaseltnumberCart(num, callback)
{

    var request= new XMLHttpRequest();
    request.open('get', '/increaseltnumberCart'+'?num='+num);
    request.send();
    request.addEventListener('load', ()=>
    {
        callback(JSON.parse(request.responseText));
    });

}

// ajay call to increase quantity ends

// ajax call to decrease quantity;

function decreaseltnumberCart(num, callback)
{
    var request= new XMLHttpRequest();
    request.open('get', '/decreaseltnumberCart'+'?num='+num);
    request.send();
    request.addEventListener('load', ()=>
    {
        callback(JSON.parse(request.responseText));
    });
}

// ajay call to decrease quantity ends