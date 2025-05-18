import { Component, OnInit } from '@angular/core';
import{Menu_items_user} from "../../shared/database/menu_items";
import { Menu_items_admin } from '../../shared/database/menu_items';
import { LoginService } from 'app/utils/login.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  user=localStorage.getItem('user')
  isAdmin=localStorage.getItem('isAdmin')
  menu_items?:any;
  constructor(private loginService:LoginService, private router:Router){

  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
    if(this.isAdmin=='true'){
      this.menu_items=Menu_items_admin;
    }else{
      this.menu_items=Menu_items_user;
    }
  }

}
