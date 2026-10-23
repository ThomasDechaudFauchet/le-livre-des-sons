/* ==========================================================================
   La bande des cases — Le Livre des Sons
   Une rangée de repères sous le lecteur, aux couleurs réelles de la planche.
   Celui qu'on entend s'éclaire. Un clic déplace l'écoute sur sa case.

   Le script ne touche à rien d'autre : il lit l'état de la page (quelle
   piste est active, quel régime est choisi) et suit le temps du lecteur.
   Les grilles sont celles des fichiers : 4,000 s par case pour les
   études 012 et 013.

   Pour ajouter une étude, ajouter une entrée à DONNEES avec son pas et
   ses planches. Une case sans teinte (noir, blanc, gris) a fs et fh nuls.
   ========================================================================== */
(function () {
  "use strict";

  var DONNEES = {
    "012": {
      pas: 4.0,
      planches: [
        [
          { nom: "disque noir sur fond blanc", hex: "#282828", deg: null, fs: null, fh: null },
          { nom: "disque blanc", hex: "#EFF1F5", deg: null, fs: null, fh: null },
          { nom: "disque gris moyen", hex: "#818283", deg: null, fs: null, fh: null },
          { nom: "cercle rouge", hex: "#FF0000", deg: 0.0, fs: 50, fh: 20 },
          { nom: "cercle vert", hex: "#01FF00", deg: 119.8, fs: 578, fh: 375 },
          { nom: "cercle bleu", hex: "#0000FF", deg: 240.0, fs: 6750, fh: 7116 },
          { nom: "cercle jaune", hex: "#FFF300", deg: 57.2, fs: 161, fh: 86 },
          { nom: "cercle cyan", hex: "#00AEF2", deg: 196.9, fs: 2795, fh: 2286 },
          { nom: "cercle magenta", hex: "#FF0090", deg: 326.1, fs: 424, fh: 268 },
          { nom: "cercle rouge-orangé", hex: "#FF6514", deg: 20.7, fs: 76, fh: 34 },
          { nom: "cercle orange", hex: "#FF9400", deg: 34.8, fs: 102, fh: 49 },
          { nom: "cercle jaune-vert", hex: "#6CC82A", deg: 94.9, fs: 348, fh: 203 }
        ],
        [
          { nom: "cercle vert moyen", hex: "#00B63D", deg: 140.1, fs: 876, fh: 617 },
          { nom: "cercle vert-cyan", hex: "#00AB9E", deg: 175.2, fs: 1804, fh: 1465 },
          { nom: "cercle bleu-cyan", hex: "#0071C0", deg: 204.8, fs: 3280, fh: 2998 },
          { nom: "cercle bleu-indigo", hex: "#2B2C97", deg: 239.4, fs: 6615, fh: 6948 },
          { nom: "cercle violet", hex: "#752995", deg: 282.2, fs: 16000, fh: 20000 },
          { nom: "cercle magenta foncé", hex: "#AA2193", deg: 309.1, fs: 1113, fh: 807 },
          { nom: "triangle rouge", hex: "#FF0000", deg: 0.0, fs: 50, fh: 20 },
          { nom: "triangle vert", hex: "#01FF00", deg: 119.8, fs: 578, fh: 375 },
          { nom: "triangle bleu", hex: "#0000FF", deg: 240.0, fs: 6750, fh: 7116 },
          { nom: "carré rouge", hex: "#FF0000", deg: 0.0, fs: 50, fh: 20 },
          { nom: "carré vert", hex: "#01FF00", deg: 119.8, fs: 578, fh: 375 },
          { nom: "carré bleu", hex: "#0000FF", deg: 240.0, fs: 6750, fh: 7116 }
        ],
        [
          { nom: "piano rouge", hex: "#FF0000", deg: 0.0, fs: 50, fh: 20 },
          { nom: "piano vert", hex: "#01FF00", deg: 119.8, fs: 578, fh: 375 },
          { nom: "piano bleu", hex: "#0000FF", deg: 240.0, fs: 6750, fh: 7116 },
          { nom: "kalimba jaune", hex: "#FFF300", deg: 57.2, fs: 161, fh: 86 },
          { nom: "kalimba cyan", hex: "#00AEF2", deg: 196.9, fs: 2795, fh: 2286 },
          { nom: "kalimba magenta", hex: "#FF0090", deg: 326.1, fs: 424, fh: 268 },
          { nom: "contrebasse rouge-orangé", hex: "#FF6514", deg: 20.7, fs: 76, fh: 34 },
          { nom: "contrebasse orange", hex: "#FF9400", deg: 34.8, fs: 102, fh: 49 },
          { nom: "contrebasse jaune-vert", hex: "#6CC82A", deg: 94.9, fs: 348, fh: 203 },
          { nom: "guitare vert moyen", hex: "#00B63D", deg: 140.1, fs: 876, fh: 617 },
          { nom: "guitare vert-cyan", hex: "#00AB9E", deg: 175.2, fs: 1804, fh: 1465 },
          { nom: "guitare bleu-cyan", hex: "#0071C0", deg: 204.8, fs: 3280, fh: 2998 }
        ],
        [
          { nom: "kick rouge", hex: "#FF0000", deg: 0.0, fs: 50, fh: 20 },
          { nom: "kick vert", hex: "#01FF00", deg: 119.8, fs: 578, fh: 375 },
          { nom: "kick bleu", hex: "#0000FF", deg: 240.0, fs: 6750, fh: 7116 },
          { nom: "clave jaune", hex: "#FFF300", deg: 57.2, fs: 161, fh: 86 },
          { nom: "clave cyan", hex: "#00AEF2", deg: 196.9, fs: 2795, fh: 2286 },
          { nom: "clave magenta", hex: "#FF0090", deg: 326.1, fs: 424, fh: 268 },
          { nom: "claquement de doigt vert moyen", hex: "#00B63D", deg: 140.1, fs: 876, fh: 617 },
          { nom: "claquement de doigt vert-cyan", hex: "#00AB9E", deg: 175.2, fs: 1804, fh: 1465 },
          { nom: "claquement de doigt bleu-cyan", hex: "#0071C0", deg: 204.8, fs: 3280, fh: 2998 },
          { nom: "charleston bleu-indigo", hex: "#2B2C97", deg: 239.4, fs: 6615, fh: 6948 },
          { nom: "charleston violet", hex: "#752995", deg: 282.2, fs: 16000, fh: 20000 },
          { nom: "charleston magenta foncé", hex: "#AA2193", deg: 309.1, fs: 1113, fh: 807 }
        ]
      ]
    }
  };

  var bande = document.getElementById("bande");
  var lecture = document.getElementById("bandeLecture");
  var player = document.getElementById("player");
  var liste = document.getElementById("trackList");
  if (!bande || !player || !liste) return;

  var etude = bande.getAttribute("data-etude");
  var jeu = DONNEES[etude];
  if (!jeu) return;

  var liens = [].slice.call(liste.querySelectorAll("a"));
  var planche = 0;
  var caseVue = -1;
  var boutons = [];

  function regimeCourant() {
    var b = document.querySelector(".regime.is-active");
    return b ? b.getAttribute("data-regime") : "spectral";
  }

  function pisteCourante() {
    var a = liste.querySelector("a.is-active");
    var i = a ? liens.indexOf(a) : -1;
    return i < 0 ? 0 : i;
  }

  function dessine() {
    var cases = jeu.planches[planche] || [];
    bande.innerHTML = "";
    boutons = [];
    cases.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "case";
      b.style.background = c.hex;
      b.setAttribute("aria-label", "Case " + (i + 1) + " — " + c.nom);
      b.addEventListener("click", function () {
        if (player.readyState > 0) {
          try { player.currentTime = i * jeu.pas + 0.05; } catch (e) {}
          if (player.paused) player.play().catch(function () {});
        }
        montre(i);
      });
      b.addEventListener("mouseenter", function () { montre(i, true); });
      b.addEventListener("mouseleave", function () { montre(caseVue); });
      bande.appendChild(b);
      boutons.push(b);
    });
    caseVue = -1;
    montre(0);
  }

  function montre(i, survol) {
    var cases = jeu.planches[planche] || [];
    var c = cases[i];
    if (!c) return;
    if (!survol) {
      caseVue = i;
      boutons.forEach(function (b, k) { b.classList.toggle("on", k === i); });
    }
    if (!lecture) return;
    var hz = regimeCourant() === "spectral" ? c.fs : c.fh;
    var suite = regimeCourant() === "spectral" ? "fenêtre spectrale" : "fondamentale";
    lecture.innerHTML = "";
    var nom = document.createElement("span");
    nom.className = "bande-nom";
    nom.textContent = "Case " + (i + 1) + " · " + c.nom;
    lecture.appendChild(nom);
    var val = document.createElement("span");
    if (hz == null) {
      val.className = "bande-deg";
      val.textContent = "sans teinte — aucune fréquence désignée";
      lecture.appendChild(val);
    } else {
      val.className = "bande-hz";
      val.textContent = hz.toLocaleString("fr-FR") + " Hz — " + suite;
      var deg = document.createElement("span");
      deg.className = "bande-deg";
      deg.textContent = c.deg.toLocaleString("fr-FR", { minimumFractionDigits: 1 }) + "° de teinte";
      lecture.appendChild(val);
      lecture.appendChild(deg);
    }
  }

  player.addEventListener("timeupdate", function () {
    var cases = jeu.planches[planche] || [];
    var i = Math.floor(player.currentTime / jeu.pas);
    if (i < 0) i = 0;
    if (i > cases.length - 1) i = cases.length - 1;
    if (i !== caseVue) montre(i);
  });

  // La page ne prévient pas quand la piste ou le régime change :
  // on observe les classes que son propre script pose.
  var veille = new MutationObserver(function () {
    var p = pisteCourante();
    if (p !== planche) { planche = p; dessine(); }
    else montre(caseVue < 0 ? 0 : caseVue);
  });
  veille.observe(liste, { subtree: true, attributes: true, attributeFilter: ["class"] });
  var sw = document.querySelector(".regime-switch");
  if (sw) veille.observe(sw, { subtree: true, attributes: true, attributeFilter: ["class"] });

  planche = pisteCourante();
  dessine();
})();
