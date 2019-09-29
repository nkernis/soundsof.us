import "p5/lib/addons/p5.sound.min"
import p5 from "p5"

const Sketch = (p, xxx) => {
	let mic
	let soundBar
	let soundRec
	let soundFile

	p.setup = () => {
		p.createCanvas(400, 400)
		p.noStroke()

		mic = new p5.AudioIn()
		mic.start()

		soundRec = new p5.SoundRecorder()
		soundRec.setInput(mic)

		soundFile = new p5.SoundFile()

		soundBar = new SoundBar()
	}

	p.draw = () => {
		p.background('red')
		p.fill(0, 0, 0);
		p.circle(55, 55, 100)

		p.fill(255, 255, 255);
		p.circle(55, 160, 100,)

		let micLevel = mic.getLevel();
		soundBar.display(p, micLevel)
	}
	
	p.mouseClicked = () => {
		let startDist = p.dist(p.mouseX, p.mouseY, 55, 55)
		let stopDist = p.dist(p.mouseX, p.mouseY, 55, 160)

		if (startDist < 50) {
			startRecord(soundFile, soundRec)
		}

		if (stopDist < 50) {
			stopRecord(soundFile, soundRec)
		}
	}
}

const startRecord = (soundFile, soundRec) => {
	// soundRec.record(soundFile)
	console.log("recording....")
}

const stopRecord = (soundFile, soundRec) => {
	console.log('recording stopped')
	// let recordingTimer = setTimeout(() => {
	// 	soundRec.stop()
	// 	console.log('recording stopped')

	// 	let soundBlob = soundFile.getBlob()
	// 	var formData = new FormData() //create a from to of data to upload to the server

	// 	formData.append('soundBlob', soundBlob)

	// 	var fetchOptions = {
	// 		method: 'POST',
	// 		body: formData,
	// 		headers: new Headers({
	// 			'enctype': 'multipart/form-data'
	// 		})
	// 	}

	// 	fetch("http://localhost:3001/api/v1/sounds/new", fetchOptions)
	// 		.then(res => {
	// 			console.log(res.status)
	// 		})

	// }, 3000)
}

const cancelRecord = () => {

}

const saveRecord = () => {

}

class StartButton {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.square(0, pp.height - 100, 100)

		pp.fill(255, 255, 255);
		pp.textSize(32);

		let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		pp.text('itp', 0, level);
	}
}

class StopButton {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.square(0, pp.height - 100, 100)

		pp.fill(255, 255, 255);
		pp.textSize(32);

		let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		pp.text('itp', 0, level);
	}
}

class PlayBackButton {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.square(0, pp.height - 100, 100)

		pp.fill(255, 255, 255);
		pp.textSize(32);

		let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		pp.text('itp', 0, level);
	}
}

class TextInput {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.square(0, pp.height - 100, 100)

		pp.fill(255, 255, 255);
		pp.textSize(32);

		let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		pp.text('itp', 0, level);
	}
}

class SaveButton {
	display(pp, micLevel) {
		pp.fill(0, 102, 153);
		pp.square(0, pp.height - 100, 100)

		pp.fill(255, 255, 255);
		pp.textSize(32);

		let level = pp.constrain(pp.height - micLevel * 400, 0, pp.height)
		pp.text('itp', 0, level);
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