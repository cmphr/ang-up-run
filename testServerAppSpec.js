describe('MainCtrl Server Calls', function() {
  beforeEach(module('serverApp'));

  var ctrl, mockBackend,
    mockObj = {id:1, label:'Mock'};

  beforeEach(inject(function($controller, $httpBackend){
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/note').respond([mockObj]);
    ctrl = $controller('MainCtrl');
    // at this point, server request has been made
  }));

  it('should load items from server', function() {
    // initially, items are empty
    expect(ctrl.items).toEqual([]);
    // simulate server response
    mockBackend.flush();

    expect(ctrl.items).toEqual([mockObj]);
  });

  afterEach(function() {
    // ensure all expects set on $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // ensure all server requests have responded
    mockBackend.verifyNoOutstandingRequest();
  });
});