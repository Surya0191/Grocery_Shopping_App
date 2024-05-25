import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feauture:string){
    this.featureSelected.emit(feauture);
  }

}
