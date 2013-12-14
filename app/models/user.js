
function User(fbid,uname,pid) {
	this.facebookId = fbid;
	this.createdAt = Date.now();
	this.username = uname;
};

module.exports = User;