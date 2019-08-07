import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userData: any;
  public cartItemCount = 0;
  @ViewChild('loginButton') public loginButton: ElementRef<HTMLElement>;

  constructor(public router: Router, public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.openLoginPopup().subscribe(data => {
      if (data) {
        this.loginButton.nativeElement.click();
      }
    });

    this.commonService.getCartItemCount().subscribe(data => {
      if (data) {
        this.cartItemCount = data;
      }
    });
    this.userData = localStorage.getItem('user');
    if (this.userData) {
      this.userData = JSON.parse(this.userData);
    }
  }

  performAction(event) {
    this.userData = event;
  }

  logout() {
    localStorage.removeItem('user');
    this.userData = null;
    this.cartItemCount = 0;
    this.router.navigate(['/']);
  }

}
