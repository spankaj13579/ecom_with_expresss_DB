document.addEventListener('click', (e)=>
{

    // dark mode 
    if(e.target.id=='night')
    {
        if(localStorage.getItem("dark")==null || localStorage.getItem("dark")==0)
        {
            localStorage.setItem("dark","1");
            document.body.classList.add('night');
            var image=document.getElementsByTagName('img')
            for (let i = 0; i < image.length; i++) {
                image[i].classList.add('nightImg');
        }
        }
        else
        {
            localStorage.setItem("dark","0");
            document.body.classList.remove('night');
            var image=document.getElementsByTagName('img')
            for (let i = 0; i < image.length; i++) {
                image[i].classList.remove('nightImg');
                }
        }
        
    }
    // dark mode ends
});
if(localStorage.getItem("dark")==1)
        {
        document.body.classList.add('night');
        var image=document.getElementsByTagName('img')
        for (let i = 0; i < image.length; i++) {
            image[i].classList.add('nightImg');
        }
        }
        else{
            document.body.classList.remove('night');
            var image=document.getElementsByTagName('img')
            for (let i = 0; i < image.length; i++) {
                image[i].classList.remove('nightImg');
                }
            }