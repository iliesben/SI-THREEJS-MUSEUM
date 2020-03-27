import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import expoSource from '../models/expo/expo.glb';

export default class Expo
{
    constructor()
    {
        this.group = new THREE.Group()
        this.load = expoSource

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(  this.load,
            _gltf =>
            {
                this.object = _gltf.scene.children[2]
                this.object.scale.set(0.1,0.1,0.1)
                this.group.add(this.object)
            }
        )

    }
}