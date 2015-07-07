describe ('app.RowView', function(){
	var view;
	beforeEach(function(){
		view = new app.RowView();
	});

	it('should be defined', function(){
		expect(view).toBeDefined();
	});

	it('should not be null', function(){
		expect(view).not.toBeNull();
	});
});