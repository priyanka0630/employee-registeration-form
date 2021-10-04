// 
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AlertService, AuthenticationService, UserService } from '../_service';
import { StepperComponent } from '../stepper/stepper.component';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import firebase from 'firebase';
import { Validation } from './validator';
const config = {
  apiKey: "AIzaSyAkA_yRcUi47oWXavnRcvxpOxCiI7RfMgM",
  authDomain: "new-otp-16a45.firebaseapp.com",
  projectId: "new-otp-16a45",
  storageBucket: "new-otp-16a45.appspot.com",
  messagingSenderId: "287050720916",
  appId: "1:287050720916:web:5117904f64a28a0642b681"
};


export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}


@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  countriesList: any;
  codeList: Array<any> = [];
  stateList: Array<any> = [];
  selectedCountry: any = {
    id: 0, name: ''
  }
  personalForm: FormGroup;
  companyForm: FormGroup;
  loading = false;
  submitted = false;
  jobList = [
    {
      "id": 1,
      "title": "Software Developer",
    },
    {
      "id": 2,
      "title": "Administrative Assistant"
    },
    {
      "id": 3,
      "title": "Executive Assistant"
    },
    {
      "id": 4,
      "title": "Marketing Manager"
    },
    {
      "id": 5,
      "title": "Sales Manager"
    }]

  experienceList = [
    {
      "id": 1,
      "experience": "0-2"
    },
    {
      "id": 2,
      "experience": "3-5"
    },
    {
      "id": 4,
      "experience": "6-9"
    },
    {
      "id": 5,
      "experience": "10 and more"
    }
  ]

  windowRef: any;
  phone: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;
  error_messages = {
    password: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
    ],
    confirmpassword: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
    ],
  };


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formService: UserService,
    private alertService: AlertService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.personalForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(45)]],
      middle_name: [''],
      last_name: ['', [Validators.required, Validators.maxLength(45)]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
    })
    this.companyForm = this.fb.group(
      {
        company_name: ['', [Validators.required, Validators.maxLength(45)]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')]],
        country_code: ['', Validators.required],
        phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        job: ['', Validators.required],
        experience: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: Validation.MatchPassword
      }
    );


    this.personalForm.controls['gender'].setValue("1")
    this.formService.getAll().subscribe(
      (data: any) => {
        this.countriesList = data;
      })

    this.windowRef = this.formService.windowRef
    firebase.initializeApp(config)
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier
      .render()
      .then(widgetId => {

        this.windowRef.recaptchaWidgetId = widgetId
      });

  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }


  onSelect(event) {
    let val = event.value;
    this.stateList = [];
    this.codeList = [];
    this.formService.getAll().subscribe(
      (data) => {
        data['states'].forEach(ele => {
          if (ele['country_id'] == val) {
            this.stateList.push(ele)
          }
        })
        data['country_code'].forEach(el => {
          if (val == el['id']) {
            this.codeList.push(el)
          }
        })
      }
    )
  }

  onSubmit(progress) {
    let a = this.personalForm.value
    let b = this.companyForm.value
    let c;
    if (this.personalForm.valid && this.companyForm.valid) {
      c = [{ ...a, ...b }]
    }
    // stop here if form is invalid
    if (this.companyForm.invalid && this.personalForm.invalid) {
      return;
    }
    //  this.loading = true;
    this.formService.register(c[0])
      .subscribe(
        data => {
          console.log(data)
          progress.next();
          this.sendLoginCode();
          // this.alertService.success('Registration successful', true);
          // this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          // this.loading = false;
        });
  }

  goNext(progress: StepperComponent) {
    if (this.personalForm.valid) {
      progress.next();
    }
    // if (this.companyForm.valid && this.personalForm.value) {
    //   progress.next();
    // }

  }

  onStateChange(event) {
    console.log(event);
  }
  sendLoginCode() {

    let tempCode: Array<any> = [];
    let cc = this.companyForm.controls['country_code'].value;
    let phno = this.companyForm.controls['phone_number'].value;
    // console.log(this.companyForm.controls['country_code'].value)
    this.codeList.forEach(el => {
      if (el.id == cc) {
        tempCode.push(el.code)
        tempCode.push(phno)
      }
    })
    let code = tempCode.join('')
    console.log(code)

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;
    console.log(this.windowRef.recaptchaVerifier)
    firebase.auth()
      .signInWithPhoneNumber(code, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => console.log('error', error));


  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
        console.log(result);
        this.alertService.success('Registered successfully', true);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

}