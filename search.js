// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {

 var arr = [],selectHtml;
  var q = $('#query').val();
  var request = gapi.client.youtube.playlists.list({
    mine: true,
    part: 'snippet'
  });

  
  request.execute(function(response) {
	console.log(response);
	console.log(response.items)
	
	console.log(response.items.length);
	for(var i=0;i<response.items.length;i++)
	{
		var re = gapi.client.youtube.playlistItems.list({
			playlistId : response.items[i].id,
			part : 'snippet',
			maxResults:20
			
		});
		
		re.execute(function(result){
			var re = JSON.stringify(result)
			console.log(result);
			for(var j=0;j<2;j++)
			{
				var videoId = result.items[j].snippet.resourceId.videoId;
				console.log(videoId);
				$('#search-container').append($('<iframe>', { 
				    src : "https://www.youtube.com/embed/"+videoId, 
				    width : 320, 
				    height : 160, 
				    frameborder:0
				}));
					arr.push(videoId);

				  
//				$('#search-container').append("<img src=\"http://www.youtube.com/embed/"+playlistId+"\" width=\"16\" height=\"16\" alt=\"Test Image\" />");
//				var para = document.createElement("img");
//				//("<iframe src=\"//www.youtube.com/embed/"+playlistId+"\" ></iframe>");
//				var node = document.createTextNode(re);
//				para.appendChild(node);
//				var element = document.getElementById("search-container");
//				element.appendChild(para);
			}
			
		});
	}
  });
}
