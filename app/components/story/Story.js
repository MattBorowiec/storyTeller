import Sound from 'react-native-sound';
import RNFetchBlob from 'react-native-fetch-blob'

export function Story(name, url) {
  var that = this;
  this.fetch = function() {
    return RNFetchBlob
        .config({
          fileCache : true,
        })
        .fetch('GET', url)
        .then((res) => {
          console.log('The file saved to ', res.path());
          that.path = res.path();
          return RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ])
        })
  };
  this.create = function(callback) {
    var sound = new Sound(this.path, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        console.log('success, audio length is ' + sound.getDuration());
        that.soundControl = sound;
      }
    });
  }
}







