import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import { EmitterVisitorContext } from '@angular/compiler';
import { WidgetRequirementService } from './student.service';
import { WidgetToastService } from '../shared/widgets/toast/widget.toast.service';

@Component({
  selector: 'app-createoredit-requirement-component',
  templateUrl: 'widget.createoredit.requirement.component.html',
  styleUrls: ['widget.createoredit.requirement.component.css']
})
export class WidgetCreateOrEditRequirementComponent implements OnInit {

  @Input() toggle: boolean = false;
  @Input() label: any;
  @Input() data: any = {};

  @Output() widgetOkayButtonClick = new EventEmitter();

  public isSaving = false;
  public isNew: boolean = false;

  private widgetOkayButtonClickEvent: any;
  private callback: any;

  constructor(
    public requirementService: WidgetRequirementService,
    public toastr: WidgetToastService) {
    this.requirementService.createOrEditDialog.subscribe((param: any) => this.showDialog(param));
    this.requirementService.label.subscribe(label => this.label = label);
    this.requirementService.onOkay.subscribe(event => this.widgetOkayButtonClickEvent = event);
  }

  ngOnInit() {
    $(() => {
      
    });
  }

  showDialog(params: any) {
    let reasonDescription;
    this.isNew = true;
    if (params.data) {
      this.isNew = false;
      this.data = params.data;
      reasonDescription = this.data.RequirementDescription;
    } else {
      this.data = {};
      reasonDescription = '';
    }
    // $('.note-editor').find('div[contenteditable]')[0].innerHTML = reasonDescription;

    if (params.callback) {
      this.callback = params.callback;
    }

    ($('#createoredit-requirement-modal') as any).modal('show');
  }

  hideDialog() {
    ($('#createoredit-requirement-modal') as any).modal('hide');
  }

  onOkay(event?: any) {
    try {
      if (this.widgetOkayButtonClickEvent) {
        this.widgetOkayButtonClickEvent(event);
      }
      ($('#createoredit-requirement-modal') as any).modal('hide');
    } catch (e) {
      throw e;
    }
  }

  saveChanges() {
    this.isSaving = true;
    if (this.isNew) {
      this.requirementService.save(this.data).then(
        (response: any) => {
          this.isSaving = false;
          this.hideDialog();
          this.toastr.show({
            title: 'Done!',
            label: 'Created successfully.'
          });

          // callback
          if(this.callback) {
            this.callback();
          }
        },
        (error: any) => {
          this.isSaving = false;
          this.toastr.show({
            title: 'Oops!',
            label: 'Something went wrong, please try again later.'
          });
        }
      );
    } else {
      this.requirementService.update(this.data).then(
        (response: any) => {
          this.isSaving = false;
          this.hideDialog();
          this.toastr.show({
            title: 'Done!',
            label: 'Changes were made successfully.'
          });

          // callback
          if(this.callback) {
            this.callback();
          }
        },
        (error: any) => {
          this.isSaving = false;
          this.toastr.show({
            title: 'Oops!',
            label: 'Something went wrong, please try again later.'
          });
        }
      );
    }
  }

}
