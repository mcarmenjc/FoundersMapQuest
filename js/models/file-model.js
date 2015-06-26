/* global Backbone */
/* global Papa */

var app = app || {};

/**
 * @class FileModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.FileModel = Backbone.Model.extend(/** @lends FileModel.prototype */ {
	/**
	 * @constructs FileModel object 
	 */
	 initiliaze: function(){},
	 /**
	  * Creates a default FileModel object
	  * @returns {FileModel} object with default values 
	  */
	 defaults: function(){
	 	return {
	 		columns: [],
	 		latitudeColumn: -1,
	 		longitudeColumn: -1,
	 		markerColumn: -1,
	 		data: []
	 	};
	 },
	 /**
	  * Get the column name at the specified position
	  * @param {number} position position of the column in the array columns
	  * @returns {string} name of the column at position 
	  */
	 getColumnAt: function(position){
	 	var me = this;
	 	if (position >= me.get('columns').length){
	 		return undefined;
	 	}
	 	return me.get('columns')[position];
	 },
	 /**
	  * Get all the columns
	  * @returns {Array} an array with all the columns 
	  */
	 getColumns: function(){
	 	return this.get('columns');
	 },
	 /**
	  * Get the number of columns in the array
	  * @returns {number} the number of elements in columns array 
	  */
	 getColumnsNo: function(){
	 	return this.get('columns').length;
	 },
	 /**
	  * Add a new column name at the end of the columns array
	  * @param {string} column name of the new column 
	  */
	 addNewColumn: function(column){
	 	if(column !== undefined && column !== ''){
	 		this.get('columns').push(column);
	 	}
	 },
	 /**
	  * Overwrite the whole columns array with a new array
	  * @param {Array} colArray new array of columns 
	  */
	 setColumns: function(colArray){
	 	if (colArray.length !== 0){
	 		this.set('columns', colArray);
	 	}
	 },
	 /**
	  * Get the position of the latitude column
	  * @returns {number} the position of the latitude column in the array 
	  */
	 getLatitudeColumn: function(){
	 	return this.get('latitudeColumn');
	 },
	 /**
	  * Set what is the position of the latitude column
	  * @param {number} latitude position of the latitude column in the array
	  */
	 setLatitudeColumn: function(latitude){
	 	this.set('latitudeColumn', latitude);
	 },
	 /**
	  * Get the position of the longitude column
	  * @returns {number} the position of the longitude column in the array  
	  */
	 getLongitudeColumn: function(){
	 	return this.get('longitudeColumn');
	 },
	 /**
	  * Set what is the position of the longitude column
	  * @param {number} longitude position of the longitude column in the array
	  */
	 setLongitudeColumn: function(longitude){
	 	this.set('longitudeColumn', longitude);
	 },
	 /**
	  * Get the position of the marker column
	  * @returns {number} the position of the marker column in the array 
	  */
	 getMarkerColumn: function(){
	 	return this.get('markerColumn');
	 },
	 /**
	  * Set what is the position of the marker column
	  * @param {number} marker position of the marker column in the array
	  */
	 setMarkerColumn: function(marker){
	 	this.set('markerColumn', marker);
	 },
	 /**
	  * Get the row data at the specified position
	  * @param {number} rowNo position of the row in the array data
	  * @returns {Array} an array with all the columns data in the row 
	  */
	 getDataRow: function(rowNo){
	 	var me = this;
	 	if(rowNo >= me.get('data').length){
	 		return {};
	 	}
	 	return me.get('data')[rowNo];
	 },
	 /**
	  * Get all rows of data
	  * @returns {Array} the array of arrays of data 
	  */
	 getAllDataRows: function(){
	 	return this.get('data');
	 },
	 /**
	  * Get the number of rows in the data array
	  * @returns {number} the length of the data array 
	  */
	 getDataRowNo: function(){
	 	return this.get('data').length;
	 },
	 /**
	  * Add a new row to the array data. The row length should be greater than 0 to be added.
	  * @param {Array} dataRow the array with all the columns values for the row
	  */
	 addNewDataRow: function(dataRow){
	 	if(dataRow.length !== 0){
	 		this.get('data').push(dataRow);
	 	}
	 },
	 /**
	  * Empty the array of data
	  */
	 emptyDataArray: function(dataRow){
	 	this.set('data', []);
	 },
	 /**
	  * Get info from an existing csv file using Papa.parse
	  * @param {Object} file the selected file
	  * @fires processedFile
	  * @fires processingError
	  * @fires noDataError
	  * @fires wrongTypeError 
	  */
	 setDataFromFile: function(file){
	 	var me = this;
	 	if (file.type !== 'text/csv'){
	 		me.trigger('wrongTypeError', me);
	 	}
	 	if (file.size === 0){
	 		me.trigger('noDataError', me);
	 	}
	 	Papa.parse(file, {
	 		header: true,
            complete: function(results) {
            	var i;
            	if (results.errors.length > 0){
            		me.trigger('processingError', results.errors, me);
            	}
            	else{
	                me.setColumns(results.meta.fields);
	                me.emptyDataArray();
	                for (i = 0; i < results.data.length; i++){
	                    me.addNewDataRow(results.data[i]);
	                }
	                me.trigger('processedFile', me);
	            }
            }
        });
	 },
	 /**
	  * Set the latitude and longitude columns position to the columns that contains
	  * LATITUDE and LONGITUDE, respectively
	  */
	 guessLatitudeAndLongitudeColumns: function(){
	 	var i,
	 		me = this;
	 	for (i = 0; i < me.getColumnsNo(); i++){
	 		if (me.getColumnAt(i).toUpperCase().indexOf('LATITUDE') !== -1){
	 			me.setLatitudeColumn(i);
	 		}
	 		if (me.getColumnAt(i).toUpperCase().indexOf('LONGITUDE') !== -1){
	 			me.setLongitudeColumn(i);
	 		}
	 	}
	 }
}); 