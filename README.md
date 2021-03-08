TodoBosto
==

**Version 1.0.0**


## A simple AngularJS web application to manage your Todo Lists


#### Dépendances

- AngularJS
- Materialize
- Cordova
- Express.js

Pour installer l'ensemble des dépendances : `npm i`

## Utilisation

### Application web

Vous pouvez utiliser l'application de Todo List en plaçant le dossier `public` dans le dossier d'un serveur web Apache ou Nginx. Cela ne nécessite pas de configuration supplémentaire.

Un serveur web est disponible, fait avec Express. Pour le démarrer : `node index.js`

## Application mobile

La Todo List est aussi disponible sous forme d'application Android, avec Cordova.

Vous pouvez installer l'APK disponible à la racine de cette archive ou bien en générer un nouveau :

```
cd cordova
cordova build android
```

Pour créer une release, vous devez créer le fichier `build.json` dans le dossier cordova. Un fichier exemple est disponible.


#### Auteurs
- Gildas Garin-Hameline
- Thomas Cloarec
