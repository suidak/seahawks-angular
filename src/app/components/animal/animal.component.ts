import { Component, OnInit, Input } from '@angular/core';
import { Http } from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { Animal } from '../../models/animal';
import { AnimalPhoto } from '../../models/animalphoto';
import { AnimalService } from '../../service/animalservice/animal.service';
import { UserService } from '../../service/user.service';
import { AnimalphotoserviceService } from '../../service/animalphotoservice.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  loggedin: boolean = localStorage.getItem("currentUser") ? true : false;

  myAnimals: Animal[] = [];
  allAnimals: Animal[] = [];

  picStatus: string;

  animal: Animal = new Animal();
  lastIndex: number = 0;
  avgPetsPerUser: number = 0;

  responseStatus: string = "";
  submitStatus: boolean = false;

  sexOptions: string[] = ["M", "F"];

  species: string[] = [];
  nbrAdoptions: number[] = [];
  mostAdoptedSpecie: string = "";
  mostAdoptions: number = 0;

  showAnimals: boolean = false;

  files: FileList;
  filestring: string;

  animalpics: AnimalPhoto[] = [];
  constructor(private http: Http, private animalService: AnimalService, private userService: UserService,
    private animalPhotoService: AnimalphotoserviceService) { }

  ngOnInit() {
    this.animalService.getUserAnimals(this.currentUser.id).subscribe(resp => {
      this.myAnimals = (resp.json());
      this.animalService.getLastIndex().subscribe(resp => {
        this.lastIndex = resp.json() + 1;
      });

      this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
        this.animalpics = resp.json();
      });
    });

    this.animalService.getAllAnimals().subscribe(resp => {
      this.allAnimals = (resp.json());
    });

    this.animalService.averageAnimalsNbrPerUser().subscribe(resp => {
      this.avgPetsPerUser = resp.json();
    });

    this.animalService.nbrOfAdoptionsPerSpecie().subscribe(resp => {
      let data = resp.json();

      Object.keys(data).forEach(d => {
        this.species.push(d);
        this.nbrAdoptions.push(data[d]);
      });
    });

    this.animalService.getMostAdoptedAnimal().subscribe(resp => {
      let data = resp.json();

      Object.keys(data).forEach(d => {
        this.mostAdoptedSpecie = d;
        this.mostAdoptions = data[d];
      });
    });
  }

  toggleAnimals() {
    this.showAnimals = !this.showAnimals;
  }

  addAnimal(status: string, specie: string, breed: string, age: string, height: string, weight: string, sex: string, f: any) {
    let a = new Animal();
    a.status = status;
    a.specie = specie;
    a.breed = breed;
    a.age = parseInt(age);
    a.height = parseInt(height);
    a.weight = parseInt(weight);
    a.sex = sex;

    let owner = new User();
    owner.id = this.currentUser.id;
    a.owner = owner;

    this.animalService.addAnimal(a).subscribe(resp => {
      this.responseStatus = resp.statusText;

      this.animalPhotoService.addImage(this.filestring, resp.json().id).subscribe(re => {

      }, err => {
        console.log(err);
      });

      this.animalService.getUserAnimals(this.currentUser.id).subscribe(resp => {
        this.myAnimals = (resp.json());

        this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
          this.animalpics = resp.json();

          this.filestring = null;
        });
      });
    });

    a.id = this.lastIndex;
    this.lastIndex += 1;
    this.myAnimals.push(a);
    this.allAnimals.push(a);

    f.resetForm();
  }

  onSubmitClick() {
    this.submitStatus = !this.submitStatus;
  }

  deleteAnimal(id: string) {
    let a = new Animal();
    a.id = parseInt(id);

    this.animalService.deleteAnimal(a).subscribe(resp => {
      this.responseStatus = resp.statusText;
    });

    this.myAnimals.splice(this.myAnimals.indexOf(a), 1);
    this.allAnimals.splice(this.allAnimals.indexOf(a), 1);
  }

  getFiles(event) {
    this.files = event.target.files;
    console.log(this.files);
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this); // handleReaderLoaded method will now listen to reader
    reader.readAsBinaryString(this.files[0]);            // for changes in parallel. meaning, handleReaderLoaded
                                                         // will be the last one to finish working and give the B64
    let file = this.files[0];
    console.log(file);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString);  // Converting binary string data. 
    console.log(this.filestring);
  }

  addSinglePic(animalid: number) {
    this.animalPhotoService.addImage(this.filestring, animalid).subscribe(re => {
      this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
        this.animalpics = resp.json();

        this.filestring = null;
      });
    }, err => {
      console.log(err);
    });
  }

}
