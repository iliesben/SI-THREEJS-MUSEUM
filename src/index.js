import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import Cubes from './javascript/Cubes.js'
import Walls from './javascript/Walls.js'
// import from './javascript/Rym.js'
import Street from './javascript/Street.js'
import Preloader from './javascript/Preloader.js'
import Car from './javascript/Car.js'
import Expo from './javascript/Expo.js'
import Rym from './javascript/Rym.js'
import walltest from './javascript/walltest.js'
import Gallery from './javascript/Gallery.js'

class Museum {
    constructor(){
        this.gallery = new Gallery()
        this.camera
		this.scene
        this.renderer
        this.clock = new THREE.Clock()
        this.street = new Street()
        this.walls = new Walls()
        this.cubes = new Cubes()
        this.car = new Car()
        this.street = new Street()
        this.rym = new Rym()
        this.expo = new Expo()
        this.walltest = new walltest()
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
       this.models = [ this.rym.person, this.walls.gltf, this.car.gltf, this.walls.gltf2];
       this.models.forEach( (model) => { this.options.assets.push(model)})

    }

    init(){

        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
        // this.camera.position.set(40, 8.68 , -0.3)
        // this.camera.rotation.set(-3, 0, -3)
        // this.camera.quaternion.set(0.0015550270263517871, 0.9961558075203143,0.0856999038597486)
        // this.camera.lookAt(this.fred.object.position)
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
         * Iwalls
         */

        this.env = new THREE.Group()
        this.env.name = "Environment";

        const planeGeometry  = new THREE.BoxGeometry( 30, 30 )
        const planeMaterial  = new THREE.MeshBasicMaterial({
            color: 0x248f24,
            visible: false
        })
        let compteur = 0
        for (let i = 0; i <= 3; i++) {
            const  plane = new THREE.Mesh(planeGeometry,planeMaterial)
            switch (compteur) {
                case 0 :
                    plane.position.set(-15,0,32)
                    plane.scale.z = 4
                    plane.scale.x = 4
                break
                case 1:
                    plane.position.set(-75,2.5,15)
                    plane.rotation.y = Math.PI * 0.5
                break
                case 2 :
                    plane.position.set(45,2.5,15)
                    plane.rotation.y = Math.PI * 0.5
                break
                case 3 :
                    plane.position.set(-15,0,-2)
                    plane.scale.z = 4
                    plane.scale.x = 4
                break

            }
            compteur++
            this.env.add(plane)
        }
        const boxGeometry = new THREE.BoxGeometry( 13, 10, 7 )
        const carBox = new THREE.Mesh(boxGeometry,planeMaterial)
        carBox.position.set(-17,2.4,20)

        this.env.add(carBox)
        console.log(carBox);


        this.environment = this.env;
        this.scene.add(this.env)

        /**
         * Walls
         */
        // this.scene.add(this.walls.group)

        /**
         * Car
         */
        // this.scene.add(this.car.group)
        // this.car.group.position.set(-15,2.4,20)
        // this.car.group.scale.set(0.2, 0.2, 0.2)

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
    //    this.scene.add(this.cubes.env)


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
			if (this.rym.player.move.forward!=0) this.rym.movePlayer(dt, this.scene.children[3].children);
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
