describe ('app.RowView', function(){
	var view,
		model;
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		try{
			loadFixtures('index-fixture.html');
		}
		catch(ex){
			jasmine.getFixtures().fixturesPath = 'fixtures';
			loadFixtures('index-fixture.html');
		}
		model = new app.RowModel({
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
		});
		view = new app.RowView({model: model});
	});

	it('should be defined', function(){
		expect(view).toBeDefined();
	});

	it('should not be null', function(){
		expect(view).not.toBeNull();
	});

	describe('when rendering', function(){
		beforeEach(function(){
			view.render();
		});
		it ('should create a table with 11 rows', function(){
			expect(view.$el.find('tr').length).toEqual(11);
		});
		it ('should add a link html element in Home Page cell and Photo', function(){
			expect(view.$el.find('a').length).toEqual(2);
		});
		it ('should add an image html element in Photo cell', function(){
			expect(view.$el.find('img').length).toEqual(1);
		});
	});
	describe('when toggling map marker', function(){
	    beforeEach(function(){
	    	spyOn(view.model, 'toggleMarker').and.callThrough();
	    	$('body').append($('<div>')
	    				.attr('id', 'spec'));
    		$('#spec').html(view.render().el);
			model.createGoogleMarker('Garage Latitude', 'Garage Longitude', 'Company Name');
	        view.$el.find('#toggle').click();
	    });
	    afterEach(function(){
	    	$('#spec').html('');
	    });

	    it('should call model toggleMarker function', function () {
	        expect(view.model.toggleMarker).toHaveBeenCalled();
	    });
	});
	describe('when the hidden property of the model changes', function(){
	    beforeEach(function(){
	    	$('body').append($('<div>')
	    				.attr('id', 'spec'));
    		$('#spec').html(view.render().el);
			model.createGoogleMarker('Garage Latitude', 'Garage Longitude', 'Company Name');
	    });
	    afterEach(function(){
	    	$('#spec').html('');
	    });

	    it('should hide the element function if it is hidden', function () {
	    	view.model.hide();
	        expect(view.$el).toBeHidden();
	    });
	    it('should show the element function if it is shown', function () {
	    	view.model.show();
	        expect(view.$el).toBeVisible();
	    });
	});
});