(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var itemsToBuyList = this;

  itemsToBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

  itemsToBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
};

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var itemsBoughtList = this;

  itemsBoughtList.items = ShoppingListCheckOffService.getItemsBought();
};

function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [
    {name: "cookies", quantity: 7},
    {name: "chips", quantity: 5},
    {name: "beers", quantity: 10},
    {name: "cola", quantity: 15},
    {name: "fish", quantity: 10}
  ];
  var itemsBought = [];

  service.removeItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };


}

})();
