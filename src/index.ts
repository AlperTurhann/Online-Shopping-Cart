import StoreProductService from "./services/ProductService/StoreProductService";
import CartProductService from "./services/ProductService/CartProductService";

setProductServices();

async function setProductServices() {
  await StoreProductService.getInstance().init();
  console.log(StoreProductService.getInstance().products);
  console.log(CartProductService.getInstance().products);
}