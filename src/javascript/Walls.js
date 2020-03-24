import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Walls
{
    constructor()
    {
        this.group = new THREE.Group()
        this.gltf = '/models/walls2/scene.gltf'
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            this.gltf,
            (_gltf) =>
            {
                this.object = _gltf.scene.children[0]
                this.object.scale.set(1.5,1.5,1.5)
                this.group.add(this.object)
            }
        )
        this.gltf2 = '/models/walls3/scene.gltf'
        gltfLoader.load(
            this.gltf2,
            (_gltf2) =>
            {
                this.object2 = _gltf2.scene.children[0]
                // this.object2.position.set(0, 30, 30)
                this.group.add(this.object2)
            }
        )
    }
}
