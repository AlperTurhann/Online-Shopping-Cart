import IProductService from "./IProductService";
import Product from "../../models/Product";
import StoreProductService from "./StoreProductService";
import createProduct from "../../components/ProductCreater";

class CartProductService implements IProductService {
    private constructor() {}
    
    _products: Product[] = [];
    private _canCheckout = true;
    private _store: HTMLElement | null = document.getElementById('store');
    private _cartProducts: HTMLElement | null = document.getElementById('cart-products');
    private _emptyCartP: HTMLElement | null = document.getElementById('p-empty-cart');
    private _totalPrice: HTMLElement | null = document.getElementById('p-total-price');
    private _checkoutButton: HTMLButtonElement = document.getElementById('button-checkout') as HTMLButtonElement;
    private static _Instance: CartProductService;

    get canCheckout(): boolean { return this._canCheckout; }
    get products(): Product[] { return this._products; }
    getProduct(id: number): Product | undefined {
        const product = this._products.find(product => product.id === id);
        return product;
    }
    
    addProduct(id: number): void {
        const tmpProduct: Product | undefined = StoreProductService.getInstance().getProduct(id);
        if (tmpProduct) {
            this._products.push(tmpProduct);
            this._cartProducts?.appendChild(createProduct(id, tmpProduct.title, tmpProduct.category.name, tmpProduct.price.toString()));
            this._calculateTotalPrice(tmpProduct.price);
            this._checkCartContent();
        } else console.error('This product could not be founded!');
    }

    removeProduct(id: number): void {
        const productIndex = this._products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this._store?.appendChild(createProduct(id, this._products[productIndex].title, this._products[productIndex].category.name, this._products[productIndex].price.toString(), false));
            this._calculateTotalPrice(-this._products[productIndex].price);
            this._products.splice(productIndex, 1);
            this._checkCartContent();
        } else console.error('This product could not be founded!');
    }

    buyProducts(): void {
        this._canCheckout = false;
        this._checkoutButton.classList.add('pointer-events-none');
        this._checkoutButton.classList.add('opacity-50');
        this._checkoutButton.disabled = true;
    }

    completeShopping(): void {
        if (this._cartProducts && this._totalPrice) {
            this._cartProducts.innerHTML = '';
            this._totalPrice.innerText = '0.00$';
            this._products = [];
            this._canCheckout = true;
            this._checkCartContent();
        }
    }

    static getInstance(): CartProductService {
        if (!CartProductService._Instance) CartProductService._Instance = new CartProductService();
        return CartProductService._Instance;
    }

    private _calculateTotalPrice(price: number) {
        if (this._totalPrice) {
            this._totalPrice.innerText = this._totalPrice?.innerText.split('.00$')[0];
            this._totalPrice.innerText = parseInt(this._totalPrice.innerText) + price + '.00$';
        }
    }
    
    private _checkCartContent(): void {
        if (this._cartProducts) {
            if (this._products.length === 0) {
                this._checkoutButton.classList.add('pointer-events-none');
                this._checkoutButton.classList.add('opacity-50');
                this._checkoutButton.disabled = true;
                if (this._emptyCartP) this._cartProducts.appendChild(this._emptyCartP);
            } else {
                this._checkoutButton.classList.remove('pointer-events-none');
                this._checkoutButton.classList.remove('opacity-50');
                if (this._canCheckout) this._checkoutButton.disabled = false;
                this._emptyCartP?.remove();
            }
        }
    }
}

export default CartProductService;