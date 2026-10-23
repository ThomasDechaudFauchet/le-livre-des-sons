/* ==========================================================================
   L'ouverture — Le Livre des Sons
   Un montage de cases du livre, chacune accompagnée de son propre objet
   sonore, découpé dans les fichiers du site aux instants relevés. Du point
   au tutti, du noir et blanc à la couleur : le basculement du livre y est
   rejoué en trente secondes.

   Les images sont des découpes dédiées, extraites du PDF à 400 points par
   pouce : une case affichée seule a besoin de bien plus de définition que
   la même case vue dans sa planche.

   Le son ne peut pas démarrer sans un geste : tous les navigateurs
   l'interdisent. L'écran d'entrée est donc une invitation à cliquer.
   ========================================================================== */
(function () {
  "use strict";

  var IMAGES = {"001-1|0":{"image":"ouv-001-1-0.webp","l":722,"h":723},"001-1|5":{"image":"ouv-001-1-5.webp","l":722,"h":723},"001-2|2":{"image":"ouv-001-2-2.webp","l":722,"h":723},"001-2|9":{"image":"ouv-001-2-9.webp","l":722,"h":722},"001-3|6":{"image":"ouv-001-3-6.webp","l":1000,"h":1000},"002-1|1":{"image":"ouv-002-1-1.webp","l":723,"h":722},"002-1|10":{"image":"ouv-002-1-10.webp","l":722,"h":722},"002-1|6":{"image":"ouv-002-1-6.webp","l":722,"h":722},"003-1|17":{"image":"ouv-003-1-17.webp","l":336,"h":337},"003-1|3":{"image":"ouv-003-1-3.webp","l":337,"h":337},"003-1|31":{"image":"ouv-003-1-31.webp","l":337,"h":337},"003-1|45":{"image":"ouv-003-1-45.webp","l":337,"h":337},"004-1|0":{"image":"ouv-004-1-0.webp","l":1000,"h":1000},"004-2|1":{"image":"ouv-004-2-1.webp","l":722,"h":722},"004-2|10":{"image":"ouv-004-2-10.webp","l":722,"h":722},"004-2|6":{"image":"ouv-004-2-6.webp","l":722,"h":722},"005-1|2":{"image":"ouv-005-1-2.webp","l":1000,"h":1000},"005-3|5":{"image":"ouv-005-3-5.webp","l":722,"h":723},"008-1|0":{"image":"ouv-008-1-0.webp","l":1000,"h":1000},"008-1|1":{"image":"ouv-008-1-1.webp","l":1000,"h":1000},"008-2|2":{"image":"ouv-008-2-2.webp","l":1000,"h":467},"009-1|4":{"image":"ouv-009-1-4.webp","l":722,"h":723},"009-2|7":{"image":"ouv-009-2-7.webp","l":723,"h":723},"010-2|6":{"image":"ouv-010-2-6.webp","l":722,"h":722},"010-3|9":{"image":"ouv-010-3-9.webp","l":722,"h":722},"011-1|3":{"image":"ouv-011-1-3.webp","l":723,"h":723},"011-2|8":{"image":"ouv-011-2-8.webp","l":722,"h":723},"012-1|0":{"image":"ouv-012-1-0.webp","l":723,"h":723},"012-1|1":{"image":"ouv-012-1-1.webp","l":723,"h":723},"012-1|2":{"image":"ouv-012-1-2.webp","l":723,"h":723},"012-1|3":{"image":"ouv-012-1-3.webp","l":723,"h":723},"012-1|4":{"image":"ouv-012-1-4.webp","l":723,"h":723},"012-1|5":{"image":"ouv-012-1-5.webp","l":723,"h":723},"012-1|6":{"image":"ouv-012-1-6.webp","l":723,"h":723},"012-1|7":{"image":"ouv-012-1-7.webp","l":723,"h":723},"012-1|8":{"image":"ouv-012-1-8.webp","l":723,"h":723},"012-2|4":{"image":"ouv-012-2-4.webp","l":723,"h":723},"012-3|2":{"image":"ouv-012-3-2.webp","l":723,"h":723},"012-4|5":{"image":"ouv-012-4-5.webp","l":722,"h":723},"013-1|6":{"image":"ouv-013-1-6.webp","l":722,"h":722},"013-3|4":{"image":"ouv-013-3-4.webp","l":723,"h":722},"013-4|7":{"image":"ouv-013-4-7.webp","l":723,"h":722},"016-1|5":{"image":"ouv-016-1-5.webp","l":710,"h":727},"017-1|6":{"image":"ouv-017-1-6.webp","l":727,"h":727},"018-2|3":{"image":"ouv-018-2-3.webp","l":727,"h":727},"019-2|9":{"image":"ouv-019-2-9.webp","l":727,"h":720},"020-1|1":{"image":"ouv-020-1-1.webp","l":991,"h":1000},"020-2|2":{"image":"ouv-020-2-2.webp","l":1000,"h":1000},"021-1|1":{"image":"ouv-021-1-1.webp","l":1000,"h":987},"021-2|1":{"image":"ouv-021-2-1.webp","l":1000,"h":987},"022-1|0":{"image":"ouv-022-1-0.webp","l":997,"h":1000},"022-2|0":{"image":"ouv-022-2-0.webp","l":997,"h":1000}};
  var MONTAGE = {"duree":31.52,"images":[{"cle":"001-1|0","t":0.0,"duree":1.4},{"cle":"001-1|5","t":1.4,"duree":1.15},{"cle":"001-2|2","t":2.55,"duree":1.0},{"cle":"001-2|9","t":3.55,"duree":0.92},{"cle":"001-3|6","t":4.47,"duree":1.05},{"cle":"002-1|1","t":5.52,"duree":0.8},{"cle":"002-1|6","t":6.32,"duree":0.74},{"cle":"002-1|10","t":7.06,"duree":0.7},{"cle":"003-1|3","t":7.76,"duree":0.64},{"cle":"003-1|17","t":8.4,"duree":0.6},{"cle":"003-1|31","t":9.0,"duree":0.56},{"cle":"003-1|45","t":9.56,"duree":0.52},{"cle":"004-1|0","t":10.08,"duree":0.62},{"cle":"004-2|1","t":10.7,"duree":0.5},{"cle":"004-2|6","t":11.2,"duree":0.46},{"cle":"004-2|10","t":11.66,"duree":0.44},{"cle":"005-1|2","t":12.1,"duree":0.44},{"cle":"005-3|5","t":12.54,"duree":0.42},{"cle":"008-1|0","t":12.96,"duree":0.4},{"cle":"008-1|1","t":13.36,"duree":0.38},{"cle":"008-2|2","t":13.74,"duree":0.44},{"cle":"009-1|4","t":14.18,"duree":0.36},{"cle":"009-2|7","t":14.54,"duree":0.34},{"cle":"010-2|6","t":14.88,"duree":0.34},{"cle":"010-3|9","t":15.22,"duree":0.32},{"cle":"011-1|3","t":15.54,"duree":0.32},{"cle":"011-2|8","t":15.86,"duree":0.3},{"cle":"012-1|0","t":16.16,"duree":1.1},{"cle":"012-1|1","t":17.26,"duree":1.1},{"cle":"012-1|2","t":18.36,"duree":0.62},{"cle":"012-1|3","t":18.98,"duree":0.46},{"cle":"012-1|4","t":19.44,"duree":0.42},{"cle":"012-1|5","t":19.86,"duree":0.4},{"cle":"012-1|6","t":20.26,"duree":0.36},{"cle":"012-1|7","t":20.62,"duree":0.34},{"cle":"012-1|8","t":20.96,"duree":0.32},{"cle":"012-2|4","t":21.28,"duree":0.32},{"cle":"012-3|2","t":21.6,"duree":0.3},{"cle":"012-4|5","t":21.9,"duree":0.3},{"cle":"013-1|6","t":22.2,"duree":0.3},{"cle":"013-3|4","t":22.5,"duree":0.28},{"cle":"013-4|7","t":22.78,"duree":0.28},{"cle":"016-1|5","t":23.06,"duree":0.28},{"cle":"017-1|6","t":23.34,"duree":0.28},{"cle":"018-2|3","t":23.62,"duree":0.26},{"cle":"019-2|9","t":23.88,"duree":0.26},{"cle":"020-1|1","t":24.14,"duree":0.46},{"cle":"020-2|2","t":24.6,"duree":0.42},{"cle":"021-1|1","t":25.02,"duree":0.52},{"cle":"021-2|1","t":25.54,"duree":0.58},{"cle":"022-2|0","t":26.12,"duree":1.0},{"cle":"022-1|0","t":27.12,"duree":3.2}]};

  var ecran = document.getElementById("ouverture");
  if (!ecran) return;

  var vu = false;
  try { vu = localStorage.getItem("llds-ouverture") === "vue"; } catch (e) {}
  if (vu) { ecran.parentNode.removeChild(ecran); return; }

  document.body.classList.add("ouverture-active");

  var scene  = ecran.querySelector(".ouverture-scene");
  var entree = ecran.querySelector(".ouverture-entree");
  var passer = ecran.querySelector(".ouverture-passer");
  var titre  = ecran.querySelector(".ouverture-titre");
  var son = new Audio("teaser.mp3");
  son.preload = "auto";

  var vignettes = [];

  function prepare() {
    MONTAGE.images.forEach(function (im) {
      var d = IMAGES[im.cle];
      var v = document.createElement("div");
      v.className = "ouverture-case";
      if (d) {
        var img = document.createElement("img");
        img.src = "ouverture/" + d.image;
        img.alt = "";
        v.appendChild(img);
      }
      scene.appendChild(v);
      vignettes.push(v);
    });
    // on précharge les premières pour que l'attaque ne saute pas
    MONTAGE.images.slice(0, 8).forEach(function (im) {
      var d = IMAGES[im.cle];
      if (d) { var p = new Image(); p.src = "ouverture/" + d.image; }
    });
  }

  var courante = -1;
  function montre(i) {
    if (i === courante) return;
    if (vignettes[courante]) vignettes[courante].classList.remove("on");
    courante = i;
    if (vignettes[i]) vignettes[i].classList.add("on");
  }

  function avance(t) {
    var k = -1;
    for (var i = 0; i < MONTAGE.images.length; i++) {
      if (MONTAGE.images[i].t <= t) k = i; else break;
    }
    montre(k);
    if (t >= MONTAGE.duree - 2.4) titre.classList.add("on");
  }

  function boucle() {
    avance(son.currentTime);
    if (!son.ended) requestAnimationFrame(boucle);
  }

  function sortir() {
    try { localStorage.setItem("llds-ouverture", "vue"); } catch (e) {}
    try { son.pause(); } catch (e) {}
    ecran.classList.add("sortie");
    document.body.classList.remove("ouverture-active");
    setTimeout(function () {
      if (ecran.parentNode) ecran.parentNode.removeChild(ecran);
    }, 900);
  }

  function lancer() {
    entree.classList.add("partie");
    prepare();
    son.addEventListener("ended", function () { setTimeout(sortir, 1500); });
    son.play().then(function () {
      requestAnimationFrame(boucle);
    }).catch(function () {
      var t0 = performance.now();
      (function sans() {
        var t = (performance.now() - t0) / 1000;
        avance(t);
        if (t < MONTAGE.duree + 1.5) requestAnimationFrame(sans); else sortir();
      })();
    });
  }

  entree.addEventListener("click", lancer);
  passer.addEventListener("click", sortir);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") sortir();
  });
})();
