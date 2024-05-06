import StoreProductService from "./services/ProductService/StoreProductService";
import CartProductService from "./services/ProductService/CartProductService";
import createProduct from "./components/ProductCreater";

const store: HTMLElement | null = document.getElementById('store');
const cartPanel: HTMLElement | null = document.getElementById('side-bar-cart');
const checkoutBtn: HTMLButtonElement = document.getElementById('button-checkout') as HTMLButtonElement;

setProductServices();
openAndCloseCartPanel();

document.getElementById('button-cart')?.addEventListener('click', openAndCloseCartPanel);
checkoutBtn.addEventListener('click', async () => {
  if (CartProductService.getInstance().canCheckout) {
    try {
      CartProductService.getInstance().buyProducts();
      setTimeout(() => {
        CartProductService.getInstance().completeShopping();
        alert(`Your shopping is complete!`);
      }, 1000);
    } catch (error) { console.error(error); }
  } else console.error('Please wait for the completion of the current shopping!');
});

function openAndCloseCartPanel() {
  if (cartPanel && store) {
    if (cartPanel.classList.contains('hidden')) {
      cartPanel.classList.remove('hidden');
      store.classList.remove('w-full');
      store.classList.add('w-2/3');
    }
    else {
      cartPanel.classList.add('hidden');
      store.classList.remove('w-2/3');
      store.classList.add('w-full');
    }
  }
}

async function setProductServices() {
  await StoreProductService.getInstance().init();
  StoreProductService.getInstance().products.forEach(product => {
    store?.appendChild(createProduct(product.id, product.title, product.category.name, product.price.toString(), false));
  });
}