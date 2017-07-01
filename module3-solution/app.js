(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      menu: '<foundItems',
      onRemove: '='
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.found = [];

  menu.searchTerm = "";
  menu.wasClicked = false;

  menu.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      menu.found = response;
      menu.wasClicked = true;
      console.log(menu.found);
    });
  }

  menu.removeItem = function(itemIndex) {
    console.log(menu.found[itemIndex].name);
    menu.found.splice(itemIndex, 1);
  }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (response) {
      var foundItems = [];
      if (searchTerm.length > 0) {
        for (var i = 0; i < response.data.menu_items.length; i++) {
          if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(response.data.menu_items[i]);
          }
        }
      }
      console.log(foundItems);
      return foundItems;
    });
  }
}
})();
