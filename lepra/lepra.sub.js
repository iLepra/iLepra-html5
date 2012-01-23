(function( iLepra ) {

iLepra.sub = (function() {
	var sub;
	
	sub = {
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
				var res = $(data);
				
				iLepra.sub.posts = [];
				
				$(".post", res).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					
					var body = $(".dt", data).html();
					
					// create replace link for user
					var user = $("a", add).wrap('<div></div>').parent().html();
					var newUser = user.replace(/href="(.+?)"/g, "href=\"#\"").replace(/class="(.+?)"/g, "class=\"username\"");
					
					// get wrote line
					var wrote = add.html().replace(/\s\s+/gi, " ").split("|");
					
					// get img and short text
					var imgReg = /img src="(.+?)"/g
					var res = imgReg.exec(body);
				    var img = "";
				    if( res != null ){ 
					    img = "http://src.sencha.io/80/80/"+res[1];
				    }else{
					    img = "../css/img/placeholder.png";
				    }
	        		var text = body.replace(/(<([^>]+)>)/ig," ").substr(0, 128) + "...";
					
					var post = {
						id: data.attr('id').replace('p', ''),
						body: body,
						rating: $(".rating", data).text(),
						user: $( $("a", add)[0] ).text(),
						domain_url: $(".sub_domain_url", data).text(),
						wrote: wrote[0].replace(user, newUser),
						comments: wrote[1].replace(/<.+?>/g, ""),
						image: img,
						text: text
					};
					
					iLepra.sub.posts.push(post);
				});
				
				$(document).trigger(iLepra.events.ready);
			});
		}
	};

	return sub;
})();

})( iLepra );
