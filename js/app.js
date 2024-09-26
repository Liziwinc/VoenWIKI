const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

function openPopup() {
    var popup = document.querySelector('.form-container1');
    popup.style.display = 'block';
  }
  function closePopup() {
    var popup = document.querySelector('.form-container1');
    popup.style.display = 'none';
  }

filter.addEventListener('input',(event)=>{
    const value = event.target.value.toLowerCase()
    const filteredUsers = USERS.filter((user)=>user.name.toLowerCase().includes(value))
    render(filteredUsers)

})



async function start(){
    list.innerHTML = 'loading...'
    try{
       const resp = await fetch('http://localhost:3000/Users')
       const data = await resp.json()
        USERS = data
        render(data)
        
    }catch(err){
        list.style.color = "red"
        list.innerHTML = err.message
    }
   
}
function render(users = []){
    if(users.length == 0 ){
        list.innerHTML = 'Not found'
    }else{
        const html = users.map(toHTML).join('')
        list.onclick = function(event){
            if (event.target.dataset.index){
                const index = Number(event.target.dataset.index)
                alert(USERS[index-1].username)
                
        }}
    list.innerHTML = html
    }
    
}


//<li class="list-group-item">${user.name}</li>
function toHTML(user){
    return `
    
    <li><a data-index="${user.id}"  data-type="remove">
          <span data-index="${user.id}"  data-type="remove">${user.name}</span>
          <span> 
          </span></a>
        </li>
    `
}
start()

