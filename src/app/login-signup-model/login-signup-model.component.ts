import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-model',
  templateUrl: './login-signup-model.component.html',
  styleUrls: ['./login-signup-model.component.css']
})
export class LoginSignupModelComponent implements OnInit {
  createLoginForm: FormGroup;
  submitted = false;
  errorMsg = '';
  url = 'http://assignmentsolutions.in/momskartWebservice/webservice/login/';
  @ViewChild('crossBtn') public crossBtn: ElementRef;
  @Output() public eventEmitter = new EventEmitter();

  constructor(private formBuilder: FormBuilder, public commonService: CommonService,  private router: Router) { }

  ngOnInit() {
    this.createLoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.createLoginForm.invalid) {
      return;
    }
    this.commonService.post(this.url, {email: this.createLoginForm.controls.email.value,
       password: this.createLoginForm.controls.password.value } ).subscribe(data => {
      if (data && data.status === true) {
        this.errorMsg = '';
        data = data.data;
        localStorage.setItem('user', JSON.stringify(data));
        // this.router.navigate(['/']);
        this.eventEmitter.emit(data);
        this.crossBtn.nativeElement.click();
      } else {
        this.errorMsg = data.message;
      }
    });
  }

}
