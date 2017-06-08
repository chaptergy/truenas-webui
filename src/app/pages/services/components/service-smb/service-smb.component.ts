import { ApplicationRef, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { GlobalState } from '../../../../global.state';
import { RestService, WebSocketService, IscsiService, IdmapService } from '../../../../services/';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { FieldConfig } from '../../../common/entity/entity-form/models/field-config.interface';
import { EntityConfigComponent } from '../../../common/entity/entity-config/';

import * as _ from 'lodash';

import { Subscription } from 'rxjs';

@Component ({
    selector: 'smb-edit',
    template: ` <entity-form [conf]="this"></entity-form>`,
    providers: [IscsiService, IdmapService],
})

export class ServiceSMBComponent implements OnInit {

  protected resource_name: string = 'services/cifs';
  protected route_success: string[] = ['services','cifs'];
  private entityEdit: EntityConfigComponent;
  protected fieldConfig: FieldConfig[] = [
    {
      type: 'input',
      name: 'cifs_srv_netbiosname',
      label: 'NetBIOS Name',
    },
    {
      type: 'input',
      name: 'cifs_srv_netbiosalias',
      label: 'NetBIOS Alias',
    },
    {
      type: 'input',
      name: 'cifs_srv_workgroup',
      label: 'Workgroup',
    },
    {
      type: 'input',
      name: 'cifs_srv_description',
      label: 'Description',
    },
    {
      type: 'select',
      name: 'cifs_srv_doscharset',
      label: 'DOS Charset',
      options: [
        'a',
        'b'
      ],
    },
    {
      type: 'select',
      name: 'cifs_srv_unixcharset',
      label: 'UNIX Charset',
    },
    {
      type: 'select',
      name: 'cifs_srv_loglevel',
      label: 'Log Level',
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_syslog',
      label: 'Use syslog only'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_localmaster',
      label: 'Local Master'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_domain_logons',
      label: 'Domain Logons'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_timeserver',
      label: 'Time Server For Domain',
    },
    {
      type: 'select',
      name: 'cifs_srv_guest',
      label: 'Guest Account'
    },
    {
      type: 'input',
      name: 'cifs_srv_filemask',
      label: 'File Mask'
    },
    {
      type: 'input',
      name: 'cifs_srv_dirmask',
      label: 'Directory Mask'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_nullpw',
      label: 'Allow Empty Password'
    },
    {
      type: 'input',
      name: 'cifs_srv_smb_options',
      label: 'Auxiliary Parameters'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_unixext',
      label: 'UNIX Extensions'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_zeroconf',
      label: 'Zeroconf share discovery'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_hostlookup',
      label: 'Hostnames Lookups' 
    },
    {
      type: 'select',
      name: 'cifs_srv_min_protocol',
      label: 'Server Minimum Protocol'
    },
    {
      type: 'select',
      name: 'cifs_srv_max_protocol',
      label: 'Server Maximum Protocol'
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_allow_execute_always',
      label: 'Allow Execute Always' 
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_obey_pam_restrictions',
      label: 'Obey Pam Restrictions' 
    },
    {
      type: 'checkbox',
      name: 'cifs_srv_ntlmv1_auth',
      label: 'NTLMv1 Auth' 
    },
    {
      type: 'select',
      name: 'cifs_srv_bindip',
      label: 'Bind IP Addresses',
      multiple: true,
    },
  ];

  ngOnInit() {
    console.log("init");
    this.idmapService.getADIdmap().subscribe((res) => {
      console.log(res.data);
    })
  }

  constructor(protected router: Router, protected route: ActivatedRoute, protected rest: RestService,  protected ws: WebSocketService,  protected _injector: Injector, protected _appRef: ApplicationRef,   protected _state: GlobalState, protected iscsiService: IscsiService, protected idmapService: IdmapService) {
  }

  afterInit(entityEdit: any) {
    this.entityEdit = entityEdit;
  }

}