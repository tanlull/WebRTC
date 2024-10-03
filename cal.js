/* global tracking */
// var video = document.querySelector('video')
var video = document.getElementById('video')
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
function handleSuccess (stream) {
  window.stream = stream // make stream available to browser console
  video.srcObject = stream
}
function handleError (error) {
  console.log('navigator.getUserMedia error: ', error)
}
navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(handleSuccess).catch(handleError)

// var objects = new tracking.ObjectTracker('face', 'eye', 'mouth')
var objects = new tracking.ObjectTracker('face')
// setting
objects.setInitialScale(4)
objects.setStepSize(2)
objects.setEdgesDensity(0.1)

objects.on('track', function (event) {
  // clear
  // context.clearRect(0, 0, canvas.width, canvas.height)
  if (event.data.length === 0) {
    // No objects were detected in this frame.
  } else {
    event.data.forEach(function (rect) {
      console.log(rect)
      context.strokeStyle = '#a64ceb'
      context.strokeRect(rect.x, rect.y, rect.width, rect.height)
      context.font = '11px Helvetica'
      context.fillStyle = '#fff'
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
    })
  }
})
tracking.track('#video', objects, { camera: true })