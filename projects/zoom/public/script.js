const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}


socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
        console.log("__Webcam Ready")
        
        addVideoStream(myVideo, stream)
    
      myPeer.on('call', call => {
        console.log("INCOMING CALL")
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })
    
      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
      })

      console.log("__Peer Open")
      socket.emit('join-room', ROOM_ID, id)
    })    
})

function connectToNewUser(userId, stream) {
  console.log('new connection: ' + userId)
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  
  call.on('stream', userVideoStream => {    
    addVideoStream(video, userVideoStream);
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}