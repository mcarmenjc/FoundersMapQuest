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
     * Sets the comparator property to the column that it is going to be used to sort the elements
     * @param {string} column Name of the column (property) to sort the rows by
     */
	setComparator: function(column){
		this.comparator = column;
	},
	/** 
     * Checks for each row if it should be shown or hidden depending on the attribute value
     * @param {string} column Name of the column (property) to filter
     * @param {string} value Value to filter by
     */
	filter: function(column, value){
		var me = this;
		me.filterColumn = column;
		me.filterValue = value;
		me.each(me.applyFilterToRow, me);
	},
	/** 
     * Checks if the specific row should be hidden and update it taking that into account
     * @param {Object} row Row model to check
     */
	applyFilterToRow: function(row){
		var me = this,
			column = me.filterColumn,
			value = me.filterValue;
		if (!row.shouldBeHidden(column, value)){
			row.show();
		}
		else{
			row.hide();
		}
	},
	/** 
     * Removes any applied filter. It sets back the orginal options.
     */
	removeFilter: function(){
		var me = this;
		me.each(me.showRow);
	},
	/** 
     * Shows the specific row
     * @param {Object} row Row model to show
     */
	showRow: function(row){
		row.show();
	}
}); 