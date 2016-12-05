
export function setStories(state, stories) {
  return state.set('stories', stories);
}



export function fetchStories(){
  return fetch('https://storybox-145021.appspot.com/api/audio/list', {
    method: 'get',
  }).then((res) => {
    return res.json()
  }).then((resJson) => {
    return resJson
  })
}