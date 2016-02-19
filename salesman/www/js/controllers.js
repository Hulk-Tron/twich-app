/**
 * Created by HulkTron on 2/19/2016.
 */
angular.module("starter")
  .controller("loginctrl", function($scope, $http, $state){
    //$scope.user = {};
    $scope.doLogin = function(user){
      //console.log(user)
      ////user = $scope.user;
      $http.post("http://localhost:8080/api/salesmanlogin", {data : user})
        .success(function(response){

            $state.go("home");

        })
        .error(function(err){
          console.log(err);
        });
    };

  })
  .controller("homectrl",function($http,$scope){
    $http.get("http://localhost:8080/api/Proddata")
      .success(function(response){
        //console.log(response.data);
        //console.log(response);
        $scope.com = response.message;
      })
      .error(function(){
        console.log("Error in finding User");
      });

    });
