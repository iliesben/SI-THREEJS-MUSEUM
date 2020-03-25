import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import jamesGraffiti from '../models/james/jamesGraffiti.fbx';
import jamesRunning from '../models/james/running.fbx';

export default class James
{
    constructor()
    {
        this.clock = new THREE.Clock();
        this.group = new THREE.Group()

        // this.player = { };
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
                this.actions = []
                this.mixer = object.mixer;
                this.root =  object.mixer.getRoot();
                object.traverse( child => {
                    if ( child.isMesh ) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                } )
                this.object = object
                this.object.scale.set(0.075, 0.075, 0.075)
                this.object.position.set(40,2.5,2)
                this.object.rotation.y = Math.PI
                this.graffiti = object.animations[3];
                this.group.add(this.object)
                this.loadNextAnim(fBXLoader);
            }
        )
    }
    // loadNextAnim(fBXLoader){
    //     let anim = this.animations.pop()

    //     fBXLoader.load(anim , ( object ) => {
    //         this.anim = object.animations[3];
	// 		if (this.animations.length>0){
    //             this.loadNextAnim(fBXLoader)
	// 		}else{
	// 			delete this.animations;
    //             // this.action = jamesGraffiti
	// 		}
	// 	})
    // }
	// action(){
    //     const action = this.mixer.clipAction( this.graffiti,  this.root );
    //     action.time = 0;
    //     action.loop = THREE.LoopOnce;
    //     action.fadeIn(5);
    //     action.play();
    //     // james.mixer.stopAllAction();
    // }
    // run(){
    //     // const action = this.mixer.clipAction(   this.root );
    //     action.time = 0;
    //     action.loop = THREE.LoopOnce;
    //     action.fadeIn(5);
    //     action.play();
    //     // james.mixer.stopAllAction();
    // }
}

// loadNextAnim(fBXLoader){
//     let anim = this.animations.pop()

//     fBXLoader.load(anim , ( object ) => {
//         const action = this.mixer.clipAction( this.object.animations[0],  this.root );
//         this.actions.push(action);

//         object.traverse(  ( child ) => {

//             if ( child.isMesh ) {

//                 child.castShadow = true;
//                 child.receiveShadow = false;
//             }
//         } );
//         if (this.animations.length>0){
//             this.loadNextAnim(fBXLoader)

//         }else{
//             this.animate();
//         }
//     })
// }
// playAnimation(index){
//     this.mixer.stopAllAction();
//     const action = this.actions[index];
//     console.log(action);

//     action.fadeIn(0.5);
//     action.play();
// }
// animate() {

//     requestAnimationFrame( () => { this.animate(); } );

//     const delta = this.clock.getDelta();

//     if ( this.mixer ) this.mixer.update( delta );
// }
