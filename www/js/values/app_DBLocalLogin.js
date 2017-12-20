(function(){
	"use strict";
	angular.module("starter.controllers").value("DBLocalLoginDeUsuario",{
		db:null,
		initLogin: function() {
			this.db = window.openDatabase("sims21s", "1.0", "Banco Local", 2000);
			this.db.transaction(function(res) {
				res.executeSql("CREATE TABLE IF NOT EXISTS users(nome TEXT, login TEXT, endereco TEXT, cidade TEXT, email TEXT, telefone TEXT, imgtumb TEXT,id TEXT);", []);
				res.executeSql("CREATE TABLE IF NOT EXISTS matricula(_id INTEGER PRIMARY KEY, nome TEXT, valor TEXT, data TEXT, curso TEXT, descricao TEXT, palestrante TEXT,id TEXT);", []);
				
			});
		}
	});
})();

