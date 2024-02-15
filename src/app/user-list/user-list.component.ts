import { Component } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  fetchuserid: any;
  foodDetails: any = {};
  activityDetails: any = {};
  userData: any;
  activities: any = [];
  foodgroup: any = [];
  foodname: any = [];
  METValue: any;

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
    none:''
  });
inputValue: any;
searchTerm: any = '';
searchTermActivity: any='';
  
  constructor(
    private route: Router,
    private apiservice: HttpApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.getusers();
    this.getfoodnames();
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

  async getfoodnames() {
    this.apiservice.get('', 'getfood').then((res: any) => {
      for (let i of res.data) {
        if (i._id != null) {
          this.foodgroup.push(i._id);
        }
      }
      this.getfoodname(this.foodgroup[0]);
    });
  }

  async getusers() {
    this.userData=[]
    this.apiservice.get('', 'getall-users').then((res: any) => {
      this.userData = res.data;
    });
  }

  openUserdata(id: any,name:any) {
    const queryParams = { userid: id,name:name };
    this.route.navigate(['/user-data'], { queryParams });
  }

  getfoodgroupvalue(event: any) {
    this.FoodGroupVAR = event.target.value;
    this.getfoodname(event.target.value);
  }

  async getfoodname(foodgroup: any) {
    this.foodname = [];
    let query = `?foodgroup=${foodgroup}`;
    this.apiservice.get(query, 'getfoodname').then((res: any) => {
      for (let i of res.data) {
        this.foodname.push(i);
      }
    });
  }

  getmetactivityname(ele: any) {
    this.ActivityNameVAR = ele.target.value.toString();
    const filtervalue = this.activities.filter((element: any) => {
      return element.specificMotion === ele.target.value.toString();
    });
    this.METValue = filtervalue[0].METs;
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
        userid: this.fetchuserid,
      };
    
      this.apiservice.post(finalobj, 'userdetial').then((res: any) => {
        if (res && res.details) {
          alert('Date Saved Successfully');
          this.getusers();
        }
      });
    }
  }

  addUser(id: any) {
    this.fetchuserid = id;
  }
  openConfirmationDialog(userId: string,name:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      height: '250px',
      data: {
        title: 'Confirmation',
        message: `Are you sure you want to delete ${name}?`,
      },
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteuser(userId);
      } 
    });
  }
  deleteuser(id:any){
    let query = `?userid=${id}`;
    this.apiservice.delete(query,"delte").then((res:any)=>{
      if(res){
        alert(res.mesage)
        this.getusers()
      }
    })
  }

  filterOptions() {
     this.foodname = this.foodname.filter((option:any) =>
      option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if(this.searchTerm.length == 0 || this.foodname.length == 0){
      let foodgroup = this.FoodGroupVAR ? this.FoodGroupVAR :this.foodgroup[0] ;
      this.getfoodname(foodgroup)
    }
  }

  onSearchTermChange() {
    this.filterOptions();
  }

  onSearchTermChangeActivty(){
    this.activities = this.activities.filter((option:any) =>
    option.specificMotion.toLowerCase().includes(this.searchTermActivity.toLowerCase())
  );
  if(this.searchTermActivity.length == 0 || this.activities.length == 0){
    this.getactivity()
  }
  }
}
