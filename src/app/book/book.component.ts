import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookList: Book[] = [];
  bookForm: FormGroup;
  constructor(
    private bookService: BookService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.bookService
      .getBooks()
      .subscribe(next => (this.bookList = next), error => (this.bookList = []));
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const {value} = this.bookForm;
      this.bookService.createBook(value)
        .subscribe(next => {
          this.bookList.unshift(next);
          this.bookForm.reset({
            title: '',
            description: ''
          });
        }, error => console.log(error));
    }
  }

  deleteBook(i) {
    const book = this.bookList[i];
    this.bookService.deleteBook(book.id).subscribe(() => {
      this.bookList = this.bookList.filter(t => t.id !== book.id);
    });
  }

}
