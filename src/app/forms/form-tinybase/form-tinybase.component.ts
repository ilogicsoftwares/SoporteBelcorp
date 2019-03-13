import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { Inputcontrol } from 'src/app/models/inputcontrol.model';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-form-tinybase',
  templateUrl: './form-tinybase.component.html',
  styleUrls: ['./form-tinybase.component.css']
})
export class FormTinybaseComponent implements OnInit {
  @Input() inputs: Inputcontrol[]=[];
  @Output() eventAplicar = new EventEmitter<any>();
  
  constructor( private fServide: FormService) {
   
  }

  ngOnInit() {
  }

  Aplicar(){
   let newValue=this.fServide.dataBuild(this.inputs);
   this.eventAplicar.emit(newValue);
  }

}
