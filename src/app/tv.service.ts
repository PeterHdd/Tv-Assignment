import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TvService 
{
  public tvmazeAPI : string = "http://api.tvmaze.com";
  constructor(public http : HttpClient) 
  {}

  /**
   *  @returns return tv shows
   */
  getTvShows()
  {
    return this.http.get(this.tvmazeAPI+"/shows");
  }

  /**
   * 
   * @param id id of show clicked
   * @returns the cast of that show
   */
  getTvCast(id : number)
  {
    return this.http.get(this.tvmazeAPI+"/shows" +"/"+id +"/cast");
  }

  /**
   * 
   * @param id id of show clicked
   * @returns the crew of that show
   */
  getTvCrew(id : number)
  {
    return this.http.get(this.tvmazeAPI+"/shows" +"/"+id +"/crew");
  }

  /**
   * 
   * @param id name of show clicked
   * @returns the show
   */
  searchByName(name : string)
  {
    return this.http.get(this.tvmazeAPI+"/search"+"/shows" +"?q="+name);
  }

}
