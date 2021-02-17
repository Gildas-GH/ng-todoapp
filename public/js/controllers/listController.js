// Contrôleur de la liste de tâches (accueil)
routeAppController.controller('listCtrl', ['$scope', '$cookies', '$window', function ($scope, $cookies, $window) {
    $scope.couleurs = couleurs;
    $scope.tmpCouleur = null;

    var elem = document.querySelector('.modal-action');
    $scope.actionModal = M.Modal.init(elem);

    var elem = document.querySelector('.modal-color');
    $scope.colorModal = M.Modal.init(elem);

    // Récupération des tâches enregistrées dans les cookies s'ils existent
    try {
        let tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));
        $scope.todos = [];
        for (let i of tmp) {
            $scope.todos.push(i);
        }
    } catch (error) {
        $scope.todos = [];
    }

    // Menu clic long / double clic
    $scope.actionMenu = function (todo) {
        var actionModal = $scope.actionModal;
        actionModal.isOpen ? actionModal.close() : actionModal.open();

        if (todo) $scope.url = todo.url;
        tmpVal = todo;
        console.log(tmpVal);
    };

    // Menu sélection couleur
    $scope.colorMenu = function () {
        var colorModal = $scope.colorModal;
        colorModal.isOpen ? colorModal.close() : colorModal.open();
    };

    // Ouvrir une URL dans le menu clic long / double clic
    $scope.openUrl = function () {
        $window.open(tmpVal.url);
        $scope.actionMenu(tmpVal);
    };

    // Appel du contrôleur d'ajout de tâches
    $scope.modify = function () {
        $window.location.href = '#!/add';
    };

    // FAB (Floating Action Button) -> Ajout de tâches (contrôleur)
    $scope.add = function () {
        tmpVal = null;
        $scope.tmpCouleur = null;
        $window.location.href = '#!/add';
    };

    // Suppression d'une tâche
    $scope.remove = function () {
        console.log("Remove..");
        try {
            // Lecture des cookies déjà existants
            let tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));
            let nb = 0;

            for (let i of tmp) {
                // if (i.id === $scope.tmpTodo.id) {
                if (i.id === tmpVal.id) {
                    tmp.splice(nb, 1);
                    console.log("Removed" + tmpVal.id)
                }
                nb++;
            }

            // Ré-écriture des cookies
            $cookies.put('values', window.btoa(unescape(encodeURIComponent(JSON.stringify(tmp)))));

            // Fermeture du modal
            $scope.actionMenu(tmpVal);

            // Re-lecture des cookies
            tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));

            $scope.todos = [];
            for (let i of tmp) {
                $scope.todos.push(i);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Compléter une tâche au clic
    $scope.click = function (todo) {
        todo.done = !todo.done;
        try {
            // Lecture des cookies
            let tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));
            for (let i of tmp) {
                if (i.id === todo.id) {
                    i.done = !i.done;
                }
            }
            // Écriture des cookies
            $cookies.put('values', window.btoa(unescape(encodeURIComponent(JSON.stringify(tmp)))));
        } catch (error) {
            console.log(error);
        }

    };
    
    // Ajout d'une couleur sur une tâche
    $scope.setCouleur = function (couleur) {
        $scope.tmpCouleur = couleur;
    }
}]);