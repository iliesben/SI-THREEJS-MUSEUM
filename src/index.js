import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Cubes from './javascript/Cubes.js'
import Walls from './javascript/Walls.js'
// import James from './javascript/James.js'
import Street from './javascript/Street.js'
import Preloader from './javascript/Preloader.js'
import Car from './javascript/Car.js'
import Hangar from './javascript/Hangar.js'

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
        this.hangar = new Hangar()

        this.container = document.createElement( 'div' );
        this.container.style.height = '100%';
        document.body.appendChild( this.container );

		this.options = {
            assets:[
            ],
			oncomplete: () => {
                this.init();
                this.loop()
			}
        }

        this.assets()
		const preloader = new Preloader(this.options);
    }

    assets(){
        this.models = [ this.walls.gltf, this.car.gltf, this.hangar.gltf];
        this.models.forEach( (model) => { this.options.assets.push(model)})
    }

    init(){

        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
        this.camera.position.set(35, 10 , 10)

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
		// this.scene.add( directionalLight );

        /**
         * Walls
         */
        this.scene.add(this.walls.group)
        this.scene.add(this.car.group)
        this.car.group.position.set(-15,2.4,25)
        this.car.group.scale.x = 0.12
        this.car.group.scale.y = 0.12
        this.car.group.scale.z = 0.12

        this.scene.add(this.hangar.group)
        this.hangar.group.position.set(-28,2.4,68)
        // this.walls.scale(2,2,2)

        /**
         * Street
         */
        this.scene.add(this.street.group)


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

        window.addEventListener( 'resize', () => { play.onWindowResize(); }, false );
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

        // if (james.mixer!=undefined) james.mixer.update(dt);

        // Render
        this.renderer.render( this.scene, this.camera );
    }

}


document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum();
    window.museum = museum
});