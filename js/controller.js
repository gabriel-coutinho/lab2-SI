app.controller("controller", function($scope, $http) {
    $scope.app = "Manipulador de Series";
    $scope.seriesPerfil = [];
    $scope.seriesWatchlist = [];
    $scope.tempSeries = [];
    $scope.existeSerie;
    $scope.caracteristicas;
    $scope.requisicao;

    $scope.pesquisarSerie = function(serie) {

        $http.get("http://www.omdbapi.com/?s="+serie+"&type=series&apikey=93330d3c").then(successCallback, errorCallback);
            $scope.existeSerie = false;
       
            function successCallback(response) {
            
                if(response.data.Response === "False") {
                    alert("Série não encontrada!");
                } else {
                    $scope.tempSeries = response.data.Search;
                    $scope.existeSerie = true;
                }
            }
            function errorCallback(error) {
                alert(error);
            }

    }

    $scope.adcPerfil = function(serie) {
        $scope.contem = false;
        $scope.i = 0;
        for (var index = 0; index < $scope.seriesPerfil.length; index++) {
            var element = $scope.seriesPerfil[index];
            if(element === serie) {
                $scope.contem = true;
            } 
        }
        if(!$scope.contem) {
            $scope.seriesPerfil.push(serie);
        } else{
            alert("A série já está no perfil.");
        }
    }

    $scope.imprimeCaracteristicas = function(serie) {
        $scope.caracteristicas = "";
        $scope.pegaCaracteristicas(serie);
        alert($scope.caracteristicas);
    }

    $scope.pegaCaracteristicas = function(serie) {

        console.log($scope.fazRequisicao(serie));
        $scope.caracteristicas += "Título: " + " ";
        $scope.caracteristicas += $scope.fazRequisicao(serie).Title + "\n";
        $scope.caracteristicas += "Ano: " + " ";
        $scope.caracteristicas += serie.Year + "\n";
        $scope.caracteristicas += "Classificação etária: " + " ";
        
        $scope.caracteristicas += "Sinopse: " + " ";
        
    }

    $scope.fazRequisicao = function(serie) {
        $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&type=series&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {
                console.log(response.data);
                return response.data;
            }
            function errorCallback(error) {
                alert(error);
            }
    }

    $scope.removePerfil = function(serie) {
        var resposta=confirm("Deseja realmente excluir a série?");
        if (resposta==true) {
            $scope.removeSeriePerfil(serie);
        }
    }

    $scope.removeSeriePerfil = function(serie) {
        var posicaoSerie = $scope.seriesPerfil.indexOf(serie);
        $scope.seriesPerfil.splice(posicaoSerie, 1);
    }
    })