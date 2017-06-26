app.controller("controller", function($scope, $http) {
    $scope.app = "Manipulador de Series";
    $scope.seriesPerfil = [];
    $scope.seriesWatchlist = [];
    $scope.tempSeries = [];
    $scope.existeSerie;
    $scope.caracteristicas;
    $scope.minhasSeries

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
            if(element.imdbID === serie.imdbID) {
                $scope.contem = true;
            } 
        }
        if(!$scope.contem) {
             $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&plot=full&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {
                 $scope.seriesPerfil.push(response.data);
            }
            function errorCallback(error) {
                alert(error);
        }} else{
            alert("A série já está no perfil.");
        }
    }

    $scope.imprimeCaracteristicas = function(serie) {
        $scope.caracteristicas = "";
        $scope.pegaCaracteristicas($scope.achaSeriePerfil(serie));
        alert($scope.caracteristicas);
    }

    $scope.pegaCaracteristicas = function(serie) {

        console.log($scope.fazRequisicao(serie));
        $scope.caracteristicas += "Título: " + " ";
        $scope.caracteristicas += serie.Title + "\n";
        $scope.caracteristicas += "Ano: " + " ";
        $scope.caracteristicas += serie.Year + "\n";
        $scope.caracteristicas += "Classificação etária: " + " ";
        $scope.caracteristicas += serie.Rated + "\n";
        $scope.caracteristicas += "Média: " + " ";
        $scope.caracteristicas += serie.imdbRating + "\n";
        $scope.caracteristicas += "Sinopse: " + " ";
        $scope.caracteristicas += serie.Plot;

        
    }

    $scope.fazRequisicao = function(serie) {
        $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&plot=full&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {
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

    $scope.achaSeriePerfil = function(serie) {
        for (var index = 0; index < $scope.seriesPerfil.length; index++) {
            var element = $scope.seriesPerfil[index];
            if (element === serie) {
                return element;
            }
            
        }
    }
    })