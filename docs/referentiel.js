/* ==========================================================================
   Le référentiel audible — Le Livre des Sons

   La loi du chapitre 4 dit qu'une teinte désigne une fréquence. Sur le
   papier, c'est une affirmation ; ici, on la promène au doigt et on
   l'entend. Les deux régimes du Discours 2 sont côte à côte.

   Les sons sont fabriqués dans le navigateur, rien n'est téléchargé.

     Ouverture spectrale — une source riche (une dent de scie à 220 Hz,
     comme les planches de formes simples) passe dans un filtre en cloche
     dont la fréquence centrale suit la teinte : +14 dB, Q 1,1. Ce sont les
     réglages employés pour fabriquer les fichiers du site.

     Fréquence fondamentale — une sinusoïde à la fréquence de la teinte.

   Au-delà de 282,22° — la teinte du violet du livre, mesurée sur son RVB
   (117, 41, 149) — commence la ligne des pourpres, qui n'a pas de longueur
   d'onde. Le livre y superpose une composante rouge et une composante
   bleue : on entend donc un intervalle et non une note.
   ========================================================================== */
(function () {
  "use strict";

  var H_VIOLET = 282.2222;
  var SPECTRAL = { bas: 50, haut: 16000 };
  var HAUTEUR  = { bas: 20, haut: 20000 };
  var F0_SOURCE = 220;          // la source des planches de formes simples

  function octaves(r) { return Math.log(r.haut / r.bas) / Math.LN2; }

  /* La fréquence d'une teinte spectrale. */
  function freq(h, r) {
    return r.bas * Math.pow(2, octaves(r) * h / H_VIOLET);
  }

  /* Une teinte de la ligne des pourpres se décompose en deux composantes. */
  function composantes(h, r) {
    if (h <= H_VIOLET) return [{ f: freq(h, r), poids: 1 }];
    var rouge = (h - H_VIOLET) / (360 - H_VIOLET);
    return [
      { f: freq(0, r),   poids: rouge },
      { f: freq(240, r), poids: 1 - rouge }
    ];
  }

  function couleur(h) { return "hsl(" + h.toFixed(1) + " 100% 50%)"; }

  function hz(f) {
    return f >= 1000
      ? (f / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " kHz"
      : f.toLocaleString("fr-FR", { maximumFractionDigits: f < 100 ? 1 : 0 }) + " Hz";
  }

  /* Le nom de la note la plus proche, pour donner un repère musical.
     La4 = 440 Hz, convention française. */
  var NOMS = ["do", "do♯", "ré", "ré♯", "mi", "fa", "fa♯", "sol", "sol♯", "la", "la♯", "si"];
  function note(f) {
    if (f < 16 || f > 20000) return "";
    var demi = Math.round(12 * Math.log(f / 440) / Math.LN2);
    var oct = Math.floor((demi + 57) / 12);
    var cents = Math.round(1200 * Math.log(f / (440 * Math.pow(2, demi / 12))) / Math.LN2);
    var n = NOMS[((demi + 9) % 12 + 12) % 12] + oct;
    return n + (cents ? (cents > 0 ? " +" : " ") + cents + " ¢" : "");
  }

  // ---------------------------------------------------------------- le son
  var ctx = null, maitre = null, voix = [], ondeDouce = null;

  function demarre() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    maitre = ctx.createGain();
    maitre.gain.value = 0;
    maitre.connect(ctx.destination);

    /* La source du régime spectral doit être riche — sans harmoniques, un
       filtre en cloche n'a rien à saisir. Mais une dent de scie, dont les
       harmoniques décroissent en 1/k, est criarde. On garde donc tout le
       spectre et on adoucit la pente : 1/k^1,45. Le filtre trouve de la
       matière à chaque fréquence, l'oreille ne grince plus. */
    var N = 48, re = new Float32Array(N), im = new Float32Array(N);
    for (var k = 1; k < N; k++) im[k] = 1 / Math.pow(k, 1.45);
    ondeDouce = ctx.createPeriodicWave(re, im, { disableNormalization: false });
  }

  /* Deux fréquences de même énergie ne s'entendent pas avec la même force :
     l'oreille est sourde dans l'extrême grave et perçante vers 3 kHz. On
     corrige grossièrement pour que la promenade sur la roue ne fasse pas
     d'écart de volume brutal. */
  function compense(f) {
    if (f < 80)    return 0.55 + 0.45 * (f / 80);
    if (f > 9000)  return Math.max(0.45, 1 - (f - 9000) / 22000);
    if (f > 1800 && f < 5000) return 0.78;
    return 1;
  }

  var extinction = null;
  function coupe(brutal) {
    sonne = false;
    page.classList.remove("sonne");
    clearTimeout(extinction); clearTimeout(garde);
    if (!ctx) return;
    maitre.gain.cancelScheduledValues(ctx.currentTime);
    if (brutal) {
      maitre.gain.setValueAtTime(0, ctx.currentTime);
      voix.forEach(function (v) { try { v.stop(); } catch (e) {} });
      voix = [];
      return;
    }
    maitre.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
    extinction = setTimeout(function () {
      voix.forEach(function (v) { try { v.stop(); } catch (e) {} });
      voix = [];
    }, 320);
  }

  /* Filet de sécurité : si plus rien ne bouge, le son s'éteint tout seul.
     Un doigt qui quitte l'écran sans relâcher, un geste interrompu par le
     système, et la note resterait suspendue — c'est arrivé. */
  var garde = null;
  function relance() {
    clearTimeout(garde);
    garde = setTimeout(function () { coupe(); }, 12000);
  }

  /* Et surtout : quitter la page, la masquer ou la recharger coupe net. */
  function silence() { coupe(true); }
  window.addEventListener("pagehide", silence);
  window.addEventListener("beforeunload", silence);
  window.addEventListener("blur", silence);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) silence();
  });

  var sonne = false;
  function fabrique(h) {
    demarre(); relance();
    voix.forEach(function (v) { try { v.stop(); } catch (e) {} });
    voix = [];
    var comps = composantes(h, regime === "spectral" ? SPECTRAL : HAUTEUR);
    comps.forEach(function (c) {
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      if (regime === "spectral") {
        if (ondeDouce) osc.setPeriodicWave(ondeDouce); else osc.type = "triangle";
        osc.frequency.value = F0_SOURCE;
        var cloche = ctx.createBiquadFilter();
        cloche.type = "peaking";
        cloche.frequency.value = Math.min(c.f, ctx.sampleRate / 2 * 0.9);
        cloche.Q.value = 1.1;
        cloche.gain.value = 14;
        osc.connect(cloche); cloche.connect(g);
      } else {
        osc.type = "sine";
        osc.frequency.value = Math.min(c.f, ctx.sampleRate / 2 * 0.9);
        osc.connect(g);
      }
      g.gain.value = c.poids * compense(c.f) * (regime === "spectral" ? 0.17 : 0.26);
      g.connect(maitre);
      osc.start();
      voix.push(osc);
    });
    if (!sonne) {
      maitre.gain.cancelScheduledValues(ctx.currentTime);
      maitre.gain.setTargetAtTime(1, ctx.currentTime, 0.07);
      sonne = true;
      page.classList.add("sonne");
    }
  }

  // --------------------------------------------------------------- la page
  var page    = document.querySelector(".referentiel");
  var roue    = document.getElementById("roue");
  var aiguille= document.getElementById("aiguille");
  var pastille= document.getElementById("pastille");
  var lTeinte = document.getElementById("lecture-teinte");
  var lFreq   = document.getElementById("lecture-freq");
  var lNote   = document.getElementById("lecture-note");
  var lNature = document.getElementById("lecture-nature");
  var moyeu   = document.querySelector(".moyeu");
  if (!roue) return;

  var regime = "spectral";
  var teinte = 0;

  /* Le dégradé de la roue est construit depuis la loi elle-même : chaque
     degré y est à sa place, et la ligne des pourpres est assombrie pour
     qu'on voie qu'elle sort du spectre. */
  (function peint() {
    var pas = [];
    for (var h = 0; h <= 360; h += 3) {
      var c = h <= H_VIOLET ? couleur(h)
            : "hsl(" + h.toFixed(1) + " 70% 38%)";
      pas.push(c + " " + (h).toFixed(1) + "deg");
    }
    roue.style.background = "conic-gradient(from 0deg, " + pas.join(",") + ")";
  })();

  function place(h) {
    teinte = ((h % 360) + 360) % 360;
    aiguille.style.transform = "rotate(" + teinte + "deg)";
    pastille.style.background = teinte <= H_VIOLET ? couleur(teinte)
                              : "hsl(" + teinte.toFixed(1) + " 70% 42%)";
    var r = regime === "spectral" ? SPECTRAL : HAUTEUR;
    var comps = composantes(teinte, r);
    lTeinte.textContent = teinte.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "°";
    if (comps.length === 1) {
      moyeu.classList.remove("duo");
      lFreq.textContent = hz(comps[0].f);
      lNote.textContent = note(comps[0].f);
      lNature.textContent = regime === "spectral"
        ? "fenêtre spectrale — la région du spectre mise en avant"
        : "fréquence fondamentale — la hauteur du son";
    } else {
      moyeu.classList.add("duo");
      lFreq.textContent = hz(comps[0].f) + " + " + hz(comps[1].f);
      lNote.textContent = Math.round(comps[0].poids * 100) + " % rouge · "
                        + Math.round(comps[1].poids * 100) + " % bleu";
      lNature.textContent = "ligne des pourpres — aucune longueur d'onde : un intervalle, pas une note";
    }
    if (sonne) fabrique(teinte);
  }

  function angleDe(ev) {
    var r = roue.getBoundingClientRect();
    var x = (ev.clientX !== undefined ? ev.clientX : ev.touches[0].clientX) - (r.left + r.width / 2);
    var y = (ev.clientY !== undefined ? ev.clientY : ev.touches[0].clientY) - (r.top + r.height / 2);
    return (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360;   // 0° en haut
  }

  var tient = false;
  function prend(ev) {
    tient = true;
    roue.setPointerCapture && ev.pointerId !== undefined && roue.setPointerCapture(ev.pointerId);
    place(angleDe(ev));
    fabrique(teinte);
    ev.preventDefault();
  }
  function bouge(ev) { if (tient) { place(angleDe(ev)); relance(); ev.preventDefault(); } }
  function lache() { if (tient) { tient = false; coupe(); } }

  /* Le mouvement est écouté sur toute la fenêtre : une fois le doigt posé,
     on peut s'éloigner du cercle et continuer de tourner. Enfermer le geste
     dans l'anneau obligeait à suivre une piste de quelques millimètres. */
  roue.addEventListener("pointerdown", prend);
  window.addEventListener("pointermove", bouge);
  window.addEventListener("pointerup", lache);
  window.addEventListener("pointercancel", lache);
  window.addEventListener("pointerleave", lache);

  /* Au clavier : les flèches déplacent d'un degré, Majuscule de dix. */
  roue.setAttribute("tabindex", "0");
  roue.addEventListener("keydown", function (e) {
    var pas = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { place(teinte + pas); fabrique(teinte); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { place(teinte - pas); fabrique(teinte); }
    else if (e.key === " " || e.key === "Enter") { sonne ? coupe() : fabrique(teinte); }
    else return;
    e.preventDefault();
  });
  roue.addEventListener("blur", coupe);

  document.querySelectorAll("#regimes button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.regime === regime) return;
      regime = b.dataset.regime;
      document.querySelectorAll("#regimes button").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x.dataset.regime === regime));
      });
      document.getElementById("regime-note").textContent = b.dataset.note;
      place(teinte);
      if (sonne) fabrique(teinte);
    });
  });

  /* Les teintes des planches du livre, mesurées sur le PDF. */
  document.querySelectorAll(".teinte-livre").forEach(function (b) {
    var h = parseFloat(b.dataset.h);
    b.style.background = b.dataset.hex;
    b.addEventListener("click", function () { place(h); fabrique(teinte); });
    b.addEventListener("pointerup", function () { setTimeout(coupe, 900); });
  });

  place(0);
})();
