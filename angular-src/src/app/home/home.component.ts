import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { BetTable, WinRate } from "app/model/bet";
import { BetService } from "app/service/BetService";
import { BetComponent } from "app/bet/bet.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    
 dropdownvalue1 :string="Select Customer"
 dropdownvalue2 :string="Select Customer"
  @ViewChild(BetComponent)
  private child: BetComponent;
  winRate: WinRate[];
  betsSettled: BetTable[];
  AllBetSettled:BetTable[];
  startindex :number=0;
  endindex:number=0;
  betsUnSettled: BetTable[];
  AllBetUnSettled:BetTable[];
   constructor(private betService:BetService){
        this.betService.getBetHistory()
            .subscribe(bets => {
                this.betsSettled = bets;
                this.AllBetSettled=this.betsSettled;
               
            });
            this.betService.getBetData()
            .subscribe(bets => {
                this.betsUnSettled = bets;
                 this.AllBetUnSettled=this.betsUnSettled;
                this.setUnusulFlag();
            });
            this.betService.getWinRate().
            subscribe(winRate=>{
                this.winRate=winRate;
                  this.setUnusulFlag();
            });
         
    }

  ngOnInit() {
     this.setUnusulFlag();
   
  }
 //bet setttled
onSelected(id)
  {
      this.child.notifyMe();
      this.startindex=0;
      this.endindex=10;
      this.dropdownvalue1="Customer "+id;
   // this.AllBetSettled=this.betsSettled;
    this.betsSettled=BetTable[0];
    
this.betService.getBetHistory(id)
            .subscribe(bets => {
                this.betsSettled = bets;
            });
  }
  showAllBets()
  {
      this.dropdownvalue1 ="Select Customer"
    if(this.AllBetSettled!=null)
    {
this.betsSettled=this.AllBetSettled;
    }
  }

  //bets unsettled
  onSelectedUnsettled(id)
  {
        this.dropdownvalue2="Customer "+id;
  //  this.AllBetUnSettled=this.betsUnSettled;
    this.betsUnSettled=BetTable[0];
       
this.betService.getBetData(id)
            .subscribe(bets => {
                this.betsUnSettled = bets;
                this.setUnusulFlag();
            });
  }
  showAllBetsUnsettled()
  {
        this.dropdownvalue2="Select Customer"
     if(this.AllBetUnSettled!=null)
    {
this.betsUnSettled=this.AllBetUnSettled;
    }
  }
  //set the unusual win flag fo unsettled customers
  setUnusulFlag()
  {
     
      if(this.betsUnSettled!=undefined)
      {
          
        for (let bet of this.betsUnSettled) {
            for (let win of this.winRate) {  
                if(bet.customer==win.customer)
                {
                bet.isUnSettled=true;
                bet.isUnusual=win.winPer>=60?true:false;
                //set the flag If customers stake is more than 10 times higher than that customer’s average bet in their betting history
                bet.isHighStake=win.avgStake*10<bet.Stake?true:false;
                //set the flag If customers stake is more than 30 times higher than that customer’s average bet in their betting history
                bet.isVeryHighStake=win.avgStake*30<bet.Stake?true:false;
                }
            }
           }
        }
    }
}
