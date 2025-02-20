import { Component, computed, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { IFilter, IFilterOutput } from 'src/app/shared/filter/filter.component';
import { filterConfig } from '../../config/product-filter.config';
import { ProductFactoryService } from '../../services/product-factory.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IProductService } from '../../interfaces/product-service.interface';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { EUserType } from 'src/app/core/enums/EUserType';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent {
  products: IProduct[] = [];
  subscriber = new Subject();
  filters: IFilter[] = filterConfig(this)

  // Pagination Config
  rpp = 20;
  page = 0;
  dataSize!: number;
  pageSizeOptions = [2, 5, 10, 25];
  appliedFilters: IFilterOutput[] = [];

  isLoading = false;

  productService: IProductService = this.productFactoryService.getProductService();

  user = signal<IUser | undefined>(this.authService.getUser());
  canCreateProduct = computed(() => this.user()?.role?.toUpperCase() === EUserType.User);


  constructor(
    public productFactoryService: ProductFactoryService,
    public router: Router,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.load();
  }

  onChangedPage(event: PageEvent) {
    this.page = event.pageIndex;
    this.rpp = event.pageSize;
    this.load();

  }

  load() {
    this.isLoading = true;
    this.productService.getProducts(this.page, this.rpp, this.appliedFilters).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.products = result.products
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }

  filtersChanged(filters: IFilterOutput[]){
    this.appliedFilters = filters;
    this.load();
  }

  navigateToCreate() {
    this.router.navigate(['product/create'])
  }












  // products = [
  //   {
  //     name: "Electric Drill",
  //     category: "Electronic",
  //     subcategory: "Power Tools",
  //     images: ["https://www.jafarshop.com/cdn/shop/products/5999108433979_51dea34a-a2df-4b1e-aaa2-8070a2bfbc7a_1050x700.jpg?v=1709466600","https://m.media-amazon.com/images/I/612NWL8phFL._AC_UF894,1000_QL80_.jpg"],
  //     description: "High-power electric drill for all your needs.High-power ",
  //     price: 120,
  //     stock: true,
  //     reviews: ['1', '2', '3']
  //   },
  //   {
  //     name: "Hammer Drill",
  //     category: "Electronic",
  //     subcategory: "Power Tools",
  //     images: ["https://m.media-amazon.com/images/I/612NWL8phFL._AC_UF894,1000_QL80_.jpg"],
  //     description: "Heavy-duty hammer drill for construction work.",
  //     price: 150,
  //     stock: false,
  //     reviews: ['1', '2', '3', '60', '8']
  //   },
  //   {
  //     name: "Cordless Screwdriver",
  //     category: "Electronic",
  //     subcategory: "Hand Tools",
  //     images: ["https://mrelectric.com/us/en-us/mr-electric/_assets/images/Blog/mre-blog-the-6-best-electrical-appliances-for-your-kitchen.webp"],
  //     description: "Rechargeable screwdriver with multiple bits.",
  //     price: 50
  //   },
  //   {
  //     name: "Angle Grinder",
  //     category: "Electronic",
  //     subcategory: "Grinding Tools",
  //     images: ["https://amsmedicals.com/wp-content/uploads/2024/09/Electronic-Kitchen-Scale-10-Kg-3-1.webp"],
  //     description: "Powerful angle grinder for cutting and grinding.",
  //     price: 180
  //   },
  //   {
  //     name: "Cordless Impact Wrench",
  //     category: "Electronic",
  //     subcategory: "Automotive Tools",
  //     images: ["https://www.elarabygroup.com/media/catalog/category/Home_Appliances.png"],
  //     description: "Heavy-duty impact wrench with lithium battery.",
  //     price: 200
  //   },
  //   {
  //     name: "Rotary Hammer",
  //     category: "Electronic",
  //     subcategory: "Demolition Tools",
  //     images: ["https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/electric-tandoor-kitchen-appliance_0_1200.jpg"],
  //     description: "Durable rotary hammer for drilling and chiseling.",
  //     price: 250
  //   },
  //   {
  //     name: "Welding Machine",
  //     category: "Electronic",
  //     subcategory: "Welding Tools",
  //     images: ["https://images.unsplash.com/photo-1606787366850-de6330128bfc"],
  //     description: "Portable inverter welding machine.",
  //     price: 300
  //   },
  //   {
  //     name: "Table Saw",
  //     category: "Electronic",
  //     subcategory: "Woodworking Tools",
  //     images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WYCFtFlhzoJ3pyCEon2PguMDSvxYwm7VmA&s"],
  //     description: "Professional-grade table saw for precision cuts.",
  //     price: 400
  //   },
  //   {
  //     name: "Cordless Jigsaw",
  //     category: "Electronic",
  //     subcategory: "Woodworking Tools",
  //     images: ["https://images.unsplash.com/photo-1555952386-0a8c70a6d27b"],
  //     description: "Versatile jigsaw for cutting various materials.",
  //     price: 130
  //   },
  //   {
  //     name: "Bench Grinder",
  //     category: "Electronic",
  //     subcategory: "Grinding Tools",
  //     images: ["https://images.unsplash.com/photo-1615829342376-7b70e9a0d193"],
  //     description: "Heavy-duty bench grinder for sharpening tools.",
  //     price: 90
  //   },
  //   {
  //     name: "Cordless Nail Gun",
  //     category: "Electronic",
  //     subcategory: "Carpentry Tools",
  //     images: ["https://images.unsplash.com/photo-1567358036704-5a9d2e4e0e3e"],
  //     description: "Battery-powered nail gun for quick nailing.",
  //     price: 220
  //   },
  //   {
  //     name: "High-Pressure Washer",
  //     category: "Electronic",
  //     subcategory: "Cleaning Tools",
  //     images: ["https://images.unsplash.com/photo-1566207274740-0f88b8f42e4f"],
  //     description: "Powerful pressure washer for outdoor cleaning.",
  //     price: 350
  //   },
  //   {
  //     name: "Multifunction Oscillating Tool",
  //     category: "Electronic",
  //     subcategory: "DIY Tools",
  //     images: ["https://images.unsplash.com/photo-1597733336794-05f4d3c9e395"],
  //     description: "Oscillating tool for cutting, sanding, and scraping.",
  //     price: 140
  //   },
  //   {
  //     name: "Electric Paint Sprayer",
  //     category: "Electronic",
  //     subcategory: "Painting Tools",
  //     images: ["https://images.unsplash.com/photo-1601565588467-9913e44b36f6"],
  //     description: "High-speed paint sprayer for smooth finish.",
  //     price: 180
  //   },
  //   {
  //     name: "Tile Cutter",
  //     category: "Electronic",
  //     subcategory: "Tiling Tools",
  //     images: ["https://images.unsplash.com/photo-1593690618191-b36f44639b45"],
  //     description: "Precision tile cutter for ceramic and porcelain tiles.",
  //     price: 95
  //   },
  //   {
  //     name: "Industrial Vacuum Cleaner",
  //     category: "Electronic",
  //     subcategory: "Cleaning Tools",
  //     images: ["https://images.unsplash.com/photo-1587032305942-28ecda7a95cc"],
  //     description: "Heavy-duty vacuum cleaner for industrial use.",
  //     price: 500
  //   },
  //   {
  //     name: "Cordless Air Compressor",
  //     category: "Electronic",
  //     subcategory: "Automotive Tools",
  //     images: ["https://images.unsplash.com/photo-1529946189072-6c4f2ea314b6"],
  //     description: "Portable air compressor for tire inflation.",
  //     price: 160
  //   },
  //   {
  //     name: "Plasma Cutter",
  //     category: "Electronic",
  //     subcategory: "Metalworking Tools",
  //     images: ["https://images.unsplash.com/photo-1595800354255-9513c96e4a04"],
  //     description: "High-precision plasma cutter for metalwork.",
  //     price: 700
  //   },
  //   {
  //     name: "Heat Gun",
  //     category: "Electronic",
  //     subcategory: "DIY Tools",
  //     images: ["https://images.unsplash.com/photo-1612828316501-fcb18c9a1c49"],
  //     description: "Versatile heat gun for stripping paint and welding plastics.",
  //     price: 60
  //   }
  // ];
  

  selectedProduct: any = null;

  viewProduct(id:string) {
    this.router.navigate(["/product/view", id]);
  }

  closeProductView() {
    this.selectedProduct = null;
  }
  
  truncateDescription(description: string, length: number = 100): string {
    return description.length > length ? description.substring(0, length) + '...' : description;
  }
  
}
