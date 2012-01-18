$(function(){
	// render page on creation
	$("#profilePage").live('pagecreate', function(){
	    var data = iLepra.profile.data;
	    
	    // set username
		$("#profileUsername").text( data.username );
		
		// basic info
		$("#fullName").text( data.fullName );
		$("#userLocation").text( data.location );
		$("#userRegdate").text( data.regDate );
		$("#userNumber").text( "Номер; "+data.number );
		$("#userKarma").text( "Карма: "+data.karma );
		
		// statistic info
		$("#userStat").text( $( data.userstat.replace(/<br\/>/g, " ") ).text() );
		var vote = data.votestat.split("<br>");
		$("#userVote").html( vote[0] );
		$("#userVoteCount").html( vote[1] );
		
		$("#userDescription").html( data.description );
		
		var clist = $("#contactsList");
		var i, text, link;
		for(i = 0; i < data.contacts.length; i++){
		    link = /href="(.+?)"/g.exec(data.contacts[i]);
		    text = data.contacts[i].replace(/\s\s+/g, " ").replace(/[\n\r]/g, "").replace(/<.+?>/g, "");
		    if( text.length > 1 ){
		        if( link != null ){
        		    clist.append( $('<li><a href="'+link[1]+'">'+text+'</a></li>') );
        		}else{
        		    clist.append( $('<li>'+text+'</li>') );
        		}
    		}
		}
	});
});