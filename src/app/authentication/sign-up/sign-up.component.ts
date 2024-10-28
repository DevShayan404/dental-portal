import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ])
  ],
})
export class SignUpComponent implements OnInit {

  items: any;
  
  constructor(private router: Router) {
        // this.router.navigate(['authentication/signup/personal']);
    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.router.navigate(['/dashboard/main-dashboard'])
    // }
  }

  ngOnInit(): void {
      this.items = [
        {
            label: 'Personal',
            routerLink: 'personal'
        },
        {
            label: 'Hospital',
            routerLink: 'vendor'
        },
        {
            label: 'Experience',
            routerLink: 'experience'
        },
        {
            label: 'Education',
            routerLink: 'education'
        },
        {
          label: 'Service',
          routerLink: 'service'
      }
    ];
  }

  

}
