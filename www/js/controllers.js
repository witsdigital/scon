  var app = angular.module('starter.controllers', ['ionic', 'ngCordova', 'ion-gallery','ionic-modal-select']);
  app.service('meuService', function(DBLocal,$ionicLoading, daoUser,daoSinc, $cordovaNetwork, $ionicPopup, daoRepresentante, $rootScope, daoProduto, daoPedido) {
    var valor1 = '1';

    this.startSessao = function(){

      var ind = null;

      DBLocal.db.transaction(function (res) {
        var q = "SELECT count(*) as total,nome FROM users";
        res.executeSql(q, null, function (i, data) {
         ind = data.rows.item(0).total;

       });

        var q2 = "SELECT * FROM users";
        res.executeSql(q2, null, function (i, data) {
          $rootScope.dadosuser = data.rows.item(ind - 1);

          cod2 = data.rows.item(ind - 1).id;

          $rootScope.statuslogado = true;
        });
      });
    }
    this.realoadCidades  = function(){
     var get = daoSinc.getCidades(function(data){
      $rootScope.cidades = data;
      if(data.length == 0){
        var myPopup = $ionicPopup.show({

          title: 'Sincronização necessária',


          buttons: [


          {
            text: '<b>Sincronizar</b>',
            type: 'button-calm',
            onTap: function(e) {

             location.hash = '#/app/sincronizar';

           }
         }
         ]
       });

      }
    });
   }

   this.reloadVendas = function(){




    $rootScope.listaVendas = [];
    var get =  daoPedido.getPedidos(function(data){
     $rootScope.listaVendas = data;
     
   });



  }



  this.getDataatual = function(){
    data = new Date();
    dia = data.getDate();
    mes = data.getMonth()+1;
    ano = data.getFullYear();

    meses = new Array(12);

    meses[0] = "Janeiro";
    meses[1] = "Fevereiro";
    meses[2] = "Março";
    meses[3] = "Abril";
    meses[4] = "Maio";
    meses[5] = "Junho";
    meses[6] = "Julho";
    meses[7] = "Agosto";
    meses[8] = "Setembro";
    meses[9] = "Outubro";
    meses[10] = "Novembro";
    meses[11] = "Dezembro";

    return dia+'/'+mes+'/'+ano;
  }

  this.validacpf = function(cpf){

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
      return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1))
      {
        digitos_iguais = 0;
        break;
      }
      if (!digitos_iguais)
      {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
          soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
          return false;
        numeros = cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--)
          soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
          return false;
        return true;
      }
      else
        return false;
    }



    this.getPedidoRepresentante = function () {
      lista = [];
      lista = daoRepresentante.getPedidoRepresentante();
      return lista;
    }


    this.getUsers = function(){
      var get = daoUser.getUser(function (data){
       return data;

     });
    }


    this.setTotal = function (total) {
     $rootScope.total = total;
   }



   this.getProdutos = function (t,rp) {
    lista = [];
    lista = daoProduto.getByPedido(t,rp);
    return lista;
  }



  this.totalClientes = function () {


   var get =  daoUser.getTotal(function(data){
     $rootScope.totalclientes = data.length;

   });

 }



 this.totalPedidos = function () {

   var get =  daoPedido.getPedidos(function(data){
     $rootScope.totalpedidos = data.length;

   });

 }

 this.setSaldo = function(){


   var get =  daoPedido.getSaldo(function(data){
    $rootScope.totalsaldo = data;


  });
 }

 this.isConect = function(){
   $rootScope.statusconexao = true;

   document.addEventListener("deviceready", function () {


    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      if(isOnline){

        $rootScope.statusconexao = true;

      }

    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;

      if(isOffline){

        $rootScope.statusconexao = false;

      }else{

        $rootScope.statusconexao = true;

      }


    })

  }, false);


 }

 this.setPedido = function (cadastro) {

   daoPedido.set(cadastro);

 }





});

  //var path = "http://localhost/simsisgestor/";
  //var path = "http://www.producoesnaweb.com.br/simsis/";
  var cod = null;
  var cod2 = null;
  var iduser = 0;
  var idcliente = 0;
  var camisa = 15;





  app.controller('AppCtrl', function ($rootScope, daoPedido, $ionicSideMenuDelegate,meuService, $cordovaNetwork, meuService, $ionicSideMenuDelegate, $ionicLoading, DBLocal, $scope, $ionicModal, $timeout, $http, Data, $ionicPopup, $cordovaSocialSharing, $ionicSlideBoxDelegate, $window) {

   meuService.isConect();
   $scope.reloadPage = function(){
     $window.location.reload();
   }


   document.addEventListener("deviceready", function () {

    $scope.network = $cordovaNetwork.getNetwork();
    $scope.isOnline = $cordovaNetwork.isOnline();
    $scope.$apply();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          $scope.isOnline = true;
          $scope.network = $cordovaNetwork.getNetwork();

          $scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          console.log("got offline");
          $scope.isOnline = false;
          $scope.network = $cordovaNetwork.getNetwork();

          $scope.$apply();
        })

      }, false);





   $ionicSideMenuDelegate.canDragContent(false);

   DBLocal.localdb();
   $scope.statuslogado = false;

   meuService.totalPedidos();

   $scope.sair = function () {


    $ionicLoading.show({
     content: 'Loading',
     animation: 'fade-in',
     template: '<ion-spinner  icon="lines"></ion-spinner> <br/> saindo...',
     showBackdrop: true,
     maxWidth: 200,
     showDelay: 0
   });

    $timeout(function () {
     $ionicLoading.hide();
     DBLocal.db.transaction(function (res) {

      res.executeSql("DELETE FROM users WHERE nome = ?;", [$scope.dadosuser.nome]);
      $scope.statuslogado = false;
      $window.location.reload();
      $ionicSideMenuDelegate.canDragContent(false);
      location.hash = '#/app/start';

    });

   }, 2000);




  }

  $scope.carrega = function () {
    DBLocal.localdb();
    var ind = null;

    DBLocal.db.transaction(function (res) {
     var q = "SELECT count(*) as total,nome FROM users";
     res.executeSql(q, null, function (i, data) {
      ind = data.rows.item(0).total;

    });

     var q2 = "SELECT * FROM users";
     res.executeSql(q2, null, function (i, data) {
      $scope.dadosuser = data.rows.item(ind - 1);
      $rootScope.rep = $scope.dadosuser .id; 
      meuService.totalClientes();

      $scope.statuslogado = true;
    });


   });
  }


  var ind = null;

  DBLocal.db.transaction(function (res) {
    var q = "SELECT count(*) as total FROM users";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;

   });

    var q2 = "SELECT * FROM users";
    res.executeSql(q2, null, function (i, data) {
      $scope.dadosuser = data.rows.item(ind - 1);
      $rootScope.rep = $scope.dadosuser .id; 

      cod2 = data.rows.item(ind - 1).id;
      if(cod2>=1){
        $scope.statuslogado = true;
        location.hash = '#/app/home';

      }else{
       location.hash = '#/app/start';
     }


   });


  });





  $timeout(function () {

    if($scope.statuslogado == false){
     $ionicSideMenuDelegate.canDragContent(false);

   }else{
     $ionicSideMenuDelegate.canDragContent(true);
   }

 }, 2000);

  $scope.doRefresh = function(){
   meuService.totalClientes();
   meuService.totalClientes();
 }

 meuService.totalClientes();
 meuService.totalPedidos();

 meuService.setSaldo();



});



  app.controller("initLogin", function ($rootScope, $timeout,$ionicSideMenuDelegate,  $ionicLoading, $ionicPopup, $cordovaVibration, $window, $scope, Data, $ionicModal, $location, DBLocal) {

   $scope.reloadPage = function(){
     $window.location.reload();
   }

   var ind = null;

   DBLocal.db.transaction(function (res) {
    var q = "SELECT count(*) as total,nome FROM users";
    res.executeSql(q, null, function (i, data) {
     ind = data.rows.item(0).total;

   });

    var q2 = "SELECT * FROM users";
    res.executeSql(q2, null, function (i, data) {
     $rootScope.dadosuser = data.rows.item(ind - 1);

     cod2 = data.rows.item(ind - 1).id;
     if(cod2>=1){
      location.hash = '#/app/home';

    }else{
     location.hash = '#/app/start';
   }

 });

  });

   $scope.loginUsuario = function (login) {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Entrando...',
      showBackdrop: true,
      duration: 5000,
      maxWidth: 2000,

      showDelay: 0
    });

    $timeout(function () {

      Data.loginData(login).success(function (data) {




       if (data[0].permissao == false) {

        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: '<strong>Erro!</strong>',
          template: '<div align="center">Login e/ou senha inválidos</div>',
          cssClass: 'assertive',
          buttons: [
          { text: 'Fechar', type: 'button-assertive' },

          ]




        });
        $ionicLoading.hide();
        alertPopup.then(function (res) {


        });
      }
      if (data[0].permissao == true) {





        var alertPopup = $ionicPopup.alert({
         title: 'Sucesso',
         template: '<div align="center">Bem Vindo!</div>',
         cssClass: 'balanced'
       });

        alertPopup.then(function (res) {


        });



        DBLocal.db.transaction(function (req) {
         req.executeSql("INSERT INTO users (nome, login, endereco, cidade, email, telefone, imgtumb, id) VALUES(?,?,?,?,?,?,?,?);", [data[0].nome, data[0].login, data[0].endereco, data[0].cidade, data[0].email, data[0].telefone, data[0].imgtumb, data[0].id_representante]);


         $scope.carrega();
         $ionicLoading.hide();

         location.hash = '#/app/home';



       });
      }
    });

    }, 2000);

  };

});


  app.controller('cadastro', function ($rootScope, $ionicPopup,daoSinc, $scope, $http, $timeout, $ionicLoading, Data, DBLocal, daoUser, meuService) {

   $scope.teste = function () {
     $scope.lista = [];
     $scope.lista = daoUser.getUser();

   };


   meuService.realoadCidades();


   $scope.cadastrar = function (cadastro) {



    if( meuService.validacpf(cadastro.cpf)){



      if(daoUser.setUser(cadastro)){


       var alertPopup = $ionicPopup.alert({
        title: '<strong>Sucesso!</strong>',
        template: '<div align="center">Cadastro realizado</div>',
        cssClass: 'success',
        buttons: [
        { text: 'Fechar', type: 'button-energized' },

        ]
      });

       alertPopup.then(function (res) {

       });

       delete $scope.cadastro;
       var get = daoUser.getUser(function (data){
         $rootScope.lista = data;

       });
       meuService.totalClientes();
       $rootScope.statusclientesinc = false;  

     }

   }else{
    alert('cpf inválido');
  }

};

});






  

  app.controller('sincronizar', function ( $window,$ionicPopup, daoPedido, $rootScope, daoSinc, $scope, $http, $timeout, $ionicLoading, Data, DBLocal, daoUser, $ionicModal, meuService) {






    daoSinc.getClientesOffSinc(function (data){
     if(data.length == 0){
      $rootScope.statusclientesinc = true;
    }

  });

    $scope.sincDep = function(){
      $scope.insinc = true;
      sincronizacao();

    }

    var sincronizacao = function(){

// sincronismo de produtos
Data.getSincProdutos().success(function (data3) {

  daoSinc.setProdutos(data3);
  $rootScope.okprod = true;

});


    //sincronismo de pedido_representane
    Data.getSincPedidoRp().success(function (data4) {
      console.log(data4);
      daoSinc.setPedidosRp(data4);
    });


    var get = daoPedido.getPrItens(function(data1){
      $scope.lista = data1;
      Data.setSincPedidosRpItens(data1).success(function (data2) {
        console.log(data2);

        Data.getSincPedidoRpItens().success(function (data5) {

          daoSinc.setPedidosRpItens(data5, function(data99){
            $rootScope.okrep = true;
            $scope.insinc = false;
            if(data99){


            }else{
              $rootScope.okrep = false;
              alert('falha ao sincronizar');
              $scope.insinc = false;

            }
          });
          $rootScope.okrep = true;
          $scope.insinc = false;


        });



      });

      
    });



    // sincronismo de clientes


    daoSinc.getclientesUp(function(c){
      Data.sincClientesUp(c).success(function(d){
        //console.log(d);


      });
    });

    daoSinc.getClientesOffSinc(function (data){
      Data.sincClientes(data).success(function (data1) {


      });
      Data.getSincClientes().success(function (clientessinc) {

        daoSinc.setClientes(clientessinc);

      });


      $rootScope.statusclientesinc = true; 
      $rootScope.okcliente = true; 

    });


    // fim sincronismo clinente

    Data.sincCidade().success(function (data6) {

      daoSinc.setCidades(data6);
      meuService.realoadCidades();
      $rootScope.okcidade = true; 


    });




// busca no banco local e mando pro servidor


var pd = daoSinc.getVendas(function(data7){


  Data.setVendas(data7).success(function(data8){

    if(data8.mensage == 1){

     daoSinc.updateStatusSincVendas();

     var pd = daoSinc.getVendasItens(function(data9){
      console.log(data9);
      Data.setVendasItens(data9).success(function(data10){
        console.log(data10);

        if(data10.mensage == 2){
          // alert('erro ao sincronizar'); // nao sincroniza os itens

        }; 
        if(data10.mensage == 3){
          $rootScope.okvenda = true; 


        }; 
        if(data10.mensage == 1){// sincronizou os itens no banco com sucesso


          $rootScope.okvenda = true; // sinc venda com sucesso


          daoSinc.updateStatusSincVendasItens();
          updateProdAndinsert();


        }; 

        meuService.setSaldo();

      });

    });
   };


   if(data8.mensage == 2){
    updateProdAndinsert();

     // alert('erro ao sincronizar'); // nao sincroniza

   }; 
   if(data8.mensage == 3){
    updateProdAndinsert();

    $scope.okvenda = true; //sinc venda sucesso caso nao tenha dados




  };



});

});


var updateProdAndinsert = function(){
  var pd = daoSinc.getVendasUp(function(data22){

    Data.upVendas(data22).success(function(data23){


      Data.getSincVendas().success(function (data11) {

        daoSinc.setVendas(data11);
      });

      var vdi = daoSinc.getVendasItensUp(function(data25){
        Data.upVendasItens(data25).success(function(data27){


          Data.getSincVendasItens().success(function (data12) {

            daoSinc.setVendasItens(data12);
          });


        });

      });   



    });

  });
}

daoSinc.updateStatusSincCliente();



}


meuService.totalClientes();
meuService.totalPedidos();
$ionicLoading.hide();



});



  app.controller('estoque', function (daoProduto, $window,$ionicPopup, $scope, $http, $timeout, $ionicLoading, Data, DBLocal, daoUser, $ionicModal, meuService) {

   $scope.doRefresh = function(){
     $scope.ativo = false;
     $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
      duration: 3000,
      showBackdrop: true,
      maxWidth: 2000,
      showDelay: 0
    });
     $scope.pedidoRp =  meuService.getPedidoRepresentante();
     $ionicLoading.hide();
     $scope.$broadcast('scroll.refreshComplete');
   }


   $scope.pedidoRp =  meuService.getPedidoRepresentante();


   $scope.exibiPedido = function(pedido){

    console.log(pedido);
    var pd =  daoProduto.getByPedidoEstoque(pedido, function(data){
      $scope.produtos = data;
      console.log(data);


    });


    $ionicModal.fromTemplateUrl('templates/social/itenspedido.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    })
  }

});



  app.controller('editcliente', function ( $rootScope, $window,$ionicPopup, $scope, $http, $timeout, $ionicLoading, Data, DBLocal, daoUser, $ionicModal, meuService) {



    $scope.estados = [{
      "ID": "1",
      "Sigla": "AC",
      "Nome": "Acre"
    },
    {
      "ID": "2",
      "Sigla": "AL",
      "Nome": "Alagoas"
    },
    {
      "ID": "3",
      "Sigla": "AM",
      "Nome": "Amazonas"
    },
    {
      "ID": "4",
      "Sigla": "AP",
      "Nome": "Amapá"
    },
    {
      "ID": "5",
      "Sigla": "BA",
      "Nome": "Bahia"
    },
    {
      "ID": "6",
      "Sigla": "CE",
      "Nome": "Ceará"
    },
    {
      "ID": "7",
      "Sigla": "DF",
      "Nome": "Distrito Federal"
    },
    {
      "ID": "8",
      "Sigla": "ES",
      "Nome": "Espírito Santo"
    },
    {
      "ID": "9",
      "Sigla": "GO",
      "Nome": "Goiás"
    },
    {
      "ID": "10",
      "Sigla": "MA",
      "Nome": "Maranhão"
    },
    {
      "ID": "11",
      "Sigla": "MG",
      "Nome": "Minas Gerais"
    },
    {
      "ID": "12",
      "Sigla": "MS",
      "Nome": "Mato Grosso do Sul"
    },
    {
      "ID": "13",
      "Sigla": "MT",
      "Nome": "Mato Grosso"
    },
    {
      "ID": "14",
      "Sigla": "PA",
      "Nome": "Pará"
    },
    {
      "ID": "15",
      "Sigla": "PB",
      "Nome": "Paraíba"
    },
    {
      "ID": "16",
      "Sigla": "PE",
      "Nome": "Pernambuco"
    },
    {
      "ID": "17",
      "Sigla": "PI",
      "Nome": "Piauí"
    },
    {
      "ID": "18",
      "Sigla": "PR",
      "Nome": "Paraná"
    },
    {
      "ID": "19",
      "Sigla": "RJ",
      "Nome": "Rio de Janeiro"
    },
    {
      "ID": "20",
      "Sigla": "RN",
      "Nome": "Rio Grande do Norte"
    },
    {
      "ID": "21",
      "Sigla": "RO",
      "Nome": "Rondônia"
    },
    {
      "ID": "22",
      "Sigla": "RR",
      "Nome": "Roraima"
    },
    {
      "ID": "23",
      "Sigla": "RS",
      "Nome": "Rio Grande do Sul"
    },
    {
      "ID": "24",
      "Sigla": "SC",
      "Nome": "Santa Catarina"
    },
    {
      "ID": "25",
      "Sigla": "SE",
      "Nome": "Sergipe"
    },
    {
      "ID": "26",
      "Sigla": "SP",
      "Nome": "São Paulo"
    },
    {
      "ID": "27",
      "Sigla": "TO",
      "Nome": "Tocantins"
    }]



    meuService.realoadCidades();

    $scope.salvar = function(cadastro){

      daoUser.updateUserId(cadastro);
      var get = daoUser.getUser(function (data){
       $rootScope.lista = data;

     });
      $scope.modal.hide();

    }


    $scope.cadastro = daoUser.getUserId(window.sessionStorage.getItem('iduser'));

  });

  app.controller('clientes', function ($rootScope, daoPedido,daoDados, $ionicPopup, $scope, $http, $timeout, $ionicLoading, Data, DBLocal, daoUser, $ionicModal, meuService) {



    var get = daoUser.getUser(function (data){
     $rootScope.lista = data;

   });


    $scope.closeModal = function(){

     $scope.modal.hide();
   }

   $scope.doRefresh = function(){
     $scope.ativo = false;
     $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
      duration: 3000,
      showBackdrop: true,
      maxWidth: 2000,
      showDelay: 0
    });

     var get = daoUser.getUser(function (data){
       $rootScope.lista = data;

     });
     $ionicLoading.hide();
     $scope.$broadcast('scroll.refreshComplete');
   }


   $scope.modal = null;

   $scope.editar = function(cliente){


    var get = daoDados.getCidadesById(cliente.cidade, function(data){
      $rootScope.cidades = data;


    });



    window.sessionStorage.setItem('iduser',cliente.id);
    $ionicModal.fromTemplateUrl('templates/social/edit-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });

  }

  $scope.apagar = function(cliente){

    var myPopup = $ionicPopup.show({

      title: 'Apagar Cliente',
      subTitle: 'deseja mesmo apagar este cliente?',
      scope: $scope,
      buttons: [
      {  text: '<b>cancelar</b>',
      type: 'button-calm' },

      {
        text: '<b>Apagar</b>',
        type: 'button-assertive',
        onTap: function(e) {

          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
            showBackdrop: true,
            maxWidth: 2000,
            showDelay: 0
          });

          var cli = daoPedido.getVendaByCliente(cliente.id, function(data){
            if(data.length == 0){
              daoUser.delUser(cliente);
              $scope.doRefresh();

            }else{
              var alertPopup = $ionicPopup.alert({
                title: '<strong>Erro ao excluir!</strong>',
                template: '<div align="center">Existe vendas associadas a este cliente</div>',
                cssClass: 'assertive',
                buttons: [
                { text: 'Fechar', type: 'button-assertive' },

                ]
              });

              alertPopup.then(function (res) {
              });
            }
          });


          $ionicLoading.hide();

          var get = daoUser.getUser(function (data){
           $rootScope.lista = data;

         });

          meuService.totalClientes();

        }
      }
      ]
    });

  }

});



  app.controller('vendas', function ($rootScope, $ionicPopup, daoPedido, $scope, $http, $timeout, $ionicLoading, Data, DBLocal, daoUser, $ionicModal, meuService) {
    $scope.campopagar = false;

    $scope.btpags = true;

    $scope.itenspdtotal = 0;
    $scope.totalvend = 0;

    $scope.addPag = function(pedido, total){
      $scope.apagartotal = total;
      daoPedido.addPag($scope.apagartotal, pedido, $scope.ipd);

      $scope.campopagar = false;
      $scope.bts = false;
      $scope.modal.hide();

      $scope.doRefresh();


    } 

    $scope.fecharbar = function(){


      $scope.apagartotal = 0;
      $scope.btpags = true;
      $scope.modal.hide();
    }


    $scope.cancelar = function(){



      $scope.campopagar = false;
      $scope.bts = false;

      $scope.doRefresh();


    }

    $scope.doRefresh = function(){
     $scope.ativo = false;
     $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      template: '<ion-spinner  icon="lines"></ion-spinner> <br/> Carregando...',
      duration: 3000,
      showBackdrop: true,
      maxWidth: 2000,
      showDelay: 0
    });

     $scope.lista = [];
     $scope.c = [];
     var ncliente = "";

     var get =  daoPedido.getPedidos(function(data){
      $scope.lista = data;

    });

     $ionicLoading.hide();
     $scope.$broadcast('scroll.refreshComplete');
     meuService.reloadVendas();

   }
   meuService.reloadVendas();


   $scope.incremente = function(item){



    var index = $scope.ipd.indexOf(item);

    console.log( $scope.ipd[index].qtde_vendida, $scope.ipd[index].quantidade);

    if( $scope.ipd[index].qtde_vendida == $scope.ipd[index].quantidade ){

      var alertPopup = $ionicPopup.alert({
        title: '<strong>Atenção!</strong>',
        template: '<div align="center">Este produto do pedido já está pago</div>',
        cssClass: 'assertive',
        buttons: [
        { text: 'Fechar', type: 'button-assertive' },]
      });
      alertPopup.then(function (res) {
      });

    }else{
      if( $scope.apagartotal == $scope.itenspdtotal ){


       var alertPopup = $ionicPopup.alert({
        title: '<strong>Atenção!</strong>',
        template: '<div align="center">Impossível pagar mais que o débito</div>',
        cssClass: 'assertive',
        buttons: [
        { text: 'Fechar', type: 'button-assertive' },]
      });
       alertPopup.then(function (res) {
       });


     }else{
      if($scope.ipd[index].qtdpag ==  $scope.ipd[index].quantidade){
        var alertPopup = $ionicPopup.alert({
          title: '<strong>Atenção!</strong>',
          template: '<div align="center">Impossível adicionar mais que o comprado</div>',
          cssClass: 'assertive',
          buttons: [
          { text: 'Fechar', type: 'button-assertive' },]
        });
        alertPopup.then(function (res) {
        });


      }else{
        if($scope.ipd[index].qtdpag+$scope.ipd[index].qtde_vendida<$scope.ipd[index].saldoestoque){
          $scope.ipd[index].qtdpag++;

        }else{
         var alertPopup = $ionicPopup.alert({
          title: '<strong>Atenção!</strong>',
          template: '<div align="center">Impossível adicionar mais que o comprado</div>',
          cssClass: 'assertive',
          buttons: [
          { text: 'Fechar', type: 'button-assertive' },]
        });
         alertPopup.then(function (res) {
         });
       }

       

       $scope.apagartotal =0;
       for (var i = 0; i <= $scope.ipd.length-1; i++) {
        $scope.apagartotal +=$scope.ipd[i].valor*$scope.ipd[i].qtdpag;
      }


    }




  }

}




}

$scope.decremente = function(item){


 var index = $scope.ipd.indexOf(item);
 if($scope.ipd[index].qtdpag>0){
   $scope.ipd[index].qtdpag--;


   $scope.apagartotal =0;
   for (var i = 0; i <= $scope.ipd.length-1; i++) {
    $scope.apagartotal +=$scope.ipd[i].valor*$scope.ipd[i].qtdpag;
  }
}else{
 var alertPopup = $ionicPopup.alert({
  title: '<strong>Atenção!</strong>',
  template: '<div align="center">Operação impossivel</div>',
  cssClass: 'assertive',
  buttons: [
  { text: 'Fechar', type: 'button-assertive' },]
});
 alertPopup.then(function (res) {
 });

}

}




$scope.exibir = function(ob,ind){
  console.log(ind);
  console.log(ob);



  $scope.pd = ob; 





  var itenspd = daoPedido.getItensPedidoById(ind, function(data){

    $scope.ipd = data;


    for (var a = 0; a <=  $scope.ipd.length-1; a++) {
      $scope.ipd[a].qtdpag = 0;
    }

    $scope.itenspdtotal = 0;
    for (var i = 0; i <= $scope.ipd.length-1; i++) {
     $scope.itenspdtotal +=$scope.ipd[i].valor*$scope.ipd[i].saldoestoque;
   }
   if($scope.pd.valor_pago ==  $scope.itenspdtotal ){ // se o pedido ja estiver pago desabilita os botoes de pagamentos
    $scope.btpags = false;


  }

});

  $ionicModal.fromTemplateUrl('templates/social/viewproduto.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}


$scope.pagar = function(){

  $scope.campopagar = true;
  $scope.bts = true;
  $scope.apagartotal = 0;

}


$scope.estornar = function(data){
  $scope.stornook = true;
  $scope.bts = true;

}

$scope.cancelEstornar = function(){
  $scope.stornook = false;
  $scope.bts = false;

}

$scope.finalizaPedido = function(pedido){


  var myPopup = $ionicPopup.show({

    title: 'Finalizar venda',
    subTitle: 'deseja mesmo Finalizar a venda?',
    scope: $scope,
    buttons: [
    {  text: '<b>cancelar</b>',
    type: 'button-calm' },

    {
      text: '<b>Finalizar</b>',
      type: 'button-balanced',
      onTap: function(e) {
        daoPedido.finalizaPedido(pedido);
        $scope.modal.hide();
        $scope.doRefresh();

      }
    }
    ]
  });

}

$scope.setEstorno = function(ipd, qtd){



  if(ipd.saldoestoque<qtd){

    var alertPopup = $ionicPopup.alert({
      title: '<strong>Erro!</strong>',
      template: '<div align="center">Saldo insuficiente</div>',
      cssClass: 'assertive',
      buttons: [
      { text: 'Fechar', type: 'button-assertive' },]
    });
    alertPopup.then(function (res) {
    });

  }else{
   var alertPopup = $ionicPopup.alert({
    title: '<strong>Sucesso!</strong>',
    template: '<div align="center">Estorno realizado</div>',
    cssClass: 'balanced',
    buttons: [
    { text: 'Fechar', type: 'button-balanced' },

    ]
  });

   alertPopup.then(function (res) {
   });
   daoPedido.setEstorno(qtd, ipd);
   $scope.bts = false;
   $scope.stornook = false;

   $scope.modal.hide();
   $scope.doRefresh();

 }
}

});

  app.controller('addvenda', function ($rootScope,daoProduto, meuService,DBLocal,$filter, daoPedido, daoUser,daoRepresentante, $ionicLoading, $ionicModal, $window, $scope, $http, $ionicPopup, $timeout, Data,DBLocalLoginDeUsuario,  $location) {

   $scope.selectableNames = [];

   var get = daoUser.getUser(function (data){

    for(var i = 0; i<=data.length-1;i++){
     $scope.selectableNames.push(data[i]);

   }


 });


   meuService.startSessao();
   $scope.dadoscart = [];
   $scope.cadastro = [];
   $scope.cadastro.quantidade = 1;

   $scope.cliente = null;
   $rootScope.lista = meuService.getUsers();
   $scope.produtos = []; 
   $scope.modal = null;

   $scope.incrementeqtd = function(item){
    console.log(item.estoque);


    if(item.estoque>$scope.cadastro.quantidade){
     $scope.cadastro.quantidade++;
     
   }else{
    var alertPopup = $ionicPopup.alert({
      title: '<strong>Atenção!</strong>',
      template: '<div align="center">O seu estoque é de apenas '+item.estoque+' unidades </div>',
      cssClass: 'assertive',
      buttons: [
      { text: 'Fechar', type: 'button-assertive' },

      ]

    });

    alertPopup.then(function (res) {


    });
  }


}

$scope.decrementeqtd = function(){

  if($scope.cadastro.quantidade>1){
    $scope.cadastro.quantidade--;
  }else{
   var alertPopup = $ionicPopup.alert({
    title: '<strong>Atenção!</strong>',
    template: '<div align="center">Mínimo de 1 unidade</div>',
    cssClass: 'assertive',
    buttons: [
    { text: 'Fechar', type: 'button-assertive' },

    ]

  });

   alertPopup.then(function (res) {


   });
 }
}

// altera carrinho
$scope.incrementeqtdcart = function(item){



  var index = $scope.dadoscart.indexOf(item);

  if($scope.dadoscart[index].quantidade < $scope.dadoscart[index].estoque){

    $scope.dadoscart[index].quantidade++;
  }else{
   var alertPopup = $ionicPopup.alert({
    title: '<strong>Erro!</strong>',
    template: '<div align="center">Estoque insuficiente</div>',
    cssClass: 'assertive',
    buttons: [
    { text: 'Fechar', type: 'button-assertive' },

    ]

  });

   alertPopup.then(function (res) {


   });
 }

 $scope.getTotalCompra();

}
$scope.decrementeqtdcart = function(item){

  var index = $scope.dadoscart.indexOf(item);
  if($scope.dadoscart[index].quantidade>1){

    $scope.dadoscart[index].quantidade--;

  }else{
    var alertPopup = $ionicPopup.alert({
      title: '<strong>Atenção!</strong>',
      template: '<div align="center">Mínimo de 1 unidade</div>',
      cssClass: 'assertive',
      buttons: [
      { text: 'Fechar', type: 'button-assertive' },

      ]

    });

    alertPopup.then(function (res) {


    });
  }
  $scope.getTotalCompra();
}




$scope.getProdutosbyRp = function(t){ //lista de produtos para vender e exibe no select


  console.log(t);
  var pd =  daoProduto.getByPedido(t, $scope.dadosuser.id, function(data){
    console.log(data);
    $scope.produtos = data;


  });





}

$scope.validaProduto = function(pd){
  $scope.viewPd = pd;

}

$scope.additens = function(nome){
  $scope.getProdutosbyRp();

  $scope.selectableNamespd = [];

  var getpdrp = daoRepresentante.getPedidoRepresentante1(function(data){
    console.log(data);
    for(var i = 0; i<=data.length-1;i++){
     $scope.selectableNamespd.push(data[i]);

   }

 });






  window.sessionStorage.setItem('people',nome);
  $ionicModal.fromTemplateUrl('templates/social/itenscart.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}

$scope.verficaEstoque = function(est, quantidade){
  return est-quantidade;
}

$scope.verficaCart = function(item){
  for(var i = 0; i <= $scope.dadoscart.length-1; i++){
    if($scope.dadoscart[i].produto_id == item){

      return true;

    }

  }
  return false;
}


$scope.getTotalCompra = function(){
 $scope.totalcompra = 0;
 for(var i=0; i<=$scope.dadoscart.length-1;i++ ){
  $scope.totalcompra = $scope.totalcompra + $scope.dadoscart[i].preco*$scope.dadoscart[i].quantidade;

}
}


$scope.addcart = function(produto, cadastro){
  console.log(produto);

  if(this.verficaEstoque(produto.estoque,cadastro.quantidade)<0){

   var alertPopup = $ionicPopup.alert({
    title: '<strong>Erro!</strong>',
    template: '<div align="center">Estoque insuficiente</div>',
    cssClass: 'assertive',
    buttons: [
    { text: 'Fechar', type: 'button-assertive' },

    ]

  });

   alertPopup.then(function (res) {


   });

 }else{

   if(this.verficaCart(produto.id)){

    var alertPopup = $ionicPopup.alert({
      title: '<strong>Atenção!</strong>',
      template: '<div align="center">Produto já está no carrinho</div>',
      cssClass: 'energized',
      buttons: [
      { text: 'Fechar', type: 'button-energized' },

      ]

    });

    alertPopup.then(function (res) {


    });

  }else{



   $scope.dadoscart.push({
    estoque: produto.estoque,
    preco: produto.preco2,
    cod_pedido_representante: produto.cod_pedido_representante,
    nome: produto.nome,
    produto_id: produto.id,
    quantidade: cadastro.quantidade,
    cliente: $scope.cliente.nome

  });
   $scope.totalcart = $scope.dadoscart.length;

   $scope.getTotalCompra();
   $scope.cadastro.quantidade = 1;
   delete cadastro.valsugerido;
   delete cadastro.produto;
   delete $scope.viewPd;

 }
}
}

$scope.close = function(){
 $scope.modal2.hide();
}

$scope.opencart = function(){
  $ionicModal.fromTemplateUrl('templates/social/cart.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
    $scope.modal2.show();
  });
}

$scope.rmcart = function(item){
  var index = $scope.dadoscart.indexOf(item);


  $scope.dadoscart.splice(index, 1);  
  $scope.totalcart = $scope.dadoscart.length;   
  if($scope.dadoscart.length ==0){
    $scope.totalcompra = 0; 
  }
  for(var i=0; i<=$scope.dadoscart.length-1;i++ ){
    $scope.totalcompra = $scope.totalcompra - $scope.dadoscart[i].preco;
  }

  delete $scope.viewPd;

}

$scope.finalizar = function(){

  var cod_cliente = Math.floor((Math.random() * 1000) + 1);
  $scope.itenspedido = [];
  $scope.itens = [];
  $scope.dadoscart.qtd_estorno = 0;
  $scope.dadoscart.cod_pedido_cliente =cod_cliente;
  $scope.itens = $scope.dadoscart;

  if(daoPedido.set($rootScope.dados, $scope.itens, $rootScope.codPedidoRep) == true){


    var alertPopup = $ionicPopup.alert({
      title: '<strong>Sucesso!</strong>',
      template: '<div align="center">Pedido realizado</div>',
      cssClass: 'success',
      buttons: [

      {
        text: '<b>Fechar</b>',
        type: 'button-energized',
        onTap: function(e) {


          meuService.reloadVendas();

          meuService.totalPedidos();
          meuService.setSaldo();
          location.hash = '#/app/vendas';



        }
      }

      ]
    });

    alertPopup.then(function (res) {

    });
    $rootScope.okvenda = false;
    $scope.dadoscart = []; 
    $scope.totalcompra = 0; 
    delete $scope.cliente; 
    $scope.totalcart = 0; 
    $scope.modal.hide();

  }

}

$scope.revisa = function(cadastro){


  cadastro.rep =  $scope.dadosuser.id; 
  cadastro.pedido =  $scope.cadastro.pedido; 
  cadastro.data = meuService.getDataatual();
  cadastro.totalcompra = $scope.totalcompra;
  cadastro.nomecliente = cadastro.nome;

  $rootScope.dados = cadastro;

  $ionicModal.fromTemplateUrl('templates/social/revpedido.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

}

});
