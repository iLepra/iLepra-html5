/**
 ** Main iLepra class that handles all the logic
 */
iLepra = (function() {
    /***
     Processes given html string for captcha data
     ***/
    var processCaptcha = function(source){
        var captchaReg = /img alt="captcha" src="(.+?)"/g;
        var loginReg = /<input type="hidden" name="logincode" value="(.+?)"/g;
        
        iLepra.captchaURL = "http://leprosorium.ru" + captchaReg.exec(source)[1];
        iLepra.loginCode = loginReg.exec(source)[1];
    };

    /***
     Processes given html string for user's data
     ***/
    var processMain = function(data){
        // get chat wtf
        iLepra.chat.wtf = /chatHandler.wtf = '(.+?)'/g.exec(data)[1];
        // get username
        iLepra.username = $( $("#greetings a", data)[0] ).text();
        // get sublepras
        iLepra.userSubLepras = [];
        var subs = $(".subs_loaded.hidden", data);
        $(".sub", subs).each(function(index, item){
            item = $(item);
            var sublepra = {
                name: $("h5", item).text(),
                creator: $(".creator", item).text(),
                link: $("a.link", item).attr('href'),
                logo: $("strong a img", item).attr('src')
            }
            iLepra.userSubLepras.push(sublepra);
        });
    };
    
    /***
     Processes given JSON object for latest posts
     ***/
    var processJSONPosts = function(posts){
        for(var i in posts){
            var post = {};
            // get img and short text
            var imgReg = /img src="(.+?)"/g
            var res = imgReg.exec(posts[i].body);
            var img = "";
            if( res != null ){ 
                // save first image as post image
                img = "http://src.sencha.io/80/80/"+res[1];
                
                posts[i].body = posts[i].body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                // convert all image URIs to compressed ones
                res = imgReg.exec(posts[i].body);
                while(res != null){
                    posts[i].body = posts[i].body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                
                    res = imgReg.exec(posts[i].body);
                }
            }else{
                img = "";
            }
            var text = posts[i].body.replace(/(<([^>]+)>)/ig," ").substr(0, 128) + "...";
            
            post.id = posts[i].id;
            post.body = posts[i].body;
            post.rating = posts[i].rating;
            post.domain_url = posts[i].domain_url;
            post.image = img;
            post.text = text;
            post.user = posts[i].login;
            post.comments = "Комментарии: " + posts[i].comm_count + " / " + posts[i].unread;
            post.wrote = (posts[i].gender == 1 ? "Написал " : "Написала ") + posts[i].user_rank + " " +posts[i].login;
            post.when = posts[i].textdate + " в " + posts[i].posttime;
        
            if( iLepra.latestPosts.indexOf(post) == -1 ){
                iLepra.latestPosts.push(post);
            }
        }
    };

	// Define a local copy of iLepra
	return {
		// 
		// events
		//
		events: {
			init: "iLepraInit",
			ready: "iLepraReady",
			error: "iLepraError"
		},
		
		// 
		// app config
		//
		config: {
		    loadImages: true,
		    screenBiggest: 0
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
		    // detect device properties
		    this.config.screenBiggest = window.screen.width > window.screen.height ? window.screen.width : window.screen.height;
		    
		    // get lepra
			$.get("http://leprosorium.ru", function(data){
				if(data.indexOf('<input type="password"') > 0){
					processCaptcha(data);
					iLepra.isAuthenticated = false;
				}else{
					//iLepra.getLastPosts();
					iLepra.isAuthenticated = true;
					
					// process user's data
					processMain(data);
				}
				// dispatch event
				$(document).trigger(iLepra.events.init);
			});
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
					processCaptcha(data);
					
					// dispatch error event and die
					$(document).trigger(iLepra.events.error);
				}else{
				    // process user's data
					processMain(data);
				
					// dispatch ready event
					$(document).trigger(iLepra.events.ready);
				}
			});
		},
		
		/***
		 Gets last posts from JSON interface
		 NOT IMPLEMENTED IN UI YET
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
				// parse
				processJSONPosts(data.posts);
				// trigger event
				$(document).trigger(iLepra.events.ready);
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
				// parse
				processJSONPosts(data.posts);
				// trigger event
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
				iLepra.myStuffPosts = [];
				iLepra.util.processHTMLPosts(data, iLepra.myStuffPosts, undefined);
				$(document).trigger(iLepra.events.ready);
			});
		},
		
		/***
		 Gets favourite posts
		 ***/
		getFavourites: function(){
			$.get("http://leprosorium.ru/my/favourites/", function(data){
				iLepra.favouritePosts = [];
				iLepra.util.processHTMLPosts(data, iLepra.favouritePosts, 'fav');
				$(document).trigger(iLepra.events.ready);
			});
		},
		
		/***
		 Gets inboxes stuff
		 ***/
		getInbox: function(){
			$.get("http://leprosorium.ru/my/inbox/", function(data){
				iLepra.inboxPosts = [];
				iLepra.util.processHTMLPosts(data, iLepra.inboxPosts, 'inbox');
				$(document).trigger(iLepra.events.ready);
			});
		}
	}
})();