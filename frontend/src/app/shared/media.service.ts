import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Media {
  title: string;
  category: string;
  [key: string]: any; 
}


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:5000/media';

  constructor(private http: HttpClient) {}

  getAllMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(this.apiUrl);
  }

  createMedia(medium: Media): Observable<Media> {
    return this.http.post<Media>(this.apiUrl, medium);
  }

  deleteMedia(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateMedia(id: string, medium: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medium);
  }


  updateMedium(id: string, updatedData: any) {
    const url = `http://localhost:5000/media/${id}`;
    console.log('API-URL (sollte ohne Doppel-media sein):', url);
    return this.http.patch<any>(url, updatedData);
  }
  
  
}  
