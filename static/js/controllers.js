/**
 * Created by HulkTron on 2/14/2016.
 */




    angular.module('starter')
    .controller("loginCtrl", function($scope, $http, $state,$rootScope){
        //$scope.user = {};
        $scope.doLogin = function(user){
            console.log(user)
            //user = $scope.user;
            $http.post("/api/login", {data : user})
                .success(function(response){
                    if(response.token){
                        alert("Welcome Admin")
                        localStorage.setItem('token', response.token);

                        $rootScope.data=response;
                        $state.go("home");
                    }
                })

                .error(function(err){
                    alert("Wrong Details")
                    console.log(err);

                });
        };

    })









    .controller("signupCtrl", function($scope, $http, $state){
        $scope.user = {};
        $scope.signupUser = function(eve){
            $http.post("/api/signup", {data : $scope.user})
                .success(function(response){

                    console.log(response);

                    $state.go("login");
                })
                .error(function(err){
                    console.log(err);
                });
        };


    })






    .controller("homeCtrl", function($scope, $http,$state,$rootScope){
           var data = $rootScope.data;
            console.log(data)
            $scope.logout = function($scope){
               //delete localstorage;
               //  console.log(respon)
               localStorage.clear()
               //.success(function(){
                   $state.go("login");
               alert("You Are Logged Out")
               //})

               //    .error(function(err){
               //        console.log(err)
               //    })

           },
        $http.get("/api/salesmenData")
            .success(function(response){
                console.log(response.data);
                $scope.respon = response;
            })
            .error(function(){
                console.log("Error in finding User");
            });

    })






    .controller("CompanyCtrl",function($scope,$http,$state){
            $http.get("/api/comdata")
                .success(function(response){
                    //console.log(response.data);
                    //console.log(response);
                   $scope.com = response.message;
                })
                .error(function(){
                    console.log("Error in finding User");
                });



            $scope.com = {};
                //console.log(com)
            $scope.logout = function($scope){
                //delete localstorage;

                localStorage.clear()
                //.success(function(){
                $state.go("login");
                alert("You Are Logged Out")
                //})

                //    .error(function(err){
                //        console.log(err)
                //    })

            }
         $scope.SaveCompany = function(eve) {
           //console.log(com)


           $http.post("/api/company", {data: $scope.com})
            .success(function (response) {
                   //$scope.company = data;
                   console.log(response);
                   //$scope.company=response;
                   //console.log(company.CompanyName);
                   alert(" Hurrah !!! Your Data Has Been Saved ")
                   console.log(response.user)
            })
            .error(function (err) {
                console.log(err)
            })}})
        .controller("OrdersCtrl",function($scope,$state,$http){
            $http.get("/api/comdata")
                .success(function(response){
                    //console.log(response.data);
                    //console.log(response);
                    $scope.com = response.message;
                })
                .error(function(){
                    console.log("Error in finding User");
                });



            $http.get("/api/Proddata")
                .success(function(response){
                    //console.log(response.data);
                    $scope.prd = response.message
                })
                .error(function(){
                    console.log("Error in finding User");
                });



            $scope.logout = function($scope){
                //delete localstorage;

                localStorage.clear()
                //.success(function(){
                $state.go("login");
                alert("You Are Logged Out")
                //})

                //    .error(function(err){
                //        console.log(err)
                //    })

            }
            $scope.prod = {};
            $scope.ProductCreate= function () {
                $http.post("/api/prod",{data:$scope.prod})
                    .success(function(response){
                        console.log(response);
                        alert("Hurrah !!! Your Product Has Been Saved")
                    })
                    .error(function(err){
                        console.log(err)
                    })
            }
        })






        .controller("SalesmanCtrl",function($scope,$http,$state){
            $http.get("/api/salesmenData")
                .success(function(response){
                    //console.log(response.data);
                    console.log(response.message)
                    $scope.respon = response.message;
                })
                .error(function(){
                    console.log("Error in finding User");
                });
            $scope.logout = function($scope){
                //delete localstorage;

                localStorage.clear()
                //.success(function(){
                $state.go("login");
                alert("You Are Logged Out")
                //})

                //    .error(function(err){
                //        console.log(err)
                //    })

            }
            $scope.sales = {}
            $scope.CreateSalesman = function(eve) {
                //console.log(eve)
                $http.post("/api/sales", {data: $scope.sales})
                    .success(function (response) {
                        console.log(response);
                        alert("Hurrah !! Your Data Has Been Saved")

                    })
                    .error(function (err) {
                        console.log(err)
                    })}
        })
        .controller("sorderCtrl",function($scope,$state){
            $scope.logout = function($scope){
                //delete localstorage;

                localStorage.clear()
                //.success(function(){
                $state.go("login");
                alert("You Are Logged Out")
                //})

                //    .error(function(err){
                //        console.log(err)
                //    })

            }
        })