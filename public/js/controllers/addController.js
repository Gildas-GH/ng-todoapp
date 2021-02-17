// Contrôleur d'ajout et de modification de tâches
routeAppController.controller('addCtrl', ['$scope', '$cookies', '$window', function ($scope, $cookies, $window) {
    $scope.couleurs = couleurs;

    var elem = document.querySelector('.modal');
    $scope.modal = M.Modal.init(elem);

    console.log(tmpVal);


    // Menu sélection couleur
    $scope.toggleModal = function () {
        var modal = $scope.modal;
        modal.isOpen ? modal.close() : modal.open();
    };

    // Ajout de la couleur
    $scope.setCouleur = function (couleur) {
        $scope.tmpCouleur = couleur;
    };

    // Vérification si mode "Modification" ou non
    try {
        console.log(tmpVal);

        if (tmpVal.text !== undefined) {
            // Modification du titre et du bouton
            document.getElementById("messageNote").innerText = "Modifier la note";
            document.getElementById("buttonAdd").value = "Modifier";

            // Placement des informations de la tâches dans les inputs correspondants
            $scope.todoText = tmpVal.text;
            $scope.todoDesc = tmpVal.description;
            if (tmpVal.duree !== null)
                $scope.todoDuree = new Date(tmpVal.duree);
            else $scope.todoDuree = null;
            if (tmpVal.date !== null)
                $scope.todoDate = new Date(tmpVal.date);
            else $scope.data = null;
            $scope.todoURL = tmpVal.url;
            $scope.tmpCouleur = tmpVal.couleur;
        }
    } catch (error) {
    }

    // Suppression d'une tâche
    function remove() {
        console.log("Remove..");
        try {
            // Lecture des cookies
            let tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));
            let nb = 0;

            for (let i of tmp) {
                if (i.id === tmpVal.id) {
                    tmp.splice(nb, 1);
                    console.log("Removed" + tmpVal.id)
                }
                nb++;
            }
            // Écriture dans les cookies
            $cookies.put('values', window.btoa(unescape(encodeURIComponent(JSON.stringify(tmp)))));
            tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));
            $scope.todos = [];
            for (let i of tmp) {
                $scope.todos.push(i);
            }
        } catch (error) {
            console.log(error);
        }
    }


    // Ajout des valeurs entrées par l'utilisateur
    $scope.addValues = function () {
        let tmptab = [];

        try {
            // Test si mode "modification"
            if (tmpVal.text !== undefined) {
                remove();
            }
        } catch (error) {
        }

        try {
            // Lecture des cookies
            let tmp = JSON.parse(decodeURIComponent(escape(window.atob($cookies.get('values')))));
            for (let i of tmp) {
                tmptab.push(i);
            }

            // Ajout des valeurs
            tmptab.push({
                id: tmp[tmp.length - 1].id++,
                text: $scope.todoText,
                description: $scope.todoDesc,
                duree: $scope.todoDuree,
                date: $scope.todoDate,
                url: $scope.todoURL,
                done: false,
                couleur: $scope.tmpCouleur,
            });
        } catch (error) {
            // Si aucune tâche n'est présente (première tâche)
            tmptab.push({
                id: 0,
                text: $scope.todoText,
                description: $scope.todoDesc,
                duree: $scope.todoDuree,
                date: $scope.todoDate,
                url: $scope.todoURL,
                done: false,
                couleur: $scope.tmpCouleur,
            });
        }

        // Écriture dans les cookies
        $cookies.put('values', window.btoa(unescape(encodeURIComponent(JSON.stringify(tmptab)))));

        // Redirection vers le contrôleur de liste
        $window.location.href = '#/list';
    }
}]);