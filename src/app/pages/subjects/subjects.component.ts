import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Subject {
  id?: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  templateUrl: './subjects.component.html',
  imports: [FormsModule, CommonModule]
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  subject: Subject = { name: '', description: '' };
  editMode = false;
  subjectEditingId: string | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getCollection('subjects').subscribe((subjects: any[]) => {
      this.subjects = subjects as Subject[];
    });
  }

  saveSubject() {
    if (this.editMode && this.subjectEditingId) {
      this.firestoreService.updateDocument('subjects', this.subjectEditingId, this.subject).then(() => {
        this.clearForm();
      });
    } else {
      this.firestoreService.addDocument('subjects', this.subject).then(() => {
        this.subject = { name: '', description: '' };
      });
    }
  }

  editSubject(subject: Subject) {
    this.subject = { name: subject.name, description: subject.description };
    this.editMode = true;
    this.subjectEditingId = subject.id!;
  }

  deleteSubject(id: string) {
    this.firestoreService.deleteDocument('subjects', id);
  }

  clearForm() {
    this.subject = { name: '', description: '' };
    this.editMode = false;
    this.subjectEditingId = null;
  }
}
