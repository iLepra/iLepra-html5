(function( iLepra ) {

iLepra.sub = (function() {
	var sub;
	
	sub = {
	    list: null,
	
		getList: function(shift){
		    $.get("http://leprosorium.ru/underground/", function(data){
		        var doc = $(data);
		        
		        iLepra.sub.list = [];
		        
		        $(".jj_row", doc).each(function(index, item){
		            item = $(item);
		            
                    var sublepra = {
                        name: $("h5", item).text(),
                        creator: $(".jj_creator", item).text(),
                        link: $(".jj_link", item).attr('href'),
                        logo: $("img", item).attr('src')
                    }
                    iLepra.sub.list.push(sublepra);
		        });
		        
		        // dispatch event
				$(document).trigger(iLepra.events.ready);
		    });
		}
	};

	return sub;
})();

})( iLepra );
