export interface Figure {
  id: string
  name: string
  seriesId: string
}

/** Звичайні фігурки відкритих бочок «Набери сам» (рідкісні й секретні — лише в секретках). */
export const FIGURES: Figure[] = [
  // «Тропік»
  { id: 'tropik-lysenya', name: 'Лисеня', seriesId: 'tropik' },
  { id: 'tropik-tukan', name: 'Тукан', seriesId: 'tropik' },
  { id: 'tropik-drakonchyk', name: 'Дракончик', seriesId: 'tropik' },
  { id: 'tropik-zaichyk', name: 'Зайчик', seriesId: 'tropik' },
  { id: 'tropik-kotyk', name: 'Котик', seriesId: 'tropik' },
  { id: 'tropik-yizhachok', name: 'Їжачок', seriesId: 'tropik' },
  { id: 'tropik-panda', name: 'Панда', seriesId: 'tropik' },
  { id: 'tropik-sovenya', name: 'Совеня', seriesId: 'tropik' },
  { id: 'tropik-olenya', name: 'Оленя', seriesId: 'tropik' },
  // «Корал»
  { id: 'koral-krabyk', name: 'Крабик', seriesId: 'koral' },
  { id: 'koral-vosmynig', name: 'Восьминіжок', seriesId: 'koral' },
  { id: 'koral-rybka', name: 'Рибка', seriesId: 'koral' },
  { id: 'koral-cherepashka', name: 'Черепашка', seriesId: 'koral' },
  { id: 'koral-konyk', name: 'Морський коник', seriesId: 'koral' },
  { id: 'koral-delfin', name: 'Дельфінчик', seriesId: 'koral' },
  { id: 'koral-pingvin', name: 'Пінгвіня', seriesId: 'koral' },
  { id: 'koral-zirochka', name: 'Зірочка', seriesId: 'koral' },
  { id: 'koral-meduzka', name: 'Медузка', seriesId: 'koral' },
  // «Лаванда»
  { id: 'lavanda-yedynorizhka', name: 'Єдиноріжка', seriesId: 'lavanda' },
  { id: 'lavanda-metelyk', name: 'Метелик', seriesId: 'lavanda' },
  { id: 'lavanda-myshenya', name: 'Мишеня', seriesId: 'lavanda' },
  { id: 'lavanda-krolenya', name: 'Кроленя', seriesId: 'lavanda' },
  { id: 'lavanda-khmarynka', name: 'Хмаринка', seriesId: 'lavanda' },
  { id: 'lavanda-splyushka', name: 'Сплюшка', seriesId: 'lavanda' },
  { id: 'lavanda-kazhanchyk', name: 'Кажанчик', seriesId: 'lavanda' },
  { id: 'lavanda-zoryanytsya', name: 'Зоряниця', seriesId: 'lavanda' },
  { id: 'lavanda-tuman', name: 'Туманчик', seriesId: 'lavanda' },
  // «Сонце»
  { id: 'sonce-levenya', name: 'Левеня', seriesId: 'sonce' },
  { id: 'sonce-kurchatko', name: 'Курчатко', seriesId: 'sonce' },
  { id: 'sonce-bdzhilka', name: 'Бджілка', seriesId: 'sonce' },
  { id: 'sonce-zhyrafenya', name: 'Жирафеня', seriesId: 'sonce' },
  { id: 'sonce-vedmezha', name: 'Ведмежа', seriesId: 'sonce' },
  { id: 'sonce-kachenya', name: 'Каченя', seriesId: 'sonce' },
  { id: 'sonce-bilchenya', name: 'Білченя', seriesId: 'sonce' },
  { id: 'sonce-khomyachok', name: "Хом'ячок", seriesId: 'sonce' },
  { id: 'sonce-sonyah', name: 'Соняшко', seriesId: 'sonce' },
]

export const figuresBySeries = (seriesId: string) =>
  FIGURES.filter((f) => f.seriesId === seriesId)
