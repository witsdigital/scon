   (function(){
    "use strict";

    angular.module('starter.controllers').value("Config",{



    })



    angular.module('starter.controllers').service("daoRepresentante", function( $rootScope, $http, Config, DBLocal){



  this.getPedidoRepresentante1 = function(callback ){
     var teste = [];

     DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM pedido_representante WHERE cod_representante = ? order by data_vencimento asc', [$rootScope.rep], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){

          teste[i]=results.rows.item(i);


        }

        callback(teste);
      }, null);
     });




   };



      this.getPedidoRepresentante = function(){ 

       var teste = [];

       DBLocal.db.transaction(function (tx) {
         tx.executeSql('SELECT * FROM pedido_representante WHERE cod_representante = ?', [$rootScope.rep], function (tx, results) {
          var len = results.rows.length, i;

          for (i = 0; i < len; i++){

            teste[i]=results.rows.item(i);


          }


        }, null);
       });

       return teste;

     };




   });
  })();











