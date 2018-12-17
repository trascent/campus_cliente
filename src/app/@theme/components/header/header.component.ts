import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
// import { AutenticationService } from '../../../@core/utils/autentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { Subscription } from 'rxjs';
import {}
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  itemClick: Subscription;

  user: any;
  title: any;
  username = '';
  userMenu = [
    { title: 'Notificación 1', icon: 'fa fa-check' },
    { title: 'Notificación 2', icon: 'fa fa-check' },
    { title: 'Notificación 3', icon: 'fa fa-check' },
    { title: 'Notificación 4', icon: 'fa fa-check' },

  ];
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private autenticacion: ImplicitAutenticationService,
    private router: Router,
    public translate: TranslateService) {
    this.translate = translate;
    this.itemClick = this.menuService.onItemClick()
    .subscribe((event) => {
      this.onContecxtItemSelection(event.item.title);
    });
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.autenticacion.init();
  }
  liveToken() {
    if (this.autenticacion.live()) {
      this.username = (this.autenticacion.getPayload()).sub;
    }
    return this.autenticacion.live();
  }

  onContecxtItemSelection(title) {
    this.router.navigate(['/pages/notificacion/listado']);
  }

  login() {
    window.location.replace(this.autenticacion.getAuthorizationUrl());
  }

  logout() {
    console.info(this.autenticacion.logout());
    // window.location.replace(this.autenticacion.logout());
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
