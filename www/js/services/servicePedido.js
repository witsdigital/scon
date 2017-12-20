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

	

	angular.module('starter.controllers').service("daoPedido", function($http, Config, DBLocal, $rootScope){

    this.set = function(cadastro,itens, codPdRp){


      data = new Date(cadastro.dpag);

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

      var datavenc = dia+'/'+mes+'/'+ano;


      DBLocal.localdb();
      DBLocal.db.transaction(function (res) {

       var data2 = new Date();
       var mes  = data2.getMonth()+1;
       var codigo = Math.floor(Math.random() * 999)+""+data2.getDate()+""+ mes+""+$rootScope.rep+"";
       res.executeSql("INSERT INTO pedido_cliente (id, data, data_vencimento, status, total_pedido, valor_estornado, valor_pago, cod_cliente, cod_representante, statussinc ) VALUES (?,?,?,?,?,?,?,?,?,?);", [codigo, cadastro.data,datavenc,1,cadastro.totalcompra,0,0,cadastro.id,cadastro.rep,0],
         function(tx, results){





          DBLocal.db.transaction(function (res) {
           var data3 = new Date();
           var mes  = data3.getMonth()+1;
           
           console.log(itens);
           for(var i = 0; i<= itens.length-1; i++){
             console.log(itens,codigo3,results.insertId);
             var codigo3 = Math.floor(Math.random() *99)+""+data3.getDate()+""+mes+""+data3.getMinutes()+""+$rootScope.rep+"";
             res.executeSql("INSERT INTO pedido_cliente_itens (id, qtd_estorno, quantidade, valor, cod_pedido_cliente , cod_produto, cod_pedido_representante, statussinc, qtde_vendida ) VALUES (?, ?,?,?,?,?,?,?,?);", [codigo3, 0, itens[i].quantidade, itens[i].preco, results.insertId, itens[i].produto_id,itens[i].cod_pedido_representante, 0, 0]);
             res.executeSql(' UPDATE pedido_representante_itens SET qtde_vendida = qtde_vendida + ? WHERE cod_pedido_representante = ? AND cod_produto = ?;', [itens[i].quantidade, itens[i].cod_pedido_representante, itens[i].produto_id ]);


           }

         });






        });


     });
      return true;

    };




    this.getPedidos = function( callback){

      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT pc.id as id_pedido_cliente, pc.valor_pago as valor_pago,pc.valor_estornado as valor_estornado, pc.data, pc.data_vencimento, c.id as id_cliente, c.nome as nome_cliente, pc.total_pedido as total_pedido, pc.status as status FROM pedido_cliente pc, clientes c WHERE pc.cod_cliente = c.id AND pc.cod_representante = ? ORDER BY  pc.data ASC  ', [$rootScope.rep], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });




    }; 

    this.addPag = function(valor, pedido, itenspedido){


      DBLocal.db.transaction(function (res) {

       res.executeSql(' UPDATE pedido_cliente SET valor_pago = valor_pago + ? WHERE id = ? ;', [valor, pedido ]);
       for(var i=0; i<=itenspedido.length-1;i++){
        res.executeSql(' UPDATE pedido_cliente_itens SET qtde_vendida = qtde_vendida + ? WHERE cod_pedido_cliente = ? AND id = ? ;', [itenspedido[i].qtdpag, pedido, itenspedido[i].id_pedido_cliente_itens ]),
        function (error){
         console.log(error);
       };



     }


   });






    };



    this.getSaldo = function( callback){

      var teste = [];
      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT sum(total_pedido) as total FROM pedido_cliente WHERE cod_representante = ? ', [$rootScope.rep], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });




    };

    this.setEstorno = function (qtd, itempedido ){
      console.log(itempedido);

      DBLocal.db.transaction(function (tx) {
        tx.executeSql(' UPDATE pedido_cliente_itens SET qtd_estorno = ? WHERE id = ?;', [qtd, itempedido.id_pedido_cliente_itens]);

        var valorestorno = qtd*itempedido.valor;
        tx.executeSql(' UPDATE pedido_cliente SET valor_estornado = valor_estornado + ? WHERE id = ?;', [valorestorno, itempedido.cod_pedido_cliente]);

      });






    }

    this.finalizaPedido = function (pedido){

      DBLocal.db.transaction(function (tx) {
        tx.executeSql(' UPDATE pedido_cliente SET status = ? WHERE id = ?;', [2, pedido.id_pedido_cliente]);
      });






    }





    this.getItensPedidoById = function(id, callback){
      var teste = [];

      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT pci.quantidade, pci.qtd_estorno, pci.qtde_vendida, pci.quantidade - pci.qtd_estorno as saldoestoque,  pci.id as id_pedido_cliente_itens, pci.cod_pedido_cliente, p.nome as nome_produto, p.preco2 as preco_produto, pci.valor as valor FROM pedido_cliente_itens pci, produtos p WHERE pci.cod_produto = p.id AND  cod_pedido_cliente = ?', [id], function (tx, results) {
          var len = results.rows.length, i;

          for (i = 0; i < len; i++){

            teste[i]=results.rows.item(i);


          }
          callback(teste);

        }, null);
      });




    };   

    this.getProdutosById = function(id, callback){
      var teste = [];

      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM produtos WHERE id = ?', [id], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });

    };
    this.getVendaByCliente = function(id, callback){
      var teste = [];

      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM pedido_cliente WHERE cod_cliente = ?', [id], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            teste[i]=results.rows.item(i);
          }
          callback(teste);

        }, null);
      });

    };

    this.getPrItens = function( callback){
      var teste = [];

      DBLocal.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM pedido_representante_itens ', [], function (tx, results) {
          var len = results.rows.length, i;

          for (i = 0; i < len; i++){

            teste[i]=results.rows.item(i);


          }
          callback(teste);

        }, null);
      });




    };

















  });
})();