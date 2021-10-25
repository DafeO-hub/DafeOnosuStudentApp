import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './shared/services/auth.service';
import { GlobalService } from './shared/services/global.service';
import { PageLoaderService } from './shared/widgets/loader/page.loader.service';

import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery-datetimepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'StudentManager';

  public constructor(
    public globals: GlobalService,
    public authService: AuthService,
    public router: Router,
    public pageLoaderService: PageLoaderService
  ) {

  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  logout(): void {
    const doLogout = (): void => {
      this.pageLoaderService.hide();
      this.router.navigate(['/login']);
    };

    this.pageLoaderService.show();
    this.authService.logout().then(
      (resonse: any) => {
        // clear state management store

        // redirect to home page
        doLogout();
      },
      (error: any) => doLogout()
    );
  }
}
