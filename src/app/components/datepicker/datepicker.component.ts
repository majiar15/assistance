import { Component, Input, Output, EventEmitter, SimpleChanges, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './datepicker.component.html',
})
export class DatePickerComponent implements DoCheck {
    ngDoCheck(): void {
      this.oldDate = this.date;
    }
    @Input() validDays: number[] = [];
    @Output() dateSelected = new EventEmitter();
    @Input() date: string = '';
    private oldDate!: string;

    validateDate(event: any): void {
        const input = event.target;
        const date = new Date(input.value);
        const day = date.getDay();

        // Verificar si el día es válido
        if (!this.validDays.includes(day)) {
            input.value = this.oldDate;
            this.date = this.oldDate;
            this.dateSelected.emit({ date: input.value, sValid: false });
        } else {
            this.date = input.value;
            this.dateSelected.emit({ date: input.value, isValid: true });
        }
    }
}