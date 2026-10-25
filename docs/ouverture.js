/* ==========================================================================
   L'ouverture — Le Livre des Sons
   25 octobre 2026

   Un film de vingt et une secondes, à la place du montage d'images qui
   tenait ce rôle jusqu'ici. Le film existe en trois cadrages ; on charge
   celui qui correspond à la forme de l'écran, et lui seul.

   Le son ne peut pas démarrer sans un geste : tous les navigateurs
   l'interdisent. L'écran d'entrée est donc une invitation à cliquer, et
   c'est ce clic qui lance le film avec son son.

   L'ouverture ne se montre qu'une fois : le passage est retenu dans le
   navigateur du visiteur.
   ========================================================================== */
(function () {
  "use strict";

  var FILMS = [
    { mini: 1.25, fichier: "ouverture-16x9.mp4" },   /* écran large */
    { mini: 0.85, fichier: "ouverture-1x1.mp4" },    /* presque carré */
    { mini: 0.00, fichier: "ouverture-9x16.mp4" }    /* téléphone debout */
  ];

  var ecran = document.getElementById("ouverture");
  if (!ecran) return;

  var vu = false;
  try { vu = localStorage.getItem("llds-ouverture") === "vue"; } catch (e) {}
  if (vu) { ecran.parentNode.removeChild(ecran); return; }

  var film = ecran.querySelector(".ouverture-film");
  var entree = ecran.querySelector(".ouverture-entree");
  var passer = ecran.querySelector(".ouverture-passer");
  if (!film || !entree) { ecran.parentNode.removeChild(ecran); return; }

  document.body.classList.add("ouverture-active");

  /* le cadrage le plus proche de la forme de l'écran */
  function choisit() {
    var forme = window.innerWidth / Math.max(1, window.innerHeight);
    for (var i = 0; i < FILMS.length; i++) {
      if (forme >= FILMS[i].mini) return FILMS[i].fichier;
    }
    return FILMS[FILMS.length - 1].fichier;
  }
  film.src = choisit();
  film.load();

  var fini = false;

  function termine() {
    if (fini) return;
    fini = true;
    try { localStorage.setItem("llds-ouverture", "vue"); } catch (e) {}
    try { film.pause(); } catch (e) {}
    ecran.classList.add("sortie");
    document.body.classList.remove("ouverture-active");
    window.setTimeout(function () {
      if (ecran.parentNode) ecran.parentNode.removeChild(ecran);
      film.removeAttribute("src");
      film.load();
    }, 900);
  }

  entree.addEventListener("click", function () {
    entree.classList.add("partie");
    film.classList.add("on");
    var essai = film.play();
    if (essai && essai.catch) {
      essai.catch(function () {
        /* si la lecture est refusée malgré le geste, on n'enferme personne */
        termine();
      });
    }
  });

  film.addEventListener("ended", termine);
  film.addEventListener("error", termine);
  if (passer) passer.addEventListener("click", termine);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      if (!entree.classList.contains("partie")) return;
      termine();
    }
  });

  /* un onglet qu'on quitte ne doit pas continuer à sonner */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { try { film.pause(); } catch (e) {} }
  });
})();
