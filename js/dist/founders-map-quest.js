/* global Backbone */

var app = app || {};

/**
 * @class ColumnModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.ColumnModel = Backbone.Model.extend(/** @lends ColumnModel.prototype */ {
	/** 
     * @constructs ColumnModel object
     */
	initialize: function(attributes) {
		if (attributes !== undefined){
			this.set('name', attributes);
		}
	},
	/** 
     * Get default value for a column
     * @returns {Object} An object with the defaults values to set
     */
	defaults: function(){
		return {
			name: ''
		};
	},
	/** 
     * Get name property value
     * @returns {string} The name of the column
     */
	getName: function(){
	 	return this.get('name');
	}
}); 
/* global Backbone */

var app = app || {};

/**
 * @class ErrorModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.ErrorModel = Backbone.Model.extend(/** @lends ErrorModel.prototype */ {
	/** 
     * Get default value for an error
     * @returns {Object} An object with the defaults values to set
     */
	defaults: function(){
		return {
			message: ''
		};
	}
}); 
/* global Backbone */
/* global google */

var app = app || {};

/**
 * @class RowModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.RowModel = Backbone.Model.extend(/** @lends RowModel.prototype */ {
	/** 
     * @constructs RowModel object
     */
	 initialize: function(attributes){
	 	var me = this;
	 	me.set('hide', false);
	 	me.set(attributes);
	 },
	 /** 
     * Set value of hide property to !hide, to show or hide the marker on the map
     */
	 toggle: function(){
	 	var me = this;
	 	me.set('hide', !me.get('hide'));
	 	if (me.get('hide')){
	 		me.hideMarker();
	 	}
	 	else{
	 		me.showMarker();
	 	}
	 },
	 /** 
     * Get if the row is hidden from the map or not
     * @returns {boolean} True if the row is hidden and false if not
     */
	 isHidden: function(){
	 	return this.get('hide');
	 },
	 /** 
     * Hide the marker from the map, removing value of the map property of the marker
     */
	 hideMarker: function(){
	 	var me = this,
	 		marker = me.get('googleMarker');
	 	marker.setMap(null);
	 },
	 /** 
     * Set map property of the marker, to make it visible again
     */
	 showMarker: function(){
	 	var me = this,
	 		marker = me.get('googleMarker');
	 	marker.setMap(me.get('googleMap'));
	 },
	 /** 
     * Initialise googleMarker property
     * @param {string} latitude Latitude name property
     * @param {string} longitude Longitude name property
     * @param {string} marker Marker name property (empty value is no marker defined)
     * @param {Object} googleMap Map where the marker is going to be displayed
     */
	 createGoogleMarker: function(latitude, longitude, marker, googleMap){
	 	var me = this,
	 		title = '',
	 		gMarker;
	 	if (marker !== 'empty'){
	 		title = title + me.get(marker);
	 	}
	 	gMarker = new google.maps.Marker({
            position: new google.maps.LatLng(me.get(latitude), me.get(longitude)),
            map: googleMap,
            title: title
        });
        me.set('googleMap', googleMap);
	 	me.set('googleMarker', gMarker);
	 }
}); 
/* global Backbone */

var app = app || {};

/**
 * @class ColumnCollection
 * @augments Backbone.Collection
 * @requires Backbone.js
 */
app.ColumnCollection = Backbone.Collection.extend(/** @lends ColumnCollection.prototype */ {
	/** 
     * @property {Object} model Associates ColumnCollection with a specific model (ColumnModel)
     */
	model: app.ColumnModel
}); 
/* global Backbone */
/* global _ */

var app = app || {};

/**
 * @class RowCollection
 * @augments Backbone.Collection
 * @requires Backbone.js
 */
app.RowCollection = Backbone.Collection.extend(/** @lends RowCollection.prototype */ {
	/** 
     * @property {Object} model Associates RowCollection with a specific model (RowModel)
     */
	model: app.RowModel,
	/** 
     * @property {Array} originalArray The array of data set the first time to create the collection
     * (needed to come back from filtering)
     */
	originalRowArray: undefined,
	/** 
     * Sort the rows in the collection by a specific column
     * @param {string} column Name of the column (property) to sort the rows by
     */
	sortBy: function(column){
		var me = this,
			sortedArray = _.sortBy(me.originalRowArray, column);
		me.reset(sortedArray);
	},
	/** 
     * Get a subset of the rows in the collection filtered by a specific value of a column
     * @param {string} column Name of the column (property) to filter
     * @param {string} value Value to filter by
     */
	filter: function(column, value){
		var me = this,
			filteredArray = _.filter(me.originalRowArray, function(row){
				return row[column].toUpperCase().indexOf(value.toUpperCase()) !== -1;
			});
		me.reset(filteredArray);
	},
	/** 
     * Set data into the collection. It creates a copy of this array of data in case it is needed
     * for coming back from filtering.
     * @param {Array} rowArray Array of objects that contains the data for the rows
     */
	setData: function(rowArray){
		var me = this;
		me.originalRowArray = rowArray;
		me.each(function(row){
			row.hideMarker();
		});
		me.reset(rowArray);
	},
	/** 
     * Remove any applied filter. It sets back the orginal array of data saved.
     */
	removeFilter: function(){
		this.reset(this.originalRowArray);
	}
}); 
/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class ErrorView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.ErrorView = Backbone.View.extend(/** @lends ErrorView.prototype */{
    /** 
     * @contructs ErrorView object.
     * Initialize the related template in the DOM
     */
    initialize: function(){
      this.template = _.template($('#error-template').html());
    },
    /** 
     * Render the error. Create the html code for rendering the error based on the template.
     * @returns {Object} It returns itself
     */
    render: function(){
        var me = this;
        me.$el.html(me.template(me.model.toJSON()));   
        return me;
    }
});
/*global Backbone */
/*global google */
/*global Papa */

var app = app || {};

/** 
 * @class FileView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.FileView = Backbone.View.extend(/** @lends FileView.prototype */{
    /** 
     * @property {Object} el Object that associates the view with the element in the DOM
     */
    el: '#main',
    /** 
     * @property {Object} events Object that associates different events in the DOM with the functions that handle them 
     */
    events: {
        'click #button-file-chooser': 'openFileChooser',
        'change #file-chooser': 'processFile',
        'click #show-results-button': 'showResults',
        'click #filter-button': 'filterRows',
        'click #remove-filter-button': 'removeFilter',
        'click #sort-button': 'sortRows',
        'click #begin-again-button': 'beginAgain',
        'click #go-back-beginning-button': 'beginAgain',
        'click #go-back-button': 'goBack'
    },
    /** 
     * @contructs AppView object 
     * Set DOM properties values, add listener to changes in the collections, 
     * and hide some elements.
     * @param {Object} data
     */
    initialize: function (data) {
        var me = this;
        me.$stepsRow = me.$('#steps-row');
        me.$selectFileRow = me.$('#select-file-row');
        me.$columnSelectionRow = me.$('#column-selection-row');
        me.$resultRow = me.$('#result-row');
        me.$errorRow = me.$('#error-row');
        me.$fileChooser = me.$('#file-chooser');
        me.$mapElement = me.$('#map-canvas');
        me.$table = me.$('#table-places');
        me.map = undefined;

        me.listenTo(app.Rows, 'add', me.addRow);
        me.listenTo(app.Rows, 'reset', me.addAllRows);

        me.$columnSelectionRow.hide();
        me.$resultRow.hide();
    },
    /** 
     * Opens file chooser dialog to select the csv file which contains the data to show,
     * and remove all errors
     */
    openFileChooser: function() {
        var me = this;
        me.$errorRow.html('');
        me.$fileChooser.click();
    },
    /** 
     * Get the selected file to process it.
     */
    processFile: function() {
        var fileName = this.$fileChooser.val(),
            file,
            me = this;
        if(fileName !== ''){
            file = me.$fileChooser[0].files[0];
            me.setDataFromFile(file);
            me.$fileChooser[0].value = null;
        }
    },
    /** 
     * Set collections value from the data in the file.
     * @param {Object} file File content
     */
    setDataFromFile: function(file){
        var me = this;
        if (file.type !== 'text/csv'){
            me.showTypeError();
        }
        if (file.size === 0){
            me.showNoDataError();
        }
        if (file.type === 'text/csv' && file.size > 0){
            Papa.parse(file, {
                header: true,
                complete: function(results) {
                    if (results.errors.length > 0){
                        me.showParsingError();
                    }
                    else{
                        me.$table.html('');
                        app.Columns.reset(results.meta.fields);
                        app.Rows.setData(results.data);
                        me.showSelectOptions();
                    }
                }
            });
        }
     },
    /** 
     * Hide file chooser row and show dropdowns to select latitude, longitude and marker columns. 
     * Set dropdown options to the list of columns
     */
    showSelectOptions: function(){
        var me = this;
        me.setDropdownListValues('#dropdown-latitude', false);
        me.setDropdownListValues('#dropdown-longitude', false);
        me.setDropdownListValues('#dropdown-marker', true);
        me.$selectFileRow.hide();
        me.$columnSelectionRow.show();
        me.$errorRow.html('');
    },
    /** 
     * Set the dropdown list options to the columns list
     * @param {string} elementId DOM element id to select the dropdown
     * @param {boolean} isOptional It's true if the value to select could have 
     *  no value, so empty string is added to the options of the dropdownlist
     */
    setDropdownListValues:function(elementId, isOptional){
        var me = this,
            dropdownList = me.$(elementId);
        if (dropdownList[0].options !== undefined){
            dropdownList[0].options.length = 0;
        }
        if(isOptional){
            dropdownList.append(new Option('', 'empty'));
        }
        app.Columns.each(function(column){
            dropdownList.append(new Option(column.getName(), column.getName()));   
        });
        dropdownList[0].options[0].selected = true;
    },
    /** 
     * Show the result row and hide the dropdown row. Initialise the map when the section is
     * visible, if not a gray rectangle is displayed.
     * Latitude and Longitud value should be different, because to get a good position they cannot
     * reference the same value
     * Finally, for each row in the collection, the marker is created and added to the map.
     */
    showResults: function(){
        var me = this,
            mapCenter;
        me.latitudeColumn = me.$('#dropdown-latitude').val();
        me.longitudeColumn = me.$('#dropdown-longitude').val();
        me.markerColumn = me.$('#dropdown-marker').val();
        if (me.latitudeColumn !== me.longitudeColumn){
            me.setDropdownListValues('#dropdown-sort', false);
            me.setDropdownListValues('#dropdown-filter', false);
            me.$errorRow.html('');
            me.$columnSelectionRow.hide();
            me.$resultRow.show();
            mapCenter = me.getMapCenter(me.latitudeColumn, me.longitudeColumn);
            me.initialiseMap(mapCenter);
            me.createMapMarkers(me.latitudeColumn, me.longitudeColumn, me.markerColumn, me.map);
        }
        else{
            me.showEqualLatitudeLongitudeValues();
        }
    },
    /** 
     * Create the markers in the map.
     * @param {string} latitudeColumn Column with the latitude value
     * @param {string} longitudeColumn Column with the longitude value
     * @param {string} markerColumn Column with the marker value
     * @param {Object} gMap Google map element
     */
    createMapMarkers: function(latitudeColumn, longitudeColumn, markerColumn, gMap){
        app.Rows.each(function(row){
            row.createGoogleMarker(latitudeColumn, longitudeColumn, markerColumn, gMap);
        });
    },
    /** 
     * Initialise the map values, and add it to the element in the DOM
     * @param {Object} mapCenter A point in the map to center it
     */
    initialiseMap : function(mapCenter) {
        var mapCanvas = document.getElementById('map-canvas'),
            mapOptions = {
                center: mapCenter,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        this.map = new google.maps.Map(mapCanvas, mapOptions);
    },
    /** 
     * Get the point where the map is going to be centered from the first row in the collection.
     * @param {string} latitude Name of the property which contains the latitude value
     * @param {string} longitude Name of the property which contains the longitude value
     * @returns {Object} A point where the map is going to be centered
     */
    getMapCenter: function(latitude, longitude){
        var me = this,
            latitudeValue = app.Rows.at(0).get(latitude),
            longitudeValue = app.Rows.at(0).get(longitude),
            mapCenter = new google.maps.LatLng(
                latitudeValue, 
                longitudeValue);
        return mapCenter;
    },
    /** 
     * When app.Rows collection is reset, this method is called. For each row model object in the collection
     * it will call the function addRow
     */
    addAllRows: function(){
        this.$table.html('');
        app.Rows.each(this.addRow, this);
    },
    /** 
     * Create a new app.RowView for a row and add it to the table.
     * @param {Object} row row model to display
     */
    addRow: function(row) {
        var view = new app.RowView ({model: row});
        this.$table.append(view.render().el);
    },
    /** 
     * Retrieve from dropdown and text field the values to filter the rows in the table.
     */
    filterRows: function(){
        var me = this,
            filterColumn = me.$('#dropdown-filter').val(),
            filterValue = me.$('#filter-value').val();
        app.Rows.filter(filterColumn, filterValue);
        me.createMapMarkers(me.latitudeColumn, me.longitudeColumn, me.markerColumn, me.map);
    },
    /** 
     * Sort rows in the table depending on the column selected in the drop down list.
     */
    sortRows: function(){
        var me = this,
            sortColumn = me.$('#dropdown-sort').val();
        app.Rows.sortBy(sortColumn);
        me.createMapMarkers(me.latitudeColumn, me.longitudeColumn, me.markerColumn, me.map);
    },
    /** 
     * Remove the applied filter to the table.
     */
    removeFilter: function(){
        var me = this;
        me.$('#dropdown-filter').val('');
        me.$('#filter-value').val('');
        app.Rows.removeFilter();
        me.createMapMarkers(me.latitudeColumn, me.longitudeColumn, me.markerColumn, me.map);
    },
    /** 
     * Move back to the initial step.
     */
    beginAgain: function (argument) {
        var me = this;
        me.$columnSelectionRow.hide();
        me.$resultRow.hide();
        me.$selectFileRow.show();
    },
    /** 
     * Move back to the column selection for latitude, longitude and marker.
     */
    goBack: function(){
        var me = this;
        me.$resultRow.hide();
        me.$selectFileRow.hide();
        me.$columnSelectionRow.show();
    },
    /** 
     * Create error message when type of file is not correct
     */
    showTypeError: function(){
        var error = new app.ErrorModel({message: 'Looks like it\'s the wrong file format, make sure it\'s a .csv'}),
            errorView = new app.ErrorView({model: error}),
            me = this;
        me.$errorRow.append(errorView.render().el);
    },
    /** 
     * Create error message when file is empty
     */
    showNoDataError: function(){
        var error = new app.ErrorModel({message: 'Looks like the file is empty, please upload another file'}),
            errorView = new app.ErrorView({model: error}),
            me = this;
        me.$errorRow.append(errorView.render().el);
    },
    /** 
     * Create error message when file is not parsed correctly
     */
    showParsingError: function(){
        var error = new app.ErrorModel({message: 'Looks like there\'s a problem processing the file, please try with another file'}),
            errorView = new app.ErrorView({model: error}),
            me = this;
        me.$errorRow.append(errorView.render().el);
    },
    /** 
     * Create error message when latitude and longitude columns are the same
     */
    showEqualLatitudeLongitudeValues: function(){
        var error = new app.ErrorModel({message: 'Looks like you have selected the same column for latitude and longitude'}),
            errorView = new app.ErrorView({model: error}),
            me = this;
        me.$errorRow.append(errorView.render().el);
    }
});
/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class RowView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.RowView = Backbone.View.extend(/** @lends RowView.prototype */{
    /** 
     * @property {Object} events Associates DOM events with a function to process them
     */
    events: {
      "click #toggle"   : "toggleMarker",
    },
    /** 
     * @contructs RowView object.
     * Initialize the related template in the DOM
     */
    initialize: function(){
      this.template = _.template($('#row-template').html());
    },
    /** 
     * Render the row. Create the html code for rendering the row. It manages if the content of the cell
     * is a link or an image
     * @returns {Object} It returns itself
     */
    render: function(){
        var me = this;
        me.$el.html(me.template());
        _.each(me.model.toJSON(), function(val, key){
            var dataCell,
                isLink,
                extension;
            if(key !== 'hide'){
              me.$el.find('#data-table')
              .append($('<tr>')
                .append($('<td>')
                  .text(key))
                .append($('<td>')));
              dataCell = me.$el.find('#data-table')
                                .find('tr').last()
                                .find('td').last();
              isLink = (val.substring(0, 4) === 'http');
              extension = val.substring(val.length-3);
              if (isLink){
                dataCell.append($('<a>')
                          .attr('href', val)
                          .attr('target', '_blank'));
                dataCell = dataCell.find('a');
              }
              if (extension === 'jpg' || extension === 'png' || extension === 'gif'){
                dataCell.append($('<img>')
                          .attr('src', val)
                          .attr('class', 'img-thumbnail')
                          .text(val));
              }
              else{
                dataCell.text(val);
              }
            }
        });
        return me;
    },
    /** 
     * Toggle if the row should be displayed or not in the map.
     */
    toggleMarker: function(){
        this.model.toggle();
    }
});
/*global Backbone */

var app = app || {};

app.Rows = new app.RowCollection();
app.Columns = new app.ColumnCollection();
$(function () {
    new app.FileView();
});