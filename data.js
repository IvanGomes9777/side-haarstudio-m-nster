/* data.js — Inhalte: Portfolio, Preisliste, Buchungs-Leistungen
   Preise 1:1 von der Salon-Tafel (Damen / Herren / Weitere / Kinder). */

/* Portfolio gallery — caption + image + tall flag for masonry rhythm */
const PORTFOLIO = [
  { img: "images/portfolio-balayage.jpg",       cap: "Soft Balayage",   tall: true },
  { img: "images/portfolio-curtain-bangs.jpg",  cap: "Curtain Bangs" },
  { img: "images/portfolio-warm-blonde.jpg",    cap: "Warm Blonde" },
  { img: "images/portfolio-sleek-bob.jpg",      cap: "Sleek Bob" },
  { img: "images/portfolio-beach-waves.jpg",    cap: "Beach Waves",     tall: true },
  { img: "images/portfolio-natural-brunette.jpg", cap: "Natural Brunette" },
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

/* recipient for the booking request mail (placeholder — replace with the salon's
   real address before go-live). */
const BOOKING_EMAIL = "info@muster-haarstudio.de";

/* Opening hours — indexed by JS getDay() (0 = Sunday … 6 = Saturday).
   Minutes since midnight (Europe/Berlin local time). */
const HOURS_SCHEDULE = [
  { label: "Sonntag",    open: null, close: null }, // 0
  { label: "Montag",     open:  540, close: 1140 }, // 1  09:00–19:00
  { label: "Dienstag",   open:  540, close: 1080 }, // 2  09:00–18:00
  { label: "Mittwoch",   open:  540, close: 1080 }, // 3  09:00–18:00
  { label: "Donnerstag", open:  540, close: 1080 }, // 4  09:00–18:00
  { label: "Freitag",    open:  540, close: 1140 }, // 5  09:00–19:00
  { label: "Samstag",    open:  540, close:  960 }, // 6  09:00–16:00
];

/* Google reviews — Beispieldaten (vor Go-Live durch echte Auszüge ersetzen). */
const GOOGLE_RATING = 4.5;
const GOOGLE_REVIEW_COUNT = 25;
const REVIEWS = [
  { name: "Anna B.",  stars: 5, quote: "Tolle Beratung und super Ergebnis." },
  { name: "M. K.",    stars: 5, quote: "Freundlich, fair, sehr zu empfehlen." },
  { name: "Lisa M.",  stars: 5, quote: "Schneller Termin, perfekter Schnitt." },
];
