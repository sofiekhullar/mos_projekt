			// creating the scene
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.1, 1000 );
			
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			camera.position.x = 0;
       		camera.position.y = 0;
       		camera.position.z = 100;

       		// Variabler
       		var Ypos = calculate();  //Call func calc and it returns ypos
       		var max_of_glitter = 50;
       		var glitter = [];
       		var time = 0;
       		const N = 200; // Time step
       		var diff = calc_step();
       		//console.log(diff);

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

			 // add light
			var light = new THREE.SpotLight(0xFFFFFF, 5); //Vitt ljus och intensitet (jättestarkt!).
	      	light.position.set( 50, 100, 50 );
	      	scene.add(light);
	      	light.castShadow = true;

			//Create boxes and store in array
 			var geo = new THREE.BoxGeometry( 5, 0.5, 5 );
 			   for (var i = 0; i < max_of_glitter; i++) {
 				    var box = {};
 				    var mat = new THREE.MeshPhongMaterial({color: Math.floor(Math.random() * 0x1000000)});
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

			function update_pos () {
			for (var i = 0; i < max_of_glitter; i++) {
				glitter[i].y -= 0.9;
				//glitter[i].x = glitter[i].x  - glitter[i].dx;   
				//glitter[i].y = glitter[i].y  - glitter[i].dy;
				//glitter[i].z = glitter[i].z  - glitter[i].dz;
			
				glitter[i].y = glitter[i].y + diff[i]*0.1;
				
				check_floor(glitter[i]);

				glitter[i].obj.position.set( glitter[i].x , glitter[i].y , glitter[i].z);
				}; 
			}

			/*	function collision_check(box, i)
			{
				for (var j = 0; j < max_of_glitter; j++) {
			     	if(i!=j && collision(box, glitter[j]) == true)
			     	{
			     	}
			 	}
			}
			//Check distance between two box
		    function collision(glitter1, glitter2)
		    {
		    	var distance = new THREE.Vector3( glitter1.x-glitter2.x, glitter1.y-glitter2.y, glitter1.z-glitter2.z );
		    	//console.log(distance.length());
		    	if(distance.length() < 10){ // om anvståndet är mindre än 10 så är det en kollision
		    		return true;
		    	}
		    	else
		    		return false;
		    }
		    */
		
			function check_floor (box) {
				 if(box.y <= -50)
				 {
				 	box.y = -50
				 }
			}

			function calculate () {

			const V0 = 0; // initial speed
			const m = 0.00005; // mass in kg
			const g = 9.82; // gravity acceleration kg/m3
			const rho = 1.2; // Air density
			const Amax = 0.0044; // Object maxarea
			const Amin = 0.0001; // Object minarea
			const cw = 0.4; // Numerical drag coefficient
			const deltat=0.2;
			const N = 100;
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

			Arand = Amin; // FULKOD

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
					if(i < 50)
					{
						diff[i] = Ypos[i] - Ypos[i+1];
					}
					else
					{
						diff[i] = diff[49];
					}
				}
				return diff;
			}

			function render() {
				renderer.render( scene, camera );
			}