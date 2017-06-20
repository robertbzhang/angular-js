(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();
  buyList.isEmpty = buyList.length === 0;

  buyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  boughtList.isEmpty = boughtList.length === 0;
}

function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [];
  var boughtItems = [];

  buyItems.push({name: "cookies", quantity: 10});
  buyItems.push({name: "cookies", quantity: 10});
  buyItems.push({name: "cookies", quantity: 10});
  buyItems.push({name: "cookies", quantity: 10});
  buyItems.push({name: "cookies", quantity: 10});

  service.buyItem = function (itemIndex) {
    boughtItems.push(buyItems[itemIndex]);
    buyItems.splice(itemIndex, 1);
  }

  service.getBuyItems = function() {
    return buyItems;
  }

  service.getBoughtItems = function() {
    return boughtItems;
  }

}
})();
