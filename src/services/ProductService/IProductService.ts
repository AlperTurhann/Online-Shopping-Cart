import Product from "../../models/Product";

interface IProductService {
    _products: Product[];

    get products(): Product[];
    getProduct(id: number): Product | undefined;
}

export default IProductService;