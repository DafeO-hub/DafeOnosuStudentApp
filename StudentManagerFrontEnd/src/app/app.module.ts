import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageLoaderComponent } from './shared/widgets/loader/page.loader.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { GlobalService } from './shared/services/global.service';
import { PageLoaderService } from './shared/widgets/loader/page.loader.service';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './students/student.component';
import { StudentService } from './students/student.service';
import { StateManagementService } from './shared/services/state.management.service';

// templates

@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    StudentsComponent,
    StudentComponent,
    PageLoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '' },
    StudentService,
    PageLoaderService,
    AuthService,
    GlobalService,
    StateManagementService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
