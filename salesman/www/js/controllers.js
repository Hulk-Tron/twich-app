/**
 * Created by HulkTron on 2/19/2016.
 */
angular.module("starter")
  .controller("loginctrl", function($scope, $http, $state){
    //$scope.user = {};
    $scope.doLogin = function(user){
      //console.log(user)
      ////user = $scope.user;
      $http.post("http://localhost:8080/api/saleslogin", {data : user})
        .success(function(response){
          if(response.token){
            localStorage.setItem('token', response.token);
            $state.go("home");
          }
        })
        .error(function(err){
          console.log(err);
        });
    };

  })
  .controller("homectrl",function(){

    });
