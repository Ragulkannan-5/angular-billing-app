import { Component, signal, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductaddeditComponent } from '../../Component/productaddedit/productaddedit.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productlistpage',
  templateUrl: './productlistpage.component.html',
  styleUrl: './productlistpage.component.scss'
})
export class ProductlistpageComponent {
  filterValue: string = '';
  selectedCategory: string = 'rest';
  apiurl = (window as any).appConfig.apiurl;
  categorys = (window as any).appConfig.category;
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
  products: any | undefined;
  searchText: string = '';
  filteredProducts: any[] = [];
  cols: number = 4;
  rowHeight: string = '1:1.2';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog, private http: HttpClient) {
   }
getProductsByCategory(category: string) {
  return this.filteredProducts.filter(p => p.category === category);
}

  ngOnInit(): void {
    this.loadProducts();

    document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
      if (!button.classList.contains('delete')) {
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

    this.filteredProducts = this.products.filter((p: any) =>
      (p.productName && p.productName.toLowerCase().includes(search)) ||
      (p.shortcut && p.shortcut.toLowerCase().includes(search)) ||
      (p.productNumber && p.productNumber.toString().includes(search)) ||
      (p.category && p.category.toLowerCase().includes(search))
    );
  }
  categoryfilter(value: any) {
    const search = value.trim().toLowerCase();
    if (!search) {
      this.filteredProducts = this.products;
      return;
    }
    else if (search == "rest") {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((p: any) =>
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
        Swal.fire({
          title: 'Success!',
          text: result,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.loadProducts();
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
        Swal.fire({
          title: 'Success!',
          text: result,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log('Updated Product:', result);
        this.loadProducts();
        // Call API for updating
        // this.apiService.updateProduct(result).subscribe(...)
      }
    });
  }

  deleteProduct(row: Product) {

    Swal.fire({
      title: 'Delete',
      text: "Are you sure to delete! " + row.productName,
      icon: 'error',
      showCancelButton: true,            // 👈 Shows the "Close" button
      confirmButtonText: 'OK',           // 👈 Rename confirm button
      cancelButtonText: 'Close',
    }).then((res) => {
      if (res.isConfirmed) {
        this.http.delete<any>(this.apiurl + "Productlist/Deleteproduct?Id=" + row.id).subscribe({
          next: (res) => {
            console.log("API Response:", res);   // ✅ Logs full response
          },
          error: (err) => {
            console.error("API Error:", err);    // ✅ Logs error if request fails
          },
          complete: () => {
            console.log("Request Completed");    // ✅ Logs when request is done
          }
        });
         this.loadProducts();
        console.log('Delete product:', row);
      }
    });


  }

  showCrackers(event: MouseEvent) {
  const container = document.getElementById("cracker-animation");
  if (!container) return;

  // Button position
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const xCenter = rect.left + rect.width / 2;
  const yCenter = rect.top + rect.height / 2;

  for (let i = 0; i < 25; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";

    // Start at button position
    spark.style.left = xCenter + "px";
    spark.style.top = yCenter + "px";

    // Random explosion direction
    spark.style.setProperty("--x", `${Math.random() * 200 - 100}px`);
    spark.style.setProperty("--y", `${Math.random() * 200 - 100}px`);

    // Random color
    spark.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;

    container.appendChild(spark);

    // Remove after animation
    setTimeout(() => spark.remove(), 700);
  }
}

}
