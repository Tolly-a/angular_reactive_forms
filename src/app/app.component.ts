import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // for reactive form

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  answers = [{
    type: 'yes',
    text: 'Yes'
  }, {
    type: 'no',
    text: 'No'
  }];

  form: FormGroup;  //type reactiveForm
  stringLength:number = 6;

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], this.checkForEmail.bind(this)),
        pass: new FormControl('', [Validators.required, this.checkForLength.bind(this)]),
      }),
      country: new FormControl('ru'),
      answer: new FormControl('no')
    });
  }


  onSubmit() {
    console.log('Submited!', this.form);
  }

  //must return or nothing or object { 'errorCode': true } 
  checkForLength(control: FormControl){
    if(control.value.length < this.stringLength){
      return {
        'lengthError': true
      };
    } else {
      return null;
    }
  }

  //must return or nothing or object { 'errorCode': true } 
  checkForEmail(control:FormControl): Promise<any>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@gmail.com'){
          resolve({
            'emailIsUsed': true
          })
        } else {
          resolve(null);
        }
      },1000)
    })
  }
}
