// Fichier Contenant toutes les constantes utilisés pour le test des champs
// rentrés par l'utilisateur

module.exports = {
// User Edit
  "formatLienLinkedIn": /^https?:\/\/(?:www\.)?linkedin.com\/in\/[a-zA-Z0-9]/,
  // Capture les numéros de téléphones selon la norme E.164 (préfixée d’un plus suivi du code national et sans caractères parasites (espaces, points, tirets…))
  "formatNuméroTéléphone": /^\+[1-9][0-9]{1,14}$/,
  // Adresses I18N UTF‐8
  "formatAdresseMél": /^[a-zA-Z\p{Alphabetic}0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z\p{Alphabetic}0-9](?:[a-zA-Z\p{Alphabetic}0-9]{0,61}[a-zA-Z\p{Alphabetic}0-9])?(?:\.[a-zA-Z\p{Alphabetic}0-9](?:[a-zA-Z\p{Alphabetic}0-9]{0,61}[a-zA-Z\p{Alphabetic}0-9])?)+$/u,


}

