describe ('app.RowCollection', function(){
	var rowCollection;
	beforeEach(function(){
		rowCollection = new app.RowCollection();
	});

	it('should be defined', function(){
		expect(rowCollection).toBeDefined();
	});

	it('should not be null', function(){
		expect(rowCollection).not.toBeNull();
	});
});