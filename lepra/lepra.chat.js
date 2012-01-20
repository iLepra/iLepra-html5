(function( iLepra ) {

iLepra.chat = (function() {
	var chat;
	
	chat = {
		messages: [],
		wtf: null,
		defaultKey: "leprosorium.ru/",
		
		getMessages: function(){
		    var last = "";
		    if( iLepra.chat.messages.length > 0 ){
		        last = iLepra.chat.messages[iLepra.chat.messages.length-1].id;
		    }
		
		    var data = {
		        wtf: iLepra.chat.wtf,
		        key: iLepra.chat.defaultKey,
		        last: last
		    }
		
		    $.post("http://leprosorium.ru/chatctl/", data, function(data){
		        var res = $.parseJSON(data);
		        
		        for(var i in res.messages){
		            iLepra.chat.messages.push( res.messages[i] );
		        }
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    });
		},
		
		sendMessage: function(text){
		    var last = "";
		    if( iLepra.chat.messages != null ){
		        last = iLepra.chat.messages[iLepra.chat.messages.length-1].id;
		    }
		
		    var data = {
		        wtf: iLepra.chat.wtf,
		        key: iLepra.chat.defaultKey,
		        last: last,
		        body: text
		    }
		
		    $.post("http://leprosorium.ru/chatctl/", data, function(data){
		        var res = $.parseJSON(data);
		        
		        for(var i in res.messages){
		            iLepra.chat.messages.push( res.messages[i] );
		        }
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    });
		}
	};

	return chat;
})();

})( iLepra );

/*
msg example:
body: "juslex: а кто это там так накосячил"
createdate: "15:02"
id: "19947"
id_user: "45398"
user_login: "JasF"
*/