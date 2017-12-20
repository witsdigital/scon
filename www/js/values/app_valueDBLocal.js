(function(){
	"use strict";
	angular.module("starter.controllers").value("DBLocal",{
		db:null,
		localdb: function() {
			this.db = window.openDatabase("sicon66", "1.0", "Banco Local", 2000);
			this.db.transaction(function(res) {
				res.executeSql("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, login TEXT, endereco TEXT, cidade TEXT, email TEXT, telefone TEXT, imgtumb TEXT);", []);
				res.executeSql("CREATE TABLE IF NOT EXISTS clientes(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, rg TEXT, cpf INTEGER unique, endereco TEXT, cep TEXT, bairro TEXT, numero INTEGER, data_cadastro TEXT, referencia TEXT, cidade INTEGER, uf TEXT, representante INTEGER, telefone TEXT, email TEXT, statussinc INTEGER );", []);
				res.executeSql("CREATE TABLE IF NOT EXISTS produtos(id INTEGER PRIMARY KEY AUTOINCREMENT, estoque INTEGER, nome TEXT, preco1 REAL, preco2 REAL, preco3 REAL, tamanho TEXT, cor_cod INTEGER);", []);
				res.executeSql("CREATE TABLE IF NOT EXISTS pedido_representante(id INTEGER PRIMARY KEY AUTOINCREMENT, data INTEGER, data_vencimento TEXT, status INTEGER, total_estornado REAL, total_pedido REAL, cod_representante INTEGER);", [])
				res.executeSql("CREATE TABLE IF NOT EXISTS pedido_representante_itens(id INTEGER PRIMARY KEY AUTOINCREMENT, qtd_estorno INTEGER, quantidade INTEGER, saldo_item INTEGER, qtde_vendida INTEGER, valor1 REAL,valor2 REAL,valor3 REAL, cod_pedido_representante INTEGER, cod_produto INTEGER);", [])
				res.executeSql("CREATE TABLE IF NOT EXISTS pedido_cliente(id INTEGER PRIMARY KEY AUTOINCREMENT,id_pedido_cliente INTEGER, data TEXT, data_vencimento TEXT, status INTEGER, total_pedido REAL,valor_estornado REAL,valor_pago REAL, cod_cliente INTEGER, cod_representante INTEGER, statussinc INTEGER  );", [])
				res.executeSql("CREATE TABLE IF NOT EXISTS pedido_cliente_itens(id INTEGER PRIMARY KEY AUTOINCREMENT, qtd_estorno INTEGER, quantidade INTEGER, valor REAL, cod_pedido_cliente INTEGER, cod_produto INTEGER, cod_pedido_representante INTEGER, statussinc INTEGER, qtde_vendida INTEGER );", [])
				res.executeSql("CREATE TABLE IF NOT EXISTS cidades(id_cidade INTEGER PRIMARY KEY, nome TEXT, uf TEXT);", [])

			});
		}
	});
})();
