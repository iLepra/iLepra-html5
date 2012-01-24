iLepra.gov = (function() {
	return {
	    president: null,
	    time: null,
	    ministers: null,
	    banned: null,
	
		getCurrent: function(){
		    $.get("http://leprosorium.ru/democracy/", function(data){
		        var doc = $(data);
		        
		        var pr = $("#president", doc);
		        console.log(pr);
		        iLepra.gov.president = $("a", pr).text();
		        iLepra.gov.time = $("p", pr).html().replace(/<br.*?>/g, " ");
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    });
		}
	};
	
})();
