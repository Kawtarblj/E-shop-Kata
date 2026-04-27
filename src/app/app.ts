import { Component, OnInit, signal,inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../app/core/services/search.service';
import { CartService } from './features/cart/services/cart.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('Gallery_kata');

 constructor(private searchService: SearchService) {}
cartCount=inject(CartService).count;
searchTerm = '';

onSearch() {
  this.searchService.setSearch(this.searchTerm);
}

}