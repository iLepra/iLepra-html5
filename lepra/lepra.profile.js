iLepra.profile = (function() {
	return {
	    data: null,
	
		getProfile: function(username){
		    var url = "http://leprosorium.ru/users/"+username;
		    
		    $.get(url, function(data){
		        // replace all img tags to evade image loading while parsing
                data = data.replace(/<img/ig, '<nonimg');
		    
		        var doc = $(data);
		        
		        var userpic = $(".userpic nonimg", doc).attr('src');
		        
		        var regdata = $(".userregisterdate", doc).text().replace(/\./g, "").split(', ');
		        var num = regdata[0];
		        var date = regdata[1];
		        
		        var basicInfo = $(".userbasicinfo", doc);
		        var name = $("h3", basicInfo).text();
		        var loc = $(".userego", basicInfo).text().replace(/\s\s+/g, " ").replace(/[\n\r]/g, "");
		        var karma = $("#uservote", basicInfo).text().replace(/\s\s+/g, " ").replace(/[\n\r]/g, "");
		        
		        var stat = $(".userstat", doc);
		        var userstat = $(stat[0]).html();
		        var votestat = $(stat[1]).html();
		        
		        var story = $(".userstory", doc).html();
		        
		        var contacts = $(".usercontacts", doc).html().split('<br>');
		        
		        iLepra.profile.data = {
		            username: username,
		            userpic: userpic,
		            number: num,
		            regDate: date,
		            fullName: name,
		            location: loc,
		            karma: karma,
		            userstat: userstat,
		            votestat: votestat,
		            contacts: contacts,
		            description: story
		        };
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    });
		}
	};
})();
