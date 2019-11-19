import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columnDefs:any[];
  private _data;
  @Input() title:string="";
  @Input() set data(v){
    this._data=v;
    let colnames=Object.keys(v[0]);
    this.columnDefs=colnames.map(item=>{
     return  {headerName:item,field:item,suppressSizeToFit: true, resizable:true};

    });
    this.rowData=v;
  };
  get data():any{
    return this._data;
  }
  rowData :any[];
  constructor() { }

  ngOnInit() {
  }

}
