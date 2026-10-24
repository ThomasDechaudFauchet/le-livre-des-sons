/* ==========================================================================
   Le bouton de partage — Le Livre des Sons

   Sur téléphone, il ouvre la feuille de partage du système : le visiteur
   envoie la page où il veut, et le lien emporte avec lui son titre et sa
   vignette, puisque chaque page porte ses propres métadonnées.

   Sur ordinateur, cette feuille n'existe pas dans la plupart des
   navigateurs : le bouton copie alors l'adresse et le dit.
   ========================================================================== */
(function () {
  "use strict";

  var titre = document.title;
  var desc = (document.querySelector('meta[name="description"]') || {}).content || "";
  var url = (document.querySelector('meta[property="og:url"]') || {}).content
         || location.href.split("#")[0];

  var bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "partage";
  bouton.textContent = "Partager";

  var dit = null;
  function annonce(texte) {
    bouton.textContent = texte;
    clearTimeout(dit);
    dit = setTimeout(function () { bouton.textContent = "Partager"; }, 2400);
  }

  bouton.addEventListener("click", function () {
    if (navigator.share) {
      navigator.share({ title: titre, text: desc, url: url })
        .catch(function () {});       // le visiteur a refermé la feuille
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(function () { annonce("Lien copié"); })
        .catch(function () { montreLien(); });
      return;
    }
    montreLien();
  });

  /* Dernier recours : on affiche l'adresse, sélectionnée, à copier à la main. */
  function montreLien() {
    var champ = document.createElement("input");
    champ.className = "partage-lien";
    champ.value = url;
    champ.readOnly = true;
    bouton.parentNode.insertBefore(champ, bouton.nextSibling);
    champ.focus(); champ.select();
    champ.addEventListener("blur", function () {
      if (champ.parentNode) champ.parentNode.removeChild(champ);
    });
  }

  /* Sur une page d'étude, le bouton se place en haut à droite, dans
     l'en-tête : c'est là qu'on le cherche, et la navigation du bas reste
     réservée au parcours entre les études. Au sommaire, il reste sous le
     titre, où il y a la place. */
  var hote = document.querySelector("body.page-etude header")
          || document.querySelector(".enseigne")
          || document.querySelector("nav");
  if (hote) hote.appendChild(bouton);
})();
