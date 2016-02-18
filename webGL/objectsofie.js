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
       		camera.position.z = 100;

			animate();

       		// Variabler
       		var Ypos = calculate();  //Call func calc and it returns ypos
       		var max_of_glitter = 100;
       		var glitter = [];
       		var time = 0;
       		const N = 200; // Time step
       		var diff = calc_step();
       		console.log(diff);

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

			console.log(color);

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

					box.dx = Math.random();  
			        box.dy = 5;
			        box.dz = Math.random();

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
			function update_pos () {
			for (var i = 0; i < max_of_glitter; i++) {
				//glitter[i].y -= 0.9;

/*
				if(count%max_of_glitter == 0)
				{
					add++;
					glitter[i].y = glitter[i].y + diff[add]*100;
					//console.log(diff[add]);
				}
				else
				{
					glitter[i].y = glitter[i].y + diff[add]*100;
					console.log(diff[add]*100);
				}
				count++;

				*/
				glitter[i].y = glitter[i].y + diff[i]*100;
				check_floor(glitter[i]);
				
				//glitter[i].x.rotation +=90 ;
				//console.log(glitter[i].x.rotation);
				glitter[i].obj.position.set( glitter[i].x , glitter[i].y , glitter[i].z);
				}; 
			}

			function check_floor (box) {
				 if(box.y <= -50)
				 {
				 	box.y = -50
				 }
			}

			function calculate () {

			const V0 = 0; // initial speed
			const m = 0.003; // mass in kg
			const g = 9.81; // gravity acceleration kg/m3
			const rho = 1.2; // Air density
			const Amax = 0.06237; // Object maxarea
			const Amin = 0.0100; // Object minarea
			const cw = 0.4; // Numerical drag coefficient
			const deltat= 0.002;
			const N = 200;

			var V = new Array(N); // Speed
			var posY = new Array(N); //Height
			V[0]=V0; //Start velocity
			posY[0] = 10; // Start height

			var t = new Array(N); //Tide 
			
			for(i = 0; i < N; i++)
			{
				t[i] = i * deltat;
			}

			var Arand = (Math.random() * Amax + Amin); // Random nr mellan max och min

			if( Arand < Amax && Arand > Amax/2) //Horrisontellt
				{
					Arand = Amin;
					fallingHor = true;
				}   
			else   //Vertikalt
				{
					Arand = Amax;
				 	fallingHor = false;
				}

			Arand = Amax; // FULKOD

			var k = 0.5*cw*rho*Arand; //Coefficient		 
			   
			for(i=0; i < N; i++)
			{
				V[i+1] = V[i] + deltat * (g-(k/m)*Math.pow(V[i], 2));
				posY[i+1] = posY[i] + V[i]*t[i+1];
			}
			return posY;
		}

			function calc_step () {
				var diff = [];
				for(i=0; i < N; i++)
				{
					if(i < 100)
					{
						diff[i] = Ypos[i] - Ypos[i+1];
					}
					else
					{
						diff[i] = diff[20];
					}
				}
				return diff;
			}

			function render() {
				renderer.render( scene, camera );
				stats.update();
			}

			function animate() {
				requestAnimationFrame( animate );
				controls.update();
			}