import { Component, OnInit, Input } from '@angular/core';
import { BetTable } from "app/model/bet";



@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
// startindex :number=0;
@Input()  endindex :number=10;
 @Input() bets: BetTable[];
@Input() startindex :number=0;
 


 
 ngOnChanges(changes) {
    console.log("changed");
    this.startindex=0;
    this.endindex=10;
  }
    ngOnInit() {
      this.startindex=0;
    this.endindex=10;
     
     
      // this.startindex=0;
       this.onPreviousClick();
    }
onPreviousClick()
{
  
   if(this.startindex<=0)
  {
  this.endindex=10;
  this.startindex=0;
}
else
{
  
 
   this.endindex= this.startindex;
    this.startindex=this.startindex-10;
}
}
onNextClick()
{
 
  if(this.bets!=undefined && this.endindex>=this.bets.length)
  {
  // this.endindex=this.bets.length;
  //this.startindex=this.endindex-10;
}
else
{
  
  this.startindex=this.endindex;
   this.endindex= this.endindex+10;
}
}
}
