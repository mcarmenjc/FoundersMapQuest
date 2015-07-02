describe ('app.ColumnCollection', function(){
	var columnCollection;
	beforeEach(function(){
		columnCollection = new app.ColumnCollection();
	});

	it('should be defined', function(){
		expect(columnCollection).toBeDefined();
	});

	it('should not be null', function(){
		expect(columnCollection).not.toBeNull();
	});
});