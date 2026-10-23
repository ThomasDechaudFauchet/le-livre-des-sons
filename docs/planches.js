/* ==========================================================================
   La planche et sa case — Le Livre des Sons
   Affiche la planche du livre sous le lecteur et éclaire la case que l'on
   entend. La case allumée se calcule à chaque instant depuis la position du
   lecteur : reculer, avancer ou tirer la barre recale le repère tout seul.
   Un clic sur une case déplace l'écoute dessus.

   DONNEES : une entrée par planche.
     image, largeur, hauteur : le fichier dans docs/planches/
     cases : la position de chaque case en pourcentage de l'image
     pas   : la durée d'une case en secondes, mesurée sur le fichier audio
     depart: l'instant de la première attaque
   ========================================================================== */
(function () {
  "use strict";

  var PLANCHES = {
  "012-1": {
    "image": "planche-012-1.webp",
    "largeur": 920,
    "hauteur": 1200,
    "cases": [
      {
        "x": 1.782,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 35.635,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 69.414,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 1.782,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.635,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.635,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 76.551,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      }
    ]
  },
  "012-2": {
    "image": "planche-012-2.webp",
    "largeur": 920,
    "hauteur": 1200,
    "cases": [
      {
        "x": 1.782,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 35.561,
        "y": 1.366,
        "l": 28.879,
        "h": 22.14
      },
      {
        "x": 69.414,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 1.782,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 26.466,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 51.508,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 76.551,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      }
    ]
  },
  "012-3": {
    "image": "planche-012-3.webp",
    "largeur": 920,
    "hauteur": 1200,
    "cases": [
      {
        "x": 1.782,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 35.635,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 69.414,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 1.782,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.635,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.635,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 76.551,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      }
    ]
  },
  "012-4": {
    "image": "planche-012-4.webp",
    "largeur": 920,
    "hauteur": 1200,
    "cases": [
      {
        "x": 1.782,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 35.561,
        "y": 1.366,
        "l": 28.879,
        "h": 22.14
      },
      {
        "x": 69.414,
        "y": 1.366,
        "l": 28.805,
        "h": 22.14
      },
      {
        "x": 1.782,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 26.466,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 26.466,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 51.508,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 51.508,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 1.782,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      },
      {
        "x": 35.561,
        "y": 76.551,
        "l": 28.879,
        "h": 22.083
      },
      {
        "x": 69.414,
        "y": 76.551,
        "l": 28.805,
        "h": 22.083
      }
    ]
  }
};

  var GRILLES = { "012": { pas: 4.010, depart: 0.02 } };

  var cadre  = document.getElementById("planche");
  var player = document.getElementById("player");
  var liste  = document.getElementById("trackList");
  if (!cadre || !player || !liste) return;

  var etude = cadre.getAttribute("data-etude");
  var grille = GRILLES[etude];
  if (!grille) return;

  var liens = [].slice.call(liste.querySelectorAll("a"));
  var planche = -1, courante = -1, voiles = [], cases = [];

  function pisteCourante() {
    var a = liste.querySelector("a.is-active");
    var i = a ? liens.indexOf(a) : -1;
    return i < 0 ? 0 : i;
  }

  function dessine(i) {
    var cle = etude + "-" + (i + 1);
    var d = PLANCHES[cle];
    cadre.innerHTML = "";
    voiles = []; cases = [];
    if (!d) { cadre.hidden = true; return; }
    cadre.hidden = false;
    var boite = document.createElement("div");
    boite.className = "planche-boite";
    boite.style.aspectRatio = d.largeur + " / " + d.hauteur;
    var img = document.createElement("img");
    img.src = "../../planches/" + d.image;
    img.alt = "Planche " + (i + 1) + " de l'étude " + etude;
    img.loading = "lazy";
    boite.appendChild(img);
    d.cases.forEach(function (c, k) {
      var v = document.createElement("button");
      v.type = "button";
      v.className = "planche-case";
      v.style.left = c.x + "%"; v.style.top = c.y + "%";
      v.style.width = c.l + "%"; v.style.height = c.h + "%";
      v.setAttribute("aria-label", "Case " + (k + 1));
      v.addEventListener("click", function () {
        if (player.readyState > 0) {
          try { player.currentTime = grille.depart + k * grille.pas + 0.05; } catch (e) {}
          if (player.paused) player.play().catch(function () {});
        }
        eclaire(k);
      });
      boite.appendChild(v);
      voiles.push(v); cases.push(c);
    });
    cadre.appendChild(boite);
    planche = i; courante = -1;
    eclaire(0);
  }

  function eclaire(k) {
    if (k === courante) return;
    courante = k;
    voiles.forEach(function (v, j) { v.classList.toggle("on", j === k); });
  }

  player.addEventListener("timeupdate", function () {
    if (!voiles.length) return;
    var k = Math.floor((player.currentTime - grille.depart + grille.pas * 0.02) / grille.pas);
    if (k < 0) k = 0;
    if (k > voiles.length - 1) k = voiles.length - 1;
    eclaire(k);
  });

  var veille = new MutationObserver(function () {
    var p = pisteCourante();
    if (p !== planche) dessine(p);
  });
  veille.observe(liste, { subtree: true, attributes: true, attributeFilter: ["class"] });

  dessine(pisteCourante());
})();
