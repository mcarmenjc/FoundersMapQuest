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
        'click #sort-button': 'sortRows'
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
        me.$fileChooser = me.$('#file-chooser');
        me.$mapElement = me.$('#map-canvas');
        me.$table = me.$('#table-places');
        me.map = undefined;

        me.listenTo(app.Rows, 'add', me.addRow);
        me.listenTo(app.Rows, 'reset', me.addAllRows);
        me.listenTo(app.Columns, 'add', me.addColumn);
        me.listenTo(app.Columns, 'reset', me.addAllColumns);

        me.$columnSelectionRow.hide();
        me.$resultRow.hide();
    },
    /** 
     * Opens file chooser dialog to select the csv file which contains the data to show 
     */
    openFileChooser: function() {
        this.$fileChooser.click();
    },
    /** 
     * Get the selected file to process it.
     * @param {Object} event Object with all the data related to the event triggered
     */
    processFile: function(event) {
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
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                if (results.errors.length > 0){
                    me.showParsingError();
                }
                else{
                    app.Columns.reset(results.meta.fields);
                    app.Rows.reset(results.data);
                    me.showSelectOptions();
                }
            }
        });
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
            latitudeColumn = me.$('#dropdown-latitude').val(),
            longitudeColumn = me.$('#dropdown-longitude').val(),
            markerColumn = me.$('#dropdown-marker').val(),
            mapCenter;
        if (latitudeColumn !== longitudeColumn){
            me.setDropdownListValues('#dropdown-sort', true);
            me.setDropdownListValues('#dropdown-filter', true);
            me.$columnSelectionRow.hide();
            me.$resultRow.show();
            mapCenter = me.getMapCenter(latitudeColumn, longitudeColumn);
            me.initialiseMap(mapCenter);
            app.Rows.each(function(row){
                row.createGoogleMarker(latitudeColumn, longitudeColumn, markerColumn, me.map);
            });
        }
        else{
            me.showEqualLatitudeLongitudeValues();
        }
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
    addAllColumns: function(){
        var me = this,
            htmlText = '<th>Hide</th>\n';
        app.Columns.each(function(column){
            htmlText = htmlText + '<th>' + column.getName() + '</th>\n';
        });
        me.$table.append($('<thead>').append($('<tr>').html(htmlText)));
    },
    addAllRows: function(){
        app.Rows.each(this.addRow, this);
    },
    addRow: function(row) {
        var view = new app.RowView ({model: row});
        this.$table.append(view.render().el);
    },
    filterRows: function(){
        var me = this,
            filterColumn = me.$('#dropdown-filter').val(),
            filterValue = me.$('#filter-value').val();
        app.Rows.where({filterColumn : filterValue});
    },
    sortRows: function(){
        var me = this,
            sortColumn = me.$('#dropdown-sort').val();
        app.Rows.comparator = sortColumn;
        app.Rows.sort();
    }
});