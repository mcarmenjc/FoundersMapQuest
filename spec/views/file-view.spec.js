describe ('app.FileView', function(){
	var view;
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		loadFixtures('index-fixture.html')
		view = new app.FileView();
	});

	it('should be defined', function(){
		expect(view).toBeDefined();
	});

	it('should not be null', function(){
		expect(view).not.toBeNull();
	});

	describe('when initialized', function(){
		it('should hide dropdowns and result elements', function(){
			expect(view.$columnSelectionRow).toBeHidden();
			expect(view.$resultRow).toBeHidden();
		});
	});

	describe('when choosing a file', function(){
		beforeEach(function(){
			spyOn(view.$fileChooser, 'click').and.callThrough();
			view.$('#button-file-chooser').click();
		});
		it ('should trigger click on file chooser hidden element', function(){
			expect(view.$fileChooser.click).toHaveBeenCalled();
		});
	});

	describe('when a file is chosen', function(){
		it('should show an error if type is not correct (not csv)', function(){
			var file = {
	            name: 'test.png',
	            size: 500001,
	            type: 'img/png'
	        };
	        view.setDataFromFile(file);
		});
		it('should show an error if the file is empty', function(){
			var file = {
	            name: 'test.csv',
	            size: 0,
	            type: 'text/csv'
	        };
	        view.setDataFromFile(file);
		});
		it('should parse file', function(){
			var file = {
	            name: 'test.csv',
	            size: 100,
	            type: 'text/csv'
	        };
	        spyOn(Papa, 'parse').and.callFake(function(){});
	        view.setDataFromFile(file);
	        expect(Papa.parse).toHaveBeenCalled();
		});
		describe('when displaying dropdowns', function(){
			beforeEach(function(){
				app.Columns = new app.ColumnCollection();
				app.Columns.set(['column1', 'column2', 'column3']);
				view.showSelectOptions();
			});
			it('should show dropdowns and hide selection section', function(){
				expect(view.$columnSelectionRow).toBeVisible();
				expect(view.$selectFileRow).toBeHidden();
			});
			it('should add correct options to dropdowns', function(){
				expect(view.$('#dropdown-latitude')[0].options.length).toEqual(3);
				expect(view.$('#dropdown-longitude')[0].options.length).toEqual(3);
				expect(view.$('#dropdown-marker')[0].options.length).toEqual(4);
			});
		});
	});	

	describe('when showing results', function(){
		beforeEach(function(){
			app.Columns = new app.ColumnCollection();
			app.Rows = new app.RowCollection();
			app.Columns.set(['Id', 'Company Name', 'Founder', 'City', 'Country', 'Postal Code', ' Street', 'Photo', 'Home Page', 'Garage Latitude', 'Garage Longitude']);
			app.Rows.set([
				{
					Street: '1600 Amphitheatre Pkwy',
					City: 'Mountain View',
					'Company Name': 'Google',
					Country: 'USA',
					Founder: 'Larry Page & Sergey Brin',
					'Garage Latitude': '37.457674',
					'Garage Longitude': '-122.163452',
					'Home Page': 'http://google.com',
					Id: '1',
					Photo: 'http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg',
					'Postal Code': 'CA 94043'
				},
				{
					Street: '1 Infinite Loop',
					City: 'Cupertino',
					'Company Name': 'Apple',
					Country: 'USA',
					Founder: 'Steve Jobs & Steve Wozniak',
					'Garage Latitude': '37.3403188',
					'Garage Longitude': '-122.0581469',
					'Home Page': 'http://apple.com',
					Id: '2',
					Photo: 'http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg',
					'Postal Code': 'CA 95014'
				},
				{
					Street: 'One Microsoft Way',
					City: 'Redmond',
					'Company Name': 'Microsoft',
					Country: 'USA',
					Founder: 'Bill Gates',
					'Garage Latitude': '37.472189',
					'Garage Longitude': '-122.190191',
					'Home Page': 'http://microsoft.com',
					Id: '3',
					Photo: 'http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg',
					'Postal Code': 'WA 98052-7329'
				}
				]);
			view.showSelectOptions();
			view.$('#dropdown-latitude').val('Garage Latitude');
			view.$('#dropdown-longitude').val('Garage Longitude');
			view.$('#dropdown-marker').val('Company Name');
			view.$('#show-results-button').click();
		});
		it('should hide dropdowns and show result section', function(){
			expect(view.$columnSelectionRow).toBeHidden();
			expect(view.$resultRow).toBeVisible();
		});
		it('should add all options to filter and sort dropdowns', function(){
			expect(view.$('#dropdown-sort')[0].options.length).toEqual(11);
			expect(view.$('#dropdown-filter')[0].options.length).toEqual(11);
		});
		describe('when filtering', function(){
			describe('when adding a new filter', function(){
				beforeEach(function(){
					spyOn(app.Rows, 'filter').and.callThrough();
					view.$('#dropdown-filter').val('Company Name');
					view.$('#filter-value').val('google');
					view.$('#filter-button').click();
				});
				it('should filter the collection', function(){
					expect(app.Rows.filter).toHaveBeenCalled();
				});
			});
			describe('when removing a filter', function(){
				beforeEach(function(){
					spyOn(app.Rows, 'removeFilter').and.callThrough();
					view.$('#remove-filter-button').click();
				});
				it('should filter the collection', function(){
					expect(app.Rows.removeFilter).toHaveBeenCalled();
				});
			});
		});

		describe('when sorting', function(){
			beforeEach(function(){
				spyOn(app.Rows, 'sortBy').and.callThrough();
				view.$('#dropdown-sort').val('Company Name');
				view.$('#sort-button').click();
			});
			it('should sort the collection', function(){
				expect(app.Rows.sortBy).toHaveBeenCalled();
			});
		});
	});

	describe('when going back', function(){
		describe('when going back from dropdowns', function(){
			beforeEach(function(){
				view.$('#go-back-beginning-button').click();
			});
			it('should show file chooser button and hide the rest of elements', function(){
				expect(view.$columnSelectionRow).toBeHidden();
				expect(view.$resultRow).toBeHidden();
				expect(view.$selectFileRow).toBeVisible();
			});
		});
		describe('when trying again', function(){
			beforeEach(function(){
				view.$('#begin-again-button').click();
			});
			it('should show file chooser button and hide the rest of elements', function(){
				expect(view.$columnSelectionRow).toBeHidden();
				expect(view.$resultRow).toBeHidden();
				expect(view.$selectFileRow).toBeVisible();
			});
		});
		describe('when going back to dropdowns', function(){
			beforeEach(function(){
				view.$('#go-back-button').click();
			});
			it('should show dropdowns section', function(){
				expect(view.$columnSelectionRow).toBeVisible();
				expect(view.$resultRow).toBeHidden();
			});
		});
	});
});