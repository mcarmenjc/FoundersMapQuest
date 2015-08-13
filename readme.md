# Founders Quest Map

## Frameworks and JavaScript Libraries

- BackboneJs
- Underscore
- JQuery
- Papa Parse (http://papaparse.com/)

## Solution structure

The solution is structured using an MV* pattern, so it has the next components which try to represent a csv file and its view:

- models --> which represents the entities of the application
	- app.RowModel (row-model.js) --> which represent a row in the csv file. The only known fields (a priori) are:
		- hidden --> which says if a row is displayed or not
		- hiddenMarker --> which indicates if the related marker in the map is shown or not
		- googleMarker --> which is the actual marker in the map
	The rest of the attributes will depend on the columns in the csv
	- app.ColumnModel (column-model.js) --> which represents a column in the csv file.
	- app.ErrorModel (error-model.js) --> which represents any kind of error message that can be displayed.
- collections --> list of models:
	- app.RowCollection (row-collection.js) --> is the list of all rows in the csv, it is related to app.RowModel. It is responsible for sorting and filtering the row list.
	- app.ColumnCollection (column-collection.js) --> is the list of all columns in the csv.
-views --> are how the models should be displayed:
	- app.RowView --> it is the representation of a row, it will listen to changes in the model to adjust how it is displayed. It will listen to model.hidden changes to display or not the row. Moreover, it will listen to some events in the DOM, like clicking on the checkbox #toggle. It is based on the template #row-template defined in the index file.
	- app.ErrorView (error-view.js) --> is the way errors are displayed. It is based on the template #error-template defined in the index file.
	- app.FileView (file-view.js) --> which is like the master view, the one in charge of controlling the flow of the app. It reads and parses the file, and fills the data in the collections and models, create the views for each row and control all the events.

I have created a serie of tests in Jasmine to test that the application is doing the correct things and flow is the correct one. The tests can be found under the spec folder.

## Grunt

To control the development process I have created some grunt tasks:
- concat
- uglify
- jshint
- jasmine
- jsdoc
- watch --> this is the most important one while developing, because anytime I change something it will run the jshint to find errors and all the jasmine tests to see if I have broken something or fixed something.