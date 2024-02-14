import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../services/http-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {
  userid: any;
  userDetails:any=[]
  activities:any=[]
  foodgroup:any=[]
  foodname:any=[]
  METValue: any;
  activityDetails: any;
  foodDetails: any;
  fetchuserid: any;
  username:any

  MealtypeVAR:any
  FoodGroupVAR:any
  FoodNameVAR:any
  ActivityNameVAR:any

  checkoutForm = this.formBuilder.group({
    date: '',
    serving: '',
    activityDate: '',
    ActivityDescription: '',
    ActivityDuration: '',
    metvalue: ''
  });
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private apiservice: HttpApiService,
    private formBuilder: FormBuilder,
  ){

   
   this.activeRoute.queryParamMap.subscribe((res:any)=>{
      this.userid = res.params.userid
      this.username = res.params.name
      localStorage.setItem('userid',this.userid)
    })

    this.getuserdetails()
    this.getfood()
    this.getactivity()


  }

 async getactivity(){
    this.apiservice.get("","getactivity").then((res:any)=>{
      for(let i of res.data){
        this.activities.push(i)
      }
    })
  }

  async getfood(){
    this.apiservice.get("","getfood").then((res:any)=>{
      for(let i of res.data){
        this.foodgroup.push(i._id)
      }
      this.getfoodname(this.foodgroup[0])
    })
  }
  foodName(event:any){
    this.FoodNameVAR = event.target.value
  }
  mealtype(event:any){
    this.MealtypeVAR = event.target.value

  }

  getmetactivityname(ele: any) {
    this.ActivityNameVAR = ele.target.value.toString()
    const filtervalue = this.activities.filter((element: any) => {
      return element.specificMotion === ele.target.value.toString();
    });
    this.METValue = filtervalue[0].METs;
  }

 async getuserdetails(){
    if(this.userid){
      let query = `?userid=${this.userid}`
    this.apiservice.get(query,'getuserdetails').then((res:any)=>{
      this.userDetails=res.data
    })
    }
  }

  filter(event:any){
    let query = `?userid=${this.userid}&date=${event.target.value}`
    this.userDetails=[]
    this.apiservice.get(query,'getuserdetails').then((res:any)=>{
      this.userDetails=res.data
    })
  }


  openuserdetail(userid:any,date:any){
    const queryParams = { userid: userid._id, date:date};
    this.route.navigate(['/user-details'], { queryParams });
  }

  foodValues() {

    if(this.checkoutForm.valid && this.checkoutForm.value){
      let foodObj = {
        foodgroup:this.FoodGroupVAR,
        foodname :this.FoodNameVAR,
        mealtype :  this.MealtypeVAR,
        date : this.checkoutForm.value.date,
        serving :  this.checkoutForm.value.serving
      }
    
      var timeParts = this.checkoutForm.value.ActivityDuration ? this.checkoutForm.value.ActivityDuration.split(":"):"" ;
      let minutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  
      let activityobj ={
        metvalue : this.METValue,
        ActivityDuration : minutes.toString(),
        ActivityName : this.ActivityNameVAR,
        activityDate : this.checkoutForm.value.activityDate,
        ActivityDescription : this.checkoutForm.value.ActivityDescription
      }
      
      let finalobj = {
        fooddata: foodObj,
        activitydata: activityobj,
        userid: this.userid,
      };

    this.apiservice.post(finalobj,"userdetial").then((res:any)=>{
      if(res && res.details){
        alert("Date Saved Successfully")
        this.getuserdetails()
      }
    })
    }else {
      alert('form is not valid')
    }

  }

  getfoodgroupvalue(event:any){
    this.FoodGroupVAR = event.target.value
   this.getfoodname(event.target.value)
  }

  getfoodname(foodgroup:any){
    this.foodname = []
    let query = `?foodgroup=${foodgroup}`
      this.apiservice.get(query,"getfoodname").then((res:any)=>{
       for(let i of res.data){
         this.foodname.push(i)
       }
     })
  }
    
}
