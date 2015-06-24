describe ('app.FileModel', function(){
	var file;
	beforeEach(function(){
		file = new app.FileModel;
	});

	it('should be defined', function(){
		expect(file).toBeDefined();
	});

	it('should not be null', function(){
		expect(file).not.toBeNull();
	});

	describe('at the beginning', function(){
		it('should have default value for columns', function(){
			expect(file.get('columns')).toEqual([]);
			expect(file.get('columns').length).toEqual(0);
		});

		it('should have default value for data', function(){
			expect(file.get('data')).toEqual([]);
			expect(file.get('data').length).toEqual(0);
		});

		it('should have default value for latitudeColumn', function(){
			expect(file.get('latitudeColumn')).toEqual(-1);
		});

		it('should have default value for longitudeColumn', function(){
			expect(file.get('longitudeColumn')).toEqual(-1);
		});

		it('should have default value for markerColumn', function(){
			expect(file.get('markerColumn')).toEqual(-1);
		});
	});

	describe('getters', function(){
		describe('#getColumnAt', function(){
			it('should be defined', function(){
				expect(file.getColumnAt).toBeDefined();
			});

			it('returns undefined if there are no columns', function(){
				expect(file.getColumnAt(3)).toBeUndefined();
			});

			it('otherwise returns the column name at the specific position', function(){
				file.set('columns', ['firstColumn', 'secondColumn', 'thirdColumn', 'fourthColumn', 'fifthColumn']);
				expect(file.getColumnAt(3)).toEqual('fourthColumn');
			});
		});
		describe('#getColumns', function(){
			it('should be defined', function(){
				expect(file.getColumns).toBeDefined();
			});

			it('returns empty array if there are no columns', function(){
				expect(file.getColumns().length).toEqual(0);
			});

			it('otherwise returns an array with the names of the columns', function(){
				file.set('columns', ['firstColumn', 'secondColumn', 'thirdColumn', 'fourthColumn', 'fifthColumn']);
				expect(file.getColumns().length).toEqual(5);
			});
		});
		describe('#getColumnsNo', function(){
			it('should be defined', function(){
				expect(file.getColumnsNo).toBeDefined();
			});

			it('returns 0 if there are no columns', function(){
				expect(file.getColumnsNo()).toEqual(0);
			});

			it('otherwise returns 5 if there are 5 columns names in the array', function(){
				file.set('columns', ['firstColumn', 'secondColumn', 'thirdColumn', 'fourthColumn', 'fifthColumn']);
				expect(file.getColumnsNo()).toEqual(5);
			});
		});
		describe('#getLatitudeColumn', function(){
			it('should be defined', function(){
				expect(file.getLatitudeColumn).toBeDefined();
			});

			it('returns -1 if latitude column is not defined', function(){
				expect(file.getLatitudeColumn()).toEqual(-1);
			});

			it('otherwise returns the selected latitude column', function(){
				file.set('latitudeColumn', 2);
				expect(file.getLatitudeColumn()).toEqual(2);
			});
		});
		describe('#getLongitudeColumn', function(){
			it('should be defined', function(){
				expect(file.getLongitudeColumn).toBeDefined();
			});

			it('returns -1 if longitude column is not defined', function(){
				expect(file.getLongitudeColumn()).toEqual(-1);
			});

			it('otherwise returns the selected longitude column', function(){
				file.set('longitudeColumn', 3);
				expect(file.getLongitudeColumn()).toEqual(3);
			});
		});
		describe('#getMarkerColumn', function(){
			it('should be defined', function(){
				expect(file.getMarkerColumn).toBeDefined();
			});

			it('returns -1 if marker column is not defined', function(){
				expect(file.getMarkerColumn()).toEqual(-1);
			});

			it('otherwise returns the selected marker column', function(){
				file.set('markerColumn', 4);
				expect(file.getMarkerColumn()).toEqual(4);
			});
		});
		describe('#getDataRow', function(){
			it('should be defined', function(){
				expect(file.getDataRow).toBeDefined();
			});

			it('returns empty object if there is no data', function(){
				expect(file.getDataRow(1)).toEqual({});
			});

			it('otherwise returns an object with the row', function(){
				file.set('data', [{name: 'Google', latitude: 1, longitude: 2}, 
					{name: 'Apple', latitude: 1, longitude: 2}]);
				expect(file.getDataRow(1)).toEqual({name: 'Apple', latitude: 1, longitude: 2});
			});
		});
		describe('#getAllDataRows', function(){
			it('should be defined', function(){
				expect(file.getAllDataRows).toBeDefined();
			});

			it('returns empty array if there is no data', function(){
				expect(file.getAllDataRows().length).toEqual(0);
			});

			it('otherwise returns an array with the data objects', function(){
				file.set('data', [{name: 'Google', latitude: 1, longitude: 2}, 
					{name: 'Apple', latitude: 1, longitude: 2}]);
				expect(file.getAllDataRows().length).toEqual(2);
			});
		});
		describe('#getDataRowNo', function(){
			it('should be defined', function(){
				expect(file.getDataRowNo).toBeDefined();
			});

			it('returns 0 if there is no data', function(){
				expect(file.getDataRowNo()).toEqual(0);
			});

			it('otherwise returns 2 if there are two rows of data', function(){
				file.set('data', [{name: 'Google', latitude: 1, longitude: 2}, 
					{name: 'Apple', latitude: 1, longitude: 2}]);
				expect(file.getDataRowNo()).toEqual(2);
			});
		});
	});
});