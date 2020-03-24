import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Car
{
    constructor()
    {
        this.group = new THREE.Group()
        this.gltf = '/models/car/scene.gltf'
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            this.gltf,
            (_gltf) =>
            {
                this.object = _gltf.scene.children[0]
                this.group.add(this.object)
            }
        )
    }
}