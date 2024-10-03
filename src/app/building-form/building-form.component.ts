import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../building/building.service';
import { BuildingComponent } from '../building/building.component';
import { Building } from '../building/building';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css']
})
export class BuildingFormComponent {
building: Building;
isEditMode: boolean = false;
itemId: number;
username: string | null = '';
//username: string;
//buildingService: BuildingService;
 
//datePipe: DatePipe;

onSubmit() {
console.log("submit button was presed");

  if (this.buildingForm.valid) {
    console.log(this.buildingForm.value);
    console.log(this.buildingForm);
    console.log(this.username);
    this.building = this.buildingForm.value;
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    console.log(formattedDate);
    this.building.date = formattedDate;
    this.building.username = this.username!;

    if(this.isEditMode){
      this.buildingService.editBuilding(this.itemId, this.building).subscribe(
        response => {
          console.log('Building edited successfully:', response);
          alert('Form edited successfully!');
          //this.buildingService.getBuilding();
          this.router.navigate(['/buildings']);
        },
        error => {
          console.error('There was an error!', error);
          alert('There was an error!');
        }
      )
    }else{
      this.buildingService.addBuilding(this.building).subscribe(
        response => {
          console.log('Building added successfully:', response);
          alert('Form submitted successfully!');
          this.buildingForm.reset();
          this.router.navigate(['/buildings']);
        },
        error => {
          console.error('There was an error!', error);
          alert('There was an error!');
        }
      )
    }

    //this.buildingForm.reset();
  } else {
    console.log('Form is invalid');
  }

}
  buildingForm: FormGroup;
  floorN: number[] = [];
  yearN: number[]=[];
  roomN: number[]=[];

  constructor(private formBuilder: FormBuilder, private buildingService: BuildingService, private datePipe: DatePipe, private route: ActivatedRoute,
    private router: Router, private authService: AuthService){
    this.building = {
        id: 1,
        country: '',
        city: '',
        seller: '',
        type: '',
        region: '',
        street_name: '',
        street_number: 0,
        floor: 0,
        area: 0,
        year: '',
        rooms: 0,
        date: '2024-01-01',
        price: 0,
        image_url: '',
        username: authService.getUsername()!
    }
    
    this.buildingForm = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      seller: ['', Validators.required],
      type: ['', Validators.required],
      region: ['', Validators.required],
      street_name: ['', Validators.required],
      street_number: ['', Validators.required],
      floor: ['', Validators.required],
      area: ['', Validators.required],
      year: ['', Validators.required],
      rooms: ['', Validators.required],
      date: [''],
      price: ['', Validators.required],
      image_url: ['', Validators.required],
      username: this.username
    })

    this.itemId = 0;
  }

  ngOnInit(): void {
    // Populate the numbers array with numbers from 1 to 10
    for (let i = 1; i <= 42; i++) {
      this.floorN.push(i);
    }
    for (let i = 1980; i <= 2024; i++) {
      this.yearN.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.roomN.push(i);
    }

    this.username = this.authService.getUsername();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

    if(id){
    this.itemId = +id;
    this.isEditMode=true;
    this.buildingService.getBuildingById(this.itemId).subscribe(data => {
      this.buildingForm.patchValue({
        country: data.country,
        city: data.city,
        seller: data.seller,
        type: data.type,
        region: data.region,
        street_name: data.street_name,
        street_number: data.street_number,
        floor: data.floor,
        area: data.area,
        year: data.year,
        rooms: data.rooms,
        price: data.price,
        image_url: data.image_url,
        //username: data.username
      })
    })
  }
  });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') ?? '';
  }

}
