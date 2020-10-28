import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Subject } from 'rxjs';
import { CoreEvent } from 'app/core/services/core.service';

import { TooltipsService, WebSocketService } from 'app/services';
import { EntityFormEmbeddedComponent } from './entity-form-embedded.component';
import { EntityFormComponent, Formconfiguration } from './entity-form.component';
import { FieldConfig } from './models/field-config.interface';
import { FieldSets } from './classes/field-sets';
import { ipv4Validator, ipv6Validator } from './validators/ip-validation';


@Component({
  selector: 'entity-form-configuration',
  template: ``,
  /*template: `
  <entity-form #regularForm *ngIf="formType && formType == 'EntityFormComponent' " [conf]="this"></entity-form>
  <entity-form-embedded #embeddedForm *ngIf="formType && formType == 'EntityFormEmbeddedComponent'" [data]='data' [target]="target" [conf]="this"></entity-form-embedded>
  `,*/
  providers: [TooltipsService],
})
export class EntityFormConfigurationComponent implements Formconfiguration {

  @ViewChild('embeddedForm', {static : false}) embeddedForm: EntityFormEmbeddedComponent;
  @ViewChild('regularForm', {static : false}) regularForm: EntityFormComponent;

  public fieldConfig: FieldConfig[] = [];
  public fieldSets: FieldSets; 

  //private entityEdit: EntityFormComponent | EntityFormEmbeddedComponent;
  private entityEdit: EntityFormComponent;
  //private failover_fields = ['hostname_b', 'hostname_virtual'];
  public title = '';
  public afterModalFormClosed;
  public formType: string;

  // EntityForm
  public customSubmit?;
  public queryCall?;
  protected updateCall?;
  public isEntity = true;

  // EntityFormEmbedded (This is for when your form doesn't submit to backend like view configs etc.)
  public target: Subject<CoreEvent>;
  public data: any;

  constructor() {
  }

  preInit(entity) {
  }

  afterInit(entityEdit: any) {
    this.entityEdit = entityEdit;
    if(this.formType == 'EntityFormComponent' && this.target && !this.customSubmit){
      this.customSubmit = (values) => {
        this.target.next({
          name: 'FormSubmit',
          data: values,
          sender: this
        });
      }
    }
  }

}
