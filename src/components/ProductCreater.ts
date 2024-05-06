import CartProductService from "../services/ProductService/CartProductService";
import "./ProductCreater.css"

function createProduct(id: number, name: string, category: string, price: string, isCart: boolean = true): DocumentFragment {
    const productTemplate: string = 
        `<div class="${isCart ? 'product-cart' : 'product-store'}">
            <div class="left-side">
                <p class="p-product-name">${name}</p>
                <p class="p-product-category">${category}</p>
            </div>
            <div class="right-side">
                <p>${price}.00$</p>
                <button class="button-${isCart ? 'remove' : 'add'}">${isCart ? 'Remove' : 'Buy'}</button>
            </div>
        </div>`;

    const fragment = document.createRange().createContextualFragment(productTemplate);
    const actionButton = fragment.querySelector('button');
    actionButton?.addEventListener('click', (event) => {
        isCart ? removeProduct.call(event.currentTarget, id) : addProduct.call(event.currentTarget, id);
    });

    return fragment;
}

function addProduct(this: any, id: number) {
    const productDiv = this.parentNode.parentNode;
    productDiv.remove();
    CartProductService.getInstance().addProduct(id);
}
function removeProduct(this: any, id: number) {
    const productDiv = this.parentNode.parentNode;
    productDiv.remove();
    CartProductService.getInstance().removeProduct(id);
}

export default createProduct;