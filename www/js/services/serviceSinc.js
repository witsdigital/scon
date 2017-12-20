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

  

  angular.module('starter.controllers').service("daoSinc", function($http, Config, DBLocal, $rootScope){




    this.setClientes= function(clientes){
      console.log(clientes);
      var teste = [];

      DBLocal.db.transaction(function (res) {
        res.executeSql("DELETE FROM clientes;", []);
               for( var i in clientes){
                
          res.executeSql("INSERT INTO clientes (id, nome, rg, cpf, endereco, bairro, numero, data_cadastro, cidade, uf, cep, referencia, representante, telefone, email, statussinc) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", 
            [clientes[i].id, clientes[i].nome, clientes[i].rg, clientes[i].cpf, clientes[i].endereco, clientes[i].bairro, clientes[i].numero, clientes[i].data_cadastro, clientes[i].cidade, clientes[i].uf, clientes[i].cep, clientes[i].referencia, clientes[i].representante, clientes[i].telefone, clientes[i].email, 1])

          console.log(clientes[i]);
          
        }
      });




    };



    this.setCidades = function(cidades){
      var teste = [];

      DBLocal.db.transaction(function (res) {
        res.executeSql("DELETE FROM cidades;", []);
        for(var i = 0; i<= cidades.length-1; i++){
          res.executeSql("INSERT INTO cidades ( id_cidade, nome, uf) VALUES (?,?,?);", [cidades[i].id, cidades[i].nome, cidades[i].uf]);
          
        }
      });




    };


    this.setProdutos = function(pd){

      var teste = [];

      DBLocal.db.transaction(function (res) {
        res.executeSql("DELETE FROM produtos;", []);
        for( var i in pd){

          res.executeSql("INSERT INTO produtos (id,estoque,nome,preco1,preco2,preco3,tamanho, cor_cod) VALUES (?,?,?,?,?,?,?,?);", [pd[i].id, pd[i].estoque, pd[i].nome, pd[i].preco1, pd[i].preco2, pd[i].preco3, pd[i].tamanho, pd[i].cod_cor]);

          
        }
      });




    };


    this.setPedidosRp = function(pd){



      DBLocal.db.transaction(function (res) {
        res.executeSql("DELETE FROM pedido_representante;", []);


        for( var i in pd){
          res.executeSql("INSERT INTO pedido_representante (id,data,data_vencimento,status,total_estornado,total_pedido,cod_representante) VALUES (?,?,?,?,?,?,?);", [pd[i].id,pd[i].data,pd[i].data_vencimento,pd[i].status,pd[i].total_estornado,pd[i].total_pedido,pd[i].cod_representante]);
  
        }
      });
    };



    this.setPedidosRpItens = function(pd, callback){
      var teste = true;
      DBLocal.db.transaction(function (tx) {
       tx.executeSql("DELETE FROM pedido_representante_itens;", []);
        for( var i in pd){
         var query = tx.executeSql("INSERT INTO pedido_representante_itens (id, qtd_estorno,quantidade,saldo_item, qtde_vendida, valor1,valor2,valor3,cod_pedido_representante, cod_produto ) VALUES (?,?,?,?,?,?,?,?,?,?);", 
          [pd[i].id, pd[i].qtde_estorno, pd[i].quantidade, pd[i].saldo_item, pd[i].qtde_vendida, pd[i].valor1, pd[i].valor2, pd[i].valor3, pd[i].cod_pedido_representante, pd[i].cod_produto],null);
    
      }
      console.log(pd);

      callback(teste);

    }, null);
    };



    this.setPedidosRpItensback = function(pd){

      var teste = [];

      DBLocal.db.transaction(function (res) {
        res.executeSql("DELETE FROM pedido_representante_itens;", []);
        for(var i = 0; i<= pd.length-1; i++){
          res.executeSql("INSERT INTO pedido_representante_itens (id, qtd_estorno,quantidade,saldo_item,valor1,valor2,valor3,cod_pedido_representante, cod_produto ) VALUES (?,?,?,?,?,?,?,?,?);", [pd[i].id, pd[i].qtd_estorno, pd[i].quantidade, pd[i].saldo_item, pd[i].valor1, pd[i].valor2, pd[i].valor3, pd[i].cod_pedido_representante, pd[i].cod_produto]);

        }
      });




    };
    




    this.setVendas = function(vd){

      var teste = [];

      DBLocal.db.transaction(function (res) {
       res.executeSql("DELETE FROM pedido_cliente;", []);
      //  res.executeSql("DELETE FROM pedido_representante_itens;", []);
      for(var i = 0; i<= vd.length-1; i++){
        res.executeSql("INSERT INTO pedido_cliente (id, data, data_vencimento, status, total_pedido, valor_estornado, valor_pago, cod_cliente, cod_representante, statussinc  ) VALUES (?,?,?,?,?,?,?,?,?,?);", [vd[i].id, vd[i].data, vd[i].data_vencimento,  vd[i].status,  vd[i].total_pedido, vd[i].valor_estornado, vd[i].valor_pago,  vd[i].cod_cliente, vd[i].cod_representante, vd[i].statussinc]);

      }
    });




    };

    this.setVendasItens = function(pdi){

      var teste = [];

      DBLocal.db.transaction(function (res) {
        //res.executeSql("DELETE FROM pedido_cliente_itens;", []);
        for(var i = 0; i<= pdi.length-1; i++){
          res.executeSql("INSERT INTO pedido_cliente_itens (id, qtd_estorno, quantidade, valor, cod_pedido_cliente , cod_produto, cod_pedido_representante,  statussinc, qtde_vendida ) VALUES (?,?,?,?,?,?,?,?,?);", [pdi[i].id, pdi[i].qtde_estorno, pdi[i].quantidade, pdi[i].valor, pdi[i].cod_pedido_cliente, pdi[i].cod_produto, pdi[i].cod_pedido_representante, pdi[i].statussinc, pdi[i].qtde_vendida]);
        }
      });




    };




    this.getClientesOffSinc = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM clientes WHERE statussinc = ? ', [0], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
          teste[i]=results.rows.item(i);
        }
        callback(teste);

      }, null);
     });
    }; 

    this.getclientesUp = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM clientes WHERE statussinc = ? ', [1], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });
    }; 

    this.getVendas = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM pedido_cliente WHERE cod_representante = ? AND statussinc = ?', [$rootScope.rep,0], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });




    }; 

    this.getVendasUp = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM pedido_cliente WHERE cod_representante = ? ', [$rootScope.rep], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });




    };


    this.getVendasItensUp = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM pedido_cliente_itens', [], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });




    }; 


    this.updateStatusSincVendas = function (){
      DBLocal.db.transaction(function (tx) {
        tx.executeSql(' UPDATE pedido_cliente SET statussinc = ?;', [1]);
      });

    }
    this.updateStatusSincVendasItens = function (){
      DBLocal.db.transaction(function (tx) {
        tx.executeSql(' UPDATE pedido_cliente_itens SET statussinc = ?;', [1]);
      });

    }

    this.getVendasItens = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT pedido_cliente_itens.id,  pedido_cliente_itens.cod_pedido_representante, pedido_cliente_itens.qtd_estorno, pedido_cliente_itens.quantidade, pedido_cliente_itens.valor, pedido_cliente_itens.cod_pedido_cliente,pedido_cliente_itens.qtde_vendida, pedido_cliente_itens.cod_produto FROM pedido_cliente, pedido_cliente_itens WHERE pedido_cliente.id = pedido_cliente_itens.cod_pedido_cliente AND pedido_cliente.cod_representante = ? AND pedido_cliente_itens.statussinc = ? ', [$rootScope.rep, 0], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });




    }; 






    this.updateStatusSincCliente = function (){
      DBLocal.db.transaction(function (tx) {
        tx.executeSql(' UPDATE clientes SET statussinc = ?;', [1]);
      });

    }




    this.getCidades = function( callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM cidades order by nome ASC  ', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
          teste[i]=results.rows.item(i);
        }
        callback(teste);

      }, null);
     });




    };

    this.getCidadesById = function(cidade, callback){
      var teste = [];
      DBLocal.db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM cidades WHERE id_cidade = ? ', [cidade], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
          teste[i]=results.rows.item(i);
        }
        callback(teste);

      }, null);
     });




    };


  });
})
();