import loader from './components/loader.js';
import showMenu from './components/showMenu.js';
import showCart from './components/showCart.js';
import products from './components/products.js';
import getProducts from './helpers/getProducts.js';
import cart from './components/cart.js';
import frontPage from './components/frontPage.js';
import dark from './components/dark.js';
import modal from './components/modal.js';

// UI Elements
// Ocultar Loader
loader()

// Mostar Menu
showMenu()

// Mostrar Carrito
showCart()

// products
const {db, printProducts} = products(await getProducts())

// Carrito
cart(db, printProducts)

// frontPage
frontPage(db)

// Dark Mode
dark()

// Modal
modal(db)
