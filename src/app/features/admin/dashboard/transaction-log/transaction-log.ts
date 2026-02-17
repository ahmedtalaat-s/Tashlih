import { Component } from '@angular/core';
import { ComingSoon } from '../../../../shared/coming-soon/coming-soon';

@Component({
  selector: 'app-transaction-log',
  imports: [ComingSoon],
  templateUrl: './transaction-log.html',
  styleUrl: './transaction-log.css',
})
export class TransactionLog {}
