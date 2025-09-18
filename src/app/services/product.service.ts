import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  productNumber: number;
  productName: string;
  price: number;
  shortcut: string;
  category: string;
  baseQuantity: string;
  stackoverall:number;
  currentstack:number;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    apiUrl = (window as any).appConfig.apiurl;
  private productsUrl = this.apiUrl+'Productlist/Getproduct';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
  
}