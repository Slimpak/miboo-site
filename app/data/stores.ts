export interface Store {
  id: number
  /** Плейсхолдер — реальні назви партнерів підставимо пізніше. */
  name: string
  city: string
  address: string
  hours: string
  hasBarrel: boolean
  pinColor: string
  pinTextColor: string
  /** Позиція піна на карті-плейсхолдері, у відсотках. */
  pin: { top: number; left: number }
}

export const STORES: Store[] = [
  {
    id: 1,
    name: 'назва магазину-партнера',
    city: 'Київ',
    address: 'вул. —, №—',
    hours: 'Пн–Нд · 10:00–20:00',
    hasBarrel: true,
    pinColor: '#EA6A6E',
    pinTextColor: '#FFFFFF',
    pin: { top: 30, left: 24 },
  },
  {
    id: 2,
    name: 'назва магазину-партнера',
    city: 'Київ',
    address: 'вул. —, №—',
    hours: 'Пн–Сб · 10:00–19:00',
    hasBarrel: false,
    pinColor: '#B79CE4',
    pinTextColor: '#FFFFFF',
    pin: { top: 44, left: 33 },
  },
  {
    id: 3,
    name: 'назва магазину-партнера',
    city: 'Львів',
    address: 'вул. —, №—',
    hours: 'Пн–Нд · 11:00–21:00',
    hasBarrel: true,
    pinColor: '#2BC4B4',
    pinTextColor: '#FFFFFF',
    pin: { top: 26, left: 62 },
  },
  {
    id: 4,
    name: 'назва магазину-партнера',
    city: 'Одеса',
    address: 'вул. —, №—',
    hours: 'Пн–Нд · 10:00–20:00',
    hasBarrel: false,
    pinColor: '#F5B73A',
    pinTextColor: '#272563',
    pin: { top: 66, left: 56 },
  },
  {
    id: 5,
    name: 'назва магазину-партнера',
    city: 'Дніпро',
    address: 'вул. —, №—',
    hours: 'Пн–Нд · 10:00–20:00',
    hasBarrel: true,
    pinColor: '#F5A9BC',
    pinTextColor: '#272563',
    pin: { top: 52, left: 78 },
  },
]

export const CITIES = ['Київ', 'Львів', 'Одеса', 'Дніпро']
