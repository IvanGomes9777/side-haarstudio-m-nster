# Muster Haarstudio (Demo / Vorlage)

Website-Template für einen Friseur-Salon — warmer, edler Auftritt
(Braun/Creme, Serifen-Headlines). Umgesetzt als schlanke, **build-freie
statische Website** (reines HTML/CSS/JS, keine Abhängigkeiten, kein
Build-Schritt) — direkt deploybar, z. B. über Vercel oder GitHub Pages.

> **Hinweis:** Alle Unternehmensdaten (Name, Adresse, Telefon, E-Mail,
> Domain, WhatsApp, Bewertungen) sind aktuell **Beispieldaten**
> („Muster Haarstudio", „Musterstraße 1, 12345 Musterstadt" usw.) und
> müssen vor dem Go-Live durch die echten Daten ersetzt werden.
> Die ursprünglichen Werte sind intern in `ORIGINAL_DATA.md` dokumentiert
> (vom Deploy via `.vercelignore` ausgeschlossen).

## Inhalt der Seite

- **Hero** – „Modernes Haar, natürlich schön." mit Bild-Overlay und CTAs
- **Leistungen** – Damen · Herren · Color · Beauty
- **Studio / Über uns** – Vorstellung des Salons + Stats
- **Portfolio** – Galerie mit Lightbox (Klick/Pfeiltasten/ESC)
- **Preise** – Tabs Damen / Herren / Weitere / Kinder, Preisliste 1:1 von der Salon-Tafel
- **Kontakt** – Adresse, Telefon, Öffnungszeiten, Mail- & Anruf-Buttons
- **Buchungs-Flow** – mehrstufige Terminanfrage (Leistung → Termin → Kontakt),
  öffnet am Ende das E-Mail-Programm mit fertig formatierter Anfrage

## Dateien

| Datei         | Inhalt |
|---------------|--------|
| `index.html`  | Seitenstruktur / Markup |
| `styles.css`  | Designsystem (Farben, Typografie, Sektionen, Container-Queries) |
| `booking.css` | Buchungs-Modal |
| `data.js`     | Inhalte: Portfolio, Preisliste, Buchungs-Leistungen |
| `app.js`      | Interaktivität: Reveal, Navigation, Lightbox, Preis-Tabs, Buchung |

## Lokal ansehen

Einfach `index.html` im Browser öffnen — oder mit einem kleinen Server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Anpassen (Platzhalter)

Echte Daten ersetzen in `index.html` → Sektion `#kontakt` und Footer:

- **Telefon** (`tel:` Link und Anzeige)
- **Adresse**
- **E-Mail** — auch in `data.js` als `BOOKING_EMAIL` (Empfänger der Terminanfrage)

Bilder sind Beispielfotos (Unsplash) und lassen sich in `index.html` / `data.js`
gegen eigene Salon-Fotos austauschen.

Akzentfarbe und Dichte zentral in `styles.css` über `--accent` und `--space`.
