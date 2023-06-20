var cartContainer = document.getElementById('cartContainer');
var ul= document.getElementById('ul');
var count=0;

getData(function(cartProd)
{
    console.log(cartProd)
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
            li.className= element.id;
            var divl= document.createElement('div');
            var divr= document.createElement('div');
            var image= document.createElement('img');
            image.src = "/"+element.img;
            var  productQty= document.createElement('h6');
            productQty.innerText= element.qty;
            productQty.className= "productQty";
            var name= document.createElement('h3');
            name.className= 'name';
            name.innerText= element.name;
            var disc= document.createElement('p');
            disc.innerText= element.disc;
            var btnaction= document.createElement('div');
            btnaction.className= 'btnaction';
            var btnDel= document.createElement('button');
            btnDel.innerText= 'Remove';
            btnDel.className= 'btnDel';
            btnDel.id= element.id;
            var btnEdit= document.createElement('button');
            btnEdit.innerText= 'Edit';
            btnEdit.className= 'btnEdit';
            btnEdit.id= element.id;
            var h5= document.createElement('h5');
            h5.style.fontSize= '22px';
            h5.style.color= '#EA8F1C';
            var divrmost= document.createElement('div');
            h5.innerText= "₹"+element.price;
            btnaction.appendChild(productQty); 
            divl.appendChild(image);
            divl.appendChild(btnaction);
            divr.appendChild(name);
            divr.appendChild(disc);
            divrmost.appendChild(h5);
            divrmost.appendChild(btnDel);
            divrmost.appendChild(btnEdit);
            li.appendChild(divl);
            li.appendChild(divr);
            li.appendChild(divrmost);
            ul.appendChild(li);
        });
    }

});

// show more starts
var ShowMore= document.getElementById('ShowMore');
ShowMore.addEventListener('click', function()
{
    getData(function(records)
{
    if(records[0]==null){
        ShowMore.innerText= "Empty";
        ShowMore.setAttribute('disabled', 'true');
    }
    else if(records.length> 0)
    {
        records.forEach(function(element) {
            var li= document.createElement('li');
            li.className= element.id;
            var divl= document.createElement('div');
            var divr= document.createElement('div');
            var image= document.createElement('img');
            image.src = "/"+element.img;
            var  productQty= document.createElement('h6');
            productQty.innerText= element.qty;
            productQty.className= "productQty";
            var name= document.createElement('h3');
            name.className= 'name';
            name.innerText= element.name;
            var disc= document.createElement('p');
            disc.innerText= element.disc;
            var btnaction= document.createElement('div');
            btnaction.className= 'btnaction';
            var btnDel= document.createElement('button');
            btnDel.innerText= 'Remove';
            btnDel.className= 'btnDel';
            btnDel.id= element.id;
            var btnEdit= document.createElement('button');
            btnEdit.innerText= 'Edit';
            btnEdit.className= 'btnEdit';
            btnEdit.id= element.id;
            var h5= document.createElement('h5');
            h5.style.fontSize= '22px';
            h5.style.color= '#EA8F1C';
            var divrmost= document.createElement('div');
            h5.innerText= "₹"+element.price;
            btnaction.appendChild(productQty); 
            divl.appendChild(image);
            divl.appendChild(btnaction);
            divr.appendChild(name);
            divr.appendChild(disc);
            divrmost.appendChild(h5);
            divrmost.appendChild(btnDel);
            divrmost.appendChild(btnEdit);
            li.appendChild(divl);
            li.appendChild(divr);
            li.appendChild(divrmost);
            ul.appendChild(li);
    });
}
else{
    ShowMore.innerText= "Empty";
}
});
});
// show more ends



function getData(callback)
{ 
    count=count+5;
    
    var request= new XMLHttpRequest();
    request.open('get', '/addAdmin/loadDataAdmin'+"?co="+count, true);

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
                ul.removeChild(e.target.parentElement.parentElement);
            });
        }
        if(e.target.className== 'btnEdit')
        {
            
            EditFromCart(e.target.id, function(item)
            {
                var div= document.createElement('div');
                div.id= 'overlayAdmin';
                div.className= item.id;
                var name= document.createElement('input');
                name.setAttribute('type', 'text');
                name.setAttribute('value', item.name);
                name.id= 'name';
                var disc= document.createElement('input');
                disc.setAttribute('type', 'text');
                disc.setAttribute('value', item.disc);
                disc.id= 'disc';
                var left= document.createElement('input');
                left.setAttribute('type', 'number');
                left.setAttribute('value', item.qty);
                left.id= 'left';
                var price= document.createElement("input"); 
                price.setAttribute('type', 'number');
                price.setAttribute('value', item.price);
                price.id= 'price';
                
                var btn= document.createElement('button');
                btn.setAttribute('name', 'update');
                btn.innerText= 'update';
                btn.style.background= "#EA8F1C";
                btn.style.color= "#f4f4f4";
                btn.style.padding= "4px 1px "
                btn.style.border="none";
                btn.setAttribute('id', item.id);
                btn.className= 'update';
                var close= document.createElement('button');
                close.innerText= "x";
                close.setAttribute('id', 'close');
                var lname= document.createElement('label');
                lname.innerText= "name";
                var ldisc= document.createElement('label');
                ldisc.innerText= "Discription";
                var lprice= document.createElement('label');
                lprice.innerText= "name";
                var lleft= document.createElement('label');
                lleft.innerText= "quantity";
                price.setAttribute('min', '1');
                left.setAttribute('min', '1');
                div.appendChild(lname);
                div.appendChild(name);
                div.appendChild(ldisc);
                div.appendChild(disc);
                div.appendChild(lleft);
                div.appendChild(left);
                div.appendChild(lprice);
                div.appendChild(price);
                div.appendChild(btn);
                div.append(close);
                cartContainer.appendChild(div);
            });
        }
        if(e.target.id== 'close')
        {
            var overlayAdmin= document.getElementById('overlayAdmin');
            overlayAdmin.remove();
        }

        if(e.target.className== 'update')
        {
            var overlayAdmin= document.getElementById('overlayAdmin');
            var name= document.getElementById('name').value;
            var disc= document.getElementById('disc').value;
            var left= document.getElementById('left').value;
            var price= document.getElementById('price').value;
            var ids= overlayAdmin.className;
            var obj= {};
            obj.name= name;
            obj.disc= disc;
            obj.qty= left;
            obj.price= price;
            obj.id= e.target.id;
            console.log(e.target.parentElement.parentElement);
            let i;
            for(i= 0; i < ul.children.length; i++)
            {
                if(ul.children[i].className=== ids)
                {            
                    console.log(i)
                    break;
                }
            }
            
            updateFromCart(JSON.stringify(obj), function(imgs)
            {
                console.log(imgs)
                ul.children[i].innerHTML= null;
                var divl= document.createElement('div');
                var divr= document.createElement('div');
                var image= document.createElement('img');
                image.src ="/"+imgs;
                var  productQty= document.createElement('h6');
                productQty.innerText= obj.qty;
                productQty.className= "productQty";
                var name= document.createElement('h3');
                name.className= 'name';
                name.innerText= obj.name;
                var disc= document.createElement('p');
                disc.innerText= obj.disc;
                var btnaction= document.createElement('div');
                btnaction.className= 'btnaction';
                var btnDel= document.createElement('button');
                btnDel.innerText= 'Remove';
                btnDel.className= 'btnDel';
                btnDel.id= obj.id;
                var btnEdit= document.createElement('button');
                btnEdit.innerText= 'Edit';
                btnEdit.className= 'btnEdit';
                btnEdit.id= obj.id;
                var h5= document.createElement('h5');
                h5.style.fontSize= '22px';
                h5.style.color= '#EA8F1C';
                var divrmost= document.createElement('div');
                h5.innerText= "₹"+obj.price;
                btnaction.appendChild(productQty); 
                divl.appendChild(image);
                divl.appendChild(btnaction);
                divr.appendChild(name);
                divr.appendChild(disc);
                divrmost.appendChild(h5);
                divrmost.appendChild(btnDel);
                divrmost.appendChild(btnEdit);
                ul.children[i].appendChild(divl);
                ul.children[i].appendChild(divr);
                ul.children[i].appendChild(divrmost);
                overlayAdmin.remove();
            });
        }
});



// ajax to delete elements from cart

function deleteFromCart(num, callback)
{

    var request= new XMLHttpRequest();
    request.open('get', '/actiononadmincart/deletefromAdmincart'+'?num='+num);
    request.send();
    request.addEventListener('load', ()=>
    {
        callback();
    });

}


// ajax to delete element from cart ends

// ajax to update elements from cart

function EditFromCart(num, callback)
{

    var request= new XMLHttpRequest();
    request.open('get', '/actiononadmincart/editfromAdmincart'+'?num='+num);
    request.send();
    request.addEventListener('load', ()=>
    {
        callback(JSON.parse(request.responseText));
    });

}


// ajax to update element from cart ends


// ajax to send updpated elements from cart

function updateFromCart(obj, callback)
{

    var request= new XMLHttpRequest();
    request.open('get', '/actiononadmincart/updatefromAdmincart'+'?obj='+obj);
    request.send();
    request.addEventListener('load', ()=>
    {
        callback(JSON.parse(request.responseText));
    });

}


// ajax to send updpated elements from cart ends