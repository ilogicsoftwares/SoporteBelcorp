import { Component, OnInit, Input } from '@angular/core';
import { Inputcontrol } from 'src/app/models/inputcontrol.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() input: Inputcontrol= new Inputcontrol();
  constructor() { 
    this.input.label="Ejemplo: ";
    this.input.inputPlaceHolder="ejemplo";
    this.input.inputid="ejemplo";
    this.input.inputType="text";
  }

  ngOnInit() {
  }

}
