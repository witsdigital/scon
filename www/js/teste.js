angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    });
  
  $urlRouterProvider.otherwise("/event/home");
})
.controller('MainCtrl', function($scope, $timeout, $filter) { 
  
  $scope.editUser = {
    users : [
      {id: 1, name: "Valentina", selected: true},
      {id: 2, name: "Juan David", selected: false},
      {id: 3, name: "Osman", selected: false},
      {id: 4, name: "Silva", selected: false},
      {id: 5, name: "Andrea", selected: true},
      {id: 6, name: "Jhon", selected: false},
      {id: 7, name: "Williams", selected: false},
      {id: 8, name: "Yuli", selected: false}
    ],
    user: null
  };
  
  $scope.userYear = {
    years : [],
    year : 1942
  };
  
  var currentDate = new Date();
  for(var i = 1940; i <= currentDate.getFullYear(); i++){
    $scope.userYear.years.push(i);
  }
})
.directive('ionSearchSelect', ['$ionicModal', '$ionicGesture', function ($ionicModal, $ionicGesture) {
    return {
        restrict: 'E',
        scope: {
            options: "=",
            optionSelected: "="
        },
        controller: function ($scope, $element, $attrs) {
            $scope.searchSelect = {
                title: $attrs.title || "Search",
                keyProperty: $attrs.keyProperty,
                valueProperty: $attrs.valueProperty,
                templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
                animation: $attrs.animation || 'slide-in-up',
                option: null,
                searchvalue: "",
                enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
            };

            $ionicGesture.on('tap', function (e) {
              
                if(!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty){
                  if ($scope.optionSelected) {
                    $scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
                  }
                }
                else{
                  $scope.searchSelect.option = $scope.optionSelected;
                }
                $scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
            }, $element);

            $scope.saveOption = function () {
              if(!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty){
                for (var i = 0; i < $scope.options.length; i++) {
                    var currentOption = $scope.options[i];
                    if(currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option){
                      $scope.optionSelected = currentOption;
                      break;
                    }
                }
              }
              else{
                $scope.optionSelected = $scope.searchSelect.option;
              }
                $scope.searchSelect.searchvalue = "";
                $scope.modal.remove();
            };
          
            $scope.clearSearch = function () {
                $scope.searchSelect.searchvalue = "";
            };

            $scope.closeModal = function () {
                $scope.modal.remove();
            };
            $scope.$on('$destroy', function () {
                if ($scope.modal) {
                    $scope.modal.remove();
                }
            });
          
            $scope.OpenModalFromTemplate = function (templateUrl) {
                $ionicModal.fromTemplateUrl(templateUrl, {
                    scope: $scope,
                    animation: $scope.searchSelect.animation
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
        }
    };
} ]);