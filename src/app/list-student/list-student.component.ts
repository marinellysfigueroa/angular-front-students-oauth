import { Component, OnInit } from '@angular/core';
import { StudentService} from '../student.service';
import { Student} from '../student';
import { Observable, Subject, from} from 'rxjs';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
 

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  constructor(private serviceStudent:StudentService) { }

  studentArray: any[]=[];
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject(); 
  
  students: Observable<Student[]>;  
  student : Student=new Student();  
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false;     

  ngOnInit() {
    
    this.isupdated=false;  
    
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    
    this.serviceStudent.getStudentList().subscribe(data =>{  
    this.students =data;  
    this.dtTrigger.next();  
    })  
  }
  deleteStudent(id: number) {  
    this.serviceStudent.deleteStudent(id)  
      .subscribe(  
        data => {   
          this.deleteMessage=true;  
          console.log(data);
          
        },  
        error => console.log(error));  
        this.serviceStudent.getStudentList().subscribe(data =>{  
            this.students =data  
            });
  }  
  updateStudent(id: number){  
    this.serviceStudent.getStudent(id)  
      .subscribe(  
        data => {   
          this.studentlist=new Array();
          this.studentlist.push(data);             
        },  
        error => console.log(error));  
  }  

  studentupdateform=new FormGroup({  
    student_id:new FormControl(),  
    student_name:new FormControl(),  
    student_last_name:new FormControl(),  
    student_passport:new FormControl(),  
    
  });  

  updateStu(updstu){  
    this.student=new Student();   
   this.student.id=this.StudentId.value;  
   this.student.name=this.StudentName.value; 
   this.student.lastName=this.StudentLastName.value; 
   this.student.identificationNumber=this.StudentPassport.value;    
   this.serviceStudent.updateStudent(this.student.id,this.student).subscribe(  
    response => {  
      this.isupdated=true;        
        
    },  
    error => console.log(error)); 
    
    this.serviceStudent.getStudentList().subscribe(data =>{  
        this.students =data;  
    });
    
  }  

  get StudentId(){  
    return this.studentupdateform.get('student_id');  
  }  

  get StudentName(){  
    return this.studentupdateform.get('student_name');  
  } 
  
  get StudentLastName(){  
    return this.studentupdateform.get('student_last_name');  
  } 
  
  get StudentPassport(){  
    return this.studentupdateform.get('student_passport');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
  }  
  

}
