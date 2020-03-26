import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import rymWalk from '../models/rym/girlWalking.fbx';
import rymLookAround from '../models/rym/grilLookAround.fbx'
import rymRunning from '../models/rym/girlRunning.fbx';
// import Iwalls from './Iwalls.js'


export default class Rym
{
    constructor()
    {
        this.group = new THREE.Group()

        this.player = { };
        this.person = rymWalk
        this.animations = [rymLookAround, rymRunning]

        this.init()

        // document.querySelector(".camera-btn").addEventListener('click', () => console.log('dee') )

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

                this.player.object.scale.set(0.035, 0.035, 0.035)
                this.player.object.position.set(-28,2.4,68)
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
        const back = new THREE.Object3D();
        back.position.set(0, 250, -200);
        back.parent = this.player.object;
        this.player.cameras = { back };
        this.activeCamera = this.player.cameras.wide;
        this.cameraFade = 1;
        setTimeout( () => {
            this.activeCamera = this.player.cameras.back;
            this.cameraFade = 0.01;
            setTimeout(() => { this.cameraFade = 0.2; }, 1500);
        }, 2000)
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

		if (!blocked && this.player.move.forward > 0) this.player.object.translateZ(dt*10);

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

