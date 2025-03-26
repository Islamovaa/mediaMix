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
  selectedCategory: string = 'Alle';


  newMedium: any = {
    title: '',
    category: '',
    status: '',
    rating: null,
    comment: ''
  };

  customFields: { key: string, value: string }[] = [];
  selectedMedium: any = null
  existingFields: { key: string; value: string }[] = [];  // nur für Edit-Modus


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
    return obj ? Object.keys(obj) : [];
  }
  


  //um karten nach farben filtern zu können
  getCategoryClass(category: string | undefined): string {
    return category?.trim().toLowerCase().replace(/\s+/g, '-') || '';
  }

  //Medium hinzufügen
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

  //Medium löschen
  deleteMedium(id: string): void {
    if (confirm('Möchtest du dieses Medium wirklich löschen?')) {
      this.mediaService.deleteMedia(id).subscribe({
        next: () => {
          this.mediaList = this.mediaList.filter(m => m._id !== id);
        },
        error: (err) => {
          console.error('Fehler beim Löschen:', err);
        }
      });
    }
  }


  //nach Kategorien filtern
  setCategory(category: string): void {
    this.selectedCategory = category;
  }
  
  get filteredMediaList(): any[] {
    if (this.selectedCategory === 'Alle') return this.mediaList;
    return this.mediaList.filter(
      (medium) => medium.category?.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }
 

  //Zufallsgenerator
showRandomModal: boolean = false;
randomCategory: string = '';
randomSuggestion: any = null;




openRandomModal(): void {
  console.log("modal wird geöffnet");
  this.showRandomModal = true;
  this.randomCategory = '';
  this.randomSuggestion = null;
}

closeRandomModal(): void {
  this.showRandomModal = false;
  this.randomCategory = '';
  this.randomSuggestion = null;
}

selectRandomMedium(): void {
  let list = this.mediaList;

  // Kategorie-Filter
  if (this.randomCategory && this.randomCategory !== 'Alle') {
    list = list.filter(medium =>
      medium.category?.toLowerCase() === this.randomCategory.toLowerCase()
    );
  }

  
  if (list.length === 0) {
    this.randomSuggestion = { title: 'Keine passenden Medien gefunden.' };
    return;
  }

 
  const randomIndex = Math.floor(Math.random() * list.length);
  this.randomSuggestion = list[randomIndex];
}





//Update-Funktion

showEditModal: boolean = false;

editMedium(medium: any): void {
  this.selectedMedium = { ...medium };
  this.customFields = [];

  // ✅ Top-Level-Felder extrahieren (außer Standardfelder)
  const excludeKeys = ['_id', 'title', 'category', 'status', 'rating', 'comment', '__v', 'createdAt', 'updatedAt', 'dynamicFields'];

  for (let key of Object.keys(medium)) {
    if (!excludeKeys.includes(key)) {
      this.customFields.push({ key, value: medium[key] });
    }
  }

  // ✅ Zusätzlich: dynamicFields mergen, falls vorhanden
  if (medium.dynamicFields) {
    for (let key of Object.keys(medium.dynamicFields)) {
      this.customFields.push({ key, value: medium.dynamicFields[key] });
    }
  }

  console.log('→ customFields geladen:', this.customFields);
  this.showEditModal = true;
}




saveEditedMedium(): void {
  const updatedData: any = {
    title: this.selectedMedium.title,
    category: this.selectedMedium.category,
    status: this.selectedMedium.status,
    dynamicFields: {}
  };

  if (this.selectedMedium.status === 'erledigt') {
    updatedData.rating = this.selectedMedium.rating;
    updatedData.comment = this.selectedMedium.comment;
  } else {
    updatedData.rating = null;
    updatedData.comment = '';
  }

  // customFields korrekt übernehmen
  for (let field of this.customFields) {
    if (field.key && field.value) {
      updatedData.dynamicFields[field.key] = field.value;
    }
  }

  this.mediaService.updateMedium(this.selectedMedium._id, updatedData).subscribe({
    next: () => {
      this.loadMedia();
      this.closeEditModal();
    },
    error: (err) => console.error('Fehler beim Aktualisieren:', err)
  });
}


closeEditModal(): void {
  this.showEditModal = false;
  this.selectedMedium = null;
  this.customFields = [];
}

 }