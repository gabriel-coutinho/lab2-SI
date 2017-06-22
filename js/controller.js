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
                console.log(response);
            
                if(response.data.Response === "False") {
                    alert("Série não encontrada!");
                } else {
                    $scope.tempSeries = response.data.Search;
                    console.log($scope.tempSeries);
                    $scope.existeSerie = true;
                }
            }
            function errorCallback(error) {
                console.log("erro");
            }





            }
    })