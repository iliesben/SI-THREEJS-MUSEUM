import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import jamesGraffiti from '../models/james/jamesGraffiti.fbx';
import jamesRunning from '../models/james/running.fbx';

export default class James
{
    constructor()
    {
        this.group = new THREE.Group()


        this.person = jamesGraffiti
        this.animations = [jamesRunning]

        // this.load.push(this.modelsPath + this.person + `.fbx`)
        // this.animations.forEach( (anim) => { this.load.push(`${this.modelsPath + anim}.fbx`)});

        const fBXLoader = new FBXLoader()

        fBXLoader.load(
            jamesGraffiti,
            (object) =>
            {
                object.mixer = new THREE.AnimationMixer( object );
                object.name = "James";
                this.mixer = object.mixer;
                this.root =  object.mixer.getRoot();
                object.traverse( child => {
                    if ( child.isMesh ) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                } )
                this.object = object
                this.graffiti = object.animations[3];
                this.object.scale.set(0.075, 0.075, 0.075)
                this.object.position.set(40,2.5,2)
                this.object.rotation.y = Math.PI
                this.group.add(this.object)
                this.loadNextAnim(fBXLoader);
            }
        )
    }
    loadNextAnim(fBXLoader){
        let anim = this.animations.pop()

        fBXLoader.load(anim , ( object ) => {
            this[anim] = object.animations[0];
			if (this.animations.length>0){
                loadNextAnim(fBXLoader)
			}else{
				delete this.animations;
                this.action = jamesGraffiti
			}
		})
    }
	set action(name){

        const anim = this[name];
        console.log(anim);

        // const action = this.james.mixer.clipAction( anim,  this.root );
        // action.time = 1.7;
        // this.mixer.stopAllAction();
        // this.action = name;

        // action.fadeIn(0.5);
        // action.play()

        console.log('fzfz');
    }
}