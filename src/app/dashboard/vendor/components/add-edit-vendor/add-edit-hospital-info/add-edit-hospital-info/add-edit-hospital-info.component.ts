import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-hospital-info',
  templateUrl: './add-edit-hospital-info.component.html',
  styleUrls: ['./add-edit-hospital-info.component.css'],
})
export class AddEditHospitalInfoComponent implements OnInit {


  currentItem = true;

  constructor() { }

  ngOnInit(): void {
  }

}
