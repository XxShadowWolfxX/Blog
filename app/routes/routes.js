var r = require("./routes.json");

var controllers = {
	pages : require("./controllers/pages"),
	session : require("./controllers/session"),
	blogCtrl : require("./controllers/blogCtrl")
};

module.exports = function(app, passport) {
	app.get(r.home, controllers.pages.home);
	app.get(r.login, controllers.pages.login);
	app.get(r.index, controllers.pages.index);
	app.get(r.post, controllers.pages.post);
	app.get(r.create, controllers.blogCtrl.createPage);
	app.get(r.update, controllers.blogCtrl.updatePage);
	app.post(r.signup, controllers.pages.signup);
	app.post(r.login, passport.authenticate("local-login", {
		successRedirect : r.index,
		failureRedirect : r.login
	}));
	app.post(r.create, controllers.session, controllers.blogCtrl.create);
	app.put(r.create, controllers.session, controllers.blogCtrl.update);
	app.delete(r.delete, controllers.session, controllers.blogCtrl.delete);
}