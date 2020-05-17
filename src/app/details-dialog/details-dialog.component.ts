import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent
{
  public crewDisplayedColumns: string[] = ['name', 'gender', 'type'];
  public castDisplayedColumns: string[] = ['charName', 'realName', 'birthday'];


  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
