# portfolio-architecte (un site portfolio d’une architecte d’intérieur)

<p>J'ai mis en place un filtre pour les images dans la galerie, ainsi que la page de connexion et une modale permettant d'uploader de nouveaux médias, dans le cadre du sixième projet de ma formation en tant qu'intégrateur web chez OpenClassrooms.</p>
<p> Voici les informations nécessaires pour la connexion de l'utilisateur 👇 </p>

* **Pour exécuter le serveur**
<p>Cloner le repo en local</p>

```bash
cd Backend

npm install

npm start
```

* **Compte admin de test**
<p>email: sophie.bluel@test.tld</p>

<p>password: S0phie</p>

  
## Preview

Projet 5 - Créez une page web dynamique avec JavaScript (OpenClassrooms)

<img src="https://i.ibb.co/nwx21XM/2.png" />

## le délai de production du site
16.05.23 - 10.06.23

## Stack utilisé
JavaScript

## Point
L'objectif de ce projet était de concevoir un site dynamique en utilisant JavaScript. Au cours de ce projet, j'ai eu l'occasion d'apprendre à effectuer des requêtes vers le serveur, notamment les méthodes GET, POST et DELETE via l'API.

## Problème en réalisant ce projet
<p>Il était difficile d'implémenter le processus de conversion d'une URL d'image téléchargée par l'utilisateur en un fichier pour l'envoyer en tant que requête POST au serveur. </p>
<p>J'ai trouvé de l'aide en consultant un autre utilisateur qui avait des problèmes similaires sur Stack Overflow. </p>
<p>Grâce à cette publication, j'ai appris qu'il fallait séparer l'URL en type et en données, puis utiliser la fonction 'atob' pour décoder les données et les convertir en un tableau d'octets.</p>
