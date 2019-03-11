import { Component, OnInit, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-form-tinybase',
  templateUrl: './form-tinybase.component.html',
  styleUrls: ['./form-tinybase.component.css']
})
export class FormTinybaseComponent implements OnInit {
  @Input() inputs: InputComponent[];
  constructor() { }

  ngOnInit() {
  }

}
