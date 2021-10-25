import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { PageLoaderService } from '../shared/widgets/loader/page.loader.service';
import { StudentService } from './student.service';
import { StateManagementService } from '../shared/services/state.management.service';

@Component({
  selector: 'app-student-component',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public url = new URL(decodeURIComponent(window.location.href));
  public urlParameters: any = this.url.pathname.substring(1).split('/');

  public student: any = {};
  public isNew = false;

  constructor(
    public globals: GlobalService,
    public router: Router,
    public pageLoader: PageLoaderService,
    public stateManager: StateManagementService,
    public studentservice: StudentService) {

  }

  ngOnInit() {

    const studentId = this.urlParameters.pop();
    if (isNaN(studentId)) {
      this.isNew = true;
    } else {

      this.pageLoader.setLabel('Loading, please wait...');
      this.pageLoader.show();

      return this.studentservice.get(studentId).then(
        (response: any) => {
          this.student = response;
          this.pageLoader.hide();
        },
        (error: any) => {
          this.pageLoader.hide();
        }
      );
    }

  }

  create() {
    this.pageLoader.show();
    this.student.Id = this.stateManager.get('last-record').Id + 1;
    return this.studentservice.create(this.student).then(
      (response: any) => {
        this.router.navigate(['/students']);
        this.pageLoader.hide();
      },
      (error: any) => {
        this.pageLoader.hide();
      }
    );
  }

  update() {
    this.pageLoader.show();
    return this.studentservice.update(this.student).then(
      (response: any) => {
        this.router.navigate(['/students']);
        this.pageLoader.hide();
      },
      (error: any) => {
        this.pageLoader.hide();
      }
    );
  }

}
