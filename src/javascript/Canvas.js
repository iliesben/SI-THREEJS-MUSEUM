import * as THREE from 'three'

export default class Canvas
{
    constructor()
    {
        this.group = new THREE.Group()

        // Formé géométrique où est la vidéo
        const planeCanvase = new THREE.Mesh(
            new THREE.CubeGeometry(12.2, 6.2, 0.2), // Cube
            new THREE.MeshBasicMaterial({      // Conserver ce matérial
            color: 0xFFFFFF
            })
        )
         planeCanvase.position.set(-45.5,8.5,75)
         this.group.add(planeCanvase)
    }
}