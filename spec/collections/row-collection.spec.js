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
			rowCollection.reset(data);
		});
		it('should be defined', function(){
			expect(rowCollection.setComparator).toBeDefined();
		});
		it('should correctly sort array of rows depending on extra field', function(){
			expect(rowCollection.at(0).get('extra')).toEqual(5);
			expect(rowCollection.at(1).get('extra')).toEqual(2);
			rowCollection.setComparator('extra');
			rowCollection.sort();
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
				extra: 5,
				googleMarker: {
					setMap: function(){}
				}
			},
			{
				id: 2,
				name: 'more',
				latitude: 3,
				longitude: 4,
				extra: 2,
				googleMarker: {
					setMap: function(){}
				}
			}];
			rowCollection.reset(data);
		});
		describe('when applying a filter', function(){
			it('should correctly filter the array of rows by value something on name field', function(){
				rowCollection.each(function(row){
					expect(row.isHidden()).toBeFalsy();	
				});
				rowCollection.filter('name', 'something');
				expect(rowCollection.at(0).isHidden()).toBeFalsy();
				expect(rowCollection.at(1).isHidden()).toBeTruthy();
			});	
		});
		describe('when removing the filter', function(){
			it('should correctly remove any kind of applied filter', function(){
				rowCollection.filter('name', 'something');
				expect(rowCollection.at(0).isHidden()).toBeFalsy();
				expect(rowCollection.at(1).isHidden()).toBeTruthy();
				rowCollection.removeFilter();
				rowCollection.each(function(row){
					expect(row.isHidden()).toBeFalsy();	
				});
			});
		});
	});
});