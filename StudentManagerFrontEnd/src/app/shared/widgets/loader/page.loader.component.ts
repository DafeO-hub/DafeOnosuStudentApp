import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';
import { GlobalService } from '../../services/global.service';
import { PageLoaderService } from './page.loader.service';

@Component({
  selector: 'widget-page-loader',
  templateUrl: 'page.loader.component.html',
  styleUrls: ['page.loader.component.css'],
})
export class PageLoaderComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() size: any;
  @Input() color: any;
  @Input() label: string = '';

  constructor(
    public widgetPageLoaderService: PageLoaderService,
    public globals: GlobalService
  ) {
    this.widgetPageLoaderService.isLoading.subscribe((isLoading) => {
      const pageLoader = document.getElementById('widget-page-loader');
      if (pageLoader) {
        if (isLoading) {
          pageLoader.classList.remove('hide');
        } else {
          pageLoader.classList.add('hide');
        }
      }
    });
    this.widgetPageLoaderService.size.subscribe((size) => (this.size = size));
    this.widgetPageLoaderService.color.subscribe(
      (color) => (this.color = color)
    );
    this.widgetPageLoaderService.label.subscribe(
      (label) => (this.label = label)
    );
  }

  ngOnInit() {
    //
  }

  showLoader(isLoading: any): void {}
}
