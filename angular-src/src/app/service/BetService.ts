import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class BetService{
    constructor(private http:Http){
       
    }
    
    getBetHistory(number=0){
       
        let headers=new Headers();
       if(number===0)
       {
        return this.http.get('http://localhost:3000/api/betsettled')
            .map(res => res.json());
       }
       else
       {
          
            return this.http.get('http://localhost:3000/api/betsettled/'+number)
            .map(res => res.json());
       }
    }
    
     getBetData(number=0){
       
        let headers=new Headers();
       if(number===0)
       {
        return this.http.get('http://localhost:3000/api/betunsettled')
            .map(res => res.json());
       }
       else
       {
           
            return this.http.get('http://localhost:3000/api/betunsettled/'+number)
            .map(res => res.json());
       }
    }
    getWinRate(){
        return this.http.get('http://localhost:3000/api/customerRisk').map(res=>res.json());
    }
    
}