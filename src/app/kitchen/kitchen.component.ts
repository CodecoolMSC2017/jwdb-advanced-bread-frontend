import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { DatePipe } from '@angular/common';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { KitchenService } from '../kitchen.service';
import { element } from 'protractor';
import { timer } from 'rxjs';
import { Food } from '../food';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class KitchenComponent implements OnInit {

  items$:Food[];
  time:string[] = new DatePipe('en-US').transform(new Date(),'yyyy-MM-dd-hh-mm-ss').split("-");

  constructor(private kitchenService:KitchenService,private router:Router) {
    
   }

  ngOnInit() {
    this.kitchenService.getItemsToMake().subscribe((data) => {
      this.items$ = data
      this.timer()
    }
  )
    
  }

  made(madeFood:Food){
    madeFood.orderedItem.ready=true;
    this.kitchenService.itemMade(madeFood).subscribe((data)=> {
      this.items$ = data
      this.timer();
      }  
    )
  }

  timer(){
    this.items$.forEach(element => {
      element.timer=new Array<string>();
      element.timer[0]= '0';
      element.timer[1]= '0';

      setTimeout(()=>{{
          const secondInterval = setInterval(()=> {
            element.timer[1] = (parseInt(element.timer[1])+1).toString(); 
            if(element.timer[1]==='60'){
              element.timer[0]=(parseInt(element.timer[0])+1).toString();
              element.timer[1]='0';
            }
            else if(element.timer[0]==='60'){
            clearInterval(secondInterval)
            }
          },1000)
          
      }},0);
    });
  }
 //TODO: next sprint with timestamp
  getTime(orderTime:number[]){
    let timer = new Array<number>();
    for(let i = 0; i < 6; i++){
      timer.push(parseInt(this.time[i]))
    }
    for(let i = 0;i<orderTime.length;i++){
      orderTime[i] = (parseInt(this.time[i])-orderTime[i]); 
    }
   
  }




}
