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
        if($scope.contem(serie, $scope.seriesPerfil)) {
            alert("A série já está no perfil.");
        } else if($scope.contem(serie, $scope.seriesWatchlist)){
            $scope.removeWatchlist(serie);
            $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&plot=full&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {
                 $scope.seriesPerfil.push(response.data);
            }
            function errorCallback(error) {
                alert(error);
            }
        } else {
            $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&plot=full&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {
                response.data.notaPessoa = "-";
                response.data.ultimoEp = "-";
                 $scope.seriesPerfil.push(response.data);
            }
            function errorCallback(error) {
                alert(error);
            }
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
    $scope.adcWatchlist = function(serie) {
        if($scope.contem(serie,$scope.seriesPerfil)) {
            alert("A série já está no perfil.");
        } else if($scope.contem(serie, $scope.seriesWatchlist)) {
            alert("A série já está na watchlist.");
        } else {
            $scope.seriesWatchlist.push(serie);
        }
    }

    $scope.contem = function(serie, lista) {
        var contem = false;
        for (var index = 0; index < lista.length; index++) {
            var element = lista[index];
            if(element.imdbID === serie.imdbID) {
                var contem = true;
            } 
        }
        return contem;
    }
    
    $scope.removeWatchlist = function(serie) {
        var posicaoSerie = $scope.seriesWatchlist.indexOf(serie);
        $scope.seriesWatchlist.splice(posicaoSerie, 1);
    }

    $scope.existeSeriePerfil = function() {
        return $scope.seriesPerfil.length !== 0;
    }

    $scope.existeSerieWatchlist = function() {
        return $scope.seriesWatchlist.length !== 0;
    }

     $scope.mudaEpisodio = function(serie, episodio) {
      for (var index = 0; index < $scope.seriesPerfil.length; index++) {    
            if ($scope.seriesPerfil[index].imdbID === serie.imdbID) {
                $scope.seriesPerfil[index].ultimoEp = episodio;
            }
            
        }
    }

     $scope.mudaNota = function(serie, nota) {
      for (var index = 0; index < $scope.seriesPerfil.length; index++) {    
            if ($scope.seriesPerfil[index].imdbID === serie.imdbID) {
                $scope.seriesPerfil[index].notaPessoa = nota;
            }
            
        }
    }

    
})