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
		it('should have default value for hidden', function(){
			expect(row.get('hidden')).toEqual(false);
		});
		it('should have default value for hiddenMarker', function(){
			expect(row.get('hiddenMarker')).toEqual(false);
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
				row.set('hidden', true);
				expect(row.isHidden()).toBeTruthy();
			});
		});
		describe('#isMarkerHidden', function(){
			it('should be defined', function(){
				expect(row.isMarkerHidden).toBeDefined();
			});

			it('returns false if it is not hidden', function(){
				expect(row.isMarkerHidden()).toBeFalsy();
			});

			it('otherwise returns true', function(){
				row.set('hiddenMarker', true);
				expect(row.isMarkerHidden()).toBeTruthy();
			});
		});
	});
	describe('setters', function(){
		describe('#toggleMarker', function(){
			beforeEach(function(){
				row = new app.RowModel({
					latitude: 1,
					longitude: 2,
					marker: 'hola'
				});
				row.createGoogleMarker('latitude', 'longitude', 'marker');
			});

			it('should be defined', function(){
				expect(row.toggleMarker).toBeDefined();
			});

			it('should set property hiddenMarker property to !hiddenMarker', function(){
				var hide = true;
				row.set('hiddenMarker', hide);
				row.toggleMarker();
				expect(row.isMarkerHidden()).toEqual(!hide);
			});			
		});
		describe('#hide', function(){
			beforeEach(function(){
				row = new app.RowModel({
					latitude: 1,
					longitude: 2,
					marker: 'hola'
				});
				row.createGoogleMarker('latitude', 'longitude', 'marker');
				spyOn(row, 'hideMarker').and.callThrough();
			});

			it('should be defined', function(){
				expect(row.hide).toBeDefined();
			});

			it('should set property hidden property to true', function(){
				row.hide();
				expect(row.isHidden()).toBeTruthy();
			});

			it('should hide the marker', function(){
				row.hide();
				expect(row.hideMarker).toHaveBeenCalled();
			});			
		});
		describe('#show', function(){
			beforeEach(function(){
				row = new app.RowModel({
					latitude: 1,
					longitude: 2,
					marker: 'hola'
				});
				row.createGoogleMarker('latitude', 'longitude', 'marker');
				spyOn(row, 'showMarker').and.callThrough();
			});

			it('should be defined', function(){
				expect(row.show).toBeDefined();
			});

			it('should set property hidden property to true', function(){
				row.hide();
				row.show();
				expect(row.isHidden()).toBeFalsy();
			});	
			it('should show the marker', function(){
				row.show();
				expect(row.showMarker).toHaveBeenCalled();
			});
			it('should not show the marker if it is hidden', function(){
				row.toggleMarker();
				row.show();
				expect(row.showMarker).not.toHaveBeenCalled();
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
	describe('#shouldBeHidden', function(){
		beforeEach(function(){
			row = new app.RowModel({
				latitude: 1,
				longitude: 2,
				marker: 'hola',
				filter: 'filter'
			});
		});
		it('should be defined', function(){
			expect(row.shouldBeHidden).toBeDefined();
		});

		it('returns false if it should not be hidden', function(){
			expect(row.shouldBeHidden('filter', 'filter')).toBeFalsy();
		});

		it('otherwise returns true', function(){
			expect(row.shouldBeHidden('filter', 'other')).toBeTruthy();
		});
	});
});