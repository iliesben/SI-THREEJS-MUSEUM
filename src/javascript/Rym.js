import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import rymWalk from '../models/rym/girlWalking.fbx'
import rymLookAround from '../models/rym/grilLookAround.fbx'
import rymlWalkingBack from '../models/rym/girlWalkingBack.fbx'
import rymRunning from '../models/rym/girlRunning.fbx'
import rymDance from '../models/rym/dance.fbx'
import sceneImage from '../images/scene/cinema.png'

export default class Rym
{
    constructor()
    {
        this.group = new THREE.Group()
        this.player = { }
        this.person = rymWalk
        this.animations = [ rymlWalkingBack, rymLookAround, rymRunning, rymDance]

        this.init()

        const $buttons = document.querySelector(".camera-btn")
        $buttons.addEventListener('click', () => this.changeCamera())

        this.image = new Image()
        this.image.src = sceneImage

        $buttons.appendChild(this.image)
        this.image.classList.add('camera-btn')
    }
    init(){

        const fBXLoader = new FBXLoader()
        fBXLoader.load(
            rymWalk, object =>
            {
                object.mixer = new THREE.AnimationMixer( object )
                this.player.mixer = object.mixer
                this.player.root =  object.mixer.getRoot()

                object.name = "Rym"

                object.traverse( child => {
                    if ( child.isMesh ) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                } )
                this.player.object = object

                this.player.object.scale.set(0.040, 0.040, 0.040)
                this.player.object.position.set(-55,2.4,14)
                // this.player.object.position.set(-50,2.4,60)
                this.player.object.rotation.y = Math.PI

                this.player.walk = object.animations[0]
                this.addAnimations(fBXLoader)
                this.addCameras()

                this.group.add(this.player.object)
            }
        )
        this.control = new Control({
            onMove: this.playerControl,
            player: this
        })
        this.easterEgg()
    }

    /**
     * Camera
     */

    addCameras(){
        const backView = new THREE.Object3D()
        backView.position.set(0, 225, -125)
        backView.parent = this.player.object
        const frontView = new THREE.Object3D()
        frontView.position.set(0, 120, 220)
        frontView.parent = this.player.object
		const longView = new THREE.Object3D()
		longView.position.set(0, 250, -500)
		longView.parent = this.player.object
		const rightView = new THREE.Object3D()
		rightView.position.set(-200, 200, 100)
		rightView.parent = this.player.object
		const leftView = new THREE.Object3D()
		leftView.position.set(200, 200, 100)
		leftView.parent = this.player.object
		this.player.cameras = { backView , frontView, longView, rightView, leftView }
        this.activeCamera = this.player.cameras.frontView
        this.cameraFade = 1
        setTimeout( () => {
            this.activeCamera = this.player.cameras.backView
            this.cameraFade = 0.01
            setTimeout(() =>  this.cameraFade = 0.2 , 1500)
        }, 2000)
	}

    /**
     * change vue
     */

    changeCamera(fade=0.05){

		const cams = Object.keys(this.player.cameras)
		cams.splice(cams.indexOf('active'), 1)
		let index
		for(let prop in this.player.cameras){
			if (this.player.cameras[prop]==this.player.cameras.active){
				index = cams.indexOf(prop) + 1
				if (index>=cams.length) index = 0
				this.player.cameras.active = this.player.cameras[cams[index]]
				break
			}
		}
		this.cameraFade = fade
	}
    set activeCamera(object){
		this.player.cameras.active = object
    }

    playerControl(forward, turn, run){

        if (forward==0 && turn==0) delete this.player.move
		else this.player.move = { forward, turn, run }

		if (forward > 0 ){
            if (run === true)
            {
                if (this.player.action!=rymRunning) this.action = rymRunning
            }
            else {
                if (this.player.action!='walk') this.action = 'walk'
            }
        }
        else if (forward < 0)
        {
            if (this.player.action!=rymlWalkingBack) this.action = rymlWalkingBack
        }
        else{
            if (this.player.action === 'walk' || this.player.action === rymlWalkingBack || this.player.action === rymRunning ) this.action = rymLookAround
        }
    }


	movePlayer(dt, scene){
		const pos = this.player.object.position.clone()
        pos.y += 2
        var vector = new THREE.Vector3()
        let dir = this.player.object.getWorldDirection(vector)
        if (this.player.move.forward < 0) dir.negate()
		let raycaster = new THREE.Raycaster(pos, dir)
        let blocked = false

		for(let box of scene){
            const intersect = raycaster.intersectObject(box)
			if (intersect.length>0){
				if (intersect[0].distance<3){
					blocked = true
					break
				}
			}
        }

		if (!blocked){
			if (this.player.move.forward > 0){
                if (this.player.move.run === true){
                    this.player.object.translateZ(dt*20)
                }
                else this.player.object.translateZ(dt*8)
			}else if (this.player.move.forward < 0){
				this.player.object.translateZ(-dt*8)
			}
        }
    }

    easterEgg()
    {
        const pressed = []
        const secretCode = 'bruno'

        window.addEventListener('keyup', (_event) => {
        pressed.push(_event.key)
        pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
        if (pressed.join('').includes(secretCode) && this.player.action != 'walk' && this.player.action!=rymlWalkingBack) this.action = rymDance
        })
    }

    addAnimations(fBXLoader){
        let anim = this.animations.pop()

        fBXLoader.load(anim , object => {
            this.player[anim] = object.animations[0]
			if (this.animations.length>0){
                this.addAnimations(fBXLoader)
			}else{
				delete this.animations
                this.action = rymLookAround
			}
		})
    }

	set action(name){
        if (this.player.action === name) return
        const anim = this.player[name]
		const action = this.player.mixer.clipAction( anim,  this.player.root )

		this.player.mixer.stopAllAction()
        this.player.action = name
        action.time = 0
        if ( this.player.action === rymRunning ) action.fadeIn(0.1)
        else action.fadeIn(0.5)
        if ( this.player.action === rymDance )
        {
            action.loop = THREE.LoopOnce
            this.player.mixer.addEventListener('finished', () => this.action = rymLookAround)
        }
        action.play()
    }
}

class Control{
	constructor(options){

		this.onMove = options.onMove
        this.player = options.player
        this.directionZ = 0
        this.directionX = 0
        this.run = false
        this.keysPressed = {}

        document.addEventListener('keydown', _event => this.move(_event))
        document.addEventListener('keyup', _event => this.stop(_event))
	}

	move(_event){
        this.keysPressed[_event.key] = true

        if (_event.code === 'KeyW' ) this.directionZ = 1
        if (_event.code === 'KeyS') this.directionZ = -1
        if (_event.code === 'KeyA') this.directionX = 1
        if (_event.code === 'KeyD') this.directionX = -1
        if (this.keysPressed['Shift']) this.run = true

		const forward = this.directionZ
        const turn = this.directionX
        const run = this.run

		if (this.onMove!=undefined) this.onMove.call(this.player, forward, turn, run)
	}

	stop(_event){
        if (_event.code === 'KeyW' || _event.code === 'KeyS') this.directionZ = 0
        if (_event.code === 'KeyA' || _event.code === 'KeyD') this.directionX = 0
        if (_event.key === 'Shift')
        {
            this.run = false
            delete this.keysPressed[_event.key]
        }
        const forward = this.directionZ
		const turn = this.directionX
        const run = this.run

		this.onMove.call(this.player, forward, turn, run)
	}
}

