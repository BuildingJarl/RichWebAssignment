'use strict';

var User = (function() {

	//constructor
	function User(fbid,uname) {
		this.facebookId = fbid;
		this.createdAt = Date.now();
		this.username = uname;
		this.votesCast = [];
		this.polledViewed = [];
	};

	return User;
})();

module.exports = User;