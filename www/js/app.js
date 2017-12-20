


angular.module('starter', ['ionic','ngCordova', 'starter.controllers'])



.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(window.Connection){
      if(navigator.Connection.type == Connection.NONE){
        $ionicPopup.alert({
          title:'teste',
          content:'teste'
        })
      }else{
        $ionicPopup.alert({
          title:'teste',
          content:'teste'
        })

      }


    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/social/menu.html",
      controller: 'AppCtrl'
    })




    .state('app.start', {
      url: "/start",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/login.html"
        }
      }
    })

     .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/start-fullscreen.html"
        }
      }
    })


   
        .state('app.tabelas', {
      url: "/tabelas",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/tabelas.html"
        }
      }
    })

     
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/login.html",
          controller: "initLogin"
        }
      }
    })

   
    .state('app.estoque', {
      url: "/estoque",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/estoque.html",
        }
      }
    })


    .state('app.clientes', {
      url: "/clientes",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/clientes.html",
        }
      }
    })

      .state('app.editarclientes', {
      url: "/editarclientes",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/editarclientes.html",
        }
      }
    })

   

    .state('app.vendas', {
      url: "/vendas",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/vendas.html",
        }
      }
    }) 

    .state('app.sincronizar', {
      url: "/sincronizar",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/sincronizar.html",
        }
      }
    })    

    .state('app.addvenda', {
      url: "/addvenda",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/addvenda.html",
        }
      }
    })
       
      .state('app.cadastro', {
      url: "/cadastro",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/cadastro.html",
        }
      }
    })
      

         .state('app.meusdados', {
      url: "/meusdados",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/meusdados.html",
        }
      }
    })

   

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/start');
});
