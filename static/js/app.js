/**
 * Created by HulkTron on 2/14/2016.
 */
    angular.module('starter', ['ionic'])
    .config(function($stateProvider, $urlRouterProvider,$httpProvider ){


        $stateProvider
            .state("login", {
                url : "/login",
                templateUrl : "./templates/login.html",
                //method : 'jsonp',
                controller  : "loginCtrl"
            })
            .state("signup", {
                url : "/signup",
                templateUrl : "./templates/signup.html",
                //method : 'jsonp',
                controller  : "signupCtrl"
            })
            .state("home", {
                url : "/",
                templateUrl : "./templates/home.html",
                controller  : "homeCtrl",
                //method : 'jsonp',
                loginCompulsory : true
            })
            .state("company",{
                url : "/company",
                templateUrl : "./templates/company.html",
                //method : 'jsonp',
                controller : "CompanyCtrl",
                loginCompulsory : true
            })
            .state("orders",{
                url : "/orders",
                templateUrl : "./templates/orders.html",
                controller : "OrdersCtrl",
                loginCompulsory : true
               })
            .state("salesman",{
                url: "/salesman",
                templateUrl : "./templates/salesman.html",
                controller : "SalesmanCtrl",
                loginCompulsory : true
            })
            .state("sorders",{
                url: "/sorders",
                templateUrl : "./templates/sorders.html",
                controller : "sorderCtrl",
                loginCompulsory : true
            });


        $urlRouterProvider.otherwise("/");


        $httpProvider.interceptors.push('httpInterceptor');
    })
    .run(function($rootScope, $state){

        $rootScope.$on("$stateChangeStart", function(event, toState){
            firebaseLocalToken = localStorage.getItem("token");

            if(toState.loginCompulsory && !firebaseLocalToken){
                event.preventDefault();
                $state.go("login");
            }

        });
            //$scope.logout=function(){
            //    firebaseLocalToken.clear()
            //    alert("mimi")
            //}

    })
    .factory("httpInterceptor", function(){
        return {
            request : function(config){
                var token = localStorage.getItem("token");
                if(token){
                    config.url = config.url + "?token="+token;
                }
                return config;
            }
        }
    });