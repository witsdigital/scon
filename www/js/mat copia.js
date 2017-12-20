  var app = angular.module('starter.controllers', ['ionic', 'ngCordova', 'ion-gallery']);

  app.service('todoListService', function() {



});

  var path = "http://localhost/simsisgestor/";
  var cod = null;
  var cod2 = null;




  app.config(function (ionGalleryConfigProvider) {
   ionGalleryConfigProvider.setGalleryConfig({
    action_label: 'Fechar',
    toggle: false,
    row_size: 3,
    fixed_row_size: true
  });
 });

  app.controller('AppCtrl', function ($cordovaNetwork, $ionicSideMenuDelegate,todoListService, $ionicLoading, DBLocalLoginDeUsuario, $scope, $ionicModal, $timeout, $http, Data, $ionicPopup, $cordovaSocialSharing, $ionicSlideBoxDelegate, $window) {




  document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    
    var notificationOpenedCallback = function(jsonData) {
      console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal.init("cbd8723d-a25d-452d-a070-03d144157fcd",
     {googleProjectNumber: "864971020131"},
     notificationOpenedCallback);
    
    // Show an alert box if a notification comes in when the user is in your app.
    window.plugins.OneSignal.enableInAppAlertNotification(true);
  }, false);


  document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    if($cordovaNetwork.isOnline()){


    }
    if($cordovaNetwork.isOffline()){


      var alertPopup = $ionicPopup.alert({
       title: 'Sem Conexão',
       template: '<div align="center">Não foi possivel conectar!</div>',
       cssClass: 'danger'
     });

      alertPopup.then(function (res) {


      });




    }



    



      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        var onlineState = networkState;
        alert();

      })

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        var offlineState = networkState;
      })

    }, false);


  $scope.onDrag = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }


  $scope.sair = function () {



    $ionicLoading.show({
     content: 'Loading',
     animation: 'fade-in',
     showBackdrop: true,
     maxWidth: 200,
     showDelay: 0
   });

    $timeout(function () {
     $ionicLoading.hide();
     DBLocalLoginDeUsuario.db.transaction(function (res) {

      res.executeSql("DELETE FROM pacientes WHERE nome = ?;", [$scope.dadosuser.nome]);
      $scope.statuslogado = false;
      $window.location.reload();
      location.hash = '#/app/start';

    });

   }, 2000);




  }

  $scope.teste = function () {
    DBLocalLoginDeUsuario.initLogin();
    var ind = null;

    DBLocalLoginDeUsuario.db.transaction(function (res) {
     var q = "SELECT count(*) as total,nome FROM users";
     res.executeSql(q, null, function (i, data) {
      ind = data.rows.item(0).total;

    });

     var q2 = "SELECT * FROM users";
     res.executeSql(q2, null, function (i, data) {
      $scope.dadosuser = data.rows.item(ind - 1);
      $scope.imguser = path + data.rows.item(ind - 1).imgtumb;

      $scope.statuslogado = true;
    });


   });
  }

  DBLocalLoginDeUsuario.initLogin();
  var ind = null;

  DBLocalLoginDeUsuario.db.transaction(function (res) {
    var q = "SELECT count(*) as total,nome FROM users";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;

   });

    var q2 = "SELECT * FROM users";
    res.executeSql(q2, null, function (i, data) {
     $scope.dadosuser = data.rows.item(ind - 1);
     $scope.imguser = path + data.rows.item(ind - 1).imgtumb;
     cod2 = data.rows.item(ind - 1).id;

     $scope.statuslogado = true;
   });


  });




  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500,
  }

  $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
          // data.slider is the instance of Swiper
          $scope.slider = data.slider;
        });

  $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
          // note: the indexes are 0-based
          $scope.activeIndex = data.slider.activeIndex;
          $scope.previousIndex = data.slider.previousIndex;
        });


  $scope.url = path;
  $http.get(path + "slides/getapp").success(function (result) {

    $scope.lista = result;


  });




});


  app.controller("initLogin", function ($ionicPopup,$cordovaVibration, $window, $scope, Data, $ionicModal, $location, DBLocalLoginDeUsuario) {
   $scope.loginPg = "Login";


   $scope.loginUsuario = function (login) {
    Data.loginData(login).success(function (data) {

     if (data.permissao === false) {
      console.log(data);
      $cordovaVibration.vibrate(100);
      var alertPopup = $ionicPopup.alert({
       title: 'NEGADO',
       template: '<div align="center">Não foi possivel fazer o login!</div>',
       cssClass: 'danger'
     });

      alertPopup.then(function (res) {


      });
    }
    if (data.permissao === true) {
    


      DBLocalLoginDeUsuario.initLogin();

      var alertPopup = $ionicPopup.alert({
       title: 'Sucesso',
       template: '<div align="center">Bem Vindo!</div>',
       cssClass: 'balanced'
     });

      alertPopup.then(function (res) {


      });


      DBLocalLoginDeUsuario.db.transaction(function (req) {
       req.executeSql("INSERT INTO users (nome, login, endereco, cidade, email, telefone, imgtumb, id) VALUES(?,?,?,?,?,?,?,?);", [data.nome, data.login, data.endereco, data.cidade, data.email, data.telefone, data.imgtumb, data.id]);


       $scope.teste();
       location.hash = '#/app/start';
     });
    }
  });

  };

});


  // fim  unidade

  app.controller('unidades', function (DBLocalLoginDeUsuario, $cordovaSocialSharing, $window, $timeout, $ionicLoading, $ionicModal, $scope, $http, Data) {
  



  DBLocalLoginDeUsuario.initLogin();  
  var ind = null;




  $scope.linkgerado = false;


  $scope.deletamat = function(idmat){

     DBLocalLoginDeUsuario.db.transaction(function (res) {

      res.executeSql("DELETE FROM matricula WHERE _id = ?;", [idmat]);
     
      this.carrega();


    });
  }


var qtddados = false;

carrega = function(){

  DBLocalLoginDeUsuario.db.transaction(function (res) {
    var q = "SELECT count(*) as total FROM matricula";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;
 if(ind == 0){
$window.location.reload();
   window.location.href = '#/app/start';


 }

   });



    var q2 = "SELECT * FROM matricula";
    res.executeSql(q2, null, function (i, data) {
     $scope.dd = data.rows.item(ind - 1);
     var dadd = [];
     var total = 0;

     for(var i=0; i<ind;i++){
      dadd[i] = data.rows.item(i);
     total = parseInt(total) + parseInt(dadd[i].valor);

     }


   
  


Data.pagMatricula(total).success(function (data) {
      var retorno = [];
      retorno = data;
     $scope.linkpag = data;
     
    
      }).error(function (data) {

   });


 $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
    showBackdrop: true,
    maxWidth: 500,
    showDelay: 0
  });
  $timeout(function () {
    $ionicLoading.hide();

    $scope.linkgerado = true;
     $scope.totalfatura = total;
$scope.matriculas = dadd;
   
  }, 500);






    
    
console.log(  $scope.matriculas );
    
   });


  });
  $scope.$broadcast('scroll.refreshComplete');

}





$scope.doRefresh = function(){

  DBLocalLoginDeUsuario.db.transaction(function (res) {
    var q = "SELECT count(*) as total FROM matricula";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;


   });

    var q2 = "SELECT * FROM matricula";
    res.executeSql(q2, null, function (i, data) {
     $scope.dd = data.rows.item(ind - 1);
     var dadd = [];
     var total = 0;

     for(var i=0; i<ind;i++){
      dadd[i] = data.rows.item(i);
     total = parseInt(total) + parseInt(dadd[i].valor);

     }


   
  


Data.pagMatricula(total).success(function (data) {
      var retorno = [];
      retorno = data;
     $scope.linkpag = data;
     
    
      }).error(function (data) {
     alert(data);
   });


 $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
    showBackdrop: true,
    maxWidth: 500,
    showDelay: 0
  });
  $timeout(function () {
    $ionicLoading.hide();

    $scope.linkgerado = true;
     $scope.totalfatura = total;
$scope.matriculas = dadd;
   
  }, 2000);






    
    
console.log(  $scope.matriculas );
    
   });


  });
  $scope.$broadcast('scroll.refreshComplete');

}



  
  

  DBLocalLoginDeUsuario.db.transaction(function (res) {
    var q = "SELECT count(*) as total FROM matricula";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;


   });

    var q2 = "SELECT * FROM matricula";
    res.executeSql(q2, null, function (i, data) {
     $scope.dd = data.rows.item(ind - 1);
     var dadd = [];
     var total = 0;

     for(var i=0; i<ind;i++){
      dadd[i] = data.rows.item(i);
     total = parseInt(total) + parseInt(dadd[i].valor);

     }


   
  


Data.pagMatricula(total).success(function (data) {
      var retorno = [];
      retorno = data;
     $scope.linkpag = data;
     
    
      }).error(function (data) {
     alert(data);
   });


 $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
    showBackdrop: true,
    maxWidth: 500,
    showDelay: 0
  });
  $timeout(function () {
    $ionicLoading.hide();

    $scope.linkgerado = true;
     $scope.totalfatura = total;
$scope.matriculas = dadd;
   
  }, 2000);






    
    
console.log(  $scope.matriculas );
    
   });


  });




   $scope.compartilhar = function () {
    $cordovaSocialSharing.share("This is your message", "Baixe nosso aplicativo", "http://inebmed.com.br/uploads/mobile_share.jpg", "https://goo.gl/CaXPmb");
  }


  $scope.compartilhar_whatsapp = function () {

    var message = " Baixe nosso aplicativo: ";
    var subject = "12345";
    var image = "http://inebmed.com.br/uploads/mobile_share.jpg";
    var link = "https://goo.gl/CaXPmb";

    $cordovaSocialSharing
    .shareViaWhatsApp(message, image, link)
    .then(function (result) {
                      // Success!
                    }, function (err) {
                      // An error occurred. Show a message to the user
                    });

  }


  $scope.teste = "dsds";
  $ionicModal.fromTemplateUrl(' templates/social/endereco.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

      // Triggered in the login modal to close it
      $scope.closeLogin = function () {
       $scope.modal.hide();
     };




      // Open the login modal
      $scope.verEnd = function () {
       $scope.modal.show();
     };






   });

  app.controller('mapa', function ($state, $window, $timeout, $ionicLoading, $ionicModal, $scope, $http, Data) {

   $scope.teste = "dsds";
   $ionicModal.fromTemplateUrl(' templates/social/endereco.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

      // Triggered in the login modal to close it
      $scope.closeLogin = function () {
       $scope.modal.hide();
     };




      // Open the login modal
      $scope.verEnd = function () {
       $scope.modal.show();
     };



     $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });


     $timeout(function () {
       $ionicLoading.hide();
       var myLatlng = new google.maps.LatLng(-14.2054572,-41.6774084);

       var mapOptions = {
        center: myLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disabledDefaultUI: true
      };
      var  element = document.getElementById('map');
      var  map = new google.maps.Map(element,mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        title:"INEB",
        icon: 'img/menu/icon_map_logo.png',
        animation: google.maps.Animation.DROP,

        infoWindow: {
          content: '<h6>CasaShop</h6> <p>Avenida Bartolomeu de gusmão</p>'
        }
      });
      marker.setMap(map);




      $scope.map = map;



    }, 2000);









   });




  app.controller('perfil', function ($scope, $http, Data) {


  });

  app.controller('exames', function (DBLocalLoginDeUsuario, $scope, $http, Data,$ionicLoading, $timeout) {

   $scope.url = path;

   DBLocalLoginDeUsuario.initLogin();
   var ind = null;

   DBLocalLoginDeUsuario.db.transaction(function (res) {
    var q = "SELECT count(*) as total,nome FROM pacientes";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;

   });

    var q2 = "SELECT * FROM pacientes";
    res.executeSql(q2, null, function (i, data) {
     cod2 = data.rows.item(ind - 1).id;

     $http.get(path + "exames/getappid/" + cod2).success(function (result) {
      console.log(result);
      $scope.lista = result;




    });




   });


    $ionicLoading.show({
     content: 'Loading',
     animation: 'fade-in',
     showBackdrop: true,
     maxWidth: 200,
     showDelay: 0
   });

    $timeout(function () {
     $ionicLoading.hide();
     $scope.ativo = true;
   }, 2000);







  });


   $scope.openPDF = function () {
    $cordovaFileOpener2.open(
                  'http://localhost/ineb/uploads/exames/26/janeiro/12-01-17.pdf', // Any system location, you CAN'T use your appliaction assets folder
                  'application/pdf'
                  ).then(function () {
                    console.log('Success');
                  }, function (err) {
                    console.log('An error occurred: ' + JSON.stringify(err));
                  });
                };





              });

  app.controller('examesview', function ($scope, $http, Data) {




  });


  app.controller('dicas', function ($scope, $http, Data) {

      $scope.dicas = []; // declara array

      var getDicas = function () {

       var params = {
        counter: $scope.dicas.length,
        token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
      };

      Data.getDicas(params).success(function (data) {
        $scope.dicas = data;
        console.log(data);
      }).error(function (data) {
       $scope.msg = "Sem dados";
     });

    };
    getDicas();

  });


  app.controller('getDica', function ($scope, $http, Data, $ionicLoading, $timeout) {
   $scope.setId = function (id) {
    cod = id;
  }

      $scope.n = []; // declara array


      // #################### atualiza view ###########################

      $scope.doRefresh = function () {

       var getDicas = function () {


        var params = {
         token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
       };

       Data.getDicas(params).success(function (data) {
         $scope.url = path;
         $scope.n = data;
         console.log(data);
       }).error(function (data) {
         console.log(data);
       });

     };
     getDicas();

     $scope.$broadcast('scroll.refreshComplete');
     $ionicLoading.hide();

   };
      // #################### END atualiza view ###########################



      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });

      $timeout(function () {
       $ionicLoading.hide();
       var getDicas = function () {


        var params = {
         token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
       };

       Data.getDicas(params).success(function (data) {
         $scope.url = path;
         $scope.n = data;
         console.log(data);
       }).error(function (data) {
         console.log(data);
       });

     };
     getDicas();
   }, 2000);

    });
  app.controller('getDicaOne', function ($scope, $http, Data) {

      $scope.n = []; // declara array

      var getDicas = function () {


       var params = {
        id: cod,
        token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
      };

      Data.getDicasOne(params).success(function (data) {
        $scope.url = path;
        $scope.n = data;
        console.log(data);
      }).error(function (data) {
        console.log(data);
      });

    };
    getDicas();

  });

  // ------------------------------- fim dicas

  app.controller('getNew', function ($scope, $http, Data, $ionicLoading, $timeout) {
   $scope.setId = function (id) {
    cod = id;
  }

      $scope.n = []; // declara array



      // #################### atualiza view ###########################

      $scope.doRefresh = function () {
       $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

       var getNews = function () {
        var params = {
         token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
       };
       Data.getNews(params).success(function (data) {
         if (!data) {


         }
         $scope.url = path;
         $scope.n = data;
         console.log(data);

       }).error(function (data) {
         console.log(data);
       });
     };

     getNews();


     $scope.$broadcast('scroll.refreshComplete');
     $ionicLoading.hide();


   };
      // #################### END atualiza view ###########################

      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });


      $timeout(function () {
       $ionicLoading.hide();
       var getNews = function () {
        var params = {
         token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
       };
       Data.getNews(params).success(function (data) {

         $scope.url = path;
         $scope.n = data;

       }).error(function (data) {
         $scope.msg = "Sem dados";


       });
     };
     getNews();


   }, 2000);

    });

  app.controller('getNewOne', function ($scope, $http, Data, $cordovaSocialSharing) {

   $scope.compartilhar = function (data) {
    var message = data.titulo;
    var subject = "12345";
    var image = "http://www.inebmed.com.br/uploads/img/logo_ineb.png";
    var link = "http://www.inebmed.com.br";

    $cordovaSocialSharing
                  .share(message, image, link) // Share via native share sheet
                  .then(function (result) {
                      // Success!
                    }, function (err) {
                      // An error occured. Show a message to the user
                    });
                }

                $scope.compartilhar_whatsapp = function (data) {

                  var message = data.titulo + " clique e conheça. ";
                  var subject = "12345";
                  var image = path + data.img;
                  var link = "http://www.inebmed.com.br/portal/noticia/" + data.id;

                  $cordovaSocialSharing
                  .shareViaWhatsApp(message, image, link)
                  .then(function (result) {
                      // Success!
                    }, function (err) {
                      // An error occurred. Show a message to the user
                    });

                }

                $scope.compartilhar_facebook = function (data) {

                  var message = data.titulo;
                  var subject = "12345";
                  var image = "http://www.inebmed.com.br/uploads/img/logo_ineb.png";
                  var link = "http://www.inebmed.com.br";

                  $cordovaSocialSharing
                  .shareViaFacebook(message, image, link)
                  .then(function (result) {
                      // Success!
                    }, function (err) {
                      // An error occurred. Show a message to the user
                    });

                }
      $scope.n = []; // declara array

      var getNewsone = function () {
       var params = {
        id: cod,
        token: "1f3d2gs3f2fg3as2fdg3re2t1we46er45"
      };

      Data.getNewsOne(params).success(function (data) {
        $scope.url = path;
        $scope.n = data;
        console.log(data);
      }).error(function (data) {
        console.log(data);
      });

    };
    getNewsone();

  });


  app.controller('getNews', function ($scope, $http, $timeout, $ionicLoading) {
   $scope.url = path;
   $scope.setId = function (id) {
    cod = id;
  }

      // #################### atualiza view ###########################

      $scope.doRefresh = function () {

          $scope.url = path; // caminho das imagens

          $http.get(path + "noticia/getapp").success(function (result) {
           console.log(result);
           $scope.lista = result;
           $scope.$broadcast('scroll.refreshComplete');
           $ionicLoading.hide();
         });

        };
      // #################### END atualiza view ###########################
      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });
      $http.get(path + "noticia/getapp").success(function (result) {
       console.log(result);
       $scope.lista = result;
       $ionicLoading.hide();
     });
    });

  app.controller('getConvenios', function ($scope, $http, $timeout, $ionicLoading) {
   $scope.myActiveSlide = 1;
      // #################### atualiza view ###########################

      $scope.doRefresh = function () {

          $scope.url = path; // caminho das imagens

          $http.get(path + "convenios/getapp").success(function (result) {
           console.log(result);
           $scope.lista = result;
           $scope.$broadcast('scroll.refreshComplete');
           $ionicLoading.hide();
         });

        };
      // #################### END atualiza view ###########################
      $scope.url = path;
      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });
      $scope.lista = [];
      $http.get(path + "convenios/getapp").success(function (result) {
       console.log(result);
       $scope.lista = result;
       $ionicLoading.hide();
     })

    });

  app.controller('getEventos', function ($scope, $http, $timeout, $ionicLoading) {

      $scope.setId = function (id) { // pega o codigo do especialista e leva para viewunico
       cod = id;
     }
     $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...'
       

     });
     $scope.url = path;
     $http.get(path + "eventos/getapp").success(function (result) {
       console.log(result);
       $scope.lista = result;
       $scope.ativo = true;
       $ionicLoading.hide();
     })
   });

  app.controller('getEvento', function ($scope, $http, $timeout, $ionicLoading) {
   $http.get(path + "eventos/getappimg/" + cod).success(function (result) {
    console.log(result);
    $scope.items = []
    $scope.items = result;
    $ionicLoading.hide();
  })
   $scope.items = []
 });



 app.controller('meusdados', function ($scope, $http, $timeout, $ionicLoading) {
   $http.get(path + "eventos/getappimg/" + cod).success(function (result) {
    console.log(result);
    $scope.items = []
    $scope.items = result;
    $ionicLoading.hide();
  })
   $scope.items = []
 });


 app.controller('cadastro', function ($ionicPopup, $scope, $http, $timeout, $ionicLoading, Data) {


  $scope.cadastrar = function (cadastro) {
   Data.setCadastro(cadastro).success(function (data) {
     console.log(data);

    if(data[0].msg == 1){
      var alertPopup = $ionicPopup.alert({
        title: '<strong>Erro!</strong>',
        template: '<div align="center">Registro Duplicado</div>',
        cssClass: 'assertive',
         buttons: [
      { text: 'Fechar', type: 'button-assertive' },

     ]




      });

      alertPopup.then(function (res) {
       
        location.hash = '#/app/cadastro';
      });

    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Sucesso',
        template: '<div align="center">Cadastrado com sucesso</div>',
        cssClass: 'balanced'
      });

      alertPopup.then(function (res) {
        delete $scope.cadastro;
        location.hash = '#/app/login';
      });
    }


   }).error(function (data) {
   
     console.log(data);
   });

 };

 });


  app.controller('matricula', function ( $window, $scope, $http, $ionicPopup, $timeout, $ionicLoading, Data,DBLocalLoginDeUsuario) {







   $scope.lista = [];
   $http.get(path + "cursos/getapp").success(function (result) {

     $scope.lista = result;
     console.log($scope.lista);
   })

   $scope.getIndice = function(ind){

 
   }

   

   $scope.preagendar = function (cadastro) {
   

    var now = new Date;
    cadastro.matricula = Math.floor(Math.random() * 99999  )+now.getDay() ;
     cadastro.usuario = $scope.dadosuser.id;
     var indice = cadastro.curso; 
     
     cadastro.curso = $scope.lista[cadastro.curso].id;


    Data.setMatricula(cadastro).success(function (data) {
      var retorno = [];
      retorno = data;




      DBLocalLoginDeUsuario.db.transaction(function (req) {
       req.executeSql("INSERT INTO matricula (nome, valor, data, curso, descricao, palestrante, id) VALUES(?,?,?,?,?,?,?);", [$scope.lista[indice].titulo,$scope.lista[indice].valor, $scope.lista[indice].data, $scope.lista[indice].id, $scope.lista[indice].descricao,$scope.lista[indice].palestrante, $scope.dadosuser.id]);

   


       $scope.teste();

     });


      var alertPopup = $ionicPopup.alert({
        title: 'Sucesso',
        template: '<div align="center">Matricula realizada com sucesso</div>',
        cssClass: 'balanced'
      });

      alertPopup.then(function (res) {
        delete $scope.cadastro;
        
      window.location.href = '#/app/unidades';
      });

    }).error(function (data) {
     alert(data);
   });
  };
});




  app.controller('getEspecialista', function ($scope, $http, $timeout, $ionicLoading) {
   $scope.url = path;
      $scope.setId = function (id) { // pega o codigo do especialista e leva para viewunico
       cod = id;
     }
     $scope.doRefresh = function () {
          $scope.url = path; // caminho das imagens
          $http.get(path + "especialista/getapp").success(function (result) {
           console.log(result);
           $scope.lista = result;
           $scope.$broadcast('scroll.refreshComplete');
           $ionicLoading.hide();
         });
        };
      // #################### END atualiza view ###########################

      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });

      $timeout(function () {
       $ionicLoading.hide();
       var getEspec = function () {

        $http.get(path + "especialista/getapp").success(function (result) {
         console.log(result);
         $scope.lista = result;
         $scope.ativo = true;


       }).error(function (data) {
        $scope.msg = "Sem dados";
      });

     };
     getEspec();
   }, 2000);










    });



  app.controller('getEspecialistaone', function ($scope, $http, $timeout, $ionicLoading) {
   $scope.doRefresh = function () {
   }
   $scope.url = path;
   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
   $http.get(path + "especialista/getappid/" + cod).success(function (result) {
    console.log(result);
    $scope.lista = result;
    $scope.ativo = true;
    $ionicLoading.hide();
  });
 });










