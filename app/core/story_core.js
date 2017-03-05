export function setStories(state, stories) {
    return state.set('stories', stories);
}


export function fetchStories() {
    return fetch('https://storybox-145021.appspot.com/api/audio/list', {
        method: 'get',
    }).then((res) => {
        return res.json()
    }).then((resJson) => {
        return sortStoriesByEvent(resJson);
    })
}

function sortStoriesByEvent(storiesArray) {
    var outArr = [];
    var locationList = [];

    // Build location list
    storiesArray.forEach(function (story, idx) {
        var location = story.location_recorded;
        if (locationList.indexOf(location) == -1) {
            locationList.push(location)
        }
    });

    // Loop through locations too add event details
    locationList.forEach(function (location) {
        var event = {
            "event_location": location,
            "event_time": "",
            "event_stories": []
        };

        storiesArray.forEach(function (story) {
            if (story.location_recorded == location) {
                event.event_time = story.timestamp.split("T")[0];
                event.event_stories.push({
                    "public_url": story.public_url,
                    "timestamp": story.timestamp,
                    "duration": formatDuration(story.length_in_seconds)
                });
            }
        });
        outArr.push(event);
    });
    return outArr;
}

function formatDuration(time) {
    if (time < 10) {
        return 0 + ":0" + time;
    } else if (time < 60) {
        return 0 + ":" + time;
    } else {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds
    }
}