import { writable } from 'svelte/store';
import { BikeEmpty } from './models/bike';
import { BrandEmpty } from './models/brand';
import { SpecsEmpty } from './models/specs';

export const Format = {
  table: 'table',
  list: 'list',
}
export const Views = {
  bikes: 'bikes',
  dealers: 'dealers',
}

// Base Data
export const brands = writable([]);

export const searchInput = writable('');
export const format = writable(Format.table);
export const view = writable(Views.bikes);

export const user = writable('');

// Editing
export const bikeData = writable(BikeEmpty());
export const brandData = writable(BrandEmpty());
export const specsData = writable(SpecsEmpty());
