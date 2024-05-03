import IProductService from "./IProductService";
import Product from "../../models/Product";
import StoreProductService from "./StoreProductService";

class CartProductService implements IProductService {
    private constructor() {}
    
    _products: Product[] = [];
    private static _Instance: CartProductService;

    get products(): Product[] { return this._products; }
    getProduct(id: number): Product | undefined {
        const product = this._products.find(product => product.id === id);
        return product;
    }
    addProduct(id: number): void {
        const tmpProduct: Product | undefined = StoreProductService.getInstance().getProduct(id);
        if (tmpProduct) {
            this._products.push(tmpProduct);
            console.log('Added Product: ', StoreProductService.getInstance().getProduct(id));
        } else console.log('This product could not be founded!');
    }
    removeProduct(id: number): void {
        const productIndex = this._products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this._products.splice(productIndex, 1);
            console.log('Removed Product: ', StoreProductService.getInstance().getProduct(id));
        } else console.log('This product could not be founded!');
    }
    static getInstance(): CartProductService {
        if (!CartProductService._Instance) CartProductService._Instance = new CartProductService();
        return CartProductService._Instance;
    }
}

export default CartProductService;