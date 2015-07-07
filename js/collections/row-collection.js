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
		me.reset(rowArray);
	},
	/** 
     * Remove any applied filter. It sets back the orginal array of data saved.
     */
	removeFilter: function(){
		this.reset(this.originalRowArray);
	}
}); 