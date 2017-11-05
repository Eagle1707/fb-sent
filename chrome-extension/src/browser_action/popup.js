
chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.storage.sync.get('bullies_stopped', function(result){
      document.getElementById("count").innerHTML = result.bullies_stopped;
    });        
});

chrome.storage.sync.get('bullies_stopped', function(result){
  document.getElementById("count").innerHTML = result.bullies_stopped;
});  

function resetScores(){
	console.log('Welcome home!!!');
	chrome.storage.sync.set({ 'bullies_stopped': 0 });
	chrome.storage.sync.get('bullies_stopped', function(result){
	  document.getElementById("count").innerHTML = result.bullies_stopped;
	});  
}


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('reset');
    // onClick's logic below:
    link.addEventListener('click', function() {
        resetScores();
    });
});