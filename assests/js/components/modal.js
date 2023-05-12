function modal(db) {
  const productsDOM = document.querySelector(".products__container");
  const modal = document.querySelector('.modal');
  productsDOM.addEventListener("click", function (e) {
    const id = +e.target.closest(".product--image").dataset.id;
    viewModal(id, db);
  });

  function viewModal(id, db) {
    let html = "";
    for (const item of db) {
      if (item.id === id) {
        html += `
        <div class="modal-content">
            <span class="close--modal">&times;</span>
            <div class="content--modal">
                <img src="${item.image}">
                <div>
                    <h3>${item.name}</h3>
                    <span>Categoria: ${item.category}</span>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>`;
      }
    }
    modal.classList.add('modal--show')
    modal.innerHTML = html
  }

  function closeModal(){
    modal.classList.remove('modal--show')
  }

  
  modal.addEventListener('click', function(e){
    if (e.target.closest('.close--modal')) {
        closeModal()
    }
}
  )
}

export default modal;
