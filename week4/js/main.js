//
//    Full Sail University
//    Advanced Visual Frameworks
//    Monica Peters
//    Week 1 Project 1
//    Due Thursday June 28th 2012
//    main.js

//    Javascript Lint:
//			http://javascriptlint.com/online_lint.php
//			June 26th 2012 passed

$(document).ready(function()
{
	//HOME PAGE
	$('#home').live('pageshow', function()
	{console.log("Home Page Loaded");}); //end contact pageinit

	//ADD FOOTER
	$('#header').empty();
	$(function()
	{$('#header').append('<center><h1><a href="index.html">AVF Launch Page Week 4</a></h1></center>');});
	console.log("Header Loaded");
	
	//ADD FOOTER
	$('#footer').empty();
	$(function()
	{$('#footer').append('<small>Monica Peters : AVF0612 : Advanced Visual Frameworks</small>');});
	console.log("Footer Loaded");

	
});
	

