$(window).load(function(){
    var data = null;
    var refreshInterval = null;

    var refreshMessages = function(){
        // clean old
        $("#chatList").empty();
	    // render posts
	    var p = "";
	    for(var i = 0; i < data.length; i++)
            p += _.template(chatTemplate, data[i]);
		$("#chatList").append(p);
		// redraw styles
		$("#chatList").listview('refresh');
    }
    
    requestNewChatData = function(){
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
		    data = iLepra.chat.messages.slice(0);
		    data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
		    refreshMessages();
		});
		iLepra.chat.getMessages();
    }

    // render page on creation
	$("#chatPage").live('pagecreate', function(){
	    data = iLepra.chat.messages.slice(0);
	    data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
	    // render posts
		var p = "";
	    for(var i = 0; i < data.length; i++)
            p += _.template(chatTemplate, data[i]);
		$("#chatList").append(p);
		// set refresh interval
		refreshInterval = setInterval ( "requestNewChatData()", 10000 );
	});
	
	$("#chatPage").live("pagehide", function(){
	    clearInterval( refreshInterval );
	});
	
	$("#submitChat").live('vclick', function(){
	    // get text
	    var text = $("#chatInput").val();
	    // clean old text
	    $("#chatInput").val("");
	    
	    // clear interval to evade overlap
	    clearInterval( refreshInterval );
	    
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.hidePageLoadingMsg();
			// get data
			data = iLepra.chat.messages.slice(0);
			data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
			// render
		    refreshMessages();
		    // put refresh interval back
		    refreshInterval = setInterval ( "requestNewChatData()", 10000 );
		});
	    iLepra.chat.sendMessage(text);
	});
	
	$(".chatMessage").live('vclick', function(){
	    var username = $(this).data('user');
	    
	    $("#chatInput").val(username+": ");
	});
});