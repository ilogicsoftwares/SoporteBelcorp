import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	@ViewChild('navs') navs: ElementRef;

  height3:number;
  height2:number;
  height1:number;
  constructor(private elRef:ElementRef) { }

  ngOnInit() {
    //this.htmlbodyHeightUpdate();
	}
	
	ngAfterContentInit() {
	
	}

 
	

}
