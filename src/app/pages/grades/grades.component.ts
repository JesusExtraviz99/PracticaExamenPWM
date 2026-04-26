import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  id?: string;
  name: string;
  email: string;
}

interface Grade {
  id?: string;
  studentId: string;
  subjectId: string;
  grade: number;
}

interface Subject {
  id?: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  templateUrl: './grades.component.html',
  imports: [FormsModule, CommonModule]
})
export class GradesComponent implements OnInit {
  students: Student[] = [];
  subjects: Subject[] = [];
  grades: Grade[] = [];
  grade: Grade = { studentId: '', subjectId: '', grade: 0 };
  editMode = false;
  gradeEditingId: string | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getCollection('students').subscribe((students: any[]) => {
      this.students = students as Student[];
    });
    this.firestoreService.getCollection('subjects').subscribe((subjects: any[]) => {
      this.subjects = subjects as Subject[];
    });
    this.firestoreService.getCollection('grades').subscribe((grades: any[]) => {
      this.grades = grades as Grade[];
    });
  }

  saveGrade() {
    if (this.editMode && this.gradeEditingId) {
      this.firestoreService.updateDocument('grades', this.gradeEditingId, this.grade).then(() => {
        this.clearForm();
      });
    } else {
      this.firestoreService.addDocument('grades', this.grade).then(() => {
        this.grade = { studentId: '', subjectId: '', grade: 0 };
      });
    }
  }

  editGrade(grade: Grade) {
    this.grade = { studentId: grade.studentId, subjectId: grade.subjectId, grade: grade.grade };
    this.editMode = true;
    this.gradeEditingId = grade.id!;
  }

  deleteGrade(id: string) {
    this.firestoreService.deleteDocument('grades', id);
  }

  clearForm() {
    this.grade = { studentId: '', subjectId: '', grade: 0 };
    this.editMode = false;
    this.gradeEditingId = null;
  }

  getStudentName(studentId: string) {
    const student = this.students.find(s => s.id === studentId);
    return student ? student.name : 'Sin estudiante';
  }

  getSubjectName(subjectId: string) {
    const subject = this.subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Sin asignatura';
  }
}

