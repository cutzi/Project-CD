// Tree.js
function initTrees() 
{
	var tree = null;
	// init loading
	loader.load( 'http://caro.x15.eu/appletree.json', function( geometry, materials ) 
	{					
		var material = new THREE.MeshFaceMaterial (materials);
		
		//place trees as boundaries first
		placeBounadries(geometry, material, true);
		
		for ( var i = 0; i < 200; i ++ ) 
		{
			// random placement in a grid
			var x = Math.floor(Math.random() * 4000 - 2000);
			var z = Math.floor(Math.random() * 4000 - 2000);
			
			// tabalugaQuest auslassen	
			if ( isTreePlacable(x, z) ) {
				if ( Math.abs( x ) < 200 && Math.abs( z ) < 200 ) continue;

				tree = new THREE.Mesh( geometry, material );

				var s = THREE.Math.randFloat( 10, 40 );
				tree.scale.set( s, s, s );

				tree.position.set( x, 0, z );
				tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

				tree.matrixAutoUpdate = false;
				tree.updateMatrix();

				scene.add( tree );

				collidableMeshList.push( tree );
			}
				
		}
	});
	loader.load( 'http://caro.x15.eu/baum.json', function( geometry, materials ) 
	{					
		var material = new THREE.MeshFaceMaterial (materials);
		
		//place trees as boundaries first
		placeBounadries(geometry, material, false); //false, because it's a fir not a tree.
		
		for ( var i = 0; i < 200; i ++ ) 
		{
			// random placement in a grid
			var x = Math.random() * 4000 - 2000;
			var z = Math.random() * 4000 - 2000;
			
			if ( isTreePlacable(x, z) )  {
				//placeFir(x, z, tree);
				if ( Math.abs( x ) < 200 && Math.abs( z ) < 200 ) continue;

				tree = new THREE.Mesh( geometry, material );

				var s = THREE.Math.randFloat( 10, 20 );
				tree.scale.set( s, s, s );

				tree.position.set( x, 0, z );
				tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

				tree.matrixAutoUpdate = false;
				tree.updateMatrix();

				scene.add( tree );

				collidableMeshList.push( tree );
			}
		}
	});
}

function isTreePlacable(x, z){
	/* With this function you can decide in which area shouldn't be trees.
		Pattern: if((x < highest && x > lowest) && (z > lowest && z < highest))
	*/	
	
	// For TabalugaQuest, no trees here
	if((x < 1550 && x > 700) && (z > -1300 && z < -900))
		return false;
	
	// For MemoryQuest, no trees here	
	if((x < -1000 && x > -1700) && (z > -1700 && z < -1100))
		return false;
	
	//For ApfelbaumQuest, no trees here
	if((x < 1650 && x > 1200) && (z > 1100 && z < 1600)){
		return false;
	}
	
	//For grandmas house, no trees here
	if((x < 1490 && x > 1240) && (z > -261 && z < 100)){
		return false;
	}
	
	// Tree is placeable, so return true
	else
		return true;
}

function placeBounadries(geometry, material, isTree){
	/* With this function, trees will be placed at the sideends of the map */
	
	var tree = null;
	
	var start;
	if (isTree){
		start = 0;
	}
	else{
		start = 50; 
	}
	
	// 1. Side
	for(var i = start; i < 4000; i += 100){
		tree = new THREE.Mesh( geometry, material );

		var s = THREE.Math.randFloat( 30, 40 );
		tree.scale.set( s, s, s );

		tree.position.set( -1950, 0, i-1950 );
		tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

		tree.matrixAutoUpdate = false;
		tree.updateMatrix();

		scene.add( tree );

		collidableMeshList.push( tree );
	}
	
	// 2. Side
	for(var i = start; i < 4000; i += 100){
		tree = new THREE.Mesh( geometry, material );

		var s = THREE.Math.randFloat( 30, 40 );
		tree.scale.set( s, s, s );

		tree.position.set( 1950, 0, i-1950 );
		tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

		tree.matrixAutoUpdate = false;
		tree.updateMatrix();

		scene.add( tree );

		collidableMeshList.push( tree );
	}
	
	// 3. Side
	for(var i = start; i < 4000; i += 100){
		tree = new THREE.Mesh( geometry, material );

		var s = THREE.Math.randFloat( 30, 40 );
		tree.scale.set( s, s, s );

		tree.position.set( i-1950, 0, -1950 );
		tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

		tree.matrixAutoUpdate = false;
		tree.updateMatrix();

		scene.add( tree );

		collidableMeshList.push( tree );
	}
	
	// 4. Side
	for(var i = start; i < 4000; i += 100){
		tree = new THREE.Mesh( geometry, material );

		var s = THREE.Math.randFloat( 30, 40 );
		tree.scale.set( s, s, s );

		tree.position.set( i-1950, 0, 1950 );
		tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

		tree.matrixAutoUpdate = false;
		tree.updateMatrix();

		scene.add( tree );

		collidableMeshList.push( tree );
	}
	
}