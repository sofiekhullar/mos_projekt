			
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			var clock = new THREE.Clock();
    		var time = 0;
    		var fallingHor = true;

    		var N = 100;
			var posY = calculate();  
			var t = createTime(N);   // FULKOD?!?!?
			var counter = 0;

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			
			var geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0xFF33FF } );
			var cube = new THREE.Mesh( geometry, material );
			cube.position.y = 3;
			
			if(fallingHor){
				cube.rotation.x = Math.PI /2;
			}
			scene.add( cube );

			camera.position.z = 5;

			
			var render = function () {
				requestAnimationFrame( render );

					//var delta = clock.getElapsedTime();
					//var roundedDelta = Math.round(delta * 10)/10;
					//console.log(roundedDelta);
					//if(roundedDelta%0.2 == 0)
					//cube.rotation.y += 0.7;

				counter++;

				var delta = clock.getDelta();
				console.log(delta);

				cube.position.y -= posY[counter] * 0.0002;
				console.log(counter);
				renderer.render(scene, camera);
			};

			render();


	function calculate () {

		var V0 = 0; // initial speed
		var m = 0.00005; // mass in kg
		var g = 9.82; // gravity acceleration kg/m3
		var rho = 1.2; // Air density
		var Amax = 0.0044; // Object maxarea
		var Amin = 0.0001; // Object minarea
		var cw = 0.4; // Numerical drag coefficient
		var deltat=0.2;
		var N = 100; // Time step
		var V = new Array(N); // Speed
		var posY = new Array(N); //Height
		V[0]=V0; //Start velocity
		posY[0] = 10; // Start height

		var t = createTime(N);

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

	function createTime (N) {
		var deltat=0.2;
		var t = new Array(N); //Tide 
		
		for(i = 0; i < N; i++)
		{
			t[i] = i *deltat;
		}
		return t;
	}

 






