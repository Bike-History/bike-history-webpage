import { writable } from 'svelte/store';

export const Format = {
  table: 'table',
  list: 'list',
}
export const Views = {
  bikes: 'bikes',
  dealers: 'dealers',
}

export const searchInput = writable('');
export const format = writable(Format.table);
export const view = writable(Views.bikes);