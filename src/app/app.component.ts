import { Block } from '@angular/compiler';
import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AngularCRUDAppPractice';
  @ViewChild('myModal') model:ElementRef | undefined;
  EmployeeObj: Employee = new Employee();
  EmployeeList: Employee[]=[];
ngOnInit(): void {
    const localData =localStorage.getItem("angularcrud");
    if(localData != null)
      {
        this.EmployeeList = JSON.parse(localData);
      }


}
  onEdit(item : Employee){
    this.EmployeeObj = item;
    this.openModel();

  }

  onDelete(item : Employee){
    const isDelete = confirm("Do you need to delete");
    if(isDelete){
      const currentRecord = this.EmployeeList.findIndex(m=> m.id === this.EmployeeObj.id);
      this.EmployeeList.splice(currentRecord,1);
      localStorage.setItem('angularcrud',JSON.stringify(this.EmployeeList));
    }
  }

  openModel(){
   
    const model = document.getElementById("myModal");
    if(model != null) {
      model.style.display='block';
    }
  }
  closeModal()
  {
    this.EmployeeObj = new Employee();
    if(this.model != null){
    this.model.nativeElement.style.display='none';
  }}

  updateEmployee(){
    const currentRecord = this.EmployeeList.find(m=> m.id === this.EmployeeObj.id);
    if(currentRecord != undefined)
      {
        currentRecord.name = this.EmployeeObj.name;
        currentRecord.mobileNo = this.EmployeeObj.name;
        currentRecord.email = this.EmployeeObj.email;
        currentRecord.city = this.EmployeeObj.city;
        currentRecord.state = this.EmployeeObj.state;
        currentRecord.pincode = this.EmployeeObj.pincode;
        currentRecord.address = this.EmployeeObj.address;
      }
      localStorage.setItem('angularcrud',JSON.stringify(this.EmployeeList));
      this.closeModal();
  }
  saveEmployee(){
    debugger;
    const isLocalPresent = localStorage.getItem("angularcrud");
    if(isLocalPresent != null){
      const oldArr = JSON.parse(isLocalPresent);
      this.EmployeeObj.id=oldArr.length + 1;
      oldArr.push(this.EmployeeObj);
      this.EmployeeList = oldArr;
      localStorage.setItem('angularcrud', JSON.stringify(oldArr));

    }
    else{
      const newArr =[];
      newArr.push(this.EmployeeObj);
      this.EmployeeObj.id=1;
      this.EmployeeList = newArr;
      localStorage.setItem('angularcrud', JSON.stringify(newArr));
    }
    this.closeModal();
  }
}


export class Employee{
  id : number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor()
  {
    this.id=0;
    this.name='';
    this.mobileNo='';
    this.email='';
    this.city='';
    this.state='';
    this.pincode='';
    this.address='';

  }
}