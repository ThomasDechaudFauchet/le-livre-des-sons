/* ==========================================================================
   Le sommaire — Le Livre des Sons
   Survoler une étude en fait entendre le début, deux secondes, avec un
   fondu d'entrée et de sortie. Le son démarre à l'instant de la première
   case, relevé sur le fichier.

   Un seul lecteur pour toute la page, et un jeton de génération : quand on
   passe vite d'une rangée à l'autre, les extraits demandés entre-temps ne
   doivent pas se réveiller après coup et se superposer. C'est le défaut
   qu'avait la première version — chaque survol créait son propre lecteur,
   et ceux dont le chargement finissait trop tard jouaient dans le vide.

   Un navigateur refuse de jouer un son avant que le visiteur ait agi :
   tant qu'il n'a pas cliqué quelque part, le survol reste muet.
   ========================================================================== */
(function () {
  "use strict";

  var DUREE = 2.2, FONDU = 0.32, PAS = 8;
  var lecteur = new Audio();
  lecteur.preload = "auto";
  lecteur.volume = 0;
  var jeton = 0, minuteur = null, rangee = null;

  function arrete() {
    jeton++;                       // tout ce qui était en cours devient caduc
    clearTimeout(minuteur);
    var mien = jeton, l = lecteur;
    var pas = Math.max(l.volume / PAS, 0.02);
    (function baisse() {
      if (jeton !== mien) return;  // un nouveau survol a repris la main
      if (l.volume > pas) { l.volume = Math.max(0, l.volume - pas); setTimeout(baisse, FONDU * 1000 / PAS); }
      else { l.volume = 0; try { l.pause(); } catch (e) {} }
    })();
  }

  function joue(a) {
    if (rangee === a) return;
    rangee = a;
    var src = a.getAttribute("data-son");
    if (!src) { arrete(); return; }
    jeton++;
    clearTimeout(minuteur);
    var mien = jeton;
    var depart = parseFloat(a.getAttribute("data-depart") || "0");
    var l = lecteur;
    l.volume = 0;
    try { l.pause(); } catch (e) {}

    function demarre() {
      if (jeton !== mien) return;
      try { l.currentTime = depart; } catch (e) {}
      l.play().then(function () {
        if (jeton !== mien) { try { l.pause(); } catch (e) {} return; }
        (function monte() {
          if (jeton !== mien) return;
          if (l.volume < 1 - 1 / PAS) { l.volume = Math.min(1, l.volume + 1 / PAS); setTimeout(monte, FONDU * 1000 / PAS); }
          else l.volume = 1;
        })();
        minuteur = setTimeout(function () { if (jeton === mien) arrete(); }, DUREE * 1000);
      }).catch(function () {});
    }

    if (l.getAttribute("src") === src && l.readyState > 1) { demarre(); return; }
    l.setAttribute("src", src);
    l.addEventListener("canplay", function ici() {
      l.removeEventListener("canplay", ici);
      demarre();
    });
    l.load();
  }

  /* En quittant la page — un lien, le bouton Retour, un onglet refermé —
     le son doit se taire tout de suite, sans attendre le fondu. */
  function coupe() {
    jeton++;
    clearTimeout(minuteur);
    try { lecteur.pause(); lecteur.volume = 0; } catch (e) {}
  }
  window.addEventListener("pagehide", coupe);
  window.addEventListener("beforeunload", coupe);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) coupe();
  });

  /* Le fond : la planche de l'étude survolée apparaît derrière la page,
     très faiblement et floutée. Elle suit l'attention du lecteur au lieu
     de défiler toute seule — c'est ce qui l'empêche de gêner la lecture. */
  var fond = document.createElement("div");
  fond.className = "fond-vivant";
  var coucheA = document.createElement("div");
  var coucheB = document.createElement("div");
  fond.appendChild(coucheA); fond.appendChild(coucheB);
  document.body.appendChild(fond);
  var devant = coucheA, derriere = coucheB, imageEnCours = null;

  function fondSur(src) {
    if (src === imageEnCours) return;
    imageEnCours = src;
    if (!src) { devant.classList.remove("on"); derriere.classList.remove("on"); return; }
    derriere.style.backgroundImage = 'url("' + src + '")';
    derriere.classList.add("on");
    devant.classList.remove("on");
    var t = devant; devant = derriere; derriere = t;
  }

  var rangees = document.querySelectorAll(".rangee");
  rangees.forEach(function (a) {
    var img = a.querySelector("img");
    var src = img ? img.getAttribute("src") : null;
    a.addEventListener("mouseenter", function () { joue(a); fondSur(src); });
    a.addEventListener("focus", function () { joue(a); fondSur(src); });
    a.addEventListener("mouseleave", function () {
      if (rangee === a) { rangee = null; arrete(); }
      fondSur(null);
    });
    a.addEventListener("blur", function () {
      if (rangee === a) { rangee = null; arrete(); }
      fondSur(null);
    });
    // on ouvre l'étude : le son d'aperçu n'a plus lieu d'être
    a.addEventListener("click", coupe);
  });

  /* Le basculement du livre : passé la Rupture 2, la page prend le fond
     noir des planches qu'elle annonce. */
  var repere = document.querySelector(".bascule");
  if (repere) {
    var enCours = false;
    function regarde() {
      enCours = false;
      var haut = repere.getBoundingClientRect().top;
      document.body.classList.toggle("nuit", haut < window.innerHeight * 0.45);
    }
    window.addEventListener("scroll", function () {
      if (!enCours) { enCours = true; requestAnimationFrame(regarde); }
    }, { passive: true });
    window.addEventListener("resize", regarde);
    regarde();
  }
})();
