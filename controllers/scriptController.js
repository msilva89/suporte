app.controller("scriptController", function ($scope, $location, $http, urlBase) {

    $scope.script = script = {};

    $scope.menus = [{
        name: 'Editar',
        event: 'editar'
    }, {
        name: 'Excluir',
        event: 'excluir'
    }]


    $scope.clickMenu = function (script, item) {
        $scope.script = angular.copy(script);
        if (item.event == 'editar')
            $scope.editar($scope.script);
        else if (item.event == 'excluir')
            $scope.excluir($scope.script);
    };

    $scope.getQuery = (script) => {
        $scope.dsQuery = script.dsQuery;
    }

    //Listando
    $scope.listaScript = () => {
        $http({
            method: 'GET',
            url: urlBase + 'script/'
        }).then((response) => {
            $scope.scripts = response.data;
        }, (error) => {
            console.log(error.data);
        });
    }

    $scope.novo = () => {
        $scope.script = script = {};
    }

    //Salvando
    $scope.salvar = () => {
        var metodo = 'POST';
        if ($scope.script.idScript) {
            metodo = 'PUT';
        }

        $http({
            method: metodo,
            url: urlBase + 'script',
            data: $scope.script
        }).then(function successCallback(response) {
            $scope.listaScript();
        }, function errorCallback(response) {
            console.log(response.data);
        });

        $scope.script = {};
        $('#modalScript').modal('hide');
    }

    //Abrindo para editar
    $scope.editar = (script) => {
        $scope.script = angular.copy(script);
        $scope.dsQuery = undefined;
        $('#modalScript').modal('show');
    }

    //Excluindo
    $scope.excluir = (script) => {
        if (confirm("Deseja realmente apagar o script de " + script.dsDescricao + "?")) {
            $http({
                method: 'DELETE',
                url: urlBase + 'script/' + script.idScript
            }).then((response) => {
                $scope.dsQuery = undefined;
                $scope.novo();
                $scope.listaScript();
            }, (error) => {
                console.log(error);
            });
        }
    }
});