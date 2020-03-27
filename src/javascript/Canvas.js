import * as THREE from 'three'
import drawSource from '../images/scene/draw.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

export default class Canvas
{
    constructor()
    {
        this.group = new THREE.Group()

        this.planeCanvaseTexture = new THREE.MeshBasicMaterial({})
        this.planeCanvase = new THREE.Mesh(
            new THREE.CubeGeometry(12.2, 6.2, 0.8), this.planeCanvaseTexture
        )
        this.planeCanvase.position.set(-45.5,8.5,74.5)
         this.group.add(this.planeCanvase)
         this.buttonDraw()

         this.load = drawSource
    }
    buttonDraw()
    {
        const colorTexture = textureLoader.load(drawSource)

        const planeMaterial2  = new THREE.MeshBasicMaterial({
        map: colorTexture,
        displacementScale: 0.4,
        color : 'red'
        })
        const boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1)
        const clickbox = new THREE.Mesh(boxGeometry2,planeMaterial2)
        clickbox.position.set(-52.25,10,67.5)
        this.group.add(clickbox)
    }
    creatCanvas()
    {
        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        this.canvas.style.background = 'white'
        this.load = true
    }
    cursourMove(){
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.context.lineWidth = 100;
        let lastX = 0;
        let lastY = 0;
        let direction = true;
        let hue = 0;
        let isDrawing = false;

        const draw = e => { // The boss
            if (!isDrawing) return;
            this.context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            this.context.beginPath();
            // start from
            this.context.moveTo(lastX, lastY);
            // go to
            this.context.lineTo(e.offsetX, e.offsetY);
            this.context.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];

            hue++;
            if (hue >= 360) {
                hue = 0;
            }
            if (this.context.lineWidth >= 100 || this.context.lineWidth <= 1) {
                direction = !direction;
            }

            if(direction) this.context.lineWidth++;
            else this.context.lineWidth--
        }

        this.canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        })

        this.canvas.color = "#333333"
        this.canvas.addEventListener('mousemove', draw);
        this.canvas.addEventListener('mouseup', () => isDrawing = false);
        this.canvas.addEventListener('mouseout', () => isDrawing = false);

        const publish = () =>
        {
            this.button =  document.createElement("div")
            this.button.innerHTML = 'Publier'
            this.button.style.position = 'absolute'
            this.button.style.fontSize = '32px'
            this.button.style.color  = 'black'
            this.button.style.width = '120px'
            this.button.style.top = '90%'
            this.button.style.left = '85%'
            this.button.style.border = 'solid 2px red'
            this.button.style.padding = '0px 10px'
            this.button.style.pointer = 'cursor'
            document.body.appendChild(this.button)

            this.button.addEventListener('click', () =>
            {
                this.button.href =  this.canvas.toDataURL()
                this.button.download = "texture.png"
                document.body.removeChild(this.button)
                document.body.removeChild(this.canvas)
                uptadeTexture()
            })
        }
        publish()
        const uptadeTexture = () =>
        {
            const newTexture = textureLoader.load(this.button.href)
            this.planeCanvase.material.map = newTexture
            this.planeCanvaseTexture.needsUpdate = true
        }
    }
}