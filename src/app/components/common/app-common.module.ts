import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'app/appMaterial.module';

import { ChartistModule } from 'ng-chartist';
import { TopbarComponent } from './topbar/topbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonDirectivesModule } from 'app/directives/common/common-directives.module';
import { ThemeService } from 'app/services/theme/theme.service';
import { DialogService } from 'app/services/dialog.service';
import { CustomizerComponent } from './customizer/customizer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageTitleComponent } from './pagetitle/pagetitle.component';
import { ModalComponent } from './modal/modal.component';
import { LanguageService } from 'app/services/language.service';
import { HttpClientModule } from '@angular/common/http';
import { LocaleService } from 'app/services/locale.service';
import { EntityModule } from 'app/pages/common/entity/entity.module';
import { CoreComponents } from 'app/core/components/corecomponents.module';
import { ViewControllerComponent } from 'app/core/components/viewcontroller/viewcontroller.component';

import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    CommonDirectivesModule,
    TranslateModule,
    ChartistModule,
    HttpClientModule,
    EntityModule,
    CoreComponents,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    TopbarComponent,
    NavigationComponent,
    ModalComponent,
    NotificationsComponent, CustomizerComponent, BreadcrumbComponent, PageTitleComponent,
  ],
  providers: [ThemeService, DialogService, /* LineChartService, */ LanguageService, LocaleService, SvgIconRegistryService],
  exports: [PageTitleComponent, ViewControllerComponent],
})
export class AppCommonModule {}
