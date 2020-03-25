import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import rymWalk from '../models/rym/girlWalking.fbx';
import rymLookAround from '../models/rym/grilLookAround.fbx'
import rymRunning from '../models/rym/girlRunning.fbx';


export default class Rym
{
    constructor()
    {
        this.group = new THREE.Group()

        this.player = { };
        this.person = rymWalk
        this.animations = [rymLookAround, rymRunning]

        this.init()

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

                this.player.object.scale.set(0.050, 0.050, 0.050)
                this.player.object.position.set(40,2.5,2)
                this.player.object.rotation.y = Math.PI

                this.player.walk = object.animations[0];
                this.loadNextAnim(fBXLoader);

                this.group.add(this.player.object)
            }
        )
        this.control = new Control({
            onMove: this.playerControl,
            player: this
        })
    }

    playerControl(forward, turn){

		if (forward>0){
            if (this.player.action!='walk') this.action = 'walk'
		}else{
            if (this.player.action === 'walk') this.action = rymLookAround
            console.log(this.player.action);
		}
		if (forward==0 && turn==0){
			delete this.player.move;
		}else{
			this.player.move = { forward, turn };
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
        console.log(this.player.action);
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

