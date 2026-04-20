import { Injectable ,signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://fakestoreapi.com';
 

  constructor(private http: HttpClient) {}

get<T>(endpoint: string) {
  return firstValueFrom(
    this.http.get<T>(`${this.baseUrl}/${endpoint}`)
  );
}
}
