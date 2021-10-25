import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './students/student.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'students',
    children: [
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: 'create',
        component: StudentComponent,
      },
      {
        path: 'edit/:id',
        component: StudentComponent,
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
