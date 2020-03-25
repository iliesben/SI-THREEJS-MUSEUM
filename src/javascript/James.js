import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

export default class James
{
    constructor()
    {
        this.group = new THREE.Group()
        this.fbx = '/models/james/jamesGraffiti.fbx'
        const fBXLoader = new FBXLoader()

        fBXLoader.load(
            this.fbx,
            (object) =>
            {
                object.mixer = new THREE.AnimationMixer( object );
                this.mixer = object.mixer;
                this.root =  object.mixer.getRoot();
                this.object = object
                this.graffiti = object.animations[3];
                this.object.scale.set(0.075, 0.075, 0.075)
                this.object.position.set(40,2.5,2)
                this.object.rotation.y = Math.PI
                this.group.add(this.object)
            }
        )
    }
}