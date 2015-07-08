describe ('app.ErrorView', function(){
	var error;
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		loadFixtures('index-fixture.html');
		var errorModel = new app.ErrorModel({message: 'Yeah!'});
		error = new app.ErrorView({model: errorModel});
	});

	it('should be defined', function(){
		expect(error).toBeDefined();
	});

	it('should not be null', function(){
		expect(error).not.toBeNull();
	});

	describe('when initializing', function(){
		it('should associate template with the element in the DOM', function(){
			expect(error.template).toBeDefined();
		});
	});

	describe('when rendering', function(){
		it('should create a error element with the proper message', function(){
			error.render();
			expect(error.$el).toContainText('Yeah!');
		});
	});
});