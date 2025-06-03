//scroll to anchor
let btn=document.getElementsByClassName('up')[0];
 
window.onscroll= function(){
    if(scrollY >= 300){
        btn.style.display='block';
    }
    else{
        btn.style.display='none';
    }
}
btn.onclick=function(){
    scroll({
     left:0,top:0,behavior:'smooth'
    })
}

// Navigation
const sections=document.querySelectorAll('section');

  const navContainer=document.createElement('ul');

  sections.forEach(section =>{

   const sectionId=section.id;
   const sectionTitel=section.getAttribute('title');
    
   const navItem=document.createElement('li');
   const navLink =document.createElement('a');
   
   navLink.textContent=sectionTitel;
   navLink.setAttribute('href',`#${sectionId}`);
   navLink.classList.add('nav-link');

   navItem.appendChild(navLink);
   navContainer.appendChild(navItem);

});
document.querySelector('#navbar').appendChild(navContainer);

// Section Active State
const viewportHight=window.innerHeight;
console.log(viewportHight);

sections.forEach(section => {
    const Rect=section.getBoundingClientRect();
    const onTop=Rect.top;
    const onBottom=Rect.bottom;

    const viewportsection=(onTop <= viewportHight && onBottom >=0);
    if(viewportsection){
        section.classList.add('inVeiow');
    }
    else{
        section.classList.remove('inVeiow');
    }
    console.log(`${section.id} : ${viewportsection}`);
});

function MakeitActive(){
sections.forEach((section,index) => {

    const item=section.getBoundingClientRect();
    itemLink=document.querySelectorAll('#navbar a');

    if(item.top<=150&&item.bottom>=150){
        section.classList.add('active');
        itemLink[index].classList.add('active');
    }
    else{
        section.classList.remove('active');
        itemLink[index].classList.remove('active');
    }

});
}
window.addEventListener("scroll",function(){
    MakeitActive();
});
