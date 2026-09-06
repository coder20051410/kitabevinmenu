import type { MenuTag } from "@/data/menu";

export type Locale = "az" | "en" | "ru";

export const locales: Locale[] = ["az", "en", "ru"];

export const localeLabels: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

export interface Translations {
  tagline: string;
  hours: string;
  lunchHours: string;
  searchPlaceholder: string;
  noResults: string;
  openMap: string;
  popular: string;
  set: string;
  nonAlcoholic: string;
  qrMenu: string;
  myCart: string;
  callWaiter: string;
  tableNumber: string;
  tablePlaceholder: string;
  emptyCart: string;
  total: string;
  addToCart: string;
  favorites: string;
  favoritesEmpty: string;
  filters: Record<MenuTag | "cheapest", string>;
  lunchBanner: string;
  breakfastBanner: string;
  readingCorner: string;
  readingPromo: string;
  recommendedBooks: string;
  backToTop: string;
  wifi: string;
  wifiTitle: string;
  wifiName: string;
  wifiPassword: string;
  copy: string;
  copied: string;
  darkMode: string;
  lightMode: string;
  introSkip: string;
  orderViaWhatsapp: string;
}

export const categoryTitles: Record<Locale, Record<string, string>> = {
  az: {
    burgers: "Burgerlər / Fast Food",
    "kebab-doner": "Köz Dönər",
    shawarma: "Şaurma",
    pide: "Pide",
    lahmacun: "Lahmacun",
    pizza: "Pizza",
    salads: "Salatlar",
    soups: "Şorbalar",
    breakfast: "Səhər Yeməkləri",
    teas: "Çaylar",
    "cold-coffee": "Soyuq Qəhvələr",
    "hot-coffee": "İsti Qəhvələr",
    milkshake: "Milkshake",
    cocktails: "Coctails",
    "cold-drinks": "Soyuq İçkilər",
    desserts: "Desertlər",
    "diet-desserts": "Diet Desertlər",
    "lunch-combo": "Lunch / Kombo Menyular",
  },
  en: {
    burgers: "Burgers / Fast Food",
    "kebab-doner": "Grilled Döner",
    shawarma: "Shawarma",
    pide: "Pide",
    lahmacun: "Lahmacun",
    pizza: "Pizza",
    salads: "Salads",
    soups: "Soups",
    breakfast: "Breakfast",
    teas: "Teas",
    "cold-coffee": "Cold Coffee",
    "hot-coffee": "Hot Coffee",
    milkshake: "Milkshakes",
    cocktails: "Mocktails",
    "cold-drinks": "Cold Drinks",
    desserts: "Desserts",
    "diet-desserts": "Diet Desserts",
    "lunch-combo": "Lunch / Combo Menus",
  },
  ru: {
    burgers: "Бургеры / Фастфуд",
    "kebab-doner": "Дёнер на углях",
    shawarma: "Шаурма",
    pide: "Пиде",
    lahmacun: "Лахмаджун",
    pizza: "Пицца",
    salads: "Салаты",
    soups: "Супы",
    breakfast: "Завтраки",
    teas: "Чаи",
    "cold-coffee": "Холодный кофе",
    "hot-coffee": "Горячий кофе",
    milkshake: "Милкшейки",
    cocktails: "Коктейли",
    "cold-drinks": "Холодные напитки",
    desserts: "Десерты",
    "diet-desserts": "Диетические десерты",
    "lunch-combo": "Ланч / Комбо-меню",
  },
};

export const translations: Record<Locale, Translations> = {
  az: {
    tagline: "Kofe, Kitab, Rahatlıq bir məkanda",
    hours: "İş saatları: 09:00 – 23:00",
    lunchHours: "Lunch: 12:00 – 16:00",
    searchPlaceholder: "Menyuda axtar...",
    noResults: "Heç nə tapılmadı",
    openMap: "Xəritədə aç",
    popular: "Populyar",
    set: "Set",
    nonAlcoholic: "alkoholsuz",
    qrMenu: "QR Menyu",
    myCart: "Səbətim",
    callWaiter: "Ofisiantı çağır",
    tableNumber: "Masa nömrəsi",
    tablePlaceholder: "Məs: 5",
    emptyCart: "Səbət boşdur",
    total: "Cəmi",
    addToCart: "Səbətə əlavə et",
    favorites: "Bəyəndiklərim",
    favoritesEmpty: "Hələ heç nə bəyənməmisiniz",
    filters: {
      popular: "Populyar",
      spicy: "Acılı",
      vegetarian: "Vegetarian",
      new: "Yeni",
      cheapest: "Ən ucuz",
    },
    lunchBanner: "🍽️ Lunch Menyu Aktivdir!",
    breakfastBanner: "🍳 Səhər yeməkləri hazırdır!",
    readingCorner: "Oxu Guşəsi",
    readingPromo: "Kitab oxuyarkən 1 pulsuz çay",
    recommendedBooks: "Bu Ay Tövsiyə Olunan Kitablar",
    backToTop: "Yuxarı",
    wifi: "WiFi",
    wifiTitle: "Pulsuz WiFi",
    wifiName: "Şəbəkə adı",
    wifiPassword: "Parol",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    darkMode: "Qaranlıq rejim",
    lightMode: "İşıqlı rejim",
    introSkip: "Keç",
    orderViaWhatsapp: "WhatsApp ilə sifariş",
  },
  en: {
    tagline: "Coffee, Books, Comfort in one place",
    hours: "Opening hours: 09:00 – 23:00",
    lunchHours: "Lunch: 12:00 – 16:00",
    searchPlaceholder: "Search menu...",
    noResults: "No results found",
    openMap: "Open map",
    popular: "Popular",
    set: "Set",
    nonAlcoholic: "non-alcoholic",
    qrMenu: "QR Menu",
    myCart: "My Cart",
    callWaiter: "Call waiter",
    tableNumber: "Table number",
    tablePlaceholder: "e.g. 5",
    emptyCart: "Cart is empty",
    total: "Total",
    addToCart: "Add to cart",
    favorites: "Favorites",
    favoritesEmpty: "No favorites yet",
    filters: {
      popular: "Popular",
      spicy: "Spicy",
      vegetarian: "Vegetarian",
      new: "New",
      cheapest: "Cheapest",
    },
    lunchBanner: "🍽️ Lunch Menu is Active!",
    breakfastBanner: "🍳 Breakfast is ready!",
    readingCorner: "Reading Corner",
    readingPromo: "1 free tea while reading a book",
    recommendedBooks: "Recommended Books This Month",
    backToTop: "Top",
    wifi: "WiFi",
    wifiTitle: "Free WiFi",
    wifiName: "Network name",
    wifiPassword: "Password",
    copy: "Copy",
    copied: "Copied!",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    introSkip: "Skip",
    orderViaWhatsapp: "Order via WhatsApp",
  },
  ru: {
    tagline: "Кофе, Книги, Уют в одном месте",
    hours: "Часы работы: 09:00 – 23:00",
    lunchHours: "Обед: 12:00 – 16:00",
    searchPlaceholder: "Поиск в меню...",
    noResults: "Ничего не найдено",
    openMap: "Открыть карту",
    popular: "Popular",
    set: "Сет",
    nonAlcoholic: "безалкогольные",
    qrMenu: "QR Меню",
    myCart: "Моя корзина",
    callWaiter: "Позвать официанта",
    tableNumber: "Номер стола",
    tablePlaceholder: "напр. 5",
    emptyCart: "Корзина пуста",
    total: "Итого",
    addToCart: "В корзину",
    favorites: "Избранное",
    favoritesEmpty: "Пока ничего не добавлено",
    filters: {
      popular: "Popular",
      spicy: "Острое",
      vegetarian: "Вегетарианское",
      new: "Новое",
      cheapest: "Дешевле",
    },
    lunchBanner: "🍽️ Обеденное меню активно!",
    breakfastBanner: "🍳 Завтраки готовы!",
    readingCorner: "Читальный уголок",
    readingPromo: "1 бесплатный чай при чтении книги",
    recommendedBooks: "Рекомендуемые книги этого месяца",
    backToTop: "Наверх",
    wifi: "WiFi",
    wifiTitle: "Бесплатный WiFi",
    wifiName: "Имя сети",
    wifiPassword: "Пароль",
    copy: "Копировать",
    copied: "Скопировано!",
    darkMode: "Тёмный режим",
    lightMode: "Светлый режим",
    introSkip: "Пропустить",
    orderViaWhatsapp: "Заказ через WhatsApp",
  },
};
