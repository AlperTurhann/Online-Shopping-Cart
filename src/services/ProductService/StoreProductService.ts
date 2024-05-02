import IProductService from "./IProductService";
import Product from "../../models/Product";
import productMapper from "../../helper/ProductMapper";

class StoreProductService implements IProductService {
    private constructor() {}
    async init(): Promise<void> { this._products = await productMapper();}

    private static _instance: StoreProductService;
    _products: Product[] = [];

    static getInstance(): StoreProductService {
        if (!StoreProductService._instance) StoreProductService._instance = new StoreProductService();
        return StoreProductService._instance;
    }
    get products(): Product[] { return this._products; }
    getProduct(id: number): Product | undefined {
        const product = this._products.find(product => product.id === id);
        return product;
    }
}

export default StoreProductService;