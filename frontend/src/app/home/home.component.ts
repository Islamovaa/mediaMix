import { Component, OnInit } from '@angular/core';
import { MediaService } from '../shared/media.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  mediaList: any[] = [];
  showModal = false;

  newMedium: any = {
    title: '',
    category: '',
    status: '',
    rating: null,
    comment: ''
  };

  customFields: { key: string, value: string }[] = [];

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.loadMedia();
  }

  loadMedia(): void {
    this.mediaService.getAllMedia().subscribe({
      next: (data) => this.mediaList = data,
      error: (err) => console.error('Fehler beim Laden der Medien:', err)
    });
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getCategoryClass(category: string | undefined): string {
    return category?.trim().toLowerCase().replace(/\s+/g, '-') || '';
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  addCustomField(): void {
    this.customFields.push({ key: '', value: '' });
  }

  toggleStatus(status: string): void {
    this.newMedium.status = status;
    if (status !== 'erledigt') {
      this.newMedium.rating = null;
      this.newMedium.comment = '';
    }
  }

  onSubmit(): void {
    const fullMedium: any = {
      title: this.newMedium.title,
      category: this.newMedium.category,
      status: this.newMedium.status
    };

    if (this.newMedium.status === 'erledigt') {
      fullMedium.rating = this.newMedium.rating;
      fullMedium.comment = this.newMedium.comment;
    }

    const dynamicFields: any = {};
    this.customFields.forEach(field => {
      if (field.key && field.value) {
        dynamicFields[field.key] = field.value;
      }
    });

    fullMedium.dynamicFields = dynamicFields;

    this.mediaService.createMedia(fullMedium).subscribe({
      next: (savedMedium) => {
        this.mediaList.push(savedMedium);
        this.closeModal();
        this.loadMedia();
      },
      error: (err) => console.error('Fehler beim Speichern des Mediums:', err)
    });
  }

  resetForm(): void {
    this.newMedium = {
      title: '',
      category: '',
      status: '',
      rating: null,
      comment: ''
    };
    this.customFields = [];
  }

  editMedium(medium: any): void {
    console.log("Bearbeiten:", medium);
  }

  deleteMedium(id: string): void {
    console.log("Löschen ID:", id);
  }
}

