import "p5/lib/addons/p5.sound.min"
import p5 from "p5"

let blinker = "stopped"
let recordingTimer


const Sketch = (p, xxx) => {
	let mic
	let soundRec
	let soundFile

	let width
	let height

	let startStopRecButton
	let playBackButton
	let stopPlayBackButton
	let textInput
	let saveButton
	let soundBar


	p.setup = () => {
		width = p.windowWidth / 5

		p.createCanvas(width, width)

		p.frameRate(2)

		mic = new p5.AudioIn()
		mic.start()

		soundRec = new p5.SoundRecorder()
		soundRec.setInput(mic)

		soundFile = new p5.SoundFile()

		startStopRecButton = new StartStopRecButton()
		playBackButton = new PlayBackButton()
		stopPlayBackButton = new StopPlayBackButton()
		textInput = new TextInput()
		saveButton = new SaveButton()
		soundBar = new SoundBar()

	}

	p.draw = () => {
		p.strokeWeight(4);
		p.stroke(0, 0, 0);
		p.square(0, 0, width)
		p.noStroke()

		let micLevel = mic.getLevel();

		startStopRecButton.display(p, blinker)
		playBackButton.display(p)
		stopPlayBackButton.display(p)
		soundBar.display(p, micLevel)

		if (blinker === "true") {
			blinker = "false"
		} else if (blinker === "false") {
			blinker = "true"
		}
	}

	p.windowResized = () => {
		p.resizeCanvas(width, width)
	}
	
	p.mouseClicked = () => {
		let recordButtonDistance = p.dist(p.mouseX, p.mouseY, 55, 55)
		let stopDist = p.dist(p.mouseX, p.mouseY, 55, 160)

		if (recordButtonDistance < 50) {
			if (blinker === "true" || blinker === "false") {
				stopRecord(soundFile, soundRec)
			} else {
				startRecord(soundFile, soundRec)
			}
		}

		if (stopDist < 50) {
		}

		// if (saveDist < 50) {
		// 	saveRecord(soundFile, soundRec)
		// }
	}
}

const startRecord = (soundFile, soundRec) => {
	soundRec.record(soundFile)

	blinker = "true"
	recordingTimer = setTimeout(() => stopRecord(soundFile, soundRec), 3000)

	console.log("recording....")
}

const stopRecord = (soundFile, soundRec) => {
	blinker = "stopped"
	clearTimeout(recordingTimer)

	soundRec.stop()

	console.log('recording stopped')

	// console.log(soundFile.isLoaded())
	// soundFile.play()
}

// const cancelRecord = (soundFile, soundRec, recordingTimer) => {
// 	clearTimeout(recordingTimer)

// 	soundRec.stop()

// 	console.log('recording stopped')
// }

const saveRecord = (soundFile, soundRec) => {
	let soundBlob = soundFile.getBlob()
	let formData = new FormData()

	formData.append('soundBlob', soundBlob)

	let fetchOptions = {
		method: 'POST',
		body: formData,
		headers: new Headers({
			'enctype': 'multipart/form-data'
		})
	}

	fetch("http://localhost:3001/api/v1/sounds/new", fetchOptions)
		.then(res => {
			console.log(res.status)
		})
}

class StartStopRecButton {
	display(pp, blinker) {
		if (blinker === "stopped" ) {
			pp.fill('green');
			pp.circle(55, 55, 100)
		} else if (blinker === "true") {
			pp.fill('white');
			pp.circle(55, 55, 100)
		} else {
			pp.fill('green');
			pp.circle(55, 55, 100)
		}
	}
}

class PlayBackButton {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.triangle(100, 50, 150, 100, 100, 150)
	}
}

class StopPlayBackButton {
	display(pp) {
		pp.fill('red');
		pp.circle(55, 160, 100, )
	}
}

class TextInput {
	display(pp, micLevel) {
		// pp.fill(0, 102, 153);
		// pp.square(0, pp.height - 100, 100)

		// pp.fill(255, 255, 255);
		// pp.textSize(32);

		// let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		// pp.text('itp', 0, level);
	}
}

class SaveButton {
	display(pp, micLevel) {
	// 	pp.fill(0, 102, 153);
	// 	pp.square(0, pp.height - 100, 100)

	// 	pp.fill(255, 255, 255);
	// 	pp.textSize(32);

	// 	let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
	// 	pp.text('itp', 0, level);
	}
}

class SoundBar {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.square(0, pp.height - 100, 100)

		pp.fill(255, 255, 255);
		pp.textSize(32);

		let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		pp.text('itp', 0, level);
	}
}

export default Sketch