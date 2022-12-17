import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, of } from 'rxjs';



@Injectable({providedIn:"root"})
export class EventAreaDataService  {
  constructor(private http: HttpClient) {
   
  }



  public SelectConceptList(model: any) {
var arr=[{id:1,name:'as'}]
    return of(arr)
  }

  

  

  
 
}
