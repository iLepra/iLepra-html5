var postTemplate = '\
            <li>\
				<% if(iLepra.config.loadImages){ %>\
				    <div class="postThumb">\
    				    <img src="<%= image %>" />\
    				</div>\
				<% } %>\
				<div class="postBody">\
				    <a href="javascript:;">\
				    <%= text %>\
				    </a>\
				</div>\
				<div class="postInfo">\
				    <%= wrote %>, \
				    <%= when %>, <% if(domain_url != ""){ %> <%= domain_url %>, <% } %>\
				    <%= comments %>\
				</div>\
				<% if(rating != undefined && rating.length > 0 && rating != 0){ %>\
				    <div class="postRating"><%= rating %></div>\
				<% } %>\
			</li>';
			            
var subsTemplate = '\
            <li>\
                <a href="#" class="subListItem" data-link="<%= link %>">\
                    <% if(iLepra.config.loadImages){ %><img src="<%= logo %>" class="postThumb" /><% } %>\
                    <h1><%= name %></h1>\
                    <p><%= creator %></p>\
                </a>\
            </li>';
			
var commentTemplate = '\
			<li <% if (isNew == 1){ %>data-theme="d"<% } %> >\
				<a>\
					<p class="commentText"><%= text %></p>\
					<p><%= wrote %></p> \
					<p class="ui-li-count"><%= rating %></p>\
				</a>\
				<a href="#" class="postCommentItemMenu" data-id="<%= id %>" data-user="<%= user %>">split</a>\
			</li>';
			
var chatTemplate = '\
            <li>\
                <a href="#" class="chatMessage" data-user="<%= user_login %>">\
                    <h1 class="commentText"><%= body %></h1>\
                    <p><%= user_login %></p>\
                    <p class="ui-li-count"><%= createdate %></p>\
                </a>\
            </li>';