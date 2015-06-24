/* global Backbone */

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
	 getColumnAt: function(position){
	 	var me = this;
	 	if (position >= me.get('columns').length){
	 		return undefined;
	 	}
	 	return me.get('columns')[position];
	 },
	 getColumns: function(){
	 	return this.get('columns');
	 },
	 getColumnsNo: function(){
	 	return this.get('columns').length;
	 },
	 getLatitudeColumn: function(){
	 	return this.get('latitudeColumn');
	 },
	 getLongitudeColumn: function(){
	 	return this.get('longitudeColumn');
	 },
	 getMarkerColumn: function(){
	 	return this.get('markerColumn');
	 },
	 getDataRow: function(rowNo){
	 	var me = this;
	 	if(rowNo >= me.get('data').length){
	 		return {};
	 	}
	 	return me.get('data')[rowNo];
	 },
	 getAllDataRows: function(){
	 	return this.get('data');
	 },
	 getDataRowNo: function(){
	 	return this.get('data').length;
	 }
}); 