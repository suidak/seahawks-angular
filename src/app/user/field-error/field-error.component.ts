import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css']
})
export class FieldErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() errorMsg: string;
  @Input() displayError: boolean;

}
