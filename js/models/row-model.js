/* global Backbone */
/* global google */

var app = app || {};

/**
 * @class RowModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.RowModel = Backbone.Model.extend(/** @lends RowModel.prototype */ {
	/** 
     * @constructs RowModel object
     */
	 initialize: function(attributes){
	 	var me = this;
	 	me.set('hiddenMarker', false);
	 	me.set('hidden', false);
	 	me.set(attributes);
	 },
	 /** 
     * Sets value of hide property to !hide, to show or hide the marker on the map
     */
	 toggleMarker: function(){
	 	var me = this;
	 	me.set('hiddenMarker', !me.get('hiddenMarker'));
	 	if (me.get('hiddenMarker')){
	 		me.hideMarker();
	 	}
	 	else{
	 		me.showMarker();
	 	}
	 },
	 /** 
     * Gets if the row is hidden from the map or not
     * @returns {boolean} True if the row marker is hidden and false if not
     */
	 isMarkerHidden: function(){
	 	return this.get('hiddenMarker');
	 },
	 /** 
     * Hides the marker from the map, removing value of the map property of the marker
     */
	 hideMarker: function(){
	 	var me = this,
	 		marker = me.get('googleMarker');
	 	marker.setMap(null);
	 },
	 /** 
     * Sets map property of the marker, to make it visible again
     */
	 showMarker: function(){
	 	var me = this,
	 		marker = me.get('googleMarker');
	 	marker.setMap(me.get('googleMap'));
	 },
	 /** 
     * Sets the row as hidden and hides the marker
     */
	 hide: function(){
	 	var me = this;
	 	me.set('hidden', true);
	 	me.hideMarker();
	 },
	 /** 
     * Sets the row as shown and shows the marker if it is not hidden
     */
	 show: function(){
	 	var me = this;
	 	me.set('hidden', false);
	 	if(!me.get('hiddenMarker')){
	 		me.showMarker();
	 	}
	 },
	 /** 
     * Checks if the row is hidden or not
     * @returns {boolean} True if the row is hidden and false if not
     */
	 isHidden: function(){
	 	return this.get('hidden');
	 },
	 /** 
     * Checks if the row should be hidden or not
     * @returns {boolean} True if the row should be hidden and false if not
     */
	 shouldBeHidden: function(column, value){
	 	return this.get(column).toUpperCase().indexOf(value.toUpperCase()) === -1;
	 },
	 /** 
     * Initialise googleMarker property
     * @param {string} latitude Latitude name property
     * @param {string} longitude Longitude name property
     * @param {string} marker Marker name property (empty value is no marker defined)
     * @param {Object} googleMap Map where the marker is going to be displayed
     */
	 createGoogleMarker: function(latitude, longitude, marker, googleMap){
	 	var me = this,
	 		title = '',
	 		gMarker;
	 	if (marker !== 'empty'){
	 		title = title + me.get(marker);
	 	}
	 	gMarker = new google.maps.Marker({
            position: new google.maps.LatLng(me.get(latitude), me.get(longitude)),
            map: googleMap,
            title: title
        });
        me.set('googleMap', googleMap);
	 	me.set('googleMarker', gMarker);
	 }
}); 