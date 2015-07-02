describe ('app.ColumnModel', function(){
	var column;
	beforeEach(function(){
		column = new app.ColumnModel();
	});

	it('should be defined', function(){
		expect(column).toBeDefined();
	});

	it('should not be null', function(){
		expect(column).not.toBeNull();
	});

	describe('at the beginning', function(){
		it('should have default value for name', function(){
			expect(column.get('name')).toEqual('');
		});
	});

	describe('getters', function(){
		describe('#getName', function(){
			it('should be defined', function(){
				expect(column.getName).toBeDefined();
			});

			it('returns value of column property', function(){
				var columnName = 'column1';
				column.set('name', columnName);
				expect(column.getName()).toEqual(columnName);
			});
		});
	});
});