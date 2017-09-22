describe('Stock Market Directive Behavior', function() {

  beforeEach(module('stockMarketApp'));

  var compile, mockBackend, rootScope;

  // step 1
  beforeEach(inject(function($compile, $httpBackend, $rootScope){
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it('should have functions and data on scope correctly', function() {
    // step 2, simulate data returned from a controller
    var scope = rootScope.$new();
    var scopeClickCalled = '';
    scope.myStock = {
      name: 'Best Stock',
      price: 100,
      previous: 200
    };
    scope.title = 'the best';
    scope.userClick = function(stockPrice, stockPrevious, stockName) {
      scopeClickCalled = stockPrice + ';' + stockPrevious + ';' + stockName;
    };

    // step 3, templateURL from directive
    mockBackend.expectGET('stock.html').respond(
      '<div ng-bind="stockTitle"></div>' +
      '<div ng-bind="stockData.price"></div>');

    // step 4, create an instance of the directive, compile returns a function that is then called with scope
    var element = compile('<div stock-widget' +
      ' stock-data="myStock"' +
      ' stock-title="This is {{title}}"' +
      ' when-select="userClick(stockPrice, stockPrevious, stockName)"' +
      '></div>')(scope);

    // step 5, update all bindings, ensure HTML is loaded and rendered
    scope.$digest();
    mockBackend.flush();

    // step 6, get scope of the element, not the parent scope, verify the scope data
    var compiledElementScope = element.isolateScope();
    
    expect(compiledElementScope.stockData).toEqual(scope.myStock);
    expect(compiledElementScope.getChange(compiledElementScope.stockData)).toEqual(-50);

    // step 7, verify directive function
    expect(scopeClickCalled).toEqual('');
    compiledElementScope.onSelect();
    expect(scopeClickCalled).toEqual('100;200;Best Stock');
  });
});