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

                this.player.object.scale.set(0.025, 0.025, 0.025)
                this.player.object.position.set(40,2.5,2)
                this.player.object.rotation.y = Math.PI

                this.player.walk = object.animations[0];
                this.loadNextAnim(fBXLoader);

                this.group.add(this.player.object)
            }
        )
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
        console.log(anim);

		const action = this.player.mixer.clipAction( anim,  this.player.root );
        action.time = 0;
		this.player.mixer.stopAllAction();

		this.player.action = name;

		action.fadeIn(0.5);
		action.play();
    }
}
