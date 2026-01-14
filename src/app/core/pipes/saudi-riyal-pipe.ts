import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'saudiRiyal',
})
export class SaudiRiyalPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  transform(value: number, ...args: unknown[]): unknown {
    if (value == null) return null;

    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return this.sanitizer.bypassSecurityTrustHtml(`${formatted} <span class="sar-symbol">ر</span>`);
  }
}
