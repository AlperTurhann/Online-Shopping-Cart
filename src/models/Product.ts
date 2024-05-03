interface Product {
    id: number,
    title: string,
    price: number,
    category: Category
}

interface Category {
    id: number,
    name: string
}

export default Product;