import * as THREE from 'three'


export default class WallsCollions
{
    constructor()
    {
        this.environment = new THREE.Group()
        this.environment.name = "environment";

        const planeGeometry  = new THREE.BoxGeometry( 30, 30 )
        const planeMaterial  = new THREE.MeshBasicMaterial({
            // color: 0x248f24,
            // side : THREE.DoubleSide
            visible: false
        })
        let compteur = 0
        for (let i = 0; i <= 3; i++) {
            const  plane = new THREE.Mesh(planeGeometry,planeMaterial)
            switch (compteur) {
                case 0 :
                    // wals en face
                    plane.position.set(0,0,32)
                    plane.scale.z = 4
                    plane.scale.x = 4
                break
                case 1:
                    plane.position.set(-75,2.5,15)
                    plane.rotation.y = Math.PI * 0.5
                break
                case 2 :
                    plane.position.set(45,2.5,15)
                    plane.rotation.y = Math.PI * 0.5
                break
                case 3 :
                    plane.position.set(-15,0,-2)
                    plane.scale.z = 4
                    plane.scale.x = 4
                break
            }
            compteur++
            this.environment.add(plane)
        }

        const boxGeometry = new THREE.BoxGeometry( 13, 10, 7 )
        const carBox = new THREE.Mesh(boxGeometry,planeMaterial)
        carBox.position.set(-17,2.4,20)
        this.environment.add(carBox)

        const musemGeometry = new THREE.BoxGeometry( 15, 20, 1 )
        compteur = 0
        for (let i = 0; i <= 16; i++) {
            const museumColid = new THREE.Mesh(musemGeometry,planeMaterial)
            switch (compteur) {
                case 0 :
                    museumColid.position.set(-54,10,40)
                    museumColid.rotation.y = Math.PI * 0.5
                break
                case 1:
                    museumColid.position.set(-74,10,38)
                    museumColid.rotation.y = Math.PI * 0.5
                    museumColid.scale.x = 1.2
                break
                case 2:
                    museumColid.position.set(-35,10, 47)
                    museumColid.scale.x = 2.5
                break
                case 3:
                    museumColid.position.set(-94,10, 47)
                    museumColid.scale.x = 2.5
                break
                case 4:
                    museumColid.position.set(-15,10, 66)
                    museumColid.scale.x = 4
                    museumColid.rotation.y = Math.PI * 0.5
                break
                case 5:
                    museumColid.position.set(-114,10, 66)
                    museumColid.scale.x = 4
                    museumColid.rotation.y = Math.PI * 0.5
                break
                case 6:
                    museumColid.position.set(-64,10, 86)
                    museumColid.scale.x = 7
                break

                case 7:
                    museumColid.position.set(-92,10, 66)
                    museumColid.rotation.y = Math.PI * 0.5
                    museumColid.scale.x = 1.2

                break
                case 8:
                    museumColid.position.set(-75,10, 66)
                    museumColid.rotation.y = Math.PI * 0.5
                    museumColid.scale.x = 1.2

                break
                case 9:
                    museumColid.position.set(-84,10, 58)
                    museumColid.scale.x = 1.2
                break

                case 10:
                    museumColid.position.set(-36,10, 66)
                    museumColid.rotation.y = Math.PI * 0.5
                    museumColid.scale.x = 1.2
                break
                case 11:
                    museumColid.position.set(-53,10, 66)
                    museumColid.rotation.y = Math.PI * 0.5
                    museumColid.scale.x = 1.2
                break
                case 12:
                    museumColid.position.set(-45,10, 75)
                    museumColid.scale.x = 1.2
                break


                case 13:
                    museumColid.position.set(-39,10, 58)
                    museumColid.scale.x = 0.5
                break
                case 14:
                    museumColid.position.set(-50.5,10, 58)
                    museumColid.scale.x = 0.5
                break
                case 15:
                    museumColid.position.set(-78,10, 75)
                    museumColid.scale.x = 0.5
                break
                case 16:
                    museumColid.position.set(-89.5,10, 75)
                    museumColid.scale.x = 0.5
                break
            }
            compteur++
            this.environment.add(museumColid)
            console.log(museumColid);
        }

        const musemBench = new THREE.BoxGeometry( 5, 2, 2 )
        compteur = 0
        for (let i = 0; i <= 4; i++) {
            const museumBench = new THREE.Mesh(musemBench,planeMaterial)
            switch (compteur) {
                case 0 :
                    museumBench.position.set(-64.25,4,66)
                    museumBench.rotation.y = Math.PI * 0.5
                    break
                case 1:
                    museumBench.position.set(-25,4, 66)
                    museumBench.rotation.y = Math.PI * 0.5
                break
                case 2:
                    museumBench.position.set(-103.5,4, 66)
                    museumBench.rotation.y = Math.PI * 0.5
                break
                case 3:
                    museumBench.position.set(-45,4,66.25)
                break
                case 4:
                    museumBench.position.set(-83.5,4, 66)
                break
            }
            compteur++
            this.environment.add(museumBench)
        }

    }
}
