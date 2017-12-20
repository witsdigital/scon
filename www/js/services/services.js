(function(){
	"use strict";

	angular.module('starter.controllers').value("Conf",{

   getUrl:"http://meupainel.com.br/sisconsig/"
    //getUrl:"http://localhost/sisconsig/"


  })

	

	angular.module('starter.controllers').service("Data", function($http, Conf, $rootScope){

    this.loginData = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"apilogin/logarapp",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    };


    this.sincCidade = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"cidades/getapp",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    };
    this.sincClientes = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"cliente/setapp",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 


    this.sincClientesUp = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"cliente/upapp",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 


    this.setVendas = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"vendas/setapp",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    };
    this.upVendas = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"vendas/upapp",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 


    this.upVendasItens = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"vendas/upappItens",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 


    this.setVendasItens = function(credential){
      return $http({
        method: "POST",
        url: Conf.getUrl+"vendas/setappItens",
        data: credential,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 


    this.getSincClientes = function(){
      return $http({
        method: "POST",
        url: Conf.getUrl+"cliente/getapp",
        data: $rootScope.rep, // codigo do representante
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    };

    this.getSincPedidoRp = function(){
      return $http({
        method: "POST",
        url: Conf.getUrl+"rp/getapp",
         data: $rootScope.rep, // codigo do representante
         headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 

    this.getSincVendas = function(){
      return $http({
        method: "POST",
        url: Conf.getUrl+"vendas/getapp",
         data: $rootScope.rep, // codigo do representante
         headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; 

    this.getSincVendasItens = function(){
      return $http({
        method: "POST",
        url: Conf.getUrl+"vendas/getappItens",
         data: $rootScope.rep, // codigo do representante
         headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    };

    this.getSincPedidoRpItens = function(){
      return $http({
        method: "POST",
        url: Conf.getUrl+"rp/getappItens",
        data: $rootScope.rep, // codigo do representante
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    };

    this.getSincProdutos = function(){
      return $http({
        method: "POST",
        url: Conf.getUrl+"produtos/getapp",
        data: $rootScope.rep, // codigo do representante
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }; this.setSincPedidosRpItens = function(itens){
      return $http({
        method: "POST",
        url: Conf.getUrl+"representante/upapp",
        data: itens, // codigo do representante
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });



    };




  });
})();