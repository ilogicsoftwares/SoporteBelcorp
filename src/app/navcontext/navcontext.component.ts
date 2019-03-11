import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-navcontext',
  templateUrl: './navcontext.component.html',
  styleUrls: ['./navcontext.component.css']
})
export class NavcontextComponent implements OnInit {
 @Input() title;
 
  constructor() {
 
  }

  ngOnInit() {
  }

}
