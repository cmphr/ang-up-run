describe('Stock Market Directive Rendering', function() {

  beforeEach(module('stockMarketApp'));

  var compile, mockBackend, rootScope;

  // step 1
  beforeEach(inject(function($compile, $httpBackend, $rootScope){
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it('should render HTML based on scope correctly', function() {
    // step 2, simulate data returned from a controller
    var scope = rootScope.$new();
    scope.myStock = {
      name: 'Best Stock',
      price: 100,
      previous: 200
    };
    scope.title = 'the best';

    // step 3, templateURL from directive
    mockBackend.expectGET('stock.html').respond(
      '<div ng-bind="stockTitle"></div>' +
      '<div ng-bind="stockData.price"></div>');

    // step 4, create an instance of the directive, compile returns a function that is then called with scope
    var element = compile('<div stock-widget' +
      ' stock-data="myStock"' +
      ' stock-title="This is {{title}}"></div>')(scope);

    // step 5, update all bindings, ensure HTML is loaded and rendered
    scope.$digest();
    mockBackend.flush();

    // step 6
    expect(element.html()).toEqual(
      '<div ng-bind="stockTitle" class="ng-binding">' +
      'This is the best' +
      '</div>' +
      '<div ng-bind="stockData.price" class="ng-binding">' +
      '100' +
      '</div>');
  });
});