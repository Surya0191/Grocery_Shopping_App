import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService:DataStorageService, private authService:AuthService){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.dataStorageService.storeData();
  }

  onFetchData(){
    this.dataStorageService.fetchData().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
