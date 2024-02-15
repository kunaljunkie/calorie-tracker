import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from '../services/http-api.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  userid: any;
  date: any;
  userdata: any = [];
  username: any;
  userDetails: any = [];
  activities: any = [];
  foodgroup: any = [];
  foodname: any = [];
  activityDetails: any;
  METValue: any;
  foodDetails: any;
  fetchuserid: any;
  userinfo:any

  MealtypeVAR: any;
  FoodGroupVAR: any;
  FoodNameVAR: any;
  ActivityNameVAR: any;

  checkoutForm = this.formBuilder.group({
    date: '',
    serving: '',
    activityDate: '',
    ActivityDescription: '',
    ActivityDuration: '',
    metvalue: '',
  });
  constructor(
    private activeRoute: ActivatedRoute,
    private apiservice: HttpApiService,
    private formBuilder: FormBuilder
  ) 
  {
    this.activeRoute.queryParamMap.subscribe((res: any) => {
      this.userid = res.params.userid;
      this.date = res.params.date;
    });
    if (this.userid) {
      this.getuserDetailsbydate();
    }

    this.getfood();
    this.getactivity();
  }

  async getactivity() {
    this.apiservice.get('', 'getactivity').then((res: any) => {
      for (let i of res.data) {
        this.activities.push(i);
      }
      this.METValue = this.activities[0].METs;
    });
  }

  async getfood() {
    this.apiservice.get('', 'getfood').then((res: any) => {
      for (let i of res.data) {
        this.foodgroup.push(i._id);
      }
      this.getfoodname(this.foodgroup[0]);
    });
  }
  foodName(event: any) {
    this.FoodNameVAR = event.target.value;
  }
  mealtype(event: any) {
    this.MealtypeVAR = event.target.value;
  }

  foodValues() {
    if (this.checkoutForm.valid && this.checkoutForm.value) {
      let foodObj = {
        foodgroup: this.FoodGroupVAR ? this.FoodGroupVAR :this.foodgroup[0] ,
        foodname: this.FoodNameVAR ? this.FoodNameVAR : this.foodname[0].ID,
        mealtype: this.MealtypeVAR ? this.MealtypeVAR : 'Breakfast',
        date: this.checkoutForm.value.date,
        serving: this.checkoutForm.value.serving,
      };

      var timeParts = this.checkoutForm.value.ActivityDuration
        ? this.checkoutForm.value.ActivityDuration.split(':')
        : '';
      let minutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);

      let activityobj = {
        metvalue: this.METValue ? this.METValue : this.METValue,
        ActivityDuration: minutes.toString(),
        ActivityName: this.ActivityNameVAR ? this.ActivityNameVAR : this.activities[0].specificMotion,
        activityDate: this.checkoutForm.value.activityDate,
        ActivityDescription: this.checkoutForm.value.ActivityDescription,
      };


      let finalobj = {
        fooddata: foodObj,
        activitydata: activityobj,
        userid: this.userid,
      };

      this.apiservice.post(finalobj,"userdetial").then((res:any)=>{
        if(res && res.details){
          alert("Date Saved Successfully")
          this.getuserDetailsbydate()
        }
      })
    } else {
      alert('form is not valid')
    }
  }

  getmetactivityname(ele: any) {
    this.ActivityNameVAR = ele.target.value.toString();
    const filtervalue = this.activities.filter((element: any) => {
      return element.specificMotion === ele.target.value.toString();
    });
    this.METValue = filtervalue[0].METs;
  }
  filter(event: any) {
    this.date = event.target.value;
    this.getuserDetailsbydate();
  }

  getuserDetailsbydate() {
    
    let obj = { date: this.date, userid: this.userid };
    this.apiservice.post(obj, 'getuserdetailbydata').then((res: any) => {
      this.userdata = [];
      this.userinfo=res.userData
      res.data.map((ele: any) => {
        const hours = Math.floor(ele.duration / 60);
        const minutes = ele.duration % 60;
        if (hours) {
          ele.duration = `${hours} hours and ${minutes} mins.`;
        } else {
          ele.duration = `${minutes} mins.`;
        }
        this.userdata.push(ele);
      });
      if (this.userdata.length) {
        this.username = this.userdata[0].userid.Name;
      }
    });
  }

  getfoodgroupvalue(event: any) {
    this.FoodGroupVAR = event.target.value;
    this.getfoodname(event.target.value);
  }

  getfoodname(foodgroup: any) {
    this.foodname = [];
    let query = `?foodgroup=${foodgroup}`;
    this.apiservice.get(query, 'getfoodname').then((res: any) => {
      for (let i of res.data) {
        this.foodname.push(i);
      }
    });
  }
}
