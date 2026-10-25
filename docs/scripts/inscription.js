/* ==========================================================================
   L'inscription — Le Livre des Sons

   Le formulaire est envoyé en arrière-plan : le visiteur reste sur la page
   et voit sa confirmation sur place, au lieu d'être expédié sur l'écran du
   prestataire. Si l'envoi en arrière-plan échoue — réseau coupé, service
   indisponible — le formulaire part normalement, comme un formulaire de
   toujours. Dans les deux cas l'adresse arrive.

   AVANT LA MISE EN LIGNE : remplacer l'adresse d'envoi dans l'attribut
   action du formulaire, dans index.html. Tant qu'elle contient ADRESSE_A_
   REMPLACER, le bouton le dit au lieu d'envoyer dans le vide.
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("inscription");
  if (!form) return;
  var etat = form.querySelector(".inscription-etat");
  var bouton = form.querySelector("button");
  var champ = form.querySelector('input[type="email"]');

  function dit(texte, classe) {
    etat.textContent = texte;
    etat.className = "inscription-etat" + (classe ? " " + classe : "");
  }

  form.addEventListener("submit", function (e) {
    var cible = form.getAttribute("action") || "";
    if (cible.indexOf("ADRESSE_A_REMPLACER") !== -1) {
      e.preventDefault();
      dit("Le formulaire n'est pas encore relié à son service d'envoi.", "souci");
      return;
    }
    if (!champ.value || champ.validity.typeMismatch) return;   // le navigateur s'en charge

    e.preventDefault();
    bouton.disabled = true;
    dit("Envoi…");

    fetch(cible, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.querySelector(".inscription-champs").hidden = true;
      dit("C'est noté. Vous serez prévenu de la parution.", "merci");
    }).catch(function () {
      bouton.disabled = false;
      dit("L'envoi n'a pas abouti. Réessayez, ou écrivez-moi directement.", "souci");
    });
  });
})();
