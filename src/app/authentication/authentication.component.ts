import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router) {
    // const token = localStorage.getItem('token');
    // if(token) {
    //     this.router.navigate(['/dashboard/main-dashboard'])
    // }
    // this.router.navigate(['authentication/signup/personal']);

   }

  ngOnInit(): void {
  }

}
