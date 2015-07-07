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
	describe('when setting data', function(){
		var data;
		beforeEach(function(){
			data = [{
				id: 1,
				name: 'something',
				latitude: 1,
				longitude: 2
			},
			{
				id: 2,
				name: 'something more',
				latitude: 3,
				longitude: 4	
			}];
			rowCollection.setData(data);
		});
		it('should be defined', function(){
			expect(rowCollection.setData).toBeDefined();
		});
		it('should have an array of app.RowModel with the data of the array', function(){
			expect(rowCollection.length).toEqual(2);
		});
		it('should set originalRowArray to the data array', function(){
			expect(rowCollection.originalRowArray).toEqual(data);
		});
	});
	describe('when sorting', function(){
		var data;
		beforeEach(function(){
			data = [{
				id: 1,
				name: 'something',
				latitude: 1,
				longitude: 2,
				extra: 5
			},
			{
				id: 2,
				name: 'more',
				latitude: 3,
				longitude: 4,
				extra: 2	
			}];
			rowCollection.setData(data);
		});
		it('should be defined', function(){
			expect(rowCollection.sortBy).toBeDefined();
		});
		it('should correctly sort array of rows depending on extra field', function(){
			expect(rowCollection.at(0).get('extra')).toEqual(5);
			expect(rowCollection.at(1).get('extra')).toEqual(2);
			rowCollection.sortBy('extra');
			expect(rowCollection.at(0).get('extra')).toEqual(2);
			expect(rowCollection.at(1).get('extra')).toEqual(5);
		});
	});
	describe('when filtering', function(){
		var data;
		beforeEach(function(){
			data = [{
				id: 1,
				name: 'something',
				latitude: 1,
				longitude: 2,
				extra: 5
			},
			{
				id: 2,
				name: 'more',
				latitude: 3,
				longitude: 4,
				extra: 2	
			}];
			rowCollection.setData(data);
		});
		describe('#filter', function(){
			it('should be defined', function(){
				expect(rowCollection.filter).toBeDefined();
			});
			it('should correctly filter the array of rows by value something on name field', function(){
				expect(rowCollection.length).toEqual(2);
				rowCollection.filter('name', 'something');
				expect(rowCollection.length).toEqual(1);
				expect(rowCollection.at(0).get('name')).toEqual('something');
			});	
		});
		describe('#removeFilter', function(){
			it('should be defined', function(){
				expect(rowCollection.removeFilter).toBeDefined();
			});
			it('should correctly remove any kind of applied filter', function(){
				rowCollection.filter('name', 'something');
				expect(rowCollection.length).toEqual(1);
				rowCollection.removeFilter();
				expect(rowCollection.length).toEqual(2);
			});
		});
	});
});