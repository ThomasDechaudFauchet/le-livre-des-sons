/* ==========================================================================
   Le sommaire — Le Livre des Sons
   Survoler une étude en fait entendre le début, deux secondes, avec un
   fondu d'entrée et de sortie pour ne pas claquer. Le son démarre à
   l'instant de la première case, relevé sur le fichier.

   Un navigateur refuse de jouer un son avant que le visiteur ait agi :
   tant qu'il n'a pas cliqué quelque part, le survol reste muet. C'est
   normal, et la page fonctionne sans.
   ========================================================================== */
(function () {
  "use strict";

  var DUREE = 2.2, FONDU = 0.35;
  var lecteur = null, minuteur = null, ferme = null, rangee = null;

  function arrete() {
    clearTimeout(minuteur); clearTimeout(ferme);
    if (!lecteur) return;
    var l = lecteur, pas = l.volume / 8;
    (function baisse() {
      if (l.volume > pas) { l.volume -= pas; setTimeout(baisse, FONDU * 1000 / 8); }
      else { try { l.pause(); } catch (e) {} }
    })();
    lecteur = null;
  }

  function joue(a) {
    if (rangee === a) return;
    arrete();
    rangee = a;
    var src = a.getAttribute("data-son");
    if (!src) return;
    var depart = parseFloat(a.getAttribute("data-depart") || "0");
    var l = new Audio(src);
    l.volume = 0;
    l.preload = "auto";
    l.addEventListener("canplay", function () {
      try { l.currentTime = depart; } catch (e) {}
      l.play().then(function () {
        var pas = 1 / 8;
        (function monte() {
          if (l.volume < 1 - pas) { l.volume = Math.min(1, l.volume + pas); setTimeout(monte, FONDU * 1000 / 8); }
          else l.volume = 1;
        })();
      }).catch(function () {});
    }, { once: true });
    lecteur = l;
    minuteur = setTimeout(function () { if (lecteur === l) arrete(); }, DUREE * 1000);
  }

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
  });

  // sur un écran tactile il n'y a pas de survol : on ne joue rien,
  // le lien ouvre l'étude comme d'habitude.

  /* Le basculement du livre : passé la Rupture 2, la page prend le fond
     noir des planches qu'elle annonce. Le sommaire raconte alors ce que
     le chapitre 4 va faire, avant qu'on l'ait lu. */
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
