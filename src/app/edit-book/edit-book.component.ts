import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book;
  bookForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required, Validators.minLength(10)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe(
      next => {
        this.book = next;
        this.bookForm.patchValue(this.book);
      },
      error => {
        console.log(error);
        this.book = null;
      }
    );
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const { value } = this.bookForm;
      const data = {
        ...this.book,
        ...value
      };
      this.bookService.updateBook(data).subscribe(
        next => {
          this.router.navigate(['/book']);
        },
        error => console.log(error)
      );
    }
  }

}
