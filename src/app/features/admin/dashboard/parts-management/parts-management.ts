import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parts-management',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './parts-management.html',
  styleUrl: './parts-management.css',
})
export class PartsManagement {}
