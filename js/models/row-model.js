/* global Backbone */
/* global Papa */

var app = app || {};

/**
 * @class RowModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.RowModel = Backbone.Model.extend(/** @lends RowModel.prototype */ {
	 initialize: function(attributes){
	 	var me = this;
	 	me.set('hide', false);
	 	me.set(attributes);
	 },
	 toggle: function(){
	 	this.set('hide', !this.get('hide'));
	 }
}); 