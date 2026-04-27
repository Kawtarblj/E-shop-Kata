import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTerm = signal('');

 
  setSearch(value: string) {
    this.searchTerm.set(value);
  }

  
  clearSearch() {
    this.searchTerm.set('');
  }
}