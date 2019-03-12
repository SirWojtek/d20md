import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {
  constructor () {
  }

  public makeFileRequest(url: string, files: File[]): Observable<any> {
    return Observable.create(observer => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();


      if (!files) {
        observer.next();
        observer.complete();
      }

      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        // TODO: register progress as Observable
        // Math.round(event.loaded / event.total * 100);
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('authorization', 'Bearer ' + localStorage.getItem('id_token'));
      xhr.send(formData);
    });
  }
}
