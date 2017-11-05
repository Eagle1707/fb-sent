var stopped_bull;

function modifyComments(){
	// ----------------------------------------------------------
	// This part of the script triggers when page is done loading
	console.log("Hello. This message was sent from scripts/inject.js");
	// ----------------------------------------------------------


	var elements = document.getElementsByClassName('_3oh- _58nk');
	var date_time = document.getElementsByClassName('_3058 _ui9 _hh7 _s1- _52mr _3oh-');
	var name = document.getElementsByClassName('_2jnt')[0].getElementsByTagName('span')[0].textContent

	for (var i = 0; i < elements.length; i++) {
	    var element = elements[i];
	    console.log(element.textContent);
	    
	    ajax_and_replace(elements[i], name, date_time[i].getAttribute('data-tooltip-content'));

	}
}

function ajax_and_replace(tag, name, date_t){
    $.ajax({
        url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text='+tag.textContent,
        type: "GET", //This is what you should chage
        dataType: "text json",
        username: "ddea12d3-72d9-46f7-9b73-e177b77db387", // Most SAP web services require credentials
        password: "bY7xrmJ1ExuZ",
        processData: false,
        contentType: "application/json",
        success: function (data, textStatus, xhr) {
            if (data['document_tone']['tones'].length != 0){
            	console.log(data['document_tone']['tones'][0]['tone_name'],'   ', tag.textContent);
            	if ((data['document_tone']['tones'][0]['tone_name'] == "Anger") && (data['document_tone']['tones'][0]['score'] > 0.70)) {
            	    stopped_bull += 1
            	    submit_to_server(tag.textContent, name, date_t)
            	    tag.innerHTML = tag.textContent.replace(/[^\s]/g,'*');
					chrome.storage.sync.set({ 'bullies_stopped': stopped_bull });
					console.log(stopped_bull);

	            }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
            console.log(xhr.status);
            console.log(xhr.responseText);
        },
    });
}

function submit_to_server(content, name, date_t){
	$.get( "https://fb-sent.herokuapp.com/data?user="+name+"&content="+content+"&timestamp="+date_t, function( data ) {
	  console.log( "Load was performed." );
	});
}
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		chrome.storage.sync.get('bullies_stopped', function(data) {
			if (isNaN(data.bullies_stopped)){
				chrome.storage.sync.set({ 'bullies_stopped': 0 });
				stopped_bull = 0;
			} else{
				stopped_bull = data.bullies_stopped;
			}
		});
		modifyComments();
	}
	}, 10);
});


var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(modifyComments, 500);
}, false);
