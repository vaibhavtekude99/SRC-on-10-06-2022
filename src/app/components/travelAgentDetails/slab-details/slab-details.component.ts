import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlabMaster } from 'src/app/pojo/SlabMaster';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { SlabMasterService } from 'src/app/services/slabMasterService/slab-master.service';
import { TravelRequestDetailsService } from 'src/app/services/travelRequestDetailsService/travel-request-details.service';
import { RequestViewComponent } from '../request-view/request-view.component';

@Component({
  selector: 'app-slab-details',
  templateUrl: './slab-details.component.html',
  styleUrls: ['./slab-details.component.css']
})
export class SlabDetailsComponent implements OnInit {


  travelRequestId : number =  0;
  slabMasters: SlabMaster[] = [];
  

  travelRequest:TravelRequest =new TravelRequest();

    validation:boolean=false;
  constructor(private slabMasterService: SlabMasterService , private route : ActivatedRoute,private travelRequestService:TravelRequestDetailsService) { }


  ngOnInit(): void {

    this.travelRequestId = this.route.snapshot.params['travelRequestId'];
    console.log(this.travelRequestId);
  
    this.slabMasterService.getAllSlabDetails().subscribe(data => {
      console.log(data);
      this.slabMasters = data;

      
    });
     
    this.travelRequestService.getTravelRequestByTravelRequestId(this.travelRequestId).subscribe(data=>{
       console.log('inside get travel requestId() output');
          
      console.log(data);
         this.travelRequest=data;
    });


  }
     
  onClickApprove(travelRequestId: number){
    this.travelRequestService.getTravelRequestByTravelRequestId(travelRequestId).subscribe(data=>{
            console.log(data);

            this.travelRequest=data;       
    });

  }

}
