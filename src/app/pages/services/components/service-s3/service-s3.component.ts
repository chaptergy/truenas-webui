import {ApplicationRef, Component, Injector, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {  DialogService } from '../../../../services/';

import {
  RestService,
  SystemGeneralService,
  WebSocketService
} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';
import {
  matchOtherValidator
} from '../../../common/entity/entity-form/validators/password-validation';
import { T } from '../../../../translate-marker';

@Component({
  selector : 's3-edit',
  template : `<entity-form [conf]="this"></entity-form>`,
  providers : [ SystemGeneralService ]
})

export class ServiceS3Component implements OnInit {
  protected resource_name: string = 'services/s3';
  protected addCall: string = 's3.update';
  protected route_success: string[] = [ 'services' ];
  private certificate: any;
  private ip_address: any;


  public fieldConfig: FieldConfig[] = [
    {
      type : 'select',
      name : 'bindip',
      placeholder : T('IP Address'),
      tooltip: T('Enter the IP address which runs the <a\
                  href="..//docs/services.html#s3" target="_blank">S3\
                  service</a>. <i>0.0.0.0</i> tells the server to listen\
                  on all addresses.'),
      options : [
        {label:'0.0.0.0', value: '0.0.0.0'}
      ]
    },
    {
      type : 'input',
      name : 'bindport',
      placeholder : T('Port'),
      tooltip: T('Enter the TCP port which provides the S3 service.'),
      value: '9000'
    },
    {
      type : 'input',
      name : 'access_key',
      placeholder : T('Access Key'),
      tooltip: T('Enter the S3 username.'),
      required: true,
      validation: [Validators.minLength(5), Validators.maxLength(20), Validators.required]
    },
    {
      type : 'input',
      name : 'secret_key',
      placeholder : T('Secret Key'),
      tooltip: T('Enter the password that must be used by connecting S3\
                  systems.'),
      inputType : 'password',
      required : true,
      validation: [Validators.minLength(8), Validators.maxLength(40), Validators.required]
    },
    {
      type : 'input',
      name : 'secret_key2',
      placeholder : T('Confirm Secret Key'),
      inputType : 'password',
      required: true,
      validation : [ matchOtherValidator('secret_key'), Validators.required ],
    },
    {
      type : 'explorer',
      initial: '/mnt',
      explorerType: 'directory',
      name : 'storage_path',
      placeholder : T('Disk'),
      tooltip: T('Browse to the directory for the S3 filesystem.'),
      required: true,
      validation: [ Validators.required]
    },
    {
      type : 'checkbox',
      name : 'browser',
      placeholder : T('Enable Browser'),
      tooltip: T('Set to enable the S3 web user interface.'),
    },
/*  This is to be enabled when the mode feature is finished and fully implemented for S3
    {
      type : 'select',
      name : 'mode',
      placeholder : 'Mode',
      options : [
        {label : 'local'}
      ]
    },
*/
    {
      type : 'select',
      name : 'certificate',
      placeholder : T('Certificate'),
      tooltip : T('Add an <a href="..//docs/system.html#certificates"\
                   target="_blank">SSL certificate</a> to be used for\
                   secure S3 connections.'),
      options : []
    },
  ];

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService,
              protected _injector: Injector, protected _appRef: ApplicationRef,
              protected systemGeneralService: SystemGeneralService, private dialog:DialogService ) {}

  ngOnInit() {}

  afterInit(entityForm: any) {
    this.systemGeneralService.getCertificates().subscribe((res)=>{
      this.certificate = _.find(this.fieldConfig, {name:'certificate'});
      if (res.length > 0) {
        res.forEach(item => {
          this.certificate.options.push({label:item.name, value: item.id});
        });
      }
    });
    this.systemGeneralService.getIPChoices().subscribe(res=>{
      this.ip_address = _.find(this.fieldConfig,{name:'bindip'});
      if (res.length > 0) {
        res.forEach(element => {
          this.ip_address.options.push({label:element[1], value: element[0]});
        });
      }
    });
    entityForm.ws.call('s3.config').subscribe((res)=>{
      entityForm.formGroup.controls['bindip'].setValue(res.bindip);
      entityForm.formGroup.controls['bindport'].setValue(res.bindport);
      entityForm.formGroup.controls['access_key'].setValue(res.access_key);
      entityForm.formGroup.controls['storage_path'].setValue(res.storage_path);
      entityForm.formGroup.controls['browser'].setValue(res.browser);
      entityForm.formGroup.controls['mode'].setValue(res.mode);
      entityForm.formGroup.controls['certificate'].setValue(res.certificate);
    })
    entityForm.submitFunction = this.submitFunction;

  }

  clean(value) {
    delete value['secret_key2'];

    return value;
  }

  submitFunction(this: any, entityForm: any,){

    return this.ws.call('s3.update', [entityForm]);

  }
}
