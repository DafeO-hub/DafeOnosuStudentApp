import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { StudentService } from './student.service';
import { PageLoaderService } from '../shared/widgets/loader/page.loader.service';
import { StateManagementService } from '../shared/services/state.management.service';

@Component({
  selector: 'app-students-component',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public students: Array<any> = [];
  public student: any = {};

  constructor(
    public globals: GlobalService,
    public router: Router,
    public pageLoader: PageLoaderService,
    public stateManager: StateManagementService,
    public studentservice: StudentService) {
    this.globals.isLoading = false;
  }

  ngOnInit() {

    $(() => {

      // enable tooltips
      ($('[data-toggle="tooltip"]') as any).tooltip();

    });

    this.getstudents();

  }

  getstudents(pageNumber: number = 1) {
    this.pageLoader.show();
    return this.studentservice.getAll().then(
      (response: any) => {
        this.students = response.data;
        this.pageLoader.hide();
      },
      (error: any) => {
        this.pageLoader.hide();
      }
    );
  }

  searchStudentOnClick() {
    this.getstudents();
  }

  searchStudentOnEnter(event: any) {
    if (event.keyCode === 13) {
      this.getstudents();
    }
  }

  generateDownloadCSV(event?: any) {
    this.pageLoader.show();
    return this.studentservice.generateCSV().then(
      (response: any) => {
        return this.studentservice.downloadCSV().then(
          (response: any) => {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(response);
            a.download = "filename.csv";
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            this.pageLoader.hide();
          },
          (error: any) => {
            this.pageLoader.hide();
          }
        );
      },
      (error: any) => {
        this.pageLoader.hide();
      }
    );
  }

  addStudent(event?: any) {
    this.stateManager.save({ name: 'last-record', value: (this.students[this.students.length - 1] || { Id: 0 }) });
    this.router.navigate(["/students/create"]);
  }

  editStudent(event?: any, id?: any) {
    this.router.navigate(["/students/edit", id]);
  }

  deleteStudent(event?: any, id?: any) {
    var action = confirm('Are you sure you want to delete this student? (Y/N)');
    if (action) {
      this.pageLoader.setLabel('Deleting, please wait...');
      this.pageLoader.show();
      this.studentservice.delete(id).then(
        (response: any) => {
          this.pageLoader.hide();
          this.getstudents();
        },
        (error: any) => {
          this.pageLoader.hide();
        }
      );
    }
  }

}
