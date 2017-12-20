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

	

	angular.module('starter.controllers').service("daoUser", function($http, Config,DBLocal,$rootScope){


    var data = new Date;

    var dia = data.getDate();
    var mes = data.getMonth()+1;
    var ano = data.getFullYear();
    var meses = new Array(12);
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

    var dataatual = ano+'/'+mes+'/'+dia;





    this.setUser = function(cadastro){



      DBLocal.db.transaction(function (req) {
       var codigo = Math.floor(Math.random() * 999)+""+data.getDate()+""+ mes+""+$rootScope.rep+"";
       console.log($rootScope.rep );
       console.log(cadastro );
       console.log(codigo );
       cadastro.codigo = codigo;
       cadastro.rep = $rootScope.rep;





       req.executeSql("INSERT INTO clientes (id, nome, rg, cpf, endereco, bairro, numero, cidade, uf, cep, referencia, representante, telefone, email, data_cadastro, statussinc) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [cadastro.codigo, cadastro.nome, cadastro.rg, cadastro.cpf, cadastro.endereco, cadastro.bairro, cadastro.numero, cadastro.cidade, cadastro.estado, cadastro.cep, cadastro.referencia, cadastro.rep, cadastro.telefone, cadastro.email,dataatual, 0]);


     });

      return true;


    };


    this.getUser = function(callback ){
     var teste = [];

     DBLocal.db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM clientes WHERE representante = ? order by nome asc', [$rootScope.rep], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){

          teste[i]=results.rows.item(i);


        }

        callback(teste);
      }, null);
     });




   };


   


   this.getUserById = function(user, callback ){
     var teste = [];

     DBLocal.db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM clientes WHERE id = ?', [user], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){

          teste[i]=results.rows.item(i);


        }

        callback(teste);
      }, null);
     });




   };


   this.getTotal = function( callback){
    var teste = [];
    DBLocal.db.transaction(function (tx) {
     tx.executeSql('SELECT * FROM clientes WHERE representante = ?', [$rootScope.rep], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++){
        teste[i]=results.rows.item(i);
      }
      callback(teste);

    }, null);
   });




  };



  this.getUserId = function(id){
   var teste = [];

   DBLocal.db.transaction(function (tx) {
     tx.executeSql('SELECT * FROM clientes WHERE id =  ?', [id], function (tx, results) {
      var len = results.rows.length, i;

      for (i = 0; i < len; i++){

        teste[i]=results.rows.item(i);


      }


    }, null);
   });

   return teste;


 };

   //UPDATE NOME_DA_TABELA SET campo1 = valor1, campo2 = valor2.
   //nome, rg, cpf, endereco, cidade, representante, telefone, email

   this.updateUserId = function(cadastro){

    console.log(cadastro);
    DBLocal.db.transaction(function (res) {
      res.executeSql("UPDATE clientes SET nome = ?, rg = ?, cpf = ?, endereco = ?, cep=?, bairro=?,numero=?, referencia = ?, cidade = ?, uf = ?, telefone = ?, email = ?  WHERE id = ?;",
       [cadastro[0].nome,cadastro[0].rg, cadastro[0].cpf, cadastro[0].endereco, cadastro[0].cep, cadastro[0].bairro, cadastro[0].numero, cadastro[0].referencia, cadastro[0].cidade, cadastro[0].uf, cadastro[0].telefone, cadastro[0].email, cadastro[0].id]);


    });

  }




  this.delUser = function(cliente){
    DBLocal.db.transaction(function (res) {
      res.executeSql("DELETE FROM clientes WHERE nome = ?;", [cliente.nome]);


    });
    return true;
  }















});
})();