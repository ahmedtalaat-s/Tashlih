import { Component } from '@angular/core';
import { HeroCarousel } from './hero-carousel/hero-carousel';
import { IProductCard } from '../product/model/produtct';
import { ProductSection } from '../product/product-section/product-section';
import { Banner } from '../../../shared/banner/banner';
import { Categories } from './categories/categories';
import { SupplierCarouserl } from './supplier-carouserl/supplier-carouserl';

@Component({
  selector: 'app-home',
  imports: [HeroCarousel, ProductSection, Banner, Categories, SupplierCarouserl],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  bestSellers: IProductCard[] = [
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
    {
      id: 1,
      title: 'محرك تويوتا كامري مستعمل',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Engine',
      price: 120,
      currency: 'ر.س',
    },
  ];

  recommended: IProductCard[] = [
    {
      id: 2,
      title: 'قير أوتوماتيك هيونداي',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Gear',
      price: 200,
      currency: 'ر.س',
    },
    {
      id: 2,
      title: 'قير أوتوماتيك هيونداي',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Gear',
      price: 200,
      currency: 'ر.س',
    },
    {
      id: 2,
      title: 'قير أوتوماتيك هيونداي',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Gear',
      price: 200,
      currency: 'ر.س',
    },
    {
      id: 2,
      title: 'قير أوتوماتيك هيونداي',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Gear',
      price: 200,
      currency: 'ر.س',
    },
    {
      id: 2,
      title: 'قير أوتوماتيك هيونداي',
      image: 'https://placehold.co/150x100/fdfbf0/333?text=Gear',
      price: 200,
      currency: 'ر.س',
    },
  ];
}
