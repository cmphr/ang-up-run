describe('ItemCtrl with inline mock', function() {
  beforeEach(module('testServiceApp1'));

  var service;

  beforeEach(inject(function(ItemService) {
    service = ItemService;
  }));

  it('should return default items', function() {
    expect(service.list()).toEqual([
      {id: 1, label: 'Item 0'},
      {id: 2, label: 'Item 1'}
    ]);
  });

  it('should add more items', function() {
    var newItem = {id: 3, label: 'New Item'};
    service.add(newItem);
    expect(service.list()).toEqual([
      {id: 1, label: 'Item 0'},
      {id: 2, label: 'Item 1'},
      newItem
    ]);

  });
});
