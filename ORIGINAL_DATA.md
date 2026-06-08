# ORIGINAL DATA — interne Notiz (NICHT veröffentlichen)

Diese Datei dokumentiert die **ursprünglichen, echten Unternehmensdaten**, die
in der gesamten Website durch Beispiel-Platzhalter ersetzt wurden, solange der
eigentliche Käufer die Übernahme noch nicht final bestätigt hat.

Wenn die Übernahme bestätigt ist, einfach die Werte unten 1:1 wieder einsetzen
(Suchen-und-Ersetzen über alle Dateien — Mapping siehe unten).

> Diese Datei ist über `.vercelignore` vom Deployment ausgeschlossen und wird
> nicht öffentlich ausgeliefert. Bitte auch **nicht** in eine öffentlich
> erreichbare Doku übernehmen.

---

## 1) Original-Werte (vorher)

| Feld | Originalwert |
|---|---|
| Firmenname / Marke | `SIDE Haarstudio Münster` (auch: `Side Haarstudio`, `SIDE`) |
| Straße | `Aegidiistraße 17` |
| PLZ + Ort | `48143 Münster` |
| Bundesland | `Nordrhein-Westfalen` (Region-Code: `DE-NW`) |
| Telefon (Anzeige) | `0251 42554` |
| Telefon (tel:) | `+4925142554` / `+49 251 42554` |
| E-Mail | `info@side-haarstudio-muenster.de` |
| WhatsApp-Nummer (wa.me) | `4917660847103` |
| Domain | `www.side-haarstudio-muenster.de` |
| Geo Breitengrad | `51.959` |
| Geo Längengrad | `7.624` |
| Google-Bewertung | `4.2` / `4,2` |
| Anzahl Google-Reviews | `48` |
| Reviewer 1 | `Valerie Martinez` — 5★ — "Gute Beratung und sehr gute Umsetzung meiner Wunschfrisur." |
| Reviewer 2 | `S H` — 5★ — "Sehr nett, guter Schnitt, preislich sehr fair." |
| Reviewer 3 | `Gunda` — 5★ — "Freundliche und schnelle Bedienung." |
| Zuständige Kammer (Impressum) | `Handwerkskammer Münster` |
| Aufsichtsbehörde (Datenschutz) | `LDI NRW` (Landesbeauftragte NRW) |
| Jahre am Ort (Studio-Stat) | `15+ Jahre Münster` |

## 2) Aktuelle Platzhalter (nachher)

| Feld | Platzhalter |
|---|---|
| Firmenname / Marke | `Muster Haarstudio` (Kurz: `MUSTER`) |
| Straße | `Musterstraße 1` |
| PLZ + Ort | `12345 Musterstadt` |
| Bundesland | `Musterland` (Region-Code: `DE-BE`) |
| Telefon (Anzeige) | `030 1234567` |
| Telefon (tel:) | `+4930123456789` / `+49 30 1234567` |
| E-Mail | `info@muster-haarstudio.de` |
| WhatsApp-Nummer (wa.me) | `4915123456789` |
| Domain | `www.muster-haarstudio.de` |
| Geo Breitengrad | `52.520` |
| Geo Längengrad | `13.405` |
| Google-Bewertung | `4.5` / `4,5` |
| Anzahl Google-Reviews | `25` |
| Reviewer 1 | `Anna B.` — 5★ — "Tolle Beratung und super Ergebnis." |
| Reviewer 2 | `M. K.` — 5★ — "Freundlich, fair, sehr zu empfehlen." |
| Reviewer 3 | `Lisa M.` — 5★ — "Schneller Termin, perfekter Schnitt." |
| Zuständige Kammer (Impressum) | `Handwerkskammer [Musterstadt]` |
| Aufsichtsbehörde (Datenschutz) | `[zuständige Landesbeauftragte für Datenschutz]` |
| Jahre am Ort (Studio-Stat) | `10+ Jahre vor Ort` |

## 3) Restore-Anleitung (Original wiederherstellen)

In allen Dateien ersetzen (case-sensitive, in dieser Reihenfolge):

```
Muster Haarstudio       → SIDE Haarstudio Münster   (Brand, Titel)
Muster Haarstudio       → Side Haarstudio           (Impressum/Datenschutz/AGB)
MUSTER                  → SIDE                      (Kurz-Brand)
muster-haarstudio.de    → side-haarstudio-muenster.de
info@muster-haarstudio.de → info@side-haarstudio-muenster.de
Musterstraße 1          → Aegidiistraße 17
12345 Musterstadt       → 48143 Münster
Musterland              → Nordrhein-Westfalen
DE-BE                   → DE-NW
030 1234567             → 0251 42554
+4930123456789          → +4925142554
+49 30 1234567          → +49 251 42554
4915123456789           → 4917660847103   (WhatsApp wa.me)
52.520                  → 51.959           (lat)
13.405                  → 7.624            (lon)
4.5  / 4,5              → 4.2  / 4,2       (Rating — Vorsicht: auch JSON-LD und CSS-Variable für Stern-Füllung %)
25                      → 48               (reviewCount)
"--fill:90%"            → "--fill:84%"     (Stern-Füllung in index.html)
Anna B. / M. K. / Lisa M. → Valerie Martinez / S H / Gunda  (data.js REVIEWS)
Handwerkskammer [Musterstadt] → Handwerkskammer Münster
10+ Jahre vor Ort       → 15+ Jahre Münster
```

Dateien mit Platzhaltern: `index.html`, `impressum.html`, `datenschutz.html`,
`agb.html`, `data.js`, `app.js`, `sitemap.xml`, `robots.txt`, `README.md`.
