var app = angular.module("app", ["ngRoute", "routeAppController"]);

const routeAppController = angular.module('routeAppController', ['ngCookies', 'pr.longpress']);
const couleurs = ["#cfff95", "#ffff8b", "#c3fdff", "#ffc1e3", "#ffffb3", "#ffddc1", "#ffc4ff", "#ffffff"];

let tmpVal = null;

// Contrôleur général
// listCtrl : contrôleur de la liste de tâches
// addCtrl : contrôleur d'ajout de tâches
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: './partials/list.html',
                controller: 'listCtrl'
            })
            .when('/add', {
                templateUrl: './partials/add.html',
                controller: 'addCtrl'
            })
            // Redirection vers /list autrement
            .otherwise({
                redirectTo: '/list'
            });
    }
]);