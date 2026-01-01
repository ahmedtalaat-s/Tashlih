import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-choose-role',
  imports: [Footer, RouterLink],
  templateUrl: './choose-role.html',
  styleUrl: './choose-role.css',
})
export class ChooseRole {}
