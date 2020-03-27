import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import WallsCollions from './javascript/WallsCollions.js'
import Street from './javascript/Street.js'
import Preloader from './javascript/Preloader.js'
import Car from './javascript/Car.js'
import Expo from './javascript/Expo.js'
import Rym from './javascript/Rym.js'
import walls from './javascript/Walls.js'
import Gallery from './javascript/Gallery.js'
import Sky from './javascript/Sky.js'
import Light from './javascript/Light.js'
import Explication from './javascript/Explication.js'
import Video from './javascript/Video.js'
import { TweenLite, TimelineLite } from 'gsap/all'
import ClickMeBox from './javascript/ClickMeBox.js'
import Song from './javascript/Song.js'
import Canvas from './javascript/Canvas.js'

class Museum {
    constructor(){
        this.textureLoader = new THREE.TextureLoader()
        this.gallery = new Gallery()
        this.camera
		this.scene
        this.renderer
        this.click = new THREE.Group()
        this.clock = new THREE.Clock()
        this.street = new Street()
        this.wallsCollions = new WallsCollions()
        this.car = new Car()
        this.street = new Street()
        this.rym = new Rym()
        this.expo = new Expo()
        this.walls = new walls()
        this.cursor = {}
        this.sky = new Sky()
        this.light = new Light()
        this.cameraFade = 0.05;
        this.sizes = {}
        this.raycaster = new THREE.Raycaster()
        this.clickMeBox = new ClickMeBox()
        this.songMuseum = new Song()
        this.songStreet = new Song()

        this.canvas = new Canvas()
        this.video = new Video()
        this.hoverbox = false
        this.hoverbox2 = false
        this.hoverBoxCanvas = false
        this.explication = new Explication()


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
       this.models = [ this.clickMeBox.load , this.canvas.load, this.car.load, this.explication.load, this.expo.load, this.rym.person]
       this.gallery.loads.forEach( model => this.options.assets.push(model))
       this.street.loads.forEach( model => this.options.assets.push(model))
       this.walls.loads.forEach( model => this.options.assets.push(model))
       this.models.forEach( model => this.options.assets.push(model))

    }

    init(){

        /**
         * Sizes
         */
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        /**
         * Cursor
         */
        this.cursor.x = 0
        this.cursor.y = 0

        window.addEventListener('mousemove', (_event) =>
        {
            this.cursor.x = _event.clientX / this.sizes.width - 0.5
            this.cursor.y = _event.clientY / this.sizes.height - 0.5
        })
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
         * walls
         */
        this.scene.add(this.walls.group)

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
         * Video
         */
        this.scene.add(this.video.group)

        /**
         * Canvas
         */

        this.scene.add(this.canvas.group)
        /**
         * click box
         */

        this.scene.add(this.clickMeBox.group)
        // this.scene.add(this.clickbox2.group)

        /**
         * SongInit
         */
        const _sence = this.scene
        const _camera = this.camera
        // this.songMuseum.speakerAudio(_sence, _camera, 'museum')
        // this.songStreet.speakerAudio(_sence, _camera, 'street')

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

        /**
         * Click on duck
         */
        document.addEventListener('click', () =>
        {
            if(this.hoverbox)
            {
                this.scene.add(this.explication.group)
            }
            if(this.hoverbox2)
            {
                this.video.soundPlay()
            }
            if (this.hoverBoxCanvas)
            {
                this.canvas.creatCanvas()
                if(this.canvas.load === true)
                {
                    this.canvas.cursourMove()
                }
            }
        })
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
        const raycasterCursor = new THREE.Vector2(this.cursor.x * 2, - this.cursor.y * 2)
        this.raycaster.setFromCamera(raycasterCursor, this.camera)
        const intersects = this.raycaster.intersectObject(this.clickMeBox.group, true)
        if(intersects.length)
        {
            this.hoverbox = true
        }
        else
        {
            this.hoverbox = false
        }
        const intersects2 = this.raycaster.intersectObject(this.video.group, true)
        if(intersects2.length)
        {
            this.hoverbox2 = true
        }
        else
        {
            this.hoverbox2 = false
        }
        const intersectsCanvas = this.raycaster.intersectObject(this.canvas.group, true)
        if(intersectsCanvas.length)
        {
            this.hoverBoxCanvas = true
        }
        else
        {
            this.hoverBoxCanvas = false
        }



        // Render
        this.renderer.render( this.scene, this.camera );
    }

}


document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum();
});
