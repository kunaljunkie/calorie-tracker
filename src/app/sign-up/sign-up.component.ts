import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupform = new FormGroup({
    Name: new FormControl("", [Validators.required]),
    Weight: new FormControl("", [Validators.required]),
    Height: new FormControl("", [Validators.required]),
    Gender: new FormControl("Male", [Validators.required]),
    Age: new FormControl("", [Validators.required]),
  })
  constructor(
    private route: Router,
    private apiservice: HttpApiService,
  ){
  }
  signup(){
    if(this.signupform.valid){

      if(this.signupform.value.Age){
     
      let userdetailobj = {userdetails: this.signupform.value}
       this.apiservice.post(userdetailobj,"signup").then((res:any)=>{
        if(res.code === 201 && res.details._id){
          alert("user created succesfully")
          this.route.navigate(['/user-list'])
        }
    })
    }
   


  }
  }
}