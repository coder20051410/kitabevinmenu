export type MenuTag = "popular" | "spicy" | "vegetarian" | "new";

export interface MenuItem {
  name: string;
  price: number;
  image?: string;
  searchQuery?: string;
  tags?: MenuTag[];
  note?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  icon?: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "burgers",
    title: "Burgerlər / Fast Food",
    items: [
      {
        name: "Cheeseburger ət + kartof fri",
        price: 8.7,
        tags: [
          "popular"
        ],
        searchQuery: "Cheeseburger ət + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Cheeseburger toyuq + kartof fri",
        price: 7.5,
        tags: [
          "popular"
        ],
        searchQuery: "Cheeseburger toyuq + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Chicken burger + kartof fri",
        price: 6.5,
        searchQuery: "Chicken burger + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Bookcafe burger + kartof fri",
        price: 10.9,
        tags: [
          "spicy",
          "popular"
        ],
        searchQuery: "Bookcafe burger + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Cheeseburger ət dubl + kartof fri",
        price: 12.5,
        tags: [
          "popular"
        ],
        searchQuery: "Cheeseburger ət dubl + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Cheeseburger toyuq dubl + kartof fri",
        price: 10.5,
        searchQuery: "Cheeseburger toyuq dubl + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Dubl chicken burger + kartof fri",
        price: 8.5,
        searchQuery: "Dubl chicken burger + kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Sezar roll",
        price: 8.5,
        tags: [
          "new"
        ],
        searchQuery: "Sezar roll Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Club",
        price: 9.8,
        searchQuery: "Club Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Kartof fri",
        price: 3.5,
        searchQuery: "Kartof fri Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Naqets",
        price: 5.5,
        searchQuery: "Naqets Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Pendir çubuğu",
        price: 5.6,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Pendir çubuğu Burgerlər / Fast Food food photography close up",
        image: ""
      },
      {
        name: "Ev sayağı kartof",
        price: 4,
        searchQuery: "Ev sayağı kartof Burgerlər / Fast Food food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "kebab-doner",
    title: "Köz Dönər",
    items: [
      {
        name: "Ət çörək",
        price: 3.5,
        searchQuery: "Ət çörək Köz Dönər food photography close up",
        image: "/images/menu/et-corek.jpg"
      },
      {
        name: "Toyuq çörək",
        price: 2.7,
        searchQuery: "Toyuq çörək Köz Dönər food photography close up",
        image: "/images/menu/toyuq-corek.jpg"
      },
      {
        name: "Ət lavaş",
        price: 3.7,
        searchQuery: "Ət lavaş Köz Dönər food photography close up",
        image: "/images/menu/et-lavas.jpg"
      },
      {
        name: "Toyuq lavaş",
        price: 3,
        searchQuery: "Toyuq lavaş Köz Dönər food photography close up",
        image: "/images/menu/toyuq-lavas.jpg"
      },
      {
        name: "Book Cafe dönər",
        price: 4.5,
        searchQuery: "Book Cafe dönər Köz Dönər food photography close up",
        image: ""
      },
      {
        name: "İskəndər",
        price: 9.5,
        searchQuery: "İskəndər Köz Dönər food photography close up",
        image: ""
      },
      {
        name: "Plov üstü ət",
        price: 8,
        searchQuery: "Plov üstü ət Köz Dönər food photography close up",
        image: ""
      },
      {
        name: "Plov üstü toyuq",
        price: 7,
        searchQuery: "Plov üstü toyuq Köz Dönər food photography close up",
        image: ""
      },
      {
        name: "Porsiya ət",
        price: 10.99,
        searchQuery: "Porsiya ət Köz Dönər food photography close up",
        image: ""
      },
      {
        name: "Porsiya toyuq",
        price: 9.99,
        searchQuery: "Porsiya toyuq Köz Dönər food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "shawarma",
    title: "Şaurma",
    items: [
      {
        name: "Toyuq çörək",
        price: 2.9,
        searchQuery: "Toyuq çörək Şaurma food photography close up",
        image: ""
      },
      {
        name: "Toyuq lavaş",
        price: 3.7,
        searchQuery: "Toyuq lavaş Şaurma food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "pide",
    title: "Pide",
    items: [
      {
        name: "Pendirli",
        price: 5.5,
        searchQuery: "Pendirli Pide food photography close up",
        image: "/images/menu/pendirli-pide.jpg"
      },
      {
        name: "Qarışıq",
        price: 8.9,
        searchQuery: "Qarışıq Pide food photography close up",
        image: "/images/menu/qarisiq-pide.jpg"
      },
      {
        name: "Qiyməli",
        price: 6.9,
        searchQuery: "Qiyməli Pide food photography close up",
        image: "/images/menu/qiymeli-pide.jpg"
      }
    ]
  },
  {
    id: "lahmacun",
    title: "Lahmacun",
    items: [
      {
        name: "Sadə",
        price: 3.5,
        searchQuery: "Sadə Lahmacun food photography close up",
        image: "/images/menu/sade-lahmacun.jpg"
      },
      {
        name: "Acılı",
        price: 3.5,
        searchQuery: "Acılı Lahmacun food photography close up",
        image: "/images/menu/acili-lahmacun.jpg"
      },
      {
        name: "Pendirli",
        price: 4,
        searchQuery: "Pendirli Lahmacun food photography close up",
        image: "/images/menu/pendirli-lahmacun.jpg"
      }
    ]
  },
  {
    id: "pizza",
    title: "Pizza",
    items: [
      {
        name: "Margarita 32sm",
        price: 10,
        searchQuery: "Margarita 32sm Pizza food photography close up",
        image: "/images/menu/pizza-margarita.jpg"
      },
      {
        name: "Toyuqlu 32sm",
        price: 11.5,
        searchQuery: "Toyuqlu 32sm Pizza food photography close up",
        image: "/images/menu/pizza-toyuqlu.jpg"
      },
      {
        name: "Sucuklu 32sm",
        price: 12,
        searchQuery: "Sucuklu 32sm Pizza food photography close up",
        image: "/images/menu/pizza-sucuklu.jpg"
      },
      {
        name: "BBQ toyuqlu 32sm",
        price: 12.9,
        searchQuery: "BBQ toyuqlu 32sm Pizza food photography close up",
        image: ""
      },
      {
        name: "Sezar 32sm",
        price: 13,
        searchQuery: "Sezar 32sm Pizza food photography close up",
        image: "/images/menu/pizza-sezar.jpg"
      },
      {
        name: "Qarışıq 32sm",
        price: 14,
        searchQuery: "Qarışıq 32sm Pizza food photography close up",
        image: "/images/menu/pizza-qarisiq.jpg"
      }
    ]
  },
  {
    id: "salads",
    title: "Salatlar",
    items: [
      {
        name: "Sezar",
        price: 10.9,
        tags: [
          "popular"
        ],
        searchQuery: "Sezar Salatlar food photography close up",
        image: ""
      },
      {
        name: "Tuna",
        price: 9.5,
        tags: [
          "popular"
        ],
        searchQuery: "Tuna Salatlar food photography close up",
        image: ""
      },
      {
        name: "Toyuq",
        price: 4.5,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Toyuq Salatlar food photography close up",
        image: "/images/menu/toyuq-salad.jpg"
      },
      {
        name: "Paytaxt",
        price: 4,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Paytaxt Salatlar food photography close up",
        image: ""
      },
      {
        name: "Bakı",
        price: 4,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Bakı Salatlar food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "soups",
    title: "Şorbalar",
    items: [
      {
        name: "Mərci şorbası",
        price: 3.5,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Mərci şorbası Şorbalar food photography close up",
        image: "/images/menu/merci-sorbasi.jpg"
      },
      {
        name: "Tomat şorbası",
        price: 4.5,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Tomat şorbası Şorbalar food photography close up",
        image: ""
      },
      {
        name: "Göbələk şorbası",
        price: 4.5,
        tags: [
          "vegetarian"
        ],
        searchQuery: "Göbələk şorbası Şorbalar food photography close up",
        image: "/images/menu/gobarak-sorbasi.jpg"
      },
      {
        name: "Toyuq şorbası",
        price: 4.5,
        tags: [
          "popular"
        ],
        searchQuery: "Toyuq şorbası Şorbalar food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "breakfast",
    title: "Səhər Yeməkləri",
    items: [
      {
        name: "Pomidor yumurta",
        price: 3.9,
        searchQuery: "Pomidor yumurta Səhər Yeməkləri food photography close up",
        image: ""
      },
      {
        name: "Sucuklu yumurta",
        price: 4.5,
        searchQuery: "Sucuklu yumurta Səhər Yeməkləri food photography close up",
        image: ""
      },
      {
        name: "Kükü",
        price: 3.5,
        searchQuery: "Kükü Səhər Yeməkləri food photography close up",
        image: ""
      },
      {
        name: "Pendirli omlet",
        price: 4.5,
        searchQuery: "Pendirli omlet Səhər Yeməkləri food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "teas",
    title: "Çaylar",
    items: [
      {
        name: "Çaynik çay (qara) 600ml",
        price: 6,
        searchQuery: "Çaynik çay (qara) 600ml Çaylar food photography close up",
        image: ""
      },
      {
        name: "Çaynik çay (yaşıl) 600ml",
        price: 6,
        searchQuery: "Çaynik çay (yaşıl) 600ml Çaylar food photography close up",
        image: ""
      },
      {
        name: "Çaynik çay (ətirli) 600ml",
        price: 7,
        searchQuery: "Çaynik çay (ətirli) 600ml Çaylar food photography close up",
        image: ""
      },
      {
        name: "Fincan çay",
        price: 2.5,
        searchQuery: "Fincan çay Çaylar food photography close up",
        image: "/images/menu/fincan-cay.jpg"
      },
      {
        name: "Fincan çay coco",
        price: 3,
        searchQuery: "Fincan çay coco Çaylar food photography close up",
        image: ""
      },
      {
        name: "Mərakeş çayı",
        price: 7,
        searchQuery: "Mərakeş çayı Çaylar food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "cold-coffee",
    title: "Soyuq Qəhvələr",
    items: [
      {
        name: "Ice Americano",
        price: 5,
        searchQuery: "Ice Americano Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Ice Cappuccino",
        price: 6.5,
        searchQuery: "Ice Cappuccino Soyuq Qəhvələr food photography close up",
        image: "/images/menu/ice-cappuccino.jpg"
      },
      {
        name: "Ice Latte",
        price: 7,
        searchQuery: "Ice Latte Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Ice Spanish Latte",
        price: 7.5,
        searchQuery: "Ice Spanish Latte Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Ice Oreo Latte",
        price: 8.5,
        searchQuery: "Ice Oreo Latte Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Ice Raff",
        price: 7.5,
        searchQuery: "Ice Raff Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Ice White Mocha",
        price: 7.5,
        searchQuery: "Ice White Mocha Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Frappuccino",
        price: 7.5,
        searchQuery: "Frappuccino Soyuq Qəhvələr food photography close up",
        image: "/images/menu/frappuccino.jpg"
      },
      {
        name: "Till The End",
        price: 8,
        searchQuery: "Till The End Soyuq Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Extra Syrup",
        price: 1,
        searchQuery: "Extra Syrup Soyuq Qəhvələr food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "hot-coffee",
    title: "İsti Qəhvələr",
    items: [
      {
        name: "Espresso Single 30ml",
        price: 3.5,
        searchQuery: "Espresso Single 30ml İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Espresso Double 60ml",
        price: 4,
        searchQuery: "Espresso Double 60ml İsti Qəhvələr food photography close up",
        image: "/images/menu/espresso-double.jpg"
      },
      {
        name: "Americano",
        price: 4.5,
        searchQuery: "Americano İsti Qəhvələr food photography close up",
        image: "/images/menu/americano.jpg"
      },
      {
        name: "Lungo",
        price: 4.5,
        searchQuery: "Lungo İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Cortado",
        price: 5.5,
        searchQuery: "Cortado İsti Qəhvələr food photography close up",
        image: "/images/menu/cortado.jpg"
      },
      {
        name: "Cappuccino",
        price: 6,
        searchQuery: "Cappuccino İsti Qəhvələr food photography close up",
        image: "/images/menu/cappuccino.jpg"
      },
      {
        name: "Latte",
        price: 6.5,
        searchQuery: "Latte İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Spanish Latte",
        price: 7.7,
        searchQuery: "Spanish Latte İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Raff",
        price: 7.7,
        searchQuery: "Raff İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Flat White",
        price: 6.5,
        searchQuery: "Flat White İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Mocha",
        price: 7,
        searchQuery: "Mocha İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Türk qəhvəsi",
        price: 4.5,
        searchQuery: "Türk qəhvəsi İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Hot Chocolate",
        price: 6.5,
        searchQuery: "Hot Chocolate İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Creme Brulee Latte",
        price: 7,
        searchQuery: "Creme Brulee Latte İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "White Mocha",
        price: 7,
        searchQuery: "White Mocha İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Matcha Latte",
        price: 8,
        searchQuery: "Matcha Latte İsti Qəhvələr food photography close up",
        image: ""
      },
      {
        name: "Extra Syrup",
        price: 1,
        searchQuery: "Extra Syrup İsti Qəhvələr food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "milkshake",
    title: "Milkshake",
    items: [
      {
        name: "Sadə",
        price: 7,
        searchQuery: "Sadə Milkshake food photography close up",
        image: ""
      },
      {
        name: "Şokolad",
        price: 8,
        searchQuery: "Şokolad Milkshake food photography close up",
        image: ""
      },
      {
        name: "Meyvəli",
        price: 8,
        searchQuery: "Meyvəli Milkshake food photography close up",
        image: ""
      },
      {
        name: "Bubblegum",
        price: 8,
        searchQuery: "Bubblegum Milkshake food photography close up",
        image: "/images/menu/bubblegum.jpg"
      },
      {
        name: "Oreo",
        price: 8,
        searchQuery: "Oreo Milkshake food photography close up",
        image: "/images/menu/oreo.jpg"
      }
    ]
  },
  {
    id: "cocktails",
    title: "Coctails",
    items: [
      {
        name: "Mojito",
        price: 7,
        searchQuery: "Mojito Coctails food photography close up",
        image: ""
      },
      {
        name: "Mojito Energy",
        price: 8,
        searchQuery: "Mojito Energy Coctails food photography close up",
        image: ""
      },
      {
        name: "Tropic Punch",
        price: 8,
        searchQuery: "Tropic Punch Coctails food photography close up",
        image: ""
      },
      {
        name: "Barbie",
        price: 8,
        searchQuery: "Barbie Coctails food photography close up",
        image: ""
      },
      {
        name: "Blue Star",
        price: 8,
        searchQuery: "Blue Star Coctails food photography close up",
        image: "/images/menu/blue-star.jpg"
      },
      {
        name: "Sunset",
        price: 8,
        searchQuery: "Sunset Coctails food photography close up",
        image: ""
      },
      {
        name: "Special",
        price: 9,
        searchQuery: "Special Coctails food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "cold-drinks",
    title: "Soyuq İçkilər",
    items: [
      {
        name: "Cola 300ml",
        price: 1,
        searchQuery: "Cola 300ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Fanta 300ml",
        price: 1,
        searchQuery: "Fanta 300ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Pepsi 250ml",
        price: 1,
        searchQuery: "Pepsi 250ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Pepsi 200ml",
        price: 1,
        searchQuery: "Pepsi 200ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Pepsi 500ml",
        price: 2,
        searchQuery: "Pepsi 500ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Pepsi Zero 500ml",
        price: 2,
        searchQuery: "Pepsi Zero 500ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Pepsi Zero 250ml",
        price: 2,
        searchQuery: "Pepsi Zero 250ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Cola 330ml",
        price: 3,
        searchQuery: "Cola 330ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Fanta 330ml",
        price: 3,
        searchQuery: "Fanta 330ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Sprite 330ml",
        price: 3,
        searchQuery: "Sprite 330ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Fuse Tea 330ml",
        price: 3,
        searchQuery: "Fuse Tea 330ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Lipton 330ml",
        price: 3,
        searchQuery: "Lipton 330ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Sarıkız 250ml",
        price: 3,
        searchQuery: "Sarıkız 250ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Meyvə şirəsi 200ml",
        price: 1.5,
        searchQuery: "Meyvə şirəsi 200ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Meyvə şirəsi 350ml",
        price: 3,
        searchQuery: "Meyvə şirəsi 350ml Soyuq İçkilər food photography close up",
        image: ""
      },
      {
        name: "Ayran 180ml",
        price: 0.8,
        searchQuery: "Ayran 180ml Soyuq İçkilər food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "desserts",
    title: "Desertlər",
    items: [
      {
        name: "Tiramisu",
        price: 6.5,
        tags: [
          "popular"
        ],
        searchQuery: "Tiramisu Desertlər food photography close up",
        image: ""
      },
      {
        name: "Quş südü",
        price: 6.5,
        tags: [
          "popular"
        ],
        searchQuery: "Quş südü Desertlər food photography close up",
        image: ""
      },
      {
        name: "Mognoliya çiyələk",
        price: 7,
        tags: [
          "new"
        ],
        searchQuery: "Mognoliya çiyələk Desertlər food photography close up",
        image: ""
      },
      {
        name: "Mognoliya caramel brownie",
        price: 7,
        tags: [
          "new"
        ],
        searchQuery: "Mognoliya caramel brownie Desertlər food photography close up",
        image: ""
      },
      {
        name: "Dondurma 3 top",
        price: 5,
        searchQuery: "Dondurma 3 top Desertlər food photography close up",
        image: ""
      },
      {
        name: "Dondurma 4 top",
        price: 6,
        searchQuery: "Dondurma 4 top Desertlər food photography close up",
        image: ""
      },
      {
        name: "Kruassan şokoladlı",
        price: 5.5,
        searchQuery: "Kruassan şokoladlı Desertlər food photography close up",
        image: ""
      },
      {
        name: "Kruassan badamlı",
        price: 5.5,
        searchQuery: "Kruassan badamlı Desertlər food photography close up",
        image: ""
      },
      {
        name: "Kruassan moruqlu",
        price: 5.5,
        searchQuery: "Kruassan moruqlu Desertlər food photography close up",
        image: ""
      },
      {
        name: "Künəfə sadə",
        price: 6,
        searchQuery: "Künəfə sadə Desertlər food photography close up",
        image: ""
      },
      {
        name: "Künəfə qaymaqlı",
        price: 7,
        searchQuery: "Künəfə qaymaqlı Desertlər food photography close up",
        image: ""
      },
      {
        name: "Künəfə dondurmalı",
        price: 7,
        searchQuery: "Künəfə dondurmalı Desertlər food photography close up",
        image: ""
      },
      {
        name: "Waffle çiyələkli",
        price: 8,
        searchQuery: "Waffle çiyələkli Desertlər food photography close up",
        image: ""
      },
      {
        name: "Waffle bananlı",
        price: 8,
        searchQuery: "Waffle bananlı Desertlər food photography close up",
        image: ""
      },
      {
        name: "Waffle mix",
        price: 8,
        searchQuery: "Waffle mix Desertlər food photography close up",
        image: ""
      },
      {
        name: "Plitka şokolad",
        price: 5.5,
        searchQuery: "Plitka şokolad Desertlər food photography close up",
        image: ""
      },
      {
        name: "Muffin",
        price: 5,
        searchQuery: "Muffin Desertlər food photography close up",
        image: "/images/menu/muffin.jpg"
      },
      {
        name: "San Sebastian",
        price: 6.5,
        searchQuery: "San Sebastian Desertlər food photography close up",
        image: "/images/menu/san-sebastian.jpg"
      },
      {
        name: "San Sebastian Brownie",
        price: 6.5,
        searchQuery: "San Sebastian Brownie Desertlər food photography close up",
        image: ""
      },
      {
        name: "Lotus Cheesecake",
        price: 6.5,
        searchQuery: "Lotus Cheesecake Desertlər food photography close up",
        image: ""
      },
      {
        name: "Raspberry Cheesecake",
        price: 6.5,
        searchQuery: "Raspberry Cheesecake Desertlər food photography close up",
        image: ""
      },
      {
        name: "Chocolate Cheesecake",
        price: 6.5,
        searchQuery: "Chocolate Cheesecake Desertlər food photography close up",
        image: "/images/menu/chocolate-cheesecake.jpg"
      },
      {
        name: "Strawberry Cheesecake",
        price: 6.5,
        searchQuery: "Strawberry Cheesecake Desertlər food photography close up",
        image: ""
      },
      {
        name: "Limon Cheesecake",
        price: 6.5,
        searchQuery: "Limon Cheesecake Desertlər food photography close up",
        image: "/images/menu/limon-cheesecake.jpg"
      },
      {
        name: "Oreo Cheesecake",
        price: 6.5,
        searchQuery: "Oreo Cheesecake Desertlər food photography close up",
        image: ""
      },
      {
        name: "Almond Raspberry Cake",
        price: 6.5,
        searchQuery: "Almond Raspberry Cake Desertlər food photography close up",
        image: ""
      },
      {
        name: "Nutella Tart",
        price: 7,
        searchQuery: "Nutella Tart Desertlər food photography close up",
        image: "/images/menu/nutella-tart.jpg"
      },
      {
        name: "Honey Cake",
        price: 6.5,
        searchQuery: "Honey Cake Desertlər food photography close up",
        image: "/images/menu/honey-cake.jpg"
      },
      {
        name: "Napoleon",
        price: 6.5,
        searchQuery: "Napoleon Desertlər food photography close up",
        image: "/images/menu/napoleon.jpg"
      },
      {
        name: "Red Velvet",
        price: 6.5,
        searchQuery: "Red Velvet Desertlər food photography close up",
        image: ""
      },
      {
        name: "Red Velvet Pistachio",
        price: 6.5,
        searchQuery: "Red Velvet Pistachio Desertlər food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "diet-desserts",
    title: "Diet Desertlər",
    items: [
      {
        name: "Black Forest Diet",
        price: 7.5,
        searchQuery: "Black Forest Diet Diet Desertlər food photography close up",
        image: ""
      },
      {
        name: "Raspberry Crep Diet",
        price: 7.5,
        searchQuery: "Raspberry Crep Diet Diet Desertlər food photography close up",
        image: ""
      },
      {
        name: "San Sebastian Diet",
        price: 7.5,
        searchQuery: "San Sebastian Diet Diet Desertlər food photography close up",
        image: ""
      },
      {
        name: "Caramel Cheesecake Diet",
        price: 7.5,
        searchQuery: "Caramel Cheesecake Diet Diet Desertlər food photography close up",
        image: ""
      },
      {
        name: "Blueberry Crep Diet",
        price: 7.5,
        searchQuery: "Blueberry Crep Diet Diet Desertlər food photography close up",
        image: "/images/menu/blueberry-crep-diet.jpg"
      },
      {
        name: "Chocolate Crep Diet",
        price: 7.5,
        searchQuery: "Chocolate Crep Diet Diet Desertlər food photography close up",
        image: "/images/menu/chocolate-crep-diet.jpg"
      },
      {
        name: "Chocolate Mousse Diet",
        price: 7.5,
        searchQuery: "Chocolate Mousse Diet Diet Desertlər food photography close up",
        image: ""
      }
    ]
  },
  {
    id: "lunch-combo",
    title: "Lunch / Kombo Menyular",
    items: [
      {
        name: "Mərci Lunch (ət və ya toyuq çörəkdə, seçim müştərinindir + 1 ədəd ayran)",
        price: 5.99,
        note: "set",
        searchQuery: "Mərci Lunch (ət və ya toyuq çörəkdə, seçim müştərinindir + 1 ədəd ayran) Lunch / Kombo Menyular food photography close up",
        image: ""
      },
      {
        name: "Kombo Toyuq (Cheeseburger toyuq + kartof fri + naqets + Pepsi 250ml)",
        price: 13.99,
        note: "set",
        searchQuery: "Kombo Toyuq (Cheeseburger toyuq + kartof fri + naqets + Pepsi 250ml) Lunch / Kombo Menyular food photography close up",
        image: ""
      },
      {
        name: "Kombo Ət (Cheeseburger ət + kartof fri + naqets + Pepsi 250ml)",
        price: 15.5,
        note: "set",
        searchQuery: "Kombo Ət (Cheeseburger ət + kartof fri + naqets + Pepsi 250ml) Lunch / Kombo Menyular food photography close up",
        image: ""
      },
      {
        name: "Ailə Menyusu (1 ədəd 32sm pizza + 2 kartof fri + 2 naqets + 4 burger [2 toyuq, 2 ət] + 4 içki)",
        price: 49.99,
        note: "set",
        searchQuery: "Ailə Menyusu (1 ədəd 32sm pizza + 2 kartof fri + 2 naqets + 4 burger [2 toyuq, 2 ət] + 4 içki) Lunch / Kombo Menyular food photography close up",
        image: ""
      },
      {
        name: "Uşaq Menyusu 1 (kartof fri + naqets + mini burger ət + çöplü sok)",
        price: 9.5,
        note: "set",
        searchQuery: "Uşaq Menyusu 1 (kartof fri + naqets + mini burger ət + çöplü sok) Lunch / Kombo Menyular food photography close up",
        image: ""
      },
      {
        name: "Uşaq Menyusu 2 (kartof fri + naqets + mini burger toyuq + çöplü sok)",
        price: 8.5,
        note: "set",
        searchQuery: "Uşaq Menyusu 2 (kartof fri + naqets + mini burger toyuq + çöplü sok) Lunch / Kombo Menyular food photography close up",
        image: ""
      }
    ]
  }
];
