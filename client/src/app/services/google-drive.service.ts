import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

declare var gapi: any;


@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  constructor() {
    // Load the Google API client library when the service is initialized
    gapi.load('client', this.initGoogleClient.bind(this));
  }
  initGoogleClient(): void {
    gapi.client.init({
      apiKey: 'AIzaSyCAR83reR3aenCVf3Hl1rubCnGZHIO4ooY',
      clientId: '1010361960247-p3bpsamqf0pusnor9m3fta94h6m46vgn.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      scope: 'https://www.googleapis.com/auth/drive.file',
    }).then(() => {
      console.log('Google API client initialized');
    });
  }
  saveNoteAsTxtFile(filename: string, content: string): Observable<string> {
    return new Observable<string>((observer) => {
      gapi.client.drive.files.create({
        resource: {
          name: filename,
          mimeType: 'text/plain'
        },
        media: {
          mimeType: 'text/plain',
          body: content
        }
      }).then(
        (response : any) => {
          observer.next(response.result.id);
          observer.complete();
        },
        (error : any) => {
          observer.error(error);
        }
      );
    });
  }
  getNoteAsTxtFile(fileId: string): Observable<string> {
    return new Observable<string>((observer) => {
      gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      }).then(
        (response:any) => {
          observer.next(response.body);
          observer.complete();
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });
  }
  updateNoteContent(fileId: string, updatedContent: string): Observable<string> {
    return new Observable<string>((observer) => {
      // First, retrieve the existing content
      this.getNoteAsTxtFile(fileId).subscribe((content) => {
        // Modify the content as needed
        const modifiedContent = content + '\nUpdated: ' + updatedContent;

        // Save the modified content back to Google Drive
        this.saveNoteAsTxtFile(fileId, modifiedContent).subscribe((newFileId) => {
          observer.next(newFileId);
          observer.complete();
        });
      });
    });
  }
}
