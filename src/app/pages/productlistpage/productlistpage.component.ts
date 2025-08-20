import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductaddeditComponent } from '../../Component/productaddedit/productaddedit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productlistpage',
  templateUrl: './productlistpage.component.html',
  styleUrl: './productlistpage.component.scss'
})
export class ProductlistpageComponent {
   filterValue: string = '';
  selectedCategory: string = '';

  displayedColumns: string[] = [
    'productNumber',
    'productName',
    'price',
    'shortcut',
    'category',
    'baseQuantity',
      'stackoverall',
  'currentstack',
    'isActive',
    'actions'
  ];
  dataSource = new MatTableDataSource<Product>([]);
  categories: string[] = [];
  products : any | undefined;
  searchText: string = '';
  filteredProducts: any[] = [];
  cols: number = 4;
  rowHeight: string = '1:1.2';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService,private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.loadProducts();
    
    document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
    if(!button.classList.contains('delete')) {
        button.classList.add('delete');
        setTimeout(() => button.classList.remove('delete'), 3200);
    }
    e.preventDefault();
}));

    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Set combined filter predicate for name + category
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const filterObj = JSON.parse(filter);
      const matchesName = data.productName.toLowerCase().includes(filterObj.name);
      const matchesCategory = !filterObj.category || data.category === filterObj.category;
      return matchesName && matchesCategory;
    };
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.dataSource.data = data;
     this.products = data;
    this.filteredProducts = data; // initially all
    this.categories = Array.from(new Set(data.map(p => p.category)));
      this.applyFilter(); // Apply filter once loaded
    });
  }

applyFilter() {
  const search = this.searchText.trim().toLowerCase();
  if (!search) {
    this.filteredProducts = this.products;
    return;
  }

  this.filteredProducts = this.products.filter((p :any) =>
    (p.productName && p.productName.toLowerCase().includes(search)) ||
    (p.shortcut && p.shortcut.toLowerCase().includes(search)) ||
    (p.productNumber && p.productNumber.toString().includes(search)) ||
    (p.category && p.category.toLowerCase().includes(search))
  );
}
categoryfilter(value :any){
  const search = value.trim().toLowerCase();
  if (!search) {
    this.filteredProducts = this.products;
    return;
  }
  else if(search == "rest"){
    this.filteredProducts = this.products;
    return;
  }

  this.filteredProducts = this.products.filter((p :any) =>
    (p.category && p.category.toLowerCase().includes(search))
  );
}


 addProduct() {
    const dialogRef = this.dialog.open(ProductaddeditComponent, {
      width: '300px',
      data: null // no data for adding
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Add Product:', result);
        // Call API for adding
        // this.apiService.addProduct(result).subscribe(...)
      }
    });
  }

    editProduct(product: any) {
    const dialogRef = this.dialog.open(ProductaddeditComponent, {
      width: '250px',
      data: product // pass existing product for edit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated Product:', result);
        // Call API for updating
        // this.apiService.updateProduct(result).subscribe(...)
      }
    });
  }

  deleteProduct(row: Product) {
    console.log('Delete product:', row);
    
  }
}
