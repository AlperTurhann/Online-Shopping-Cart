import Product from "../models/Product";
import getData from "../utils/fetchUtil";

const productsURL: string = 'https://api.escuelajs.co/api/v1/products';

async function productMapper(): Promise<Product[]> {
    var products: Product[] = [];

    await getData(productsURL)
    .then(data => {
        if (data) {
            data.forEach((dataProduct: any) => {
                const product: Product = {
                    id: dataProduct.id ? dataProduct.id : -1,
                    name: dataProduct.title,
                    price: dataProduct.price,
                    categoryName: dataProduct.category.name
                }
                products.push(product);
            });
        } else console.log('The products could not be accessed!');
    })
    .catch(error => console.log(error));

    return products;
}

export default productMapper;