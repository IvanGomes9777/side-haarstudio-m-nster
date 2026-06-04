/* app.js — SIDE Haarstudio Münster
   Vanilla JS: reveal-on-scroll, active nav, mobile menu, portfolio
   lightbox, price tabs, and the multi-step booking request modal. */
(function () {
  "use strict";

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  function setMenu(open) {
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    mobileMenu.hidden = !open;
  }
  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(mobileMenu.hidden);
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ---------- active nav highlight ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a[data-nav]"));
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute("data-nav")); })
    .filter(Boolean);
  if (sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("data-nav") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  function observeReveals(root) {
    var els = (root || document).querySelectorAll(".reveal:not(.in)");
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4 * 70) + "ms";
      io.observe(el);
    });
  }
  observeReveals(document);

  /* ---------- number counters (animate on first view) ---------- */
  function animateCounter(el) {
    if (el._counted) return;
    el._counted = true;
    var raw = el.getAttribute("data-counter");
    var target = parseFloat(raw);
    if (!isFinite(target)) return;
    var decimals = (raw.split(".")[1] || "").length;
    var suffix = el.getAttribute("data-counter-suffix") || "";
    var dur = 1200, t0 = performance.now();
    function tick(t) {
      var p = Math.min(1, (t - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var v = (target * eased).toFixed(decimals).replace(".", ",");
      el.textContent = v + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  (function () {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  })();

  /* ---------- opening hours: live "open / closed" status in Europe/Berlin ---------- */
  function berlinNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin", weekday: "short",
      hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    var dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var h = parseInt(get("hour"), 10) % 24;
    return { day: dayMap[get("weekday")], min: h * 60 + parseInt(get("minute"), 10) };
  }
  function fmtMin(m) {
    return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  }
  function computeStatus(now) {
    var today = HOURS_SCHEDULE[now.day];
    if (today.open != null && now.min >= today.open && now.min < today.close) {
      return { open: true, label: "Jetzt geöffnet · bis " + fmtMin(today.close) };
    }
    for (var i = 0; i < 7; i++) {
      var d = (now.day + i) % 7;
      var h = HOURS_SCHEDULE[d];
      if (h.open == null) continue;
      if (i === 0 && now.min < h.open) {
        return { open: false, label: "Geschlossen · öffnet heute " + fmtMin(h.open) };
      }
      if (i > 0) {
        var when = i === 1 ? "morgen" : h.label;
        return { open: false, label: "Geschlossen · öffnet " + when + " " + fmtMin(h.open) };
      }
    }
    return { open: false, label: "Geschlossen" };
  }
  function renderHours() {
    var listEl = document.getElementById("hoursList");
    var pillEl = document.getElementById("statusPill");
    if (!listEl || !pillEl) return;
    var now = berlinNow();
    var order = [1, 2, 3, 4, 5, 6, 0]; // Mo–So
    listEl.innerHTML = order.map(function (i) {
      var h = HOURS_SCHEDULE[i];
      var text = h.open == null ? "geschlossen" : fmtMin(h.open) + " – " + fmtMin(h.close);
      var cls = "hours-row" + (i === now.day ? " today" : "");
      return '<span class="' + cls + '"><span class="day">' + h.label + "</span><span>" + text + "</span></span>";
    }).join("");
    var s = computeStatus(now);
    pillEl.className = "status-pill " + (s.open ? "open" : "closed");
    pillEl.textContent = s.label;
  }
  renderHours();
  setInterval(renderHours, 60 * 1000); // refresh once a minute so status stays current

  /* ---------- reviews (Google) ---------- */
  (function () {
    var grid = document.getElementById("rvGrid");
    if (!grid) return;
    grid.innerHTML = REVIEWS.map(function (r, i) {
      var initial = (r.name.charAt(0) || "?").toUpperCase();
      var stars = "★★★★★".slice(0, Math.max(0, Math.min(5, r.stars || 5)));
      return '<article class="rv-card reveal" style="transition-delay:' + (i * 90) + 'ms">' +
        '<div class="rv-card-head">' +
          '<div class="rv-avatar" aria-hidden="true">' + initial + "</div>" +
          "<div><div class=\"rv-name\">" + r.name + "</div>" +
          '<div class="rv-stars-row" aria-label="' + r.stars + " von 5 Sternen\">" + stars + "</div></div>" +
        "</div>" +
        '<p class="rv-quote">„' + r.quote + "“</p>" +
        "</article>";
    }).join("");
    observeReveals(grid);
  })();

  /* ---------- portfolio + lightbox ---------- */
  var pfGrid = document.getElementById("pfGrid");
  if (pfGrid) {
    PORTFOLIO.forEach(function (p, i) {
      var fig = document.createElement("figure");
      fig.className = "pf-item reveal" + (p.tall ? " tall" : "");
      fig.style.transitionDelay = (i * 60) + "ms";
      fig.innerHTML = '<div class="media"><img src="' + p.img + '" alt="' + p.cap + '"></div>';
      fig.addEventListener("click", function () { openLightbox(i); });
      pfGrid.appendChild(fig);
    });
    observeReveals(pfGrid);
  }

  var lbRoot = document.getElementById("lightbox-root");
  var lbIndex = null;
  function renderLightbox() {
    if (lbIndex == null) { lbRoot.innerHTML = ""; return; }
    var p = PORTFOLIO[lbIndex];
    lbRoot.innerHTML =
      '<div class="lightbox">' +
      '  <div class="lb-stage">' +
      '    <button class="lb-close" aria-label="Schließen">✕</button>' +
      '    <button class="lb-nav lb-prev" aria-label="Zurück">‹</button>' +
      '    <button class="lb-nav lb-next" aria-label="Weiter">›</button>' +
      '    <div class="media"><img src="' + p.img + '" alt="' + p.cap + '"></div>' +
      '    <div class="lb-count">' + p.cap + " — " + (lbIndex + 1) + " / " + PORTFOLIO.length + "</div>" +
      "  </div>" +
      "</div>";
    lbRoot.querySelector(".lightbox").addEventListener("click", closeLightbox);
    lbRoot.querySelector(".lb-stage").addEventListener("click", function (e) { e.stopPropagation(); });
    lbRoot.querySelector(".lb-close").addEventListener("click", closeLightbox);
    lbRoot.querySelector(".lb-prev").addEventListener("click", function () { stepLightbox(-1); });
    lbRoot.querySelector(".lb-next").addEventListener("click", function () { stepLightbox(1); });
  }
  function openLightbox(i) { lbIndex = i; renderLightbox(); }
  function closeLightbox() { lbIndex = null; renderLightbox(); }
  function stepLightbox(d) {
    if (lbIndex == null) return;
    lbIndex = (lbIndex + d + PORTFOLIO.length) % PORTFOLIO.length;
    renderLightbox();
  }
  document.addEventListener("keydown", function (e) {
    if (lbIndex == null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* ---------- price tabs ---------- */
  var tabsEl = document.getElementById("priceTabs");
  var panelEl = document.getElementById("pricePanel");
  function renderPrices(tab) {
    var data = PRICES[tab];
    var html = "";
    data.groups.forEach(function (g, gi) {
      var hasCols = g.cols && g.cols.length > 0;
      html += "<div>";
      if (gi > 0 && hasCols) html += '<div class="price-sub">Color &amp; Treatment</div>';
      if (hasCols) {
        html += '<div class="price-colhead" style="--pc:' + g.cols.length + '"><span></span><div class="cols">';
        g.cols.forEach(function (c) { html += "<span>" + c + "</span>"; });
        html += "</div></div>";
      }
      g.rows.forEach(function (r) {
        var pc = hasCols ? g.cols.length : 1;
        html += '<div class="price-row" style="--pc:' + pc + '">';
        html += '<div class="name">' + r.name + (r.note ? '<em>(' + r.note + ")</em>" : "") + "</div>";
        html += '<div class="vals">';
        if (r.single) {
          html += '<span class="single">' + r.vals[0] + "</span>";
        } else {
          r.vals.forEach(function (v) { html += "<span>" + (v || "—") + "</span>"; });
        }
        html += "</div></div>";
      });
      html += "</div>";
    });
    if (data.note) html += '<p class="price-note">' + data.note + "</p>";
    html += '<div style="text-align:center;margin-top:28px"><button class="btn btn-solid" data-book>Jetzt Termin buchen</button></div>';
    panelEl.innerHTML = html;
  }
  if (tabsEl && panelEl) {
    PRICE_TABS.forEach(function (t, i) {
      var b = document.createElement("button");
      b.className = "price-tab" + (i === 0 ? " active" : "");
      b.textContent = PRICES[t].label;
      b.addEventListener("click", function () {
        tabsEl.querySelectorAll(".price-tab").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderPrices(t);
      });
      tabsEl.appendChild(b);
    });
    renderPrices(PRICE_TABS[0]);
  }

  /* ======================= BOOKING MODAL ======================= */
  var bkRoot = document.getElementById("booking-root");
  var TIMES = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];
  var WD = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  var MO = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  var STEPS = ["Leistung", "Termin", "Kontakt", "Fertig"];

  var bk = null; // active booking state, or null when closed

  function nextDays(n) {
    var out = [], d = new Date();
    for (var i = 0; i < n; i++) {
      var x = new Date(d); x.setDate(d.getDate() + i);
      out.push({ wd: WD[x.getDay()], day: x.getDate(), mo: MO[x.getMonth()], closed: x.getDay() === 0, key: x.toISOString().slice(0, 10) });
    }
    return out;
  }
  function fmtDay(key) {
    if (!key) return "";
    var p = key.split("-");
    return p[2] + "." + p[1] + "." + p[0];
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim()); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function openBooking(preset) {
    bk = { step: 0, svc: preset || null, day: null, time: null, form: { name: "", email: "", phone: "", note: "" } };
    document.body.style.overflow = "hidden";
    renderBooking();
  }
  function closeBooking() {
    bk = null;
    document.body.style.overflow = "";
    bkRoot.innerHTML = "";
  }
  function canNext() {
    if (!bk) return false;
    if (bk.step === 0) return !!bk.svc;
    if (bk.step === 1) return !!(bk.day && bk.time);
    if (bk.step === 2) return !!(bk.form.name.trim() && isEmail(bk.form.email));
    return true;
  }
  function go(d) { bk.step = Math.min(STEPS.length - 1, Math.max(0, bk.step + d)); renderBooking(); }

  function submitBooking() {
    var f = bk.form;
    var subj = "Terminanfrage · " + bk.svc;
    var lines = [
      "Hallo SIDE-Team,", "",
      "ich würde gern einen Termin anfragen:",
      "• Leistung: " + bk.svc,
      "• Wunschtag: " + fmtDay(bk.day),
      "• Uhrzeit: " + bk.time, "",
      "Meine Kontaktdaten:",
      "• Name: " + f.name,
      "• E-Mail: " + f.email,
      f.phone.trim() ? "• Telefon: " + f.phone : null,
      f.note.trim() ? "\nNachricht:\n" + f.note : null, "",
      "Viele Grüße", f.name,
    ].filter(Boolean).join("\n");
    window.location.href = "mailto:" + BOOKING_EMAIL +
      "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(lines);
    bk.step = 3;
    renderBooking();
  }

  function paneHtml() {
    var f = bk.form;
    if (bk.step === 0) {
      return '<div class="bk-pane"><h3 class="bk-q">Welche Leistung?</h3><div class="bk-chips">' +
        BOOK_SERVICES.map(function (s) {
          return '<button class="bk-chip' + (bk.svc === s ? " sel" : "") + '" data-svc="' + esc(s) + '">' + esc(s) + "</button>";
        }).join("") + "</div></div>";
    }
    if (bk.step === 1) {
      var days = nextDays(14).map(function (d) {
        return '<button class="bk-day' + (bk.day === d.key ? " sel" : "") + '"' + (d.closed ? " disabled" : "") +
          ' data-day="' + d.key + '"><small>' + d.wd + "</small><b>" + d.day + "</b><span>" + d.mo + "</span></button>";
      }).join("");
      var times = TIMES.map(function (t) {
        return '<button class="bk-time' + (bk.time === t ? " sel" : "") + '"' + (!bk.day ? " disabled" : "") +
          ' data-time="' + t + '">' + t + "</button>";
      }).join("");
      return '<div class="bk-pane"><h3 class="bk-q">Wann passt es dir?</h3><div class="bk-days">' + days +
        '</div><div class="bk-timelabel">Uhrzeit</div><div class="bk-times">' + times + "</div></div>";
    }
    if (bk.step === 2) {
      return '<div class="bk-pane"><h3 class="bk-q">Deine Kontaktdaten</h3>' +
        '<p class="bk-helper">Wir senden dir die Anfrage per E-Mail und melden uns kurz zur Bestätigung — per E-Mail oder, wenn du magst, per Telefon.</p>' +
        '<div class="bk-fields">' +
        '<label class="bk-field"><span>Name</span><input data-f="name" value="' + esc(f.name) + '" placeholder="Vor- und Nachname"></label>' +
        '<label class="bk-field"><span>E-Mail</span><input data-f="email" type="email" value="' + esc(f.email) + '" placeholder="name@beispiel.de"></label>' +
        '<label class="bk-field"><span>Telefon <em>(optional)</em></span><input data-f="phone" value="' + esc(f.phone) + '" placeholder="0251 …"></label>' +
        '<label class="bk-field"><span>Nachricht <em>(optional)</em></span><textarea data-f="note" rows="2" placeholder="Wünsche, Haarlänge …">' + esc(f.note) + "</textarea></label>" +
        "</div>" +
        '<div class="bk-summary bk-summary-inline"><div><span>Leistung</span><b>' + esc(bk.svc) + "</b></div>" +
        "<div><span>Termin</span><b>" + fmtDay(bk.day) + " · " + esc(bk.time) + "</b></div></div></div>";
    }
    // step 3 — done
    return '<div class="bk-pane bk-done"><div class="bk-check">✓</div><h3 class="bk-q">Anfrage gesendet!</h3>' +
      "<p>Dein E-Mail-Programm öffnet sich mit der fertigen Anfrage. Wir melden uns kurz zur Bestätigung — per E-Mail" +
      (f.phone.trim() ? " oder Telefon" : "") + ".</p>" +
      '<div class="bk-summary"><div><span>Leistung</span><b>' + esc(bk.svc) + "</b></div>" +
      "<div><span>Termin</span><b>" + fmtDay(bk.day) + " · " + esc(bk.time) + "</b></div>" +
      "<div><span>Name</span><b>" + esc(f.name) + "</b></div>" +
      "<div><span>E-Mail</span><b>" + esc(f.email) + "</b></div>" +
      (f.phone.trim() ? "<div><span>Telefon</span><b>" + esc(f.phone) + "</b></div>" : "") +
      "</div></div>";
  }

  function renderBooking() {
    if (!bk) return;
    var stepsHtml = bk.step < 3 ? '<div class="bk-steps">' + STEPS.slice(0, 3).map(function (s, i) {
      return '<div class="bk-step' + (i === bk.step ? " active" : "") + (i < bk.step ? " done" : "") + '"><i>' +
        (i < bk.step ? "✓" : i + 1) + "</i><span>" + s + "</span></div>";
    }).join("") + "</div>" : "";

    var foot = "";
    if (bk.step > 0 && bk.step < 3) foot += '<button class="btn btn-ghost bk-back" data-act="back">Zurück</button>';
    if (bk.step < 2) foot += '<button class="btn btn-solid" data-act="next"' + (canNext() ? "" : " disabled") + ">Weiter</button>";
    if (bk.step === 2) foot += '<button class="btn btn-solid" data-act="submit"' + (canNext() ? "" : " disabled") + ">Anfrage senden</button>";
    if (bk.step === 3) foot += '<button class="btn btn-solid" data-act="close">Schließen</button>';

    bkRoot.innerHTML =
      '<div class="bk-overlay"><div class="bk-modal"><button class="bk-close" aria-label="Schließen">✕</button>' +
      '<div class="bk-head"><div class="bk-eyebrow">Terminanfrage</div><div class="bk-title">SIDE Haarstudio Münster</div>' +
      stepsHtml + "</div>" +
      '<div class="bk-body">' + paneHtml() + "</div>" +
      '<div class="bk-foot">' + foot + "</div></div></div>";

    wireBooking();
  }

  function wireBooking() {
    var overlay = bkRoot.querySelector(".bk-overlay");
    overlay.addEventListener("click", closeBooking);
    bkRoot.querySelector(".bk-modal").addEventListener("click", function (e) { e.stopPropagation(); });
    bkRoot.querySelector(".bk-close").addEventListener("click", closeBooking);

    bkRoot.querySelectorAll("[data-svc]").forEach(function (b) {
      b.addEventListener("click", function () { bk.svc = b.getAttribute("data-svc"); renderBooking(); });
    });
    bkRoot.querySelectorAll("[data-day]").forEach(function (b) {
      if (b.disabled) return;
      b.addEventListener("click", function () { bk.day = b.getAttribute("data-day"); renderBooking(); });
    });
    bkRoot.querySelectorAll("[data-time]").forEach(function (b) {
      if (b.disabled) return;
      b.addEventListener("click", function () { bk.time = b.getAttribute("data-time"); renderBooking(); });
    });
    bkRoot.querySelectorAll("[data-f]").forEach(function (input) {
      input.addEventListener("input", function () {
        var key = input.getAttribute("data-f");
        bk.form[key] = input.value;
        // live-toggle the footer button without re-rendering (keeps focus)
        var btn = bkRoot.querySelector('[data-act="submit"], [data-act="next"]');
        if (btn) btn.disabled = !canNext();
      });
    });

    bkRoot.querySelectorAll("[data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = b.getAttribute("data-act");
        if (a === "back") go(-1);
        else if (a === "next") go(1);
        else if (a === "submit") submitBooking();
        else if (a === "close") closeBooking();
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (bk && e.key === "Escape") closeBooking();
  });

  /* ---------- global "book" triggers (delegated) ---------- */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-book]");
    if (trigger && !bkRoot.contains(trigger)) {
      e.preventDefault();
      openBooking();
    }
  });
})();
