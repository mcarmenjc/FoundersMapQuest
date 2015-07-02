/* global Backbone */
/* global Papa */

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
     * Sort the rows in the collection by a specific column
     * @param {string} column Name of the column (property) to sort the rows by
     */
	sort: function(column){

	},
	/** 
     * Get a subset of the rows in the collection filtered by a specific value of a column
     * @param {string} column Name of the column (property) to filter
     * @param {string} value Value to filter by
     */
	filter: function(column, value){

	}
}); 