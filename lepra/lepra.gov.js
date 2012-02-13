iLepra.gov = (function() {
	return {
	    president: null,
	    time: null,
	    ministers: null,
	    banned: null,
	
		getCurrent: function(){
		    $.get("http://leprosorium.ru/democracy/", function(data){
		        // cleanup data
				data = data.replace(/\n+/g, '');
				data = data.replace(/\r+/g, '');
				data = data.replace(/\t+/g, '');
				
				// regex
				var prReg = /<div id="president"><a href=".+?">(.+?)<\/a><p>.+?<br \/>(.+?)<\/p><\/div>/g;
				// get data
		        var pr = prReg.exec(data);
		        iLepra.gov.president = pr[1];
		        iLepra.gov.time = pr[2];
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    });
		}
	};
	
})();
