import Product from "../models/Product";
import getData from "../utils/fetchUtil";

const productsURL: string = 'https://api.escuelajs.co/api/v1/products';

async function productMapper(): Promise<Product[]> {
    var products: Product[] = [];

    await getData(productsURL)
    .then(data => {
        if (data) {
            data.forEach((dataProduct: any) => {
                if (isProduct(dataProduct)) {
                    const product: Product = {
                        id: dataProduct.id || -1,
                        title: dataProduct.title || 'Empty Product',
                        price: dataProduct.price || 0,
                        category: {
                            id: dataProduct.category.id,
                            name: dataProduct.category.name || '-'
                        }
                    }
                    products.push(product);
                } else console.log('Invalid product data format!');
            });
        } else console.log('The products could not be accessed!');
    })
    .catch(error => console.log(error));

    return products;
}

function isProduct(data: any): data is Product {
    return (
        typeof data.id === 'number' &&
        typeof data.title === 'string' &&
        typeof data.price === 'number' &&
        data.category &&
        typeof data.category.id === 'number' &&
        typeof data.category.name === 'string'
    );
}

export default productMapper;