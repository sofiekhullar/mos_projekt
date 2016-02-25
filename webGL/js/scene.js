
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			// Variabler
			var max_of_glitter = 2000;
			var glitter = [];
			var time = 0;
			var radius = 10;
			var container;
			var camera, controls, scene, renderer;
			var sky, sunSphere;
			var distance = 400000;

			init();
			render();

			function initSky() {
				// Add Sky Mesh
				sky = new THREE.Sky();
				scene.add( sky.mesh);

				// Add sphere for sun
				sunSphere = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 20000, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff } )
					);
				// add sun to scene
				sunSphere.position.y = - 700000;
				sunSphere.visible = false;
				scene.add( sunSphere );
				// change sunlight
				var uniforms = sky.uniforms;
				uniforms.turbidity.value = 10;
				uniforms.reileigh.value = 2;
				uniforms.luminance.value = 1;
				uniforms.mieCoefficient.value = 0.005;
				uniforms.mieDirectionalG.value = 0.8;
				var theta = Math.PI * ( 0.49 - 0.5 );
				var phi = 2 * Math.PI * ( 0.25 - 0.5 );

				sunSphere.position.x = distance * Math.cos( phi );
				sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
				sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
				sunSphere.visible = ! true;

				sky.uniforms.sunPosition.value.copy( sunSphere.position );
			}

			function init() {
			// Add scene
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
			camera.position.set( 0, 0, 200 );
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			initSky();

				//add light
	 			var light = new THREE.SpotLight(0xFFFFFF, 1, 1000); //Vitt ljus och intensitet (jättestarkt!).
	 			light.position.copy(camera.position);
	 			scene.add(light);
	 			light.castShadow = true;
	 			light.shadowDarkness = 0.7;
	 			renderer.render( scene, camera );

				//Ambient ljus
				var lightamb = new THREE.AmbientLight( 0xFFFFFF, 2, 200 ); // soft white light
				scene.add( lightamb ); 

				//Add sphere
				var geometry = new THREE.SphereGeometry( radius, 40, 40 );
				var material = new THREE.MeshPhongMaterial( {color: 0x999999} );
				var sphere = new THREE.Mesh( geometry, material );
				scene.add( sphere );

				// Add controls
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.enableZoom = false;
				controls.enablePan = false;
				window.addEventListener( 'resize', onWindowResize, false );

				// Create boxes and push into a array
				var geo = new THREE.BoxGeometry( 2, 0.2, 2 );
				for (var i = 0; i < max_of_glitter; i++) {
					//TODO! ADD TEXTURE
 				    /*var color = Please.make_color({	// slumpar grå färger 
							greyscale: true, //for the brits
							grayscale: true  //for the yanks
						});*/
 				    var box = {};
 				    var mat = new THREE.MeshPhongMaterial({color: 0xFF9999, specular: 0xFF9999, shininess: 30, shading: THREE.FlatShading, emissiveIntensity: 1});
 				    box.obj = new THREE.Mesh( geo, mat);
 				   	// start conditions pos
 				   	box.x = Math.floor((Math.random() * 300) - 150);
 				   	box.y = 100;
 				   	box.z = Math.floor((Math.random() * 300) - 150);
 				    // start conditions veolcity
 				    box.dx = 0;
 				    box.dy = Math.random();
 				    box.dz = 0;

 				    box.rotation = Math.random();

 				    box.obj.position.set( box.x, box.y, box.z);
 				    scene.add(box.obj);
 				    // add shadow
 				    box.obj.castShadow = true;
 				    box.obj.recieveShadow = true;
 				    glitter.push(box);
 				};
 			}

			// update per frame
			function update_scene () {
				update_pos();
				renderer.render(scene, camera); // render the scene
				window.requestAnimationFrame(update_scene, renderer.domElement);
			}

			update_scene();

			var update = 0;
			function update_pos () {
				for (var i = 0; i < max_of_glitter; i++) {
					//update positions
					glitter[i].x = glitter[i].x  + glitter[i].dx;  
					glitter[i].y = glitter[i].y  + glitter[i].dy;
					glitter[i].z = glitter[i].z  + glitter[i].dz;

					check_floor(glitter[i]);
					check_sphere(glitter[i], i);

					update +=0.0004;
					if(glitter[i].y > -49){
						glitter[i].dy =  glitter[i].dy - 9.82/1000; // add gravity
						glitter[i].obj.rotation.set(glitter[i].rotation * update, 1, 1); // Set initial rotation
						glitter[i].obj.matrix.makeRotationFromEuler(glitter[i].obj.rotation); // Apply rotation to the object's matrix
					}
					else {
						glitter[i].obj.rotation.set(0,0,0);
						glitter[i].obj.matrix.makeRotationFromEuler(glitter[i].obj.rotation);
					}	
					glitter[i].obj.position.set(glitter[i].x , glitter[i].y , glitter[i].z);
				}; 
			}


			function check_floor (box) {
				if(box.y <= -50)
				{
					box.y = -50
				 	box.dx = 0;
				 	box.dz = 0;
				}
			}
				function add_wind (box) {
				if(box.y >20 && box.y <40)
				{
					box.dx = 0.5;
				}
			}

				function check_sphere (box, i) { 
				var friction = 0.1;

 			     	if(check_collision(box) == true)
 			     	{
 			     		//hasteghetsvektorn för glitter
 			     		var v = new THREE.Vector3( box.dx, box.dy, box.dz );
 			     		//positionsvektorn för glitter
 			     		var pos = new THREE.Vector3( box.x, box.y, box.z);

 			     		//längden av hastighetsvektorn
 			     		var l = v.length();
 			     		l *= friction;

 			     		//Normaliserar båda vektorerna
 			     		v.normalize();
			     		pos.normalize();

			     		//projicerar hastighetsvektorn på positions vektorn
			     		var projPos= v.projectOnVector(pos);
			  
			     		//Skapar en ny vektor som är positionerna av den projicerade vektorn
			     		var posNew = new THREE.Vector3(projPos.x, projPos.y, projPos.z);

			     		//sätter den nya poitions vektorn till samma längd som hastighets vektorn
			     		posNew.setLength(l);
			     		
			     		box.dx = posNew.x*0.5;
			     		box.dy = -posNew.y *0.5;
			     		box.dz = posNew.z *0.5;

			     		box.x += 1*pos.x;
			     		box.y += 1*pos.y;
			     		box.z += 1*pos.z;
 			     	}
			}

			     function check_collision(glitter)
			     {
			     	var distance = new THREE.Vector3( glitter.x, glitter.y, glitter.z );

			     	if(distance.length() < 12){
		    		//console.log(distance.length());
		    		return true;
		    	}
		    	else
		    		return false;
		    }


		    function onWindowResize() {
		    	camera.aspect = window.innerWidth / window.innerHeight;
		    	camera.updateProjectionMatrix();
		    	renderer.setSize( window.innerWidth, window.innerHeight );
		    	render();
		    }

		    function render() {
		    	renderer.render( scene, camera );
		    }