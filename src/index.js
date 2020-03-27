import './style/main.styl'
import * as THREE from 'three'
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
import ClickMeBox from './javascript/ClickMeBox.js'
import Cowboy from './javascript/Cowboy.js'
import Clickcow from './javascript/Clickcow.js'
import Monkey from './javascript/Monkey.js'
import Clickmonkey from './javascript/Clickmonkey.js'
import Video from './javascript/Video.js'
import Song from './javascript/Song.js'
import Canvas from './javascript/Canvas.js'

class Museum {
    constructor(){

		this.scene
        this.camera
        this.renderer

        this.click = new THREE.Group()
        this.clickcow = new Clickcow()
        this.clickmonkey = new Clickmonkey()
        this.clock = new THREE.Clock()

        this.light = new Light()
        this.rym = new Rym()
        this.expo = new Expo()
        this.car = new Car()
        this.street = new Street()
        this.walls = new walls()
        this.gallery = new Gallery()
        this.street = new Street()
        this.sky = new Sky()


        this.sizes = {}
        this.cursor = {}
        this.wallsCollions = new WallsCollions()
        this.click = new THREE.Group()
        this.raycaster = new THREE.Raycaster()
        this.clickMeBox = new ClickMeBox()
        this.explication = new Explication()
        this.songMuseum = new Song()
        this.songStreet = new Song()

        this.canvas = new Canvas()
        this.video = new Video()
        this.hoverbox = false
        this.hoverboxcow = false
        this.hoverboxmonkey = false
        this.hoverbox2 = false
        this.hoverBoxCanvas = false
        this.explication = new Explication()
        this.monkey = new Monkey()
        this.cowboy = new Cowboy()

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
       this.models = [  this.expo.load, this.rym.person , this.car.load, this.video.load ,this.clickMeBox.load , this.canvas.load, this.explication.load]
       this.gallery.loads.forEach( model => this.options.assets.push(model))
       this.rym.animations.forEach( model => this.options.assets.push(model))
       this.street.loads.forEach( model => this.options.assets.push(model))
       this.walls.loads.forEach( model => this.options.assets.push(model))
       this.songMuseum.loads.forEach( model => this.options.assets.push(model))
       this.models.forEach( model => this.options.assets.push(model))
    }

    init(){

        const firstPage = document.querySelector('.firstPage')
        console.log(firstPage);

        const buttonExperience = firstPage.querySelector('.buttonExperience-js')
        buttonExperience.addEventListener('click', () =>
        {
            document.body.removeChild(firstPage)
        })
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

        window.addEventListener('mousemove', _event =>
        {
            this.cursor.x = _event.clientX / this.sizes.width - 0.5
            this.cursor.y = _event.clientY / this.sizes.height - 0.5
        })
        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera( 75, this.sizes.width / this.sizes.height, 0.1, 1000 );

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
        this.scene.add(this.clickmonkey.group)
        this.scene.add(this.clickcow.group)
        // this.scene.add(this.clickbox2.group)

        /**
         * SongInit
         */
        const _sence = this.scene
        const _camera = this.camera
        this.songMuseum.speakerAudio(_sence, _camera, 'museum')
        this.songMuseum.play()

        /**
         * Renderer
         */
		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} )
		this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.setClearAlpha(0)
		this.renderer.shadowMap.enabled = true
        this.container.appendChild( this.renderer.domElement )

        window.addEventListener( 'resize', () => this.onWindowResize() , false );

        /**
         * Click on the box
         */

        document.addEventListener('click', () =>
        {
            if(this.hoverbox) this.scene.add(this.explication.group)
            if(this.hoverboxcow) this.scene.add(this.cowboy.group)
            if(this.hoverboxmonkey) this.scene.add(this.monkey.group)
            if(this.hoverbox2) this.video.soundPlay()

            if (this.hoverBoxCanvas)
            {
                this.canvas.creatCanvas()
                if(this.canvas.load === true) this.canvas.cursourMove()
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
        const dt = this.clock.getDelta()
        window.requestAnimationFrame( () => this.loop() )

        if (this.rym.player.mixer!=undefined) this.rym.player.mixer.update(dt)

		if (this.rym.player.move!=undefined){
			if (this.rym.player.move.forward!=0) this.rym.movePlayer(dt, this.scene.children[1].children)
			this.rym.player.object.rotateY(this.rym.player.move.turn*dt)
		}


		if (this.rym.player.cameras!=undefined && this.rym.player.cameras.active!=undefined){
			this.camera.position.lerp(this.rym.player.cameras.active.getWorldPosition(new THREE.Vector3()), 0.05)
			const pos = this.rym.player.object.position.clone()
			pos.y += 6
			this.camera.lookAt(pos)
        }

        const raycasterCursor = new THREE.Vector2(this.cursor.x * 2, - this.cursor.y * 2)
        this.raycaster.setFromCamera(raycasterCursor, this.camera)

        const intersects = this.raycaster.intersectObject(this.clickMeBox.group, true)
        intersects.length ? this.hoverbox = true : this.hoverbox = false

        const intersectscow = this.raycaster.intersectObject(this.clickcow.group, true)
        intersectscow.length ?  this.hoverboxcow = true :  this.hoverboxcow = false

        const intersectsmonkey = this.raycaster.intersectObject(this.clickmonkey.group, true)
        intersectsmonkey.length ?  this.hoverboxmonkey = true :  this.hoverboxmonkey = false

        const intersects2 = this.raycaster.intersectObject(this.video.group, true)
        intersects2.length ?  this.hoverbox2 = true :  this.hoverbox2 = false

        const intersectsCanvas = this.raycaster.intersectObject(this.canvas.group, true)
        intersectsCanvas.length ? this.hoverBoxCanvas = true : this.hoverBoxCanvas = false

        // Render
        this.renderer.render( this.scene, this.camera );
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum();
});
