function cart(db, printProducts) {
  const ls = window.localStorage;
  let cart = JSON.parse(ls.getItem("cartDB")) || [] ;

  const productsDOM = document.querySelector(".products__container");
  const notifyDOM = document.querySelector('.notify');
  const cartDOM = document.querySelector('.cart__body');
  const countDOM = document.querySelector('.cart__count--item');
  const subtotalDOM = document.querySelector('.cart__subtotal--item');
  const igvDOM = document.querySelector('.cart__igv--item');
  const totalDOM = document.querySelector('.cart__total--item');
  const checkoutDOM = document.querySelector('.btn--buy');

  function printCart() {
    let htmlCart = ''

    if (cart.length === 0) {
        htmlCart += `<div class="cart__empty">
        <i class="bx bx-cart"></i>
        <p>No hay productos en el carrito</p>` 

        notifyDOM.classList.remove('show--notify')
    }else{
        for(const item of cart){
            const product = db.find(i => i.id === item.id)
            htmlCart += `<article class="article">
            <div class="article__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="article__content">
              <h3 class="article__title">
                ${product.name}
              </h3>
              <span class="article__price">${product.price}</span>
              <div class="article__quantity">
                <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                  <i class='bx bx-minus'></i>
                </button>
                <span class="article__quantity-text">${item.qty}</span>
                <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                  <i class='bx bx-plus'></i>
                </button>
              </div>
              <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                <i class='bx bx-trash'></i>
              </button>
            </div>
          </article>` 
        }
        notifyDOM.classList.add('show--notify')
    }
    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    subtotalDOM.innerHTML = showTotal()
    const igv = Math.round(showTotal() * 0.18)
    igvDOM.innerHTML = igv
    totalDOM.innerHTML = igv + showTotal()
  }

  function addToCart(id, qty = 1) {
    const itemFind = cart.find((i) => i.id === id);
    let stock = 0
    for (const item of db) {
      if (item.id == id) stock = item.quantity
    }
    
    if (itemFind) {
    const cont = itemFind.qty + qty;
        if (stock < cont) {
          Swal.fire({
            position: 'top-start',
            icon: 'warning',
            title: 'Limite de disponibilidad',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          itemFind.qty += qty;
        }
    } else {
      cart.push({ id, qty });
    }
    printCart();
    ls.setItem('cartDB', JSON.stringify(cart))
  }

  function removeFromCart(id, qty = 1) {
    const itemFind = cart.find(i => i.id === id);
    const result = itemFind.qty - 1;
    if (result > 0) {
      itemFind.qty -= qty;
    } else {
      cart = cart.filter(i => i.id !== id);
    }
    printCart()
    ls.setItem('cartDB', JSON.stringify(cart))
  }

  function deleteFromCart(id) {
    cart = cart.filter((i) => i.id !== id);
    printCart();
    ls.setItem('cartDB', JSON.stringify(cart))
  }

  function showItemsCount() {
    const count = cart.reduce((cont, item) => cont + item.qty, 0);
    return count;
  }

  function showTotal() {
    let total = 0;
    for (let item of cart) {
      const productFind = db.find((pdb) => pdb.id === item.id);
      total += item.qty * productFind.price;
    }
    return total;
  }

  function checkout() {
    for (let item of cart) {
      const productFind = db.find((pdb) => pdb.id === item.id);
      productFind.quantity -= item.qty;
      ls.setItem('productsDB', JSON.stringify(db))
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Gracias por su compra',
      showConfirmButton: false,
      timer: 1500
    }
    )

    cart = [];
    ls.setItem('cartDB', JSON.stringify(cart))
    printCart();
    printProducts();
  }

  printCart()

  // Eventos

  productsDOM.addEventListener("click", function (e) {
    if (e.target.closest('.add--to--cart')) {
        Swal.fire({
          position: 'top-start',
          icon: 'success',
          title: 'Agregado al carrito',
          showConfirmButton: false,
          timer: 1500
        })
        const id = +e.target.closest('.add--to--cart').dataset.id
        addToCart(id)
    }
  })

  cartDOM.addEventListener('click', function(e){
    if (e.target.closest('.article--minus')) {
        const id = +e.target.closest('.article--minus').dataset.id
        removeFromCart(id)
    }
    if (e.target.closest('.article--plus')) {
        const id = +e.target.closest('.article--plus').dataset.id
        addToCart(id)
    }
    if (e.target.closest('.remove-from-cart')) {
        const id = +e.target.closest('.remove-from-cart').dataset.id
        deleteFromCart(id)
    }
  })

  checkoutDOM.addEventListener('click', function(){
    checkout()
  })

}

export default cart;
