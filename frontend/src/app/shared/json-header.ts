import { HttpHeaders } from '@angular/common/http';

export const jsonHeader = new HttpHeaders()
  .set('Content-Type', 'application/json');
