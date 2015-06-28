/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class FileView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.FileView = Backbone.View.extend(/** @lends FileView.prototype */{
    el: '#main',
    /** 
     * @property {Object} events Object that associates different events in the DOM with the functions that handle them 
     */
    events: {
        'click #button-file-chooser': 'openFileChooser',
        'change #file-chooser': 'processFile',
        'click #show-results-button': 'showResults'
    },
    /** 
     * @contructs AppView object 
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
        me.markers = [];

        me.listenTo(me.model, 'processedFile', me.showSelectOptions);
        me.listenTo(app.Rows, 'add', me.addRow);
        me.listenTo(app.Rows, 'reset', me.removeAllRows);

        me.$columnSelectionRow.hide();
        me.$resultRow.hide();
    },
    /** 
     * Opens file chooser dialog to select the csv file which contains the data to show 
     * @param {Object} data
     */
    openFileChooser: function() {
        this.$fileChooser.click();
    },
    /** 
     * Extract data from file
     */
    processFile: function(event) {
        var fileName = this.$fileChooser.val(),
            file,
            me = this;
        if(fileName !== ''){
            file = me.$fileChooser[0].files[0];
            me.model.setDataFromFile(file);
            me.$fileChooser[0].value = null;
        }
    },
    /** 
     * Hide file chooser row and show dropdowns to select latitude, longitude and marker columns. 
     * Set dropdown options to the list of columns
     */
    showSelectOptions: function(){
        var me = this;
        me.model.guessLatitudeAndLongitudeColumns();
        me.setDropdownListValues('#dropdown-latitude', me.model.getLatitudeColumn());
        me.setDropdownListValues('#dropdown-longitude', me.model.getLongitudeColumn());
        me.setDropdownListValues('#dropdown-marker', 0);
        me.$selectFileRow.hide();
        me.$columnSelectionRow.show();
    },
    /** 
     * Set the dropdown list options to the columns list
     * @param {string} elementId DOM element id to select the dropdown
     * @param {number} selectedOption index of the option selected by default
     */
    setDropdownListValues:function(elementId, selectedOption){
        var me = this,
            dropdownList = me.$(elementId),
            i;
        if (dropdownList[0].options !== undefined){
            dropdownList[0].options.length = 0;
        }
        for (i = 0; i < me.model.getColumnsNo(); i++){
            dropdownList.append(new Option(me.model.getColumnAt(i), i));
        }
        if(selectedOption !== -1){
            dropdownList[0].options[selectedOption].selected = true;
        }
    },
    /** 
     * Show the result row and hide the dropdown row
     */
    showResults: function(){
        var me = this,
            latitudeColumn = me.$('#dropdown-latitude').val(),
            longitudeColumn = me.$('#dropdown-longitude').val(),
            markerColumn = me.$('#dropdown-marker').val();
        if (latitudeColumn !== longitudeColumn){
            me.setDropdownValuesIntoModel(latitudeColumn, longitudeColumn, markerColumn);
            me.addAllRows();
            me.$columnSelectionRow.hide();
            me.$resultRow.show();
            me.initialiseMap();
            me.addOfficesToMap();
        }
    },
    addAllRows: function(){
        var me = this,
            i;
        for (i = 0; i < me.model.getDataRowNo(); i++){
            app.Rows.add(new app.RowModel(me.model.getDataRow(i)));
        }
    },
    addOfficesToMap: function(){
        var i,
            me = this;
        me.markers = [];
        for (i = 0; i < me.model.getDataRowNo(); i++){
            me.createMapMarker(i);
        }
    },
    createMapMarker: function(position){
        var me = this,
            latitudeColumn = me.model.getLatitudeColumn(),
            longitudeColumn = me.model.getLongitudeColumn(),
            markerColumn = me.model.getMarkerColumn(),
            latitude = me.model.getDataRow(position)[latitudeColumn],
            longitude = me.model.getDataRow(position)[longitudeColumn],
            marker = me.model.getDataRow(position)[markerColumn],
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: me.map,
                title: marker + ''
            });
        me.markers.push(marker);
    },
    setDropdownValuesIntoModel: function(latitudeColumn, longitudeColumn, markerColumn){
        var me = this;
        me.model.setLatitudeColumn(me.model.getColumnAt(latitudeColumn));
        me.model.setLongitudeColumn(me.model.getColumnAt(longitudeColumn));
        me.model.setMarkerColumn(me.model.getColumnAt(markerColumn));
    },
    initialiseMap : function() {
        var mapCenter = this.getUserPosition(),
            mapCanvas = document.getElementById('map-canvas'),
            mapOptions = {
                center: mapCenter,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        this.map = new google.maps.Map(mapCanvas, mapOptions);
    },
    getUserPosition: function(){
        var me = this,
            latitudeColumn = me.model.getLatitudeColumn(),
            longitudeColumn = me.model.getLongitudeColumn(),
            mapCenter = new google.maps.LatLng(
                me.model.getDataRow(0)[latitudeColumn], 
                me.model.getDataRow(0)[longitudeColumn]);
        return mapCenter;
    },
    addRow: function(row){
        var me = this,
            rowView = new app.RowView({model: row});
        me.$table.append(rowView.render().el);
    },
    removeAllRows: function(){

    }
});