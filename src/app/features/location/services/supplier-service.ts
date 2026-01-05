import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  getNearestSuppliers(lat: number, lng: number): Observable<any[]> {
    // Return a test/mock response
    const testSuppliers = [
      {
        id: 1,
        name: 'Supplier A',
        latitude: 24.72,
        longitude: 46.68,
        address: 'Riyadh Downtown',
      },
      {
        id: 2,
        name: 'Supplier B',
        latitude: 24.715,
        longitude: 46.69,
        address: 'Olaya District',
      },
      {
        id: 3,
        name: 'Supplier C',
        latitude: 24.71,
        longitude: 46.675,
        address: 'King Abdullah Road',
      },
    ];

    return of(testSuppliers);
  }
}
