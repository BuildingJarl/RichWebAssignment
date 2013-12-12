'use strict';

function IVE(width,height,container) {

	this.WIDTH = width;
	this.HEIGHT = height;
	this.VIEWANGLE = 45;
	this.ASPECT = this.WIDTH / this.HEIGHT;
	this.NEAR = 1;
	this.FAR = 1000;
	this.container = container;

	this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	this.renderer.setSize(this.WIDTH,this.HEIGHT);

	this.camera = new THREE.PerspectiveCamera( this.VIEWANGLE, this.ASPECT, this.NEAR, this.FAR);
	this.camera.position.z = 500;

	this.scene = new THREE.Scene();

	// Set the background color of the scene.
    this.renderer.setClearColor(0x333F47, 1);
 
    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
   	light.position.set(0,200,100);
    this.scene.add(light);
	//this.scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

	this.container.appendChild(this.renderer.domElement);

	//add camera to scene
	this.scene.add(this.camera);
	console.log("Camera Added to Scene");

	//stats setup
	//this.stats = new Stats();
	//this.stats.domElement.style.position = 'absolute';
	//this.stats.domElement.style.zindex = 1;
	//this.stats.domElement.style.top = '0px';
	//container.appendChild( this.stats.domElement );
	//console.log("Stats running");
};

IVE.prototype.addOrbitControlsToCamera = function() {
	this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
}

IVE.prototype.update = function () {
	//this.stats.update();
	this.draw();
};

IVE.prototype.draw = function () {
	this.renderer.render(this.scene,this.camera);
};

IVE.prototype.addObjectToScene = function(obj) {
	this.scene.add(obj);
	console.log("object added to scene");
};

IVE.prototype.resetSize = function (width,height) {
	this.WIDTH = width;
  	this.HEIGHT = height;
  	this.renderer.setSize(this.WIDTH, this.HEIGHT);
  	this.camera.aspect = this.WIDTH / this.HEIGHT;
  	this.camera.updateProjectionMatrix();
};

IVE.prototype.addModelToScene = function(name) {
	var loader = new THREE.JSONLoader(true);
	var self = this;
	var mesh;
	var path = "../../models/" + name + ".js";
	loader.load(path, function(geometry, materials) {
			var material = new THREE.MeshFaceMaterial(materials);
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0,0,0);
			mesh.scale.set(20,20,20);
			self.scene.add(mesh);
		}
	);
	console.log("model added to scene");
};