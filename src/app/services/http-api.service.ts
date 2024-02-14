import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  headers:any;
  api = environment.apiKey
  constructor(
    private http : HttpClient 
  ) {
    this.headers=new Headers();
    this.headers.append('Access-Control-Allow-Origin','*');
    this.headers.append('Access-Control-Allow-Methods','POST,GET,OPTIONS,PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json')
   }

  post(data:any,url:any){
    let apiurl = this.api+url
    return new Promise((resolve,reject)=>{
      this.http.post(apiurl,data,{headers:this.headers}).subscribe(
        (res:any)=>{
        resolve(res)
      },
      (err:any)=>{
        reject(err)
      })
    })
  }

  Update(data:any,url:any){
    let apiurl = this.api+url
    return new Promise((resolve,reject)=>{
      this.http.patch(apiurl,data,{headers:this.headers}).subscribe(
        (res:any)=>{
          resolve(res)
        },
        (err:any)=>{
          reject(err)
        })
    })
  }
  
  get(query:any,url:any){
    let apiurl= this.api+url+query
    return new Promise((resolve ,reject)=>{
      this.http.get(apiurl,{headers:this.headers}).subscribe((res: any)=>{
        resolve(res)},
      (err: any)=>{
        reject(err)
      
      })
    })
  }
  delete(query:any,url:any){
    let apiurl= this.api+url+query
    return new Promise((resolve ,reject)=>{
      this.http.delete(apiurl,{headers:this.headers}).subscribe((res: any)=>{
        resolve(res)},
      (err: any)=>{
        reject(err)
      
      })
    })
  }

}
