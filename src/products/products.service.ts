import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  insertProduct(title: string, desc: string, price: string) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products]; //product arrayini döndürmek için yeni bir array içerisine kopyalayıp yolluyoruz
  }
  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }
  updateProduct(productId: string, title: string, desc: string, price: string) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }
  deleteProduct(prodId: string) {
    const [_, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('could not found product');
    }
    return [product, productIndex];
  }
}
