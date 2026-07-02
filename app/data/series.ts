/** Hatch-placeholder tones for a series render slot. */
export interface RenderTone {
  a: string
  b: string
  dash: string
  text: string
}

export interface Series {
  id: string
  /** Name without «» quotes. */
  name: string
  color: string
  /** Text color on top of `color` (arch cards). */
  onColor: string
  badgeBg: string
  badgeColor: string
  tone: RenderTone
  figures: number
}

export const SERIES: Series[] = [
  {
    id: 'koral',
    name: 'Корал',
    color: '#EA6A6E',
    onColor: '#FFFFFF',
    badgeBg: '#F5B73A',
    badgeColor: '#272563',
    tone: { a: '#F8E2E2', b: '#FDF3F3', dash: '#E0AEB0', text: '#B06A6D' },
    figures: 12,
  },
  {
    id: 'lavanda',
    name: 'Лаванда',
    color: '#B79CE4',
    onColor: '#FFFFFF',
    badgeBg: '#9FE0C8',
    badgeColor: '#272563',
    tone: { a: '#EDE6F8', b: '#F8F5FD', dash: '#C7B4E6', text: '#8871B3' },
    figures: 12,
  },
  {
    id: 'tropik',
    name: 'Тропік',
    color: '#2BC4B4',
    onColor: '#FFFFFF',
    badgeBg: '#F5A9BC',
    badgeColor: '#272563',
    tone: { a: '#E3F3F0', b: '#F3FBF9', dash: '#A9D2CA', text: '#5F968D' },
    figures: 12,
  },
  {
    id: 'sonce',
    name: 'Сонце',
    color: '#F5B73A',
    onColor: '#272563',
    badgeBg: '#2BC4B4',
    badgeColor: '#FFFFFF',
    tone: { a: '#F8EDD5', b: '#FDF8EC', dash: '#E0C88E', text: '#A88A45' },
    figures: 12,
  },
]

export const seriesById = (id: string) => SERIES.find((s) => s.id === id)
