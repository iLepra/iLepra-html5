iLepra.chat = (function() {
    var getLastId = function(){
        var last = "";
        if( iLepra.chat.messages.length > 0 ){
            var biggestId = 0;
            for( var i in iLepra.chat.messages ){
                if( parseInt(iLepra.chat.messages[i].id) > biggestId ) 
                    biggestId = parseInt( iLepra.chat.messages[i].id );
            }
            if( biggestId != 0 ) last = biggestId;
        }
        return last;
	}
	
	return {
		messages: [],
		wtf: null,
		defaultKey: "leprosorium.ru/",
		
		getMessages: function(){
		    var last = getLastId();
		
		    var data = {
		        wtf: iLepra.chat.wtf,
		        key: iLepra.chat.defaultKey,
		        last: last
		    }
		
		    $.post("http://leprosorium.ru/chatctl/", data, function(data){
		        var res = $.parseJSON(data);
		        
		        for(var i in res.messages){
		            if( iLepra.chat.messages.indexOf(res.messages[i]) == -1 )
    		            iLepra.chat.messages.push( res.messages[i] );
		        }
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    }).error(function(){ iLepra.chat.getMessages(); });
		},
		
		sendMessage: function(text){
		    var last = getLastId();
		
		    var data = {
		        wtf: iLepra.chat.wtf,
		        key: iLepra.chat.defaultKey,
		        last: last,
		        body: text
		    }
		
		    $.post("http://leprosorium.ru/chatctl/", data, function(data){
		        var res = $.parseJSON(data);
		        
		        for(var i in res.messages){
		            if( iLepra.chat.messages.indexOf(res.messages[i]) == -1 )
    		            iLepra.chat.messages.push( res.messages[i] );
		        }
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    }).error(function(){ iLepra.chat.sendMessage(text); });;
		}
	};
})();