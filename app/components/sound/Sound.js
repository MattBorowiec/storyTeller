import Sound from 'react-native-sound';
var RNFS = require('react-native-fs');



  var Audio = new Sound('/storage/emulated/0/Music/test.mp3', '', (error) => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
      console.log('duration in seconds: ' + Audio.getDuration());
    }
  });

export default Audio;

