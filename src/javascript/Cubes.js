import * as THREE from 'three'

class Cubes
{
    constructor()
    {
        this.env = new THREE.Group()
        this.env.name = "Environment";

        const cubeGeometry = new THREE.BoxGeometry(20, 20, 5)
        const cubeMaterial = new THREE.MeshNormalMaterial()
        let z = 15
        for (let i = 0; i < 3; i++) {
            this.cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
            this.cubeMesh.position.set(z,5,15)
            z -=15
            this.env.add(this.cubeMesh)
        }

        this.environment = this.env;
    }
}

export default Cubes