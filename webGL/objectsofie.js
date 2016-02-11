			// creating the scene
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.1, 1000 );
			
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			camera.position.x = 0;
       		camera.position.y = 0;
       		camera.position.z = 100;

       		var max_of_glitter = 5;
       		var glitter = [];
       		var time = 0;

       		// add floor
	      	var planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
			var planeMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
			var plane = new THREE.Mesh(planeGeo, planeMat);		
			
			plane.rotation.x = -Math.PI/2;
			plane.position.y = -50;

			//Add wireframe for box  
			var wire = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), new THREE.MeshBasicMaterial({wireframe: true, color: 'white'}));      		
      		scene.add(wire);
			plane.receiveShadow = true;
			scene.add(plane);

			//Create boxes and store in array
 			var geo = new THREE.BoxGeometry( 1, 0.1, 1 );
 			   for (var i = 0; i < max_of_glitter; i++) {
 				    var box = {};
 				    var mat = new THREE.MeshBasicMaterial({color: Math.floor(Math.random() * 0x1000000)});
 				    box.obj = new THREE.Mesh( geo, mat);
 				    
 				    box.x = 100*Math.random();
					box.y = 100;
					box.z = 0;

 				    box.obj.position.set( box.x, box.y, box.z);
			        scene.add(box.obj);

			        box.obj.castShadow = true;
			        box.obj.recieveShadow = true;
			        glitter.push(box);
 				    };

			function update_time (t) {
				dt = t-time;
				time = t;
				update_pos(dt);
				//console.log("FORLOOP")
				renderer.render(scene, camera);
				window.requestAnimationFrame(update_time, renderer.domElement);
			}
			
			 update_time(new Date().getTime());

			function update_pos () {
			for (var i = 0; i < max_of_glitter; i++) {
				glitter[i].y -= 0.05;
				console.log(glitter[i].y);

				glitter[i].obj.position.set( glitter[i].x , glitter[i].y , glitter[i].z );
				}; 
			}


			function render() {
				renderer.render( scene, camera );
			}