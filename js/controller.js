app.controller("controller", function($scope, $http) {
    $scope.app = "Manipulador de Series";
    $scope.seriesPerfil = [];
    $scope.seriesWatchlist = [];
    $scope.tempSeries = [];
    $scope.existeSerie;

    $scope.pesquisarSerie = function(serie) {

        $http.get("http://www.omdbapi.com/?s="+serie+"&type=series&apikey=93330d3c").then(successCallback, errorCallback);
            $scope.existeSerie = false;
       
            function successCallback(response) {
                console.log($scope.seriesPerfil);
            
                if(response.data.Response === "False") {
                    alert("Série não encontrada!");
                } else {
                    $scope.tempSeries = response.data.Search;
                    console.log($scope.tempSeries);
                    $scope.existeSerie = true;
                }
            }
            function errorCallback(error) {
                alert("erro");
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
    
    })