export const quotes = [
  { az: "Kitablar olmasaydı, dünya çox dar olardı.", en: "Without books, the world would be too narrow.", ru: "Без книг мир был бы слишком тесен." },
  { az: "Bir fincan qəhvə, min hekayənin başlanğıcıdır.", en: "A cup of coffee is the beginning of a thousand stories.", ru: "Чашка кофе — начало тысячи историй." },
  { az: "Oxumaq, ruhun səyahətidir.", en: "Reading is the journey of the soul.", ru: "Чтение — это путешествие души." },
  { az: "Kofe günə başlamaq üçün, kitab isə həyata.", en: "Coffee to start the day, books to start life.", ru: "Кофе — чтобы начать день, книги — чтобы начать жизнь." },
  { az: "Sakit guşə, isti çay, yaxşı kitab — xəzinədir.", en: "A quiet corner, warm tea, a good book — a treasure.", ru: "Тихий уголок, тёплый чай, хорошая книга — сокровище." },
  { az: "Hər səhifə yeni bir qapıdır.", en: "Every page is a new door.", ru: "Каждая страница — новая дверь." },
  { az: "Kitabxana evin ən sakit otağıdır.", en: "The library is the quietest room in the house.", ru: "Библиотека — самая тихая комната в доме." },
];

export function getDailyQuote(locale: "az" | "en" | "ru"): string {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length;
  return quotes[dayIndex][locale];
}
