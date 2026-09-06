export interface Book {
  id: string;
  title: string;
  author: string;
  emoji: string;
}

export const recommendedBooks: Book[] = [
  {
    id: "1",
    title: "Xəmsə",
    author: "Nizami Gəncəvi",
    emoji: "📜",
  },
  {
    id: "2",
    title: "Kofe və Kitab",
    author: "Muriel Barbery",
    emoji: "☕",
  },
  {
    id: "3",
    title: "Alximik",
    author: "Paulo Coelho",
    emoji: "🌙",
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    emoji: "📖",
  },
];
