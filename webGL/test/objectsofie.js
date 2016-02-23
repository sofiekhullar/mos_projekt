			// creating the scene
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.1, 1000 );
			
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			var container, stats;
			var controls;
			controls = new THREE.TrackballControls( camera );

			//Camera
			camera.position.x = 0;
       		camera.position.y = 0;
       		camera.position.z = 50;

			animate();

       		// Variabler
       		var max_of_glitter = 200;
       		var glitter = [];
       		var time = 0;
       		const N = 200; // Time step

       		// add floor
	      	var planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
			var planeMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF });
			var plane = new THREE.Mesh(planeGeo, planeMat);	

			renderer.shadowMap.enabled = true;
			plane.receiveShadow = true;	
			
			plane.rotation.x = -Math.PI/2;
			plane.position.y = -50;

			//Add wireframe for box  
			var wire = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), new THREE.MeshBasicMaterial({wireframe: true, color: 'white'}));      		
      		scene.add(wire);
			plane.receiveShadow = true;
			scene.add(plane);

			 // add light
			var light = new THREE.SpotLight(0xFFFFFF, 5); //Vitt ljus och intensitet (jättestarkt!).
	      	light.position.set( 50, 100, 50 );
	      	scene.add(light);
	      	light.castShadow = true;
	      	light.shadowDarkness = 0.7;

	      	// add light from the cameras perspective
			var light2 = new THREE.SpotLight(0xFFFFFF, 2); //Vitt ljus och intensitet (jättestarkt!).
	      	light2.position.set( 0,0,100 ); //Från kamerans perspektiv
	      	scene.add(light2);
	      	light2.castShadow = true;

			//The wall
			var planeGeo2 = new THREE.PlaneGeometry(100, 100);
			var planeMat2 = new THREE.MeshLambertMaterial({color: 0x545454});
			var plane2 = new THREE.Mesh(planeGeo2 , planeMat2);
			plane2.overdraw = true;
			scene.add(plane2);

			//plane2.rotation.x = -Math.PI/2;
			plane2.position.y = 0;
			plane2.position.z = -50;

			// add sphere
			var radius = 10;
			var geometry = new THREE.SphereGeometry( radius, 40, 40 );
			var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
			var sphere = new THREE.Mesh( geometry, material );
			scene.add( sphere );

			//console.log(color);

			//color: Math.floor(Math.random() * 0x1000000)
			//Create boxes and store in array
 			var geo = new THREE.BoxGeometry( 5, 0.5, 5 );
 			   for (var i = 0; i < max_of_glitter; i++) {
 				    var color = Please.make_color({	// slumpar grå färger
							greyscale: true, //for the brits
							grayscale: true  //for the yanks
							});
 				    var box = {};
 				    var mat = new THREE.MeshPhongMaterial({color});
 				    box.obj = new THREE.Mesh( geo, mat);
 				    
 				    box.x = Math.floor((Math.random() * 98) - 49);
					box.y = 100;
					box.z = Math.floor((Math.random() * 98) - 49);

 					box.dx = 0;  
			        box.dy = Math.random();
			        box.dz = 0;


 				    box.obj.position.set( box.x, box.y, box.z);
			        scene.add(box.obj);

			        box.obj.castShadow = true;
			        box.obj.recieveShadow = true;
			        glitter.push(box);
 				    };


			// Uppdate the objects position with the framerate
			function update_scene (t) {
				dt = t-time;
				time = t;
				update_pos(dt);
				renderer.render(scene, camera); // render the scene
				window.requestAnimationFrame(update_scene, renderer.domElement);
			}

			update_scene(new Date().getTime());

			var count = 0;
			var add = 1;


			function update_pos (dt) {

			for (var i = 0; i < max_of_glitter; i++) {
				if(glitter[i].count>max_of_glitter && glitter[i].y < -48)
					{
						glitter[i].y = -49;
						glitter[i].dy =  0;
				    	glitter[i].dx =  0;
				    	glitter[i].dz =  0;
					}

				glitter[i].x = glitter[i].x  + glitter[i].dx;  
				glitter[i].y = glitter[i].y  + glitter[i].dy;
				glitter[i].z = glitter[i].z  + glitter[i].dz;

				check_floor(glitter[i]);

				
				if(glitter[i].y > -49){
					glitter[i].dy =  glitter[i].dy - 9.82/1000; // add gravity
					glitter[i].obj.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI*0.2, Math.random()*Math.PI*0.05); // Set initial rotation
					glitter[i].obj.matrix.makeRotationFromEuler(glitter[i].obj.rotation); // Apply rotation to the object's matrix
				}

				
				else {
					glitter[i].obj.rotation.set(0,0,0);
					glitter[i].obj.matrix.makeRotationFromEuler(glitter[i].obj.rotation);
				}
				

				
				check_sphere(glitter[i], i);

				if(glitter[i].y < (radius+10) && glitter[i].x < (radius+10) && glitter[i].x > (radius+10) )
				{
					check_collision(glitter[i]);
				}


				glitter[i].obj.position.set( glitter[i].x , glitter[i].y , glitter[i].z);
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
			function check_sphere (box, i) { // KOMMENTARER
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
			     		
			     		//console.log(box.dy);

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

			function render() {

				renderer.render( scene, camera );
				stats.update();
			}

			function animate() {
				requestAnimationFrame( animate );
				controls.update();
			}