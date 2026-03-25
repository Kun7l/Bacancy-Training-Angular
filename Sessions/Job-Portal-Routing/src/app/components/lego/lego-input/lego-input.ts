import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-lego-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './lego-input.html',
  styleUrl: './lego-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LegoInput),
      multi: true,
    },
  ],
})
export class LegoInput implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() id: string = `lego-input-${Math.random().toString(36).slice(2, 7)}`;
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  isFocused: boolean = false;

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onFocus(): void { this.isFocused = true; }
  onBlur(): void  { this.isFocused = false; this.onTouched(); }
}
