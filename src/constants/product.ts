interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    thumbnail: string;
    qty?: number;
    checked?: boolean;
}

export default Product;