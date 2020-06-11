import { Component, OnInit } from '@angular/core';
import { StudentService} from '../student.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Student} from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService:StudentService) { }

  student: Student = new Student();
  submitted=false;

  ngOnInit() {
    this.submitted=false;
  }

  studentsaveform=new FormGroup({  
    student_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    student_last_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    student_passport:new FormControl('',[Validators.required,Validators.minLength(5)])
     
  });  
  saveStudent(saveStudent){  
    this.student=new Student();     
    this.student.name=this.StudentName.value;  
    this.student.lastName=this.StudentLastName.value;
    this.student.identificationNumber=this.StudentPassport.value; 
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    this.studentService.createStudent(this.student)  
      .subscribe();  
    this.student = new Student();  
  }  

  get StudentName(){  
    return this.studentsaveform.get('student_name');  
  }  

  get StudentLastName(){  
    return this.studentsaveform.get('student_last_name');  
  }  

  get StudentPassport(){  
    return this.studentsaveform.get('student_passport');  
  } 

  addStudentForm(){  
    this.submitted=false;  
    this.studentsaveform.reset();  
  }  

}
