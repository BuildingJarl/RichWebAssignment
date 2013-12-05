
function User(fbid,uname,pid) {
	this.facebookId = fbid;
	this.createdAt = Date.now();
	this.model = {name:"blimp"};
	this.username = uname;
};

module.exports = User;