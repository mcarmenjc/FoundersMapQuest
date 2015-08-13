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
     * Gets default value for a column
     * @returns {Object} An object with the defaults values to set
     */
	defaults: function(){
		return {
			name: ''
		};
	},
	/** 
     * Gets name property value
     * @returns {string} The name of the column
     */
	getName: function(){
	 	return this.get('name');
	}
}); 