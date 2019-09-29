import "p5/lib/addons/p5.sound.min"
import p5 from "p5"

const Sketch = (p) => {
	let canvas
	let button
	let mic
	let soundRec
	let soundFile

	p.setup = () => {
		canvas = p.createCanvas(300, 200)
		p.noStroke()
		mic = new p5.AudioIn()
		mic.start()

		soundRec = new p5.SoundRecorder()
		soundRec.setInput(mic)
		soundFile = new p5.SoundFile()

	}

	p.draw = () => {
		p.background('red')
		p.ellipse(150, 100, 100, 100)
	}
	
	p.mouseClicked = (mouseEvent) => {

		let distance = p.dist(mouseEvent.x, mouseEvent.y, 150, 100)

		if (distance < 50) {
			soundRec.record(soundFile) // set up the soundfile to record and start recording
			console.log("recording....")
			let recordingTimer = setTimeout(() => { // setup a timeout for the recording, after the time below expires, do the tings inside the {}

				soundRec.stop() // stop recording
				let soundBlob = soundFile.getBlob() //get the recorded soundFile's blob & store it in a variable
				console.log(soundBlob)
				var formData = new FormData() //create a from to of data to upload to the server
				
				formData.append('soundBlob', soundBlob)

				var fetchOptions = {
					method: 'POST',
					body: formData,
					headers: new Headers({
						'enctype': 'multipart/form-data'
					})
				}

				console.log('recording stopped')

				fetch("http://localhost:3001/api/v1/sounds/new", fetchOptions)
					.then(res => {
						console.log(res.status)
					})

			}, 3000)
		}
	}
}

export default Sketch
