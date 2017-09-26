let flats = [];
let addFlatBlock = document.querySelector('#addflat');
let flatsBlock = document.querySelector('#flats');
let orderBlock = document.querySelector('.order');
let orderForm = document.querySelector('.order__content');
let orderDescription = document.querySelector('.order__description');

addFlatBlock.onsubmit = AddFlat;
orderForm.onsubmit = orderFlat;

function show(){
  addFlatBlock.classList.toggle('active')
}

function openPopup(id){
  let flat = flats.find(el=>el.id == id);
  orderDescription.innerHTML = `<h3>${flat.address} - (Цена: ${flat.price})</h3><p>${flat.description}</p>`;
  orderDescription.dataset.id = flat.id;
  orderBlock.style.display = 'flex';
}

function closePopup(){
  orderDescription.innerHTML = ``;
  orderBlock.style.display = '';
  orderForm.reset();
}

function deleteOrder(id){
  if(confirm('Вы уверены что хотите отменить аренду?')){
    // let flat = flats.find(el=>el.id == id);
    // flat.active = true;
    // flat.client = '';
    // flat.clientPhone = '';
    // flat.lease = '';
    fetch('/delete-order',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
    setTimeout(()=>renderFlats(),1000);
  }
}

function deleteFlat(id){
  if(confirm('Вы уверены что хотите удалить квартиру?')){
    fetch('/delete-flat',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
    setTimeout(()=>renderFlats(),1000);
  }
}

function orderFlat(e){
  e.preventDefault();
  // let id = orderDescription.dataset.id;
  // let flat = flats.find(el=>el.id == id);
  // let elements = orderForm.elements
  // flat.client = elements.client.value;
  // flat.clientPhone = elements.clientPhone.value;
  // flat.lease = elements.lease.value;
  // flat.active = false;
  let elements = orderForm.elements;
  let out = {
    id: orderDescription.dataset.id,
    client: elements.client.value,
    clientPhone: elements.clientPhone.value,
    lease: elements.lease.value,
    active: false
  }
  fetch('/rent-flat',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(out)
  })
  closePopup();
  setTimeout(()=>renderFlats(),1000)
}

function renderFlats(){
  fetch('/get-flats').then(resp=>resp.json()).then(resp=>{
    flats = resp;
    flatsBlock.innerHTML = resp.map(({id,owner,phone,price,address,description,active})=>{
      if(!active) return ''
      return (
        `<div class="flat">
          <h1 class="flat__address">${address} (<span class="flat__red">${price}</span>) </h1>
          <div class="flat__description">${description}</div>
          <div class="flat__contacts">${owner} - ${phone} </div>
          <button class="btn blue" onclick="openPopup('${id}')">Снять квартиру</button>
        </div>`
      )
    }).join('')
  })
};

function AddFlat(e){
  e.preventDefault();
  let elements = addFlatBlock.elements;
  let flat = {
    id: Date.now()+'-'+Math.round(Math.random()*100000),
    owner: elements.owner.value,
    phone: elements.phone.value,
    price: elements.price.value,
    address: elements.address.value,
    description: addFlatBlock.querySelector('textarea').value,
    active: true,
    client: '',
    clientPhone: '',
    lease: ''
  };
  fetch('/add-flat',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flat)
  })
  setTimeout(()=>renderFlats(),1000)
  addFlatBlock.reset();
}

