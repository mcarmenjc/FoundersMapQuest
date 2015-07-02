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