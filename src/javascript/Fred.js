import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import fredWalking from '../models/fred/fredWalking.fbx';
import fredLookAround from '../models/fred/fredLookAround.fbx'
import fredRunning from '../models/fred/fredRunning.fbx';


export default class fred
{
    constructor()
    {
        this.group = new THREE.Group()

        this.player = { };
        this.person = fredWalking
        this.animations = [fredLookAround, fredRunning]

        const fBXLoader = new FBXLoader()
        fBXLoader.load(
            fredWalking,
            (object) =>
            {
                object.mixer = new THREE.AnimationMixer( object );
                object.name = "Fred";
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
                console.log(this.object);
                // object.children[2].scale.set(0.005,0.005,0.005)
                // this.object.scale.set(0.3,0.3,0.3)
                this.group.add(object)
                // this.loadNextAnim(fBXLoader);
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
    //             // this.action = fredWalking
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
