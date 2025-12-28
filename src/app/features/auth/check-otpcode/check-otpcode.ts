import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-check-otpcode',
  imports: [],
  templateUrl: './check-otpcode.html',
  styleUrl: './check-otpcode.css',
})
export class CheckOtpcode {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @Output() verify = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  otpLength = 4;
  otpValues = Array(this.otpLength).fill('');

  /* =========================
     Keyboard handling
  ========================== */
  onKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;

    if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
      return;
    }

    if (key === 'Backspace') {
      if (!this.otpValues[index] && index > 0) {
        this.focusInput(index - 1);
      }
      this.otpValues[index] = '';
    }
  }

  onInput(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;

    if (!/^\d$/.test(value)) {
      this.otpValues[index] = '';
      return;
    }

    this.otpValues[index] = value;

    if (index < this.otpLength - 1) {
      this.focusInput(index + 1);
    } else {
      this.onVerify();
    }
  }

  focusInput(index: number) {
    this.otpInputs.get(index)?.nativeElement.focus();
  }

  /* =========================
     paste handling
  ========================== */
  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasted = event.clipboardData?.getData('text') ?? '';
    if (!/^\d+$/.test(pasted)) return;

    pasted
      .slice(0, this.otpLength)
      .split('')
      .forEach((digit, i) => {
        this.otpValues[i] = digit;

        const inputRef = this.otpInputs.get(i);
        if (inputRef) {
          inputRef.nativeElement.value = digit;
        }
      });

    this.focusInput(this.otpLength - 1);
  }

  /* =========================
     Verify
  ========================== */
  onVerify() {
    const otp = this.otpValues.join('');
    this.verify.emit(otp);
  }

  onClose() {
    this.close.emit();
  }
}
