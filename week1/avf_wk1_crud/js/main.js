//
//    Full Sail University
//    Visual Frameworks
//    Monica Peters
//    Web App Part 4
//    Week 4 Project 4
//    Due Thursday Feb. 23rd 2012
//    main.js
//    javascript lint: warning function validate & function togglecontrols does not always return value

// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function()
{

	// getElementById Function
	function $(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element
	function makeMediaTypes() 
	{
		//formTag is an array of all form tags
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "mtype");
		//populate with options
		for(var i=0, j=mediaGroups.length; i<j; i++) 
		{
			//create option for each string in array
			var makeOption = document.createElement("option");
			var optText = mediaGroups[i];
			makeOption.setAttribute("value", optText);
			//put text somewhere
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of Selected Radio Button
	function getSelectedRadio()
	{
		//create radio array
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios[i].checked)
			{
				mtopicsValue = radios[i].value;
			}
		}
	}
	
	//Turn nav links off / on
	function toggleControls(n)
	{
		switch(n)
		{
			case "on":
				$("mediaForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("mediaForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function saveMedia(key)
	{
		//if no key, this is brand new item 
		//so we need new key
		if(!key)
		{
			//can only store strings. arrays will be converted to strings
			//localStorage.setItem("test", "hello");
			//alert(localStorage.key(0));
			var id = Math.floor(Math.random()*10000001);
		}
		//Remove Weird Data
		else if(key === "A-Z" || "a-z")
		{
			//delete weird data and move on
			localStorage.removeItem(this.key);
		}
		else
		{
			//set the id to existing key we're editing
			//so it will save over the data
			//key is same key that's passed from the editSubmit event handler
			//to the validate function and then passed here into storeData() function
			id = key;
		}
			// run function to find Selected Radio Button
			getSelectedRadio();
			
			//Gather up all our form field values and store in object.
			//Object properties contain array with form label and input value
			var item 			= {};
				item.mtype 		= ["",$("mtype").value];
				item.mname 		= ["",$("mname").value];
				item.mdate  	= ["",$("mdate").value];
				//radio button
				item.mtopics 	= ["",mtopicsValue];
				item.mtags		= ["",$("mtags").value];
				item.mcomments	= ["",$("mcomments").value];
			//Save Data to Local Storage: Use Stringify to convert our object to a string
			//json.org
			localStorage.setItem(id, JSON.stringify(item));
			alert("Media Saved");
	}
	//Auto Populate local storage
	function autoFillData()
	{
		//actual JSON Object data is coming from json.js file.
		//json.js file is loaded from additem.html
		//Store JSON Object into local storage
		for(var n in json)
		{
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function getData()
	{
		//Write Data from Local Storage to the Browser
		toggleControls("on");
		
		if(localStorage.length === 0)
		{
			alert("No Data in local Storage. Test Data was Added.");
			//populate with test data
			autoFillData();
		}
		
		//Write Data from Local Storage to the Browswer.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "black";
		
		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert string back to object so it won't be one long string
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			var makeSubListSeparator = document.createElement("hr");
			makeli.appendChild(makeSubList);
			makeli.appendChild(makeSubListSeparator);
			//Add Image for each Media Type
			getImage(obj.mtype[1], makeSubList);
			
			for(var n in obj)
			{
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				//0 is label, 1 is the value
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubli.appendChild(linksLi);
			}
			//add edit and delete button from function
			//for each item in local storage.
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	//Get image for the relevant media type displayed
	function getImage(mediaType, makeSubList)
	{
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + mediaType + ".jpg");
		var setAlign = newImg.setAttribute("align", "left");
		imageLi.appendChild(newImg);
	}
	
	//Make Item Links
	//Create Edit and Delete links for each stored item when displayed
	function makeItemLinks(key, linksLi)
	{
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Media";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break between edit / link text links
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Media";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//Edit single item
	function editItem()
	{
		//Grab data from Item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show form to edit iem
		toggleControls("off");
		
		//populate form fields with current local storage values
		//1 is value, 0 is label
		$("mtype").value = item.mtype[1];
		$("mname").value = item.mname[1];
		$("mdate").value = item.mdate[1];
		// handle radio buttons
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios(i).value === "school" && item.mtopics(1) === "school")
			{
				radios(i).setAttribute("checked", "checked");
			}else if(radios(i).value === "work" && item.mtopics(1) === "work")
			{
				radios(i).setAttribute("checked", "checked");
			}else if(radios(i).value === "personal" && item.mtopics(1) === "personal")
			{
				radios(i).setAttribute("checked", "checked");
			}
		}
		/*
		// handle yes / no check box
		if(obj.favorite(1) == "Yes")
		{
			$("fav").setAttributes("checked", "checked");
		}
		*/
		$("mtags").value = item.mtags[1];
		$("mcomments").value = item.mcomments[1];
		
		// Remove the initial listener from the input 'save media' button
		save.removeEventListener("click", saveMedia);
		// Change Submit button value to day Edit Button
		$("submit").value = "Edit Media";
		var editSubmit = $("submit");
		// Save the key value established in this Function as a property of the editSubmit event
		// so we can use the value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem()
	{
		var ask = confirm("Are you sure you want to delete this media?");
		if(ask)
		{
			localStorage.removeItem(this.key);
			alert("Media was Deleted");
			window.location.reload();
		}
		else
		{
			alert("Media was Not Deleted");
		}
	}
	
	function clearLocal()
	{
		if(localStorage.length === 0)
		{
			alert("No Data to Clear");
		}
		else
		{
			localStorage.clear();
			alert("All Media Deleted and Test Data added to Local Storage.");
			//window.location.reload();
			//return false;
			//populate with test data
			autoFillData();
		}
	}
	
	function validate(e)
	{
		//Define elements we want to check
		var getMtype = $("mtype");
		var getMname = $("mname");
		var getMdate = $("mdate");
		
		//Reset error messages
		errMsg.innerHTML = "";
			getMtype.style.border = "1px solid black";
			getMname.style.border = "1px solid black";
			getMdate.style.border = "1px solid black";
		
		//Get error messages
		var messageAry = [];
		//Check Type Validation
		
		if(getMtype.value === "-- Choose Media Type--")
		{
			alert("Choose Media Type");
			window.location.reload();
		}
		
		// Media Name Validation
		if(getMname.value === "")
		{
			alert("Please enter a Name for your Media");
			window.location.reload();
		}
		
		// Media Date Validation
		if(getMdate.value === "")
		{
			var mdateError = "Please enter a Media Date";
			getMdate.style.border = "1px solid red";
			messageAry.push(mdateError);
		}
		
		//if errors, show them on screen
		if(messageAry.length >= 1)
		{
			for(var i=0, j=messageAry.length; i<j; i++)
			{
				var txt = document.createElement("li");
				txt.innerHTML = messageAry(i);
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else
		{
			//If everything is good, save the data
			//Send key value that came from editData function
			//Remember key value was passed thru editSubmit even listener 
			//as a property.
			saveMedia(this.key);
		}
	}
	
	
	// Variable defaults
	// store values of dropdown in array
	var mediaGroups = ["-- Choose Media Type--", "book", "document", "music", "movie", "pdf", "doc", "audio", "video"],
		mtopicValue,
		errMsg = $("errors");
		
	makeMediaTypes();
	
	// Set Link & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	//save.addEventListener("click", saveMedia);
	save.addEventListener("click", validate);
});