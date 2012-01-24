iLepra.sub = (function() {
	return {
	    list: null,
	    posts: null,
	
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
		},
		
		getPosts: function(url){
		    $.get(url, function(data){
				iLepra.sub.posts = [];
				iLepra.util.processHTMLPosts(data, iLepra.sub.posts, undefined);
				$(document).trigger(iLepra.events.ready);
			});
		}
	};
})();
