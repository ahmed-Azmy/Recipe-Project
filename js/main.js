let database = [];
//when i click get name of recipe
let links = document.querySelectorAll('.nav-link-Mine');
for(let i = 0 ; i < links.length ; i++){
    links[i].addEventListener('click' , function(e){
         getrecipes(e.target.innerHTML);
    })
}
//function to get recipe by xmlhttprequest
function getrecipes(klma){
    let req = new XMLHttpRequest();
    req.open('GET' , `https://forkify-api.herokuapp.com/api/search?q=${klma}`)
    req.send();
    req.addEventListener('readystatechange' , function(){
        if(req.readyState == 4 && req.status == 200){
            database = req.response;
            database = JSON.parse(database);
            database = database.recipes;
            display();
        }
    })
}
//function to display recipes
function display(){
    let cartona = "";
    for(let i = 0 ; i < database.length ; i++){
       cartona += `
       <div class="col-sm-6 col-md-4 col-lg-3 content-container"  >
           <div class=" bg-light shadow rounded-2">
             <img src="${database[i].image_url}" alt="" class = "w-100 " onclick = "getdeatils('${database[i].recipe_id}')" >
             <div class = "card-body card-height">
               <h5 class = "fs-6 fw-bold">${database[i].title.slice(0,55)}</h5>
               <p>${database[i].publisher.slice(0,40)}</p>
             </div>
           </div>
         </div>
       `
    }
    document.getElementById('row').innerHTML = cartona;
}
//call function
getrecipes('pizza');
//function to get details of every recipe by fetch
async function getdeatils(para){
    let request = await fetch('https://forkify-api.herokuapp.com/api/get?rId='+para);
    let details =await request.json();
    details = details.recipe;
    displaydetails(details);
}
//function to display recipe details
let modal = document.getElementById('modal')
function displaydetails(details){
       let detailsCartona = '';
       for (const ingredient of details.ingredients) {
        detailsCartona += `
        <li>${ingredient}</li>
        `
       }
       let cartona = `
       <div class="modal-header" >
        <h5 class="modal-title">${details.title}</h5>
        <button type="button" class="btn-close"  onclick="cls()"></button>
       </div>
       <img src="${details.image_url}" alt="" class = "w-100 p-2">
       
       <div class="modal-body">
       <p class = "fw-bold">${details.publisher}</p>
       <ol>
          ${detailsCartona}
       </ol>
       </div>
     `
     modal.style.display = 'block';
     document.getElementById('modal').innerHTML = cartona;
}
//function to close modal
function cls(){
  modal.style.display = 'none';
}
//function to search for recipe
let inputSearch =document.getElementById('inputSearch');
//call function when keyup
inputSearch.addEventListener('keyup' , Search);
function Search(){
  let cartona ='';
  for(let i = 0 ; i < database.length ; i++){
    if(database[i].title.toLowerCase().includes(inputSearch.value.toLowerCase())){
      cartona += `
       <div class="col-sm-6 col-md-4 col-lg-3 content-container"  >
           <div class=" bg-light shadow rounded-2">
             <img src="${database[i].image_url}" alt="" class = "w-100 " onclick = "getdeatils(${database[i].recipe_id})" >
             <div class = "card-body card-height">
               <h5 class = "fs-6 fw-bold">${database[i].title.slice(0,44)}</h5>
               <p>${database[i].publisher.slice(0,40)}</p>
             </div>
           </div>
         </div>
       `
    }
  }
  document.getElementById('row').innerHTML = cartona;
}

















