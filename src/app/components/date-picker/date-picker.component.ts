import {
  Component,
  ViewChild,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NzDatePickerComponent,
  NzDatePickerModule,
} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'custom-date-picker-start-end',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerComponent),
      multi: true
    }
  ]
})
export class CustomDatePickerComponent implements ControlValueAccessor {
  @Input() startValue: Date | null = null;
  @Input() endValue: Date | null = null;
  @Output() startValueChange = new EventEmitter<Date>();
  @Output() endValueChange = new EventEmitter<Date>();
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: any): void {
    if (value) {
      this.startValue = value.startValue;
      this.endValue = value.endValue;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  // handleStartOpenChange(open: boolean): void {
  //   if (!open) {
  //     this.endDatePicker.open();
  //   }

  // }

  // handleEndOpenChange(open: boolean): void {

  // }

  onStartValueChange(value: Date): void {
    this.startValue = value;
    this.startValueChange.emit(value);
    this.emitValue();
  }

  onEndValueChange(value: Date): void {
    this.endValue = value;
    this.endValueChange.emit(value);
    this.emitValue();
  }

  private emitValue(): void {
    this.onChange({ startValue: this.startValue, endValue: this.endValue });
  }





  setStartToday(event: MouseEvent): void {
    event.stopPropagation();
    this.startValue = new Date(); // Example logic
  }
  

  setStartNextMonday(event: MouseEvent): void {
    event.stopPropagation();
    const today = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    this.startValue = nextMonday;
    this.onStartValueChange(this.startValue);
  }

  setStartNextTuesday(event: MouseEvent): void {
    event.stopPropagation();
    const today = new Date();
    const nextTuesday = new Date();
    nextTuesday.setDate(today.getDate() + ((2 + 7 - today.getDay()) % 7 || 7));
    this.startValue = nextTuesday;
    this.onStartValueChange(this.startValue);
  }

  setStartAfterWeek(event: MouseEvent): void {
    event.stopPropagation();
    const today = new Date();
    const afterWeek = new Date();
    afterWeek.setDate(today.getDate() + 7);
    this.startValue = afterWeek;
    this.onStartValueChange(this.startValue);
  }

  setEndToday(event: MouseEvent): void {
    event.stopPropagation();
    this.endValue = new Date();
    this.onEndValueChange(this.endValue);
  }

  setEndNextMonday(event: MouseEvent): void {
    event.stopPropagation();
    const today = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    this.endValue = nextMonday;
    this.onEndValueChange(this.endValue);
  }

  setEndNextTuesday(event: MouseEvent): void {
    event.stopPropagation();
    const today = new Date();
    const nextTuesday = new Date();
    nextTuesday.setDate(today.getDate() + ((2 + 7 - today.getDay()) % 7 || 7));
    this.endValue = nextTuesday;
    this.onEndValueChange(this.endValue);
  }

  setEndAfterWeek(event: MouseEvent): void {
    event.stopPropagation();
    const today = new Date();
    const afterWeek = new Date();
    afterWeek.setDate(today.getDate() + 7);
    this.endValue = afterWeek;
    this.onEndValueChange(this.endValue);
  }

  startDatePickerOpen: boolean = false;
  endDatePickerOpen: boolean = false;

  handleStartOpenChange(open: boolean): void {
    this.startDatePickerOpen = open;
  }

  handleEndOpenChange(isOpen: boolean): void {
    this.endDatePickerOpen = isOpen;
  }


}