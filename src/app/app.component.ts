import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:string = "Surya";
  data:string = "Information"
  servers:string[]=[];

  addServer(){
    this.servers.push(this.data);
  }
}
