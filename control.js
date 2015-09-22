			// Funktion zur Steuerung
			function update() {
				var delta = clock.getDelta(); // seconds.
				var step = 200 * delta; // 200 pixels per second
				var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
				
				vertexIndex = collisionDetection();
				// local transformations

				// move forwards/backwards/left/right
				if ( keyboard.pressed('up') && vertexIndex != 4 && vertexIndex != 6 && vertexIndex != 1 && vertexIndex != 3 )
					user.translateZ( -step );
					// up();
				if ( keyboard.pressed('down') && vertexIndex != 0 && vertexIndex != 2 && vertexIndex != 5 && vertexIndex != 7 )
					user.translateZ(  step );
					// up();
				// rotate left/right/up/down
				var rotation_matrix = new THREE.Matrix4().identity();
				if ( keyboard.pressed('left')  && vertexIndex != 4 && vertexIndex != 5 && vertexIndex != 6 && vertexIndex != 7 )
					user.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
				if ( keyboard.pressed('right') && vertexIndex != 1 && vertexIndex != 3 && vertexIndex != 0 && vertexIndex != 2 )
					user.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
				if ( keyboard.pressed("R") )
					user.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
				if ( keyboard.pressed("F") )
					user.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
	
				if ( keyboard.pressed('ctrl') )
				{
					alert(user.position.x + ", " + user.position.y + ", " + user.position.z );
				}
				
	
				var relativeCameraOffset = new THREE.Vector3(0,50,200);

				var cameraOffset = relativeCameraOffset.applyMatrix4( user.matrixWorld );

				camera.position.x = cameraOffset.x;
				camera.position.y = cameraOffset.y;
				camera.position.z = cameraOffset.z;
				camera.lookAt( user.position );

				checkItem();
				checkQuest();

				// console.log('x' + cube.position.x);
				// console.log('y' + cube.position.y);
				// console.log('z' + cube.position.z);
			}

		// Kollisionserkennung; erkennt Wände, kann aber z.B. nicht nach rechts laufen, wenn vertexIndex = 1, geht aber nach rechts (an wand entlang)
			function collisionDetection(){
				// Cube Position in originPoint kopiert
				var originPoint = user.position.clone();
				clearText();

				// for-schleife für alle Eckpunkte, die Kollisionen hervorrufen können
				for (var vertexIndex = 0; vertexIndex < user.geometry.vertices.length; vertexIndex++)
				{
					// aktueller Punkt, (0 bis 7) --> Array der Eckpunkte, in Variable kopieren
					var localVertex = user.geometry.vertices[vertexIndex].clone();
					// 
					var globalVertex = localVertex.applyMatrix4( user.matrix );
					// Richtungsvektor, dessen Position
					var directionVector = globalVertex.sub( user.position );
					
					// origin Point und normalisierter Richtungsvektor des Cubes
					var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
					// Kollisionen = Überschneidungen des Cubes mit collidableMeshList
					var collisionResults = ray.intersectObjects( collidableMeshList );
					// Wenn Kollisionslänge größer als 0 UND Kollisionsergebnis-Distanz an der Stelle 0 ist kleiner als Länge des Richtungsvektors
					if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
						// zeige vertexIndex an und gib ihn zurück
				        appendText(vertexIndex);
				        return vertexIndex;
					}
				}
			}

			function clearText(){   
				document.getElementById('message').innerHTML = '..........';   
			}

			function appendText(txt){   
				document.getElementById('message').innerHTML += txt;   
			}

			function cameraUpdate(){
				var relativeCameraOffset = new THREE.Vector3(0,50,200);

				var cameraOffset = relativeCameraOffset.applyMatrix4( user.matrixWorld );

				camera.position.x = cameraOffset.x;
				camera.position.y = cameraOffset.y;
				camera.position.z = cameraOffset.z;
				camera.lookAt( user.position );
			}

			/*function up(){
				var raycaster = new THREE.Raycaster();
				raycaster.set(user.position, THREE.Vector3(0, -1, 0));
				var distance = 40;

				var velocity = new THREE.Vector3();

				var intersects = raycaster.intersectObject( plane ); //use intersectObjects() to check the intersection on multiple

				//new position is higher so you need to move you object upwards
				if (distance > intersects[0].distance) {        
				    user.position.y += (distance - intersects[0].distance) - 1; // the -1 is a fix for a shake effect I had
				}

				//gravity and prevent falling through floor
				if (distance >= intersects[0].distance && velocity.y <= 0) {
				    velocity.y = 0;
				} else if (distance <= intersects[0].distance && velocity.y === 0) {
				    velocity.y -= delta ;
				}

				user.translateY(velocity.y);
			}*/

