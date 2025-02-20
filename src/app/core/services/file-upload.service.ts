import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly apiUrl = environment.apiUrl + "upload"; // Adjust API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Uploads a single file to the server.
   * @param file File to be uploaded
   * @returns Observable tracking the upload progress
   */
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.apiUrl + "/single", formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Uploads multiple files to the server.
   * @param files Array of files to be uploaded
   * @returns Observable tracking the upload progress
   */
  uploadMultipleFiles(files: File[]): Observable<HttpEvent<any>> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const req = new HttpRequest('POST', this.apiUrl + "/multiple", formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error Error response
   * @returns Observable throwing an error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
