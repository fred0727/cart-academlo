function products(products) {
  const productsDOM = document.querySelector(".products__container");
  const ls = window.localStorage;
  const db = JSON.parse(ls.getItem("productsDB")) || [...products] ; /* db */
  function printProducts() {
    let htmlProduct = "";
    for (let product of db) {
      htmlProduct += `<article class="product">
            <div class="product__image">
              <img
                src="${product.image}"
                alt="${product.name}"
                title="Detalle"
                data-id="${product.id}"
                class="product--image"
              />
            </div>
            <div class="product__content">
              <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
                <i class="bx bx-cart-add"></i>
              </button>
              <span class="product__price">$ ${product.price}</span>
              <span class="product__stock">Disponibles: ${product.quantity}</span>
              <h3 class="product__title">${product.name}</h3>
            </div>
          </article>
          `;
    }
    productsDOM.innerHTML = htmlProduct;
  }
  printProducts();

  return {
    db,
    printProducts,
  };
}

export default products;
