app.controller("scriptController", function ($scope, $location, $http, urlBase) {
    //Listando
    $scope.listaScript = function () {
        $http({
            method: 'GET',
            url: urlBase + 'script/'
        }).then((response) => {
            $scope.scripts = response.data;
        }, (error) => {
            //self.ocorreuErro();
            console.log(error);
        });

    }

    //Salvando
    $scope.salvar = function () {

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
    $scope.editar = function (script) {
        $scope.script = script;
        $('#modalScript').modal('show');
    }

    //Excluindo
    $scope.excluir = function (script) {
        if (confirm("Deseja realmente apagar o script de " + script.dsDescricao + "?")) {
            //dbService.update('pessoas', { ativo: 0 }, { id: dados.id });
            console.log("deletando o script: " + script.idScript);
            $scope.listaScript();
        }
    }
});