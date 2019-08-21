import { Injectable } from '@angular/core';
import {Book} from './book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API_URL = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }
  getBooks(count = 10): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL).pipe(
      map(response => response.filter((book, i) => i < count))
    );
  }
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }
  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(`${this.API_URL}/${book.id}`, book);
  }
}
