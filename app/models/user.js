
function User(fbid,uname,pid) {
	this.facebookId = fbid;
	this.createdAt = Date.now();
	this.model = {name:"testModel"};
	this.username = uname;
	//insert stats
};

module.exports = User;