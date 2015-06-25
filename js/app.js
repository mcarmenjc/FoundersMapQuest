/*global Backbone */

var app = app || {};

var file = new app.FileModel();

$(function () {
    new app.FileView({model: file});
});