import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private intervalId: any;
  private intervalSubject = new BehaviorSubject<boolean>(false);
  intervalActive$ = this.intervalSubject.asObservable();

  startInterval(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.doSomething();
      }, 1000);
      this.intervalSubject.next(true);
    }
  }

  stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.intervalSubject.next(false);
    }
  }

  private doSomething(): void {
    console.log('This function runs every second');
  }
}
