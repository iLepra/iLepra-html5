var postTemplate = '\
            <li data-icon="false">\
				<a href="#" class="postListItem" data-id="<%= id %>">\
					<% if(iLepra.config.loadImages){ %>\
					<img src="<%= image %>" class="postThumb" />\
					<% } %>\
					<h3 style="white-space:normal;"><%= text %></h3>\
					<p>\
					    <%= user %>, \
					    <%= when %>\
					    <% if(rating != undefined && rating.length > 0 && rating != 0){ %>, \
					        <span style="color: darkblue;"><%= rating %></span>\
					    <% } %>\
					</p>\
					<p><%= comments %><% if(domain_url != ""){ %>, <%= domain_url %> <% } %></p>\
				</a>\
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