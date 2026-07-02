export interface ExclusiveCharacter {
  name: string
  seriesId: string
  /** Підказка на чипсі демо-кодів. */
  hint: string
}

export const CODE_LENGTH = 6

/** Демо-коди активації → ексклюзивні персонажі серій. */
export const CODES: Record<string, ExclusiveCharacter> = {
  MB7F4K: { name: 'Хамелеон-Невидимка', seriesId: 'tropik', hint: 'Тропік' },
  KORAL9: { name: 'Золота Медуза', seriesId: 'koral', hint: 'Корал' },
  LAVND8: { name: 'Місячний Кіт', seriesId: 'lavanda', hint: 'Лаванда' },
  SONCE5: { name: 'Фенікс-Курчатко', seriesId: 'sonce', hint: 'Сонце' },
}

export const DEMO_CODES = Object.keys(CODES)
