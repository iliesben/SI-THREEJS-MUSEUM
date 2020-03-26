import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Cubes from './javascript/Cubes.js'
import WallsCollions from './javascript/WallsCollions.js'
import Street from './javascript/Street.js'
import Preloader from './javascript/Preloader.js'
import Car from './javascript/Car.js'
import Expo from './javascript/Expo.js'
import Rym from './javascript/Rym.js'
import walltest from './javascript/walltest.js'
import Gallery from './javascript/Gallery.js'
import Sky from './javascript/Sky.js'
import Light from './javascript/Light.js'

class Museum {
    constructor(){
        this.gallery = new Gallery()
        this.camera
		this.scene
        this.renderer
        this.clock = new THREE.Clock()
        this.street = new Street()
        this.wallsCollions = new WallsCollions()
        this.cubes = new Cubes()
        this.car = new Car()
        this.street = new Street()
        this.rym = new Rym()
        this.expo = new Expo()
        this.walltest = new walltest()

        this.sky = new Sky()
        this.light = new Light()
        this.cameraFade = 0.05;


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
       this.models = [ this.rym.person,
        this.car.gltf,
        this.expo.gltf];
       this.models.forEach( (model) => { this.options.assets.push(model)})

    }

    init(){

        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );

        /**
         * Scene
         */
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xa0a0a0 );
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 15, 5000 );

        /**
         * Light
         */

        this.scene.add(this.light.group)

         /**
         * WallsCollions
         */

        this.scene.add(this.wallsCollions.environment)


        /**
         * Car
         */
        this.scene.add(this.car.group)
        this.car.group.position.set(-15,2.4,20)
        this.car.group.scale.set(0.2, 0.2, 0.2)

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
         * walltest
         */
        this.scene.add(this.walltest.group)

        /**
         * Sky
         */
        this.scene.add(this.sky.group)

        /**
         * Rym
         */
        this.scene.add(this.rym.group)

        /**
         * Gallery
         */
        this.scene.add(this.gallery.group)

        /**
         * Renderer
         */
		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} );
		this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearAlpha(0)
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

        if (this.rym.player.mixer!=undefined) this.rym.player.mixer.update(dt);

		if (this.rym.player.move!=undefined){
			if (this.rym.player.move.forward!=0) this.rym.movePlayer(dt, this.scene.children[1].children);
			this.rym.player.object.rotateY(this.rym.player.move.turn*dt);
		}


		if (this.rym.player.cameras!=undefined && this.rym.player.cameras.active!=undefined){
			this.camera.position.lerp(this.rym.player.cameras.active.getWorldPosition(new THREE.Vector3()), this.cameraFade);
			const pos = this.rym.player.object.position.clone();
			pos.y += 6;
			this.camera.lookAt(pos);
		}

        // Render
        this.renderer.render( this.scene, this.camera );
    }

}


document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum();
});
