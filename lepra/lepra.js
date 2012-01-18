$( document ).bind( "mobileinit", function() {
	$.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.defaultPageTransition = "slide";
    $.loadingMessage = "";
});

/**
 ** Main iLepra class that handles all the logic
 */
(function( window, undefined ) {

var iLepra = (function() {
	// Define a local copy of Mukava
	var iLepra = {
		// 
		// events
		//
		events: {
			init: "iLepraInit",
			ready: "iLepraReady",
			error: "iLepraError"
		},
		
		// 
		// vars
		//
	
		// auth stuff
		isAuthenticated: false,
		loginCode: null,
		captchaURL: null,
		
		// error message
		errorMessage: null,
		
		// user data
		username: null,
		userSubLepras: null,
		
		// news data
		inboxNewPosts: null,
		inboxNewComments: null,
		karma: null,
		rating: null,
		voteweight: null,
		myNewComments: null,
		myNewPosts: null,
		
		// posts data
		latestPosts: null,
		postCount: null,
		
		// mystuff data
		myStuffPosts: null,
		// fav data
		favouritePosts: null,
		// inbox data
		inboxPosts: null,
		
		// 
		// functions
		//
		
		/***
		 Initializes iLepra for work, checks if user is 
		 logged in, gets captcha if not and posts if yes
		 ***/
		init: function() {
			$.get("http://leprosorium.ru", function(data){
				if(data.indexOf('<input type="password"') > 0){
					iLepra.processCaptcha(data);
					iLepra.isAuthenticated = false;
				}else{
					//iLepra.getLastPosts();
					iLepra.isAuthenticated = true;
					
					// process user's data
					iLepra.processMain(data);
				}
				// dispatch event
				$(document).trigger(iLepra.events.init);
			});
		},
		
		/***
		 Processes given html string for user's data
		 ***/
		processMain: function(data){
		    // get doc 
            var doc = $(data);
            // get username
            iLepra.username = $( $("#greetings a", doc)[0] ).text();
            // get sublepras
            iLepra.userSubLepras = [];
            var subs = $(".subs_loaded.hidden", doc);
            $(".sub", subs).each(function(index, item){
                item = $(item);
                var sublepra = {
                    name: $("h5", item).text(),
                    creator: $(".creator", item).text(),
                    link: $(".link", item).attr('href'),
                    logo: $("img", item).attr('src')
                }
                iLepra.userSubLepras.push(sublepra);
            });
		},
		
		/***
		 Processes given html string for captcha data
		 ***/
		processCaptcha: function(source){
			var captchaReg = /img alt="captcha" src="(.+?)"/g;
			var loginReg = /<input type="hidden" name="logincode" value="(.+?)"/g;
			
			this.captchaURL = "http://leprosorium.ru" + captchaReg.exec(source)[1];
			this.loginCode = loginReg.exec(source)[1];
		},
		
		/***
		 Tries logging in with given data
		 ***/
		tryLogin: function(data){
			$.post("http://leprosorium.ru/login/", data, function(data){
				if(data.indexOf('class="error"') > 0){
					// get error
					var errorReg = /<div class="error">(.+?)<\/div>/g;
					iLepra.errorMessage = errorReg.exec(data)[1];
					
					// get new captcha
					iLepra.processCaptcha(data);
					
					// dispatch error event and die
					$(document).trigger(iLepra.events.error);
				}else{
				    // process user's data
					iLepra.processMain(data);
				
					// dispatch ready event
					$(document).trigger(iLepra.events.ready);
				}
			});
		},
		
		/***
		 Gets last posts from JSON interface
		 ***/
		getNewsCounters: function(){
			$.ajax({
				url: "http://leprosorium.ru/api/lepropanel",
				dataType: 'json',
				error: function(request){ 
					var res = $.parseJSON(request.responseText)
					
					iLepra.inboxNewPosts = parseInt(res.inboxunreadposts);
					iLepra.inboxNewComments = parseInt(res.inboxunreadcomms);
					iLepra.karma = parseInt(res.karma);
					iLepra.rating = parseInt(res.rating);
					iLepra.voteweight = parseInt(res.voteweight);
					iLepra.myNewComments = parseInt(res.myunreadcomms);
					iLepra.myNewPosts = parseInt(res.myunreadposts);
					
					$(document).trigger(iLepra.events.ready);
				}
			});
		},
		
		/***
		 Gets last posts from JSON interface
		 ***/
		getLastPosts: function(){
			iLepra.postCount = 0;
		
			$.post("http://leprosorium.ru/idxctl/", {from:iLepra.postCount}, function(data){
				// convert string to object
				data = $.parseJSON(data);
				
				// init posts array
				iLepra.latestPosts = [];
				
				var i;
				var posts = data.posts;
				for(i in posts){
					iLepra.latestPosts.push(posts[i]);
				}
				
				$(document).trigger(iLepra.events.ready);
				//iLepra.getNewsCounters();
			});
		},
		
		/***
		 Gets more posts from JSON interface from specified count
		 ***/
		getMorePosts: function(){
			iLepra.postCount += 42;
			
			$.post("http://leprosorium.ru/idxctl/", {from:iLepra.postCount}, function(data){
				// convert string to object
				data = $.parseJSON(data);
				
				var i;
				var posts = data.posts;
				for(i in posts){
					if( iLepra.latestPosts.indexOf(posts[i]) == -1 )
						iLepra.latestPosts.push(posts[i]);
				}
				
				$(document).trigger(iLepra.events.ready);
			});
		},
		
		/***
		 Switches posts layout
		 0 = mix of main & sub
		 1 = only main
		 2 = only sub
		 ***/
		switchLayout: function(type){
			$.post("http://leprosorium.ru/threshold/", { 
				showonindex: type,
				selected_threshold: "all"
			}, function(){
				iLepra.getLastPosts();
			});
		},
		
		
		/***
		 Gets my stuff posts
		 ***/
		getMyStuff: function(){
			$.get("http://leprosorium.ru/my/", function(data){
				var res = $(data);
				
				iLepra.myStuffPosts = [];
				
				$(".post", res).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					
					// create replace link for user
					var user = $("a", add).wrap('<div></div>').parent().html();
					var newUser = user.replace(/href="(.+?)"/g, "href=\"#\"").replace(/class="(.+?)"/g, "class=\"username\"");
					
					// get wrote line
					var wrote = add.html().replace(/\s\s+/gi, " ").split("|");
					
					var post = {
						id: data.attr('id').replace('p', ''),
						body: $(".dt", data).html(),
						rating: $(".rating", data).text(),
						user: $( $("a", add)[0] ).text(),
						domain_url: $(".sub_domain_url", data).text(),
						wrote: wrote[0].replace(user, newUser),
						comments: wrote[1].replace(/<.+?>/g, "")
					};
					
					iLepra.myStuffPosts.push(post);
				});
				
				$(document).trigger(iLepra.events.ready);
			});
		},
		
		/***
		 Gets favourite posts
		 ***/
		getFavourites: function(){
			$.get("http://leprosorium.ru/my/favourites/", function(data){
				var res = $(data);
				
				iLepra.favouritePosts = [];
				
				$(".post", res).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					
					var wrote = add.text().replace(/\s\s+/gi, " ").split("|");
					
					var post = {
						id: data.attr('id').replace('p', ''),
						body: $(".dt", data).html(),
						rating: $(".rating", data).text(),
						user: $( $("a", add)[0] ).text(),
						domain_url: $(".sub_domain_url", data).text(),
						wrote: wrote[0],
						comments: wrote[1],
						type: 'fav'
					};
					
					iLepra.favouritePosts.push(post);
				});
				
				$(document).trigger(iLepra.events.ready);
			});
		},
		
		/***
		 Gets inboxes stuff
		 ***/
		getInbox: function(){
			$.get("http://leprosorium.ru/my/inbox/", function(data){
				var res = $(data);
				
				iLepra.inboxPosts = [];
				
				$(".post", res).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					
					var wrote = add.text().replace(/\s\s+/gi, " ").split("|");
					
					var post = {
						id: data.attr('id').replace('p', ''),
						body: $(".dt", data).html(),
						user: $( $("a", add)[0] ).text(),
						wrote: wrote[0],
						comments: wrote[1],
						type: 'inbox'
					};
					
					iLepra.inboxPosts.push(post);
				});
				
				$(document).trigger(iLepra.events.ready);
			});
		}
	}
	
	return iLepra;

})();

// Expose Mukava to the global object
window.iLepra = iLepra;

})( window );