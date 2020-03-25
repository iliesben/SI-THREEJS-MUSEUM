// import Rym from './Rym.js'


// export default class Control{
// 	constructor(options){

//         this.rym = new Rym()
// 		this.onMove = options.onMove;
//         this.game = options.game;
//         this.directionZ = 0
//         this.directionX = 0

//         document.addEventListener('keydown', (_event) => { this.move(_event); });
//         document.addEventListener('keyup', (_event) => { this.stop(_event); });
// 	}

// 	move(_event){

//         if (_event.code === 'KeyW') this.directionZ = 1
//         if (_event.code === 'KeyS') this.directionZ = -1
//         if (_event.code === 'KeyA') this.directionX = 1
//         if (_event.code === 'KeyD') this.directionX = -1

// 		const forward = this.directionZ
//         const turn = this.directionX

// 		if (this.onMove!=undefined) this.onMove.call(this.game, forward, turn);
// 	}

// 	stop(_event){
//         // console.log(_event);
//         if (_event.code === 'KeyW' || _event.code === 'KeyS') this.directionZ = 0
//         if (_event.code === 'KeyA' || _event.code === 'KeyD') this.directionX = 0

//         const forward = this.directionZ
// 		const turn = this.directionX

// 		this.onMove.call(this.game, forward, turn);

// 	}
// }
