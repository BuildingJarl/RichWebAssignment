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
    light.position.set(0,0,500);
    this.scene.add(light);
	//this.scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

	this.container.appendChild(this.renderer.domElement);

	//add camera to scene
	this.scene.add(this.camera);
	console.log("Camera Added to Scene");

	//stats setup
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.zindex = 1;
	this.stats.domElement.style.top = '0px';
	container.appendChild( this.stats.domElement );
	console.log("Stats running");
};

IVE.prototype.addOrbitControlsToCamera = function() {
	this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
}

IVE.prototype.update = function () {
	this.stats.update();
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
} 

//--------------------------------------------------------------------------

function ObjectFactory() {

};

ObjectFactory.prototype.cube = function(x,y,z) {

	var cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshNormalMaterial() );
	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;

	cube.update = function(){

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	};

	return cube;
};

ObjectFactory.prototype.createObjectsFromData = function(x,y,z,text) {

	var can = document.createElement("canvas");
	var context = can.getContext("2d");
	var xxx = can.width / 2;
	var yyy = can.height / 2;
	context.font = "30pt Calibri";
	context.textAlign = "center";
	context.fillStyle = "grey";
	context.fillRect(0,0,300,200);
	context.fillStyle = "blue";
	context.fillText(text,xxx,yyy-30);

	var texture = new THREE.Texture(can);
	texture.needsUpdate = true;

	var cubeMaterialArray = [];
	// order to add materials: x+,x-,y+,y-,z+,z-
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { map:texture } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );

	var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );

	var cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 20 ), cubeMaterials );
	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;

	cube.update = function(){

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	};

	console.log(text + " added to Scene")
	return cube;
};

/*
	ToDO pass in each "file" and let the object factory create various elemts for the file
	e.g.
		one box for the overall file with name
		another for each function in the file
		another for each var
		another for each object
		another for each function declaration
		...
*/

