(function(){
	"use strict";

	angular.module('starter.controllers').value("Config",{

    getUrl:"http://localhost/sisconsig/",
//getUrl2:"http://colegiomatisse.com.br/simsis/api/"
//getUrl:"http://localhost/simsisgestor/",
//getUrl2:"http://localhost/simsisgestor/api/"

 //getUrl:"http://www.producoesnaweb.com.br/simsis/",
 //getUrl2:"http://www.producoesnaweb.com.br/simsis/api/"

})

	

	angular.module('starter.controllers').service("daoProduto", function($rootScope, $http, Config, DBLocal){

    this.set = function(cadastro){
    };




    this.get = function(){
     var teste = [];

     DBLocal.db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM produtos', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){

          teste[i]=results.rows.item(i);


        }


      }, null);
     });

     return teste;


   };

   this.getByPedido = function(t,representante, calback){
     var teste = [];
     DBLocal.db.transaction(function (tx) {
       //tx.executeSql('select p.nome, p.preco2,p.preco3, p.id, pri.quantidade-pri.qtde_vendida-pri-qtd_estorno as estoque, pri.cod_pedido_representante from produtos p, pedido_representante pr, pedido_representante_itens pri WHERE pri.cod_pedido_representante = pr.id AND pri.cod_produto = p.id AND pr.cod_representante = ?', [ representante], function (tx, results) {
       tx.executeSql('select p.nome, p.preco2,p.preco3, p.id, pri.quantidade-(pri.qtde_vendida+pri.qtd_estorno)  as estoque, pri.cod_pedido_representante from produtos p, pedido_representante pr, pedido_representante_itens pri WHERE pri.cod_pedido_representante = pr.id AND pri.cod_produto = p.id AND pr.cod_representante = ?', [ representante], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){

          teste[i]=results.rows.item(i);


        }
        return calback(teste);


      }, null);
     });

     return teste;


   };

   this.getByPedidoEstoque = function(pedido, calback){
     var teste = [];


     DBLocal.db.transaction(function (tx) {
       // tx.executeSql('select * from pedido_representante_itens pri WHERE pri.cod_pedido_representante = 40', [], function (tx, results) {
        // tx.executeSql('select p.nome, p.preco1, p.id, pri.quantidade-pri.qtde_vendida-pri.qtd_estorno as estoque from produtos p, pedido_representante pr, pedido_representante_itens pri WHERE pr.id = ? AND pri.cod_pedido_representante = pr.id AND pri.cod_produto = p.id AND pr.cod_representante = ?', [pedido, $rootScope.rep], function (tx, results) {
         tx.executeSql('select p.nome, p.preco1, p.id, pri.quantidade-(pri.qtde_vendida+pri.qtd_estorno) as estoque from produtos p, pedido_representante pr, pedido_representante_itens pri WHERE pr.id = ? AND pri.cod_pedido_representante = pr.id AND pri.cod_produto = p.id AND pr.cod_representante = ?', [pedido, $rootScope.rep], function (tx, results) {
          var len = results.rows.length, i;

          for (i = 0; i < len; i++){

            teste[i]=results.rows.item(i);


          }
          return calback(teste);


        }, null);
       });

     return teste;


   };


   this.getByPedidoRpItens = function(t,representante, calback){
     var teste = [];


     DBLocal.db.transaction(function (tx) {
       tx.executeSql('select * from produto ', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){

          teste[i]=results.rows.item(i);


        }
        return calback(teste);


      }, null);
     });

     return teste;


   };







 });
})();