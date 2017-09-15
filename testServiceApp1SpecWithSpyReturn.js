describe('ItemCtrl with SpyReturn', function() {
  beforeEach(module('testServiceApp1'));

  var ctrl,
  itemService,
  mockObject = {id:1, label:'Mock'};

  beforeEach(inject(function($controller, ItemService) {
    spyOn(ItemService, 'list').and.returnValue([mockObject]);
    itemService = ItemService;
    ctrl = $controller('ItemCtrl');
  }));

  it('should load mocked out items', function() {
    expect(itemService.list).toHaveBeenCalled();
    expect(itemService.list.calls.count()).toEqual(1);
    expect(ctrl.items).toEqual([mockObject]);
  });
});