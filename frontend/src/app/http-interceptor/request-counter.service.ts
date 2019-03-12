import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ReqeustCounterService {
  private counter = new BehaviorSubject<number>(0);
  counterObservable = this.counter.asObservable();

  register() {
    this.counter.next(this.counter.getValue() + 1);
  }

  complete() {
    this.counter.next(this.counter.getValue() - 1);
  }

}
