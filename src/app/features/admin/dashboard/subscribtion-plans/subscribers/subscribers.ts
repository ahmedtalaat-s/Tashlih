import { Component, inject, signal } from '@angular/core';
import { Subscriber, SubscriberWithStats } from '../../../../../core/models/admin.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { SaudiRiyalPipe } from '../../../../../core/pipes/saudi-riyal-pipe';
import { SubscribtionPlansService } from '../../../../../core/services/admin/subscribtion.plans.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-subscribers',
  imports: [FormsModule, DatePipe, SaudiRiyalPipe, NgClass],
  templateUrl: './subscribers.html',
  styleUrl: './subscribers.css',
})
export class Subscribers {
  private subscriberService = inject(SubscribtionPlansService);

  subscribers = signal<SubscriberWithStats[] | null>(null);
  searchText: string = '';

  get filteredsubscribers() {
    return this.subscribers()?.filter(
      (s) => s.supplierName.includes(this.searchText) || s.supplierPhone.includes(this.searchText),
    );
  }

  getProgress(days: number): number {
    return Math.min((days / 90) * 100, 100);
  }

  async ngOnInit() {
    const subscribers = await firstValueFrom(this.subscriberService.getSubscriptions());
    this.subscribers.set(
      subscribers.subscriptions.map((s) => ({
        ...s,
        ...this.calcStats(s.startsAt, s.endsAt),
      })),
    );
  }

  // helper for calculating the extra stats for days
  calcStats(startsAt: string | null, endsAt: string | null) {
    if (!startsAt || !endsAt) {
      return {
        totalDays: 0,
        remainingDays: 0,
        percentage: 0,
      };
    }

    const start = new Date(startsAt);
    const end = new Date(endsAt);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / msPerDay));

    const remainingRaw = Math.ceil((end.getTime() - today.getTime()) / msPerDay);

    const remainingDays = Math.max(0, remainingRaw);

    const usedDays = Math.max(0, totalDays - remainingDays);

    const percentage =
      totalDays === 0 ? 0 : Math.min(100, Math.round((usedDays / totalDays) * 100));

    return {
      totalDays,
      remainingDays,
      percentage,
    };
  }
}
