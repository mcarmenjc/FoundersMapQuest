/* global Backbone */
/* global Papa */

var app = app || {};

/**
 * @class RowCollection
 * @augments Backbone.Collection
 * @requires Backbone.js
 */
app.RowCollection = Backbone.Collection.extend(/** @lends RowCollection.prototype */ {
	model: app.RowModel,
	sort: function(column){

	},
	filter: function(column, value){
		
	}
}); 