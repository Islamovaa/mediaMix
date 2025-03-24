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
}
