import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Cubes from './javascript/Cubes.js'
import Walls from './javascript/Walls.js'
//import James from './javascript/James.js'
import Street from './javascript/Street.js'
import Preloader from './javascript/Preloader.js'
import Car from './javascript/Car.js'
import Expo from './javascript/Expo.js'



class Museum {
    constructor(){
        this.camera
		this.scene
        this.renderer
        this.clock = new THREE.Clock();
        this.walls = new Walls()
        this.cubes = new Cubes()
        this.car = new Car()
        this.street = new Street()
        this.expo = new Expo()
        //this.james = new James()

        this.container = document.createElement( 'div' );
        this.container.style.height = '100%';
        document.body.appendChild( this.container );

		this.options = {
            assets:[
            ],
			oncomplete: () => {
                this.init();
                this.loop()
                // this.action()
			}
        }

        this.assets()
        const preloader = new Preloader(this.options);
    }

    assets(){

       // this.models = [ this.james.person];
       this.models = [ this.walls.gltf, this.car.gltf, this.walls.gltf2];
       this.models.forEach( (model) => { this.options.assets.push(model)})
        
        
    }

    init(){

        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
        this.camera.position.set(40, 8.68 , -0.3)
        this.camera.rotation.set(-3, 0, -3)
        this.camera.quaternion.set(0.0015550270263517871, 0.9961558075203143,0.0856999038597486)
        // this.camera.lookAt(this.james.object.position)
        /**
         * Scene
         */
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xa0a0a0 );
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

        /**
         * Light
         */

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(ambientLight)

		const hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemisphereLight.position.set( 0, 200, 0 );
		this.scene.add( hemisphereLight );

		const directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.set( 0, 200, 100 );
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.top = 180;
		directionalLight.shadow.camera.bottom = -100;
		directionalLight.shadow.camera.left = -120;
		directionalLight.shadow.camera.right = 120;
		this.scene.add( directionalLight );

        /**
         * Walls
         */
        this.scene.add(this.walls.group)
        this.scene.add(this.car.group)
        this.car.group.position.set(-15,2.4,20)
        this.car.group.scale.x = 0.12
        this.car.group.scale.y = 0.12
        this.car.group.scale.z = 0.12
       // this.walls.scale(2,2,2)

        /**
         * Expo
         */
        this.scene.add(this.expo.group)
        this.expo.group.position.set(-28,2.4,68)


        /**
         * Street
         */
        this.scene.add(this.street.group)

        /**
         * Sky
         */
       // this.scene.add(this.sky.group)

        
        /**
         * James
         */
        //this.scene.add(this.james.group)
        


        /**
         * Renderer
         */
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.shadowMap.enabled = true;
        this.container.appendChild( this.renderer.domElement );

        /**
         * cameraControls
         */
        this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
        this.cameraControls.zoomSpeed = 0.3
        this.cameraControls.enableDamping = true

        window.addEventListener( 'resize', () => { this.onWindowResize(); }, false );
    }

    /**
     * Resize
     */
    onWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }


    /**
     * Loop
     */
    loop()
    {
        const dt = this.clock.getDelta();
        window.requestAnimationFrame( () => this.loop()  )

        //if (this.james.mixer!=undefined) this.james.mixer.update(dt);

        // Render
        this.renderer.render( this.scene, this.camera );
    }

}


document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum();
});
