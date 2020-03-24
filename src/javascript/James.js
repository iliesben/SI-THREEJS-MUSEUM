import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

export default class James
{
    constructor()
    {
        this.group = new THREE.Group()
        const fBXLoader = new FBXLoader()

        fBXLoader.load(
            '/models/james2/jamesGrafit2.fbx',
            (object) =>
            {
                object.mixer = new THREE.AnimationMixer( object );
                this.mixer = object.mixer;
                this.root =  object.mixer.getRoot();
                this.object = object
                this.graffiti = object.animations[3];
                this.object.scale.set(0.1, 0.1, 0.1)
                this.group.add(this.object)
            }
        )
    }
}



// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// export default class James
// {
//     constructor()
//     {
//         this.group = new THREE.Group()
//         const gltfLoader = new GLTFLoader()

//         gltfLoader.load(
//             '/models/james/jamesAnimation.gltf',
//             (object) =>
//             {
//                 object.mixer = new THREE.AnimationMixer( object );
//                 this.mixer = object.mixer;
//                 this.root =  object.mixer.getRoot();
//                 this.object = object.scene
//                 this.graffiti = object.animations[0];
//                 this.group.add(this.object)
//                 // console.log(object.scene);

//             }
//         )
//     }
// }