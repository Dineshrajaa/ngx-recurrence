import { Component } from '@angular/core';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-recurrence';
  frequencies = ['daily', 'weekly', 'weeklytwice', 'monthly', 'yearly'];
  selectedFrequency = this.frequencies[0];
  fromDate = '';
  toDate = '';
  generateDates() {
    // to generate dates based on frequency
    const startDate = moment(this.fromDate);
    const toDate = moment(this.toDate);
    const extendedMoment = extendMoment(moment);
    if (this.selectedFrequency === 'daily') {
      const dateRange = extendedMoment.range(startDate, toDate);
      const arrayOfIntervalDates = Array.from(dateRange.by('day', { step: 1 }));
      const weekdays = [0, 1, 2, 3];
      const possibleDays = arrayOfIntervalDates.filter(date => weekdays.includes(date.day()));
      possibleDays.forEach((possibleDay) => console.warn(possibleDay.format('DD-MMM-YYYY')));
    }
  }

  assignDates(selectedDate, fieldName) {
    if (fieldName === 'fromDate') {
      this.fromDate = selectedDate.value;
    } else {
      this.toDate = selectedDate.value;
    }
  }
}
