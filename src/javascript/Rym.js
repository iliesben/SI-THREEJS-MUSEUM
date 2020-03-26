import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import rymWalk from '../models/rym/girlWalking.fbx';
import rymLookAround from '../models/rym/grilLookAround.fbx'
import rymRunning from '../models/rym/girlRunning.fbx';
import sceneImage from '../images/scene/cinema.png'
import Song from './Song.js'

export default class Rym
{
    constructor()
    {
        this.group = new THREE.Group()
        this.song = new Song()
        this.player = { };
        this.person = rymWalk
        this.animations = [rymLookAround, rymRunning]

        this.init()

        const $buttons = document.querySelector(".camera-btn")
        $buttons.addEventListener('click', () =>
        {
            console.log('dee')
            this.switchCamera()
        })

        this.image = new Image()
        this.image.src = sceneImage

        $buttons.appendChild(this.image)
        this.image.classList.add('camera-btn')

    }
    init(){

        const fBXLoader = new FBXLoader()
        fBXLoader.load(
            rymWalk, (object) =>
            {
                object.mixer = new THREE.AnimationMixer( object );
                this.player.mixer = object.mixer;
                this.player.root =  object.mixer.getRoot();

                object.name = "Rym";

                object.traverse( child => {
                    if ( child.isMesh ) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                } )
                this.player.object = object

                this.player.object.scale.set(0.040, 0.040, 0.040)
                this.player.object.position.set(-8,2.4,8)
                this.player.object.rotation.y = Math.PI

                this.player.walk = object.animations[0];
                this.loadNextAnim(fBXLoader);
                this.createCameras()

                this.group.add(this.player.object)
            }
        )
        this.control = new Control({
            onMove: this.playerControl,
            player: this
        })
    }

    /**
     * Camera
     */

    createCameras(){
        const backView = new THREE.Object3D();
        backView.position.set(0, 250, -200);
        backView.parent = this.player.object;
        const frontView = new THREE.Object3D();
        frontView.position.set(0, 120, 220);
        frontView.parent = this.player.object;
		const longView = new THREE.Object3D();
		longView.position.set(0, 250, -500);
		longView.parent = this.player.object;
		const rightView = new THREE.Object3D();
		rightView.position.set(-200, 200, 100);
		rightView.parent = this.player.object;
		const leftView = new THREE.Object3D();
		leftView.position.set(200, 200, 100);
		leftView.parent = this.player.object;
		this.player.cameras = { backView , frontView, longView, rightView, leftView };
        this.activeCamera = this.player.cameras.frontView;
        this.cameraFade = 1;
        setTimeout( () => {
            this.activeCamera = this.player.cameras.backView;
            this.cameraFade = 0.01;
            setTimeout(() => { this.cameraFade = 0.2; }, 1500);
        }, 2000)
	}

    /**
     * change vue
     */

    switchCamera(fade=0.05){
        console.log('fz');

		const cams = Object.keys(this.player.cameras);
		cams.splice(cams.indexOf('active'), 1);
		let index;
		for(let prop in this.player.cameras){
			if (this.player.cameras[prop]==this.player.cameras.active){
				index = cams.indexOf(prop) + 1;
				if (index>=cams.length) index = 0;
				this.player.cameras.active = this.player.cameras[cams[index]];
				break;
			}
		}
		this.cameraFade = fade;
	}
    set activeCamera(object){
		this.player.cameras.active = object;
    }

    playerControl(forward, turn){

		if (forward>0){
            if (this.player.action!='walk') this.action = 'walk'
		}else{
            if (this.player.action === 'walk') this.action = rymLookAround
		}
		if (forward==0 && turn==0){
			delete this.player.move;
		}else{
			this.player.move = { forward, turn };
		}
    }


	movePlayer(dt, scene){
		const pos = this.player.object.position.clone();
        pos.y += 2;
        var vector = new THREE.Vector3(); // create once and reuse it!
		let dir = this.player.object.getWorldDirection(vector);
		let raycaster = new THREE.Raycaster(pos, dir);
        let blocked = false;


		for(let box of scene){
            const intersect = raycaster.intersectObject(box);

			if (intersect.length>0){
				if (intersect[0].distance<5){
					blocked = true;
					break;
				}
			}
        }

		if (!blocked && this.player.move.forward > 0) {
            this.song.play()
            this.player.object.translateZ(dt*10);
        }

		//cast left
		dir.set(-1,0,0);
		dir.applyMatrix4(this.player.object.matrix);
		dir.normalize();
		raycaster = new THREE.Raycaster(pos, dir);

		for(let box of scene){

            const intersect = raycaster.intersectObject(box);
			if (intersect.length>0){
				if (intersect[0].distance<5){
					this.player.object.translateX(-(intersect[0].distance-5));
					break;
				}
			}
		}
		//cast right
		dir.set(1,0,0);
		dir.applyMatrix4(this.player.object.matrix);
		dir.normalize();
		raycaster = new THREE.Raycaster(pos, dir);

		for(let box of scene){

            const intersect = raycaster.intersectObject(box);
			if (intersect.length>0){
                if (intersect[0].distance<5){
					this.player.object.translateX(intersect[0].distance-5);
					break;
				}
			}
		}
    }

    loadNextAnim(fBXLoader){
        let anim = this.animations.pop()

        fBXLoader.load(anim , ( object ) => {
            this.player[anim] = object.animations[0];
			if (this.animations.length>0){
                this.loadNextAnim(fBXLoader)
			}else{
				delete this.animations;
                this.action = rymLookAround
			}
		})
    }

	set action(name){
        const anim = this.player[name];

		const action = this.player.mixer.clipAction( anim,  this.player.root );
        action.time = 0;
		this.player.mixer.stopAllAction();

		this.player.action = name;

		action.fadeIn(0.5);
		action.play();
    }

}



class Control{
	constructor(options){

		this.onMove = options.onMove;
        this.player = options.player;
        this.directionZ = 0
        this.directionX = 0

        document.addEventListener('keydown', (_event) => { this.move(_event); });
        document.addEventListener('keyup', (_event) => { this.stop(_event); });
	}

	move(_event){

        if (_event.code === 'KeyW') this.directionZ = 1
        if (_event.code === 'KeyS') this.directionZ = -1
        if (_event.code === 'KeyA') this.directionX = 1
        if (_event.code === 'KeyD') this.directionX = -1

		const forward = this.directionZ
        const turn = this.directionX

		if (this.onMove!=undefined) this.onMove.call(this.player, forward, turn);
	}

	stop(_event){
        // console.log(_event);
        if (_event.code === 'KeyW' || _event.code === 'KeyS') this.directionZ = 0
        if (_event.code === 'KeyA' || _event.code === 'KeyD') this.directionX = 0

        const forward = this.directionZ
		const turn = this.directionX

		this.onMove.call(this.player, forward, turn);

	}
}

