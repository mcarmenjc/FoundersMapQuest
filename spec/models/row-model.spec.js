describe ('app.RowModel', function(){
	var row;
	beforeEach(function(){
		row = new app.RowModel();
	});

	it('should be defined', function(){
		expect(row).toBeDefined();
	});

	it('should not be null', function(){
		expect(row).not.toBeNull();
	});

	describe('at the beginning', function(){
		it('should have default value for hide', function(){
			expect(row.get('hide')).toEqual(false);
		});

		it('should have default value for googleMarker', function(){
			expect(row.get('googleMarker')).toEqual(undefined);
		});
	});

	describe('getters', function(){
		describe('#isHidden', function(){
			it('should be defined', function(){
				expect(row.isHidden).toBeDefined();
			});

			it('returns false if it is not hidden', function(){
				expect(row.isHidden()).toBeFalsy();
			});

			it('otherwise returns true', function(){
				row.set('hide', true);
				expect(row.isHidden()).toBeTruthy();
			});
		});
	});
	describe('setters', function(){
		describe('#toggle', function(){
			it('should be defined', function(){
				expect(row.toggle).toBeDefined();
			});

			it('should set property hide property to !hide', function(){
				var hide = true;
				row.set('hide', hide);
				row.toggle();
				expect(row.isHidden()).toEqual(!hide);
			});			
		});
		describe('#createGoogleMarker', function(){
			beforeEach(function(){
				row = new app.RowModel({
					latitude: 1,
					longitude: 2,
					marker: 'hola'
				});
			});

			it('should be defined', function(){
				expect(row.createGoogleMarker).toBeDefined();
			});

			it('should set property googleMarker to a specific value', function(){
				row.createGoogleMarker('latitude', 'longitude', 'marker');
				expect(row.get('googleMarker')).toBeDefined();
			});			
		});
	});
});