/* data.js — Inhalte: Portfolio, Preisliste, Buchungs-Leistungen
   Preise 1:1 von der Salon-Tafel (Damen / Herren / Weitere / Kinder). */

/* Portfolio gallery — caption + image + tall flag for masonry rhythm */
const PORTFOLIO = [
  { img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&h=1100&q=80", cap: "Soft Balayage",   tall: true },
  { img: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=700&h=700&q=80",  cap: "Curtain Bangs" },
  { img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&h=700&q=80",  cap: "Warm Blonde" },
  { img: "https://images.unsplash.com/photo-1554519515-242161756769?auto=format&fit=crop&w=700&h=700&q=80",     cap: "Sleek Bob" },
  { img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&h=1100&q=80", cap: "Beach Waves",     tall: true },
  { img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=700&h=700&q=80",  cap: "Natural Brunette" },
];

/* PRICE LIST — exact from salon board.
   group.cols non-empty → matrix (kurz/mittel/lang); empty → single price */
const PRICES = {
  damen: {
    label: "Damen",
    groups: [
      {
        cols: ["kurz", "mittel", "lang"],
        rows: [
          { name: "Schneiden", vals: ["23 €", "25 €", "27 €"] },
          { name: "Waschen · Schneiden · selbst föhnen", vals: ["25 €", "27 €", "29 €"] },
          { name: "Waschen · Föhnen", vals: ["25 €", "27 €", "29 €"] },
          { name: "Waschen · Schneiden · Föhnen", vals: ["35 €", "39 €", "43 €"] },
        ],
      },
      {
        cols: ["kurz", "mittel", "lang"],
        rows: [
          { name: "Färben", note: "komplett", vals: ["40 €", "45 €", "55 €"] },
          { name: "Färben", note: "Ansatz", vals: ["34 €", "36 €", "38 €"] },
          { name: "Dauerwelle", vals: ["42 €", "55 €", "62 €"] },
          { name: "Hochsteckfrisur", vals: ["40 €", "60 €", "70 €"] },
          { name: "Keratin-Glättung", vals: ["150 €", "200 €", "250 €"] },
        ],
      },
      {
        cols: [],
        rows: [
          { name: "Glossing", vals: ["ab 20 €"], single: true },
          { name: "Foliensträhnen", note: "pro Strähne", vals: ["ab 2 – 3 €"], single: true },
          { name: "Balayage", vals: ["150 – 200 €"], single: true },
        ],
      },
    ],
    note: "Haarverlängerung nach Absprache.",
  },
  herren: {
    label: "Herren",
    groups: [
      {
        cols: [],
        rows: [
          { name: "Schneiden · Stylen", vals: ["20 €"], single: true },
          { name: "Waschen · Schneiden · Stylen", vals: ["22 €"], single: true },
          { name: "Bartrasur", vals: ["7 €"], single: true },
          { name: "Maschinenschnitt", vals: ["14 €"], single: true },
          { name: "Coloration · Farbe", vals: ["30 €"], single: true },
        ],
      },
    ],
    note: "Ohne Termin willkommen — mit Termin garantiert dran.",
  },
  weitere: {
    label: "Weitere Leistungen",
    groups: [
      {
        cols: [],
        rows: [
          { name: "Gesichtshaarentfernung mit Faden", vals: ["17 €"], single: true },
          { name: "Augenbrauen zupfen", vals: ["9 €"], single: true },
          { name: "Oberlippe oder Kinn mit Faden", vals: ["5 €"], single: true },
          { name: "Wimpern · Augenbrauen färben", vals: ["9 €"], single: true },
          { name: "Kur", vals: ["8 €"], single: true },
          { name: "Pony schneiden", vals: ["ab 5 €"], single: true },
        ],
      },
    ],
    note: "",
  },
  kinder: {
    label: "Kinder",
    groups: [
      {
        cols: [],
        rows: [
          { name: "Jungen", note: "bis 10 Jahre", vals: ["16 €"], single: true },
          { name: "Mädchen", note: "bis 10 Jahre", vals: ["16 €"], single: true },
        ],
      },
    ],
    note: "",
  },
};

const PRICE_TABS = ["damen", "herren", "weitere", "kinder"];

/* booking flow — flat services list */
const BOOK_SERVICES = [
  "Schneiden (Damen)",
  "Waschen · Schneiden · Föhnen",
  "Herren · Schneiden · Stylen",
  "Bartrasur",
  "Färben / Coloration",
  "Foliensträhnen / Balayage",
  "Dauerwelle",
  "Hochsteckfrisur",
  "Augenbrauen / Beauty",
  "Kinderschnitt",
];

/* recipient for the booking request mail */
const BOOKING_EMAIL = "hallo@side-muenster.de";
