import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  id?: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  imports: [FormsModule, CommonModule]
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  student: Student = { name: '', email: '' };
  editMode = false;
  studentEditingId: string | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getCollection('students').subscribe((students: any[]) => {
      this.students = students as Student[];
    });
  }

  saveStudent() {
    if (this.editMode && this.studentEditingId) {
      this.firestoreService.updateDocument('students', this.studentEditingId, this.student).then(() => {
        this.clearForm();
      });
    } else {
      this.firestoreService.addDocument('students', this.student).then(() => {
        this.student = { name: '', email: '' };
      });
    }
  }

  editStudent(student: Student) {
    this.student = { name: student.name, email: student.email };
    this.editMode = true;
    this.studentEditingId = student.id!;
  }

  deleteStudent(id: string) {
    this.firestoreService.deleteDocument('students', id);
  }

  clearForm() {
    this.student = { name: '', email: '' };
    this.editMode = false;
    this.studentEditingId = null;
  }
}
