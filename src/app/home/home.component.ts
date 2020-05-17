import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result: Observable<Object>;
  tvResults: any;
  search: boolean = false;
  crewResult: Object;
  castResult: Object;
  showId: any;
  breakpoint: number;
  
  constructor(public tvService : TvService, public dialog: MatDialog) 
  {
  }

  ngOnInit(): void 
  {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
     this.result = this.tvService.getTvShows();
     this.result.subscribe((res)=>
     {
       this.search = false;
       this.tvResults = res;
     });
  }

  onResize(event) {
    if(event.target.innerWidth >= 700 && event.target.innerWidth <= 1200)
    {

      this.breakpoint = 5;
    }
    else if(event.target.innerWidth >= 400 && event.target.innerWidth <= 700)
    {

      this.breakpoint = 2;
    }
    else if(event.target.innerWidth <= 400)
    {

      this.breakpoint = 1;
    }
  }

  openDetails(tvTile)
  {
    if('score' in tvTile)
    {
      this.showId = tvTile.show.id;
    }
    else
    {
      this.showId = tvTile.id;
    }
    this.tvService.getTvCrew(this.showId).subscribe((res)=>
    {
      this.crewResult = res;
      this.tvService.getTvCast(this.showId).subscribe((res)=>
      {
        this.castResult = res;
        const dialogRef = this.dialog.open(DetailsDialogComponent, {
          height: '600px',
          width: '550px',          
          data: { tvDetails : tvTile, crew : this.crewResult, cast : this.castResult}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      });
    });
  }

  searchByName($event)
  {
    console.log($event.target.value);
    if($event.target.value === null ||$event.target.value == "")
    {
      this.ngOnInit();
    }
    else
    {
      this.tvService.searchByName($event.target.value).subscribe((results) =>
      {
        this.search = true;
        this.tvResults = results;
      });
    }
  }

}
