function renderFlats(){
  fetch('/get-flats').then(resp=>resp.json()).then(resp=>{
    flats = resp;
    flatsBlock.innerHTML = resp.map(({id,owner,phone,price,address,description,active,client,clientPhone,lease})=>{
      return (
        `<div class="flat">
          <h1 class="flat__address">${address} (<span class="flat__red">${price}</span>) </h1>
          <div class="flat__description">${description}</div>
          <div class="flat__contacts">${owner} - ${phone} </div>
          ${active? `<button class="btn blue" onclick="openPopup('${id}')">Снять квартиру</button><button class="btn blue" onclick="deleteFlat('${id}')">Удалить квартиру</button>` : `
            <hr>
            <p>Арендатор: ${client}</p>
            <p>Телефон: ${clientPhone}</p>
            <p>Срок аренды: ${lease}</p>
            <button class="btn blue" onclick="deleteOrder('${id}')">Отменить аренду</button>
            <button class="btn blue" onclick="deleteFlat('${id}')">Удалить квартиру</button>
          `}
        </div>`
      )
    }).join('')
  });
};


