import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0.00
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(`${id}`).subscribe(product => {
      this.product = product
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  deleteProduct(): void {
    this.productService.delete(`${this.product.id}`)
    .subscribe(() => {
      this.productService.showMessage('Produto excluído!')
      this.router.navigate(['/products'])
    })
  }



}
