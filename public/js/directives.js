app.directive('ThreeJS', function() {
	return {
		restrict: 'A',

		link: function(scope,element, attrs) {
			/*
			var WIDTH = $(element).width();
			var HEIGHT = $(element).height();
			var VIEWANGLE = 45;
			var ASPECT = WIDTH / HEIGHT;
			var NEAR = 1;
			var FAR = 1000;
			var camera;
			var scene;
			var renderer;

			init();

			function init() {
				renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
				renderer.setSize(WIDTH,HEIGHT);
				renderer.setClearColorHex(0x333F47, 1);

				camera = new THREE.PerspectiveCamera( VIEWANGLE, ASPECT, NEAR, FAR);
				camera.position.z = 500;

				scene = new THREE.Scene();
				scene.add(camera);

				$(element).appendChild(renderer.domElement);
			}
			*/
		}
	}
});