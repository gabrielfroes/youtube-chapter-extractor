const YoutubeChapters = {
    videoId: '',
    chapters: [],

    async load(videoId) {
        YoutubeChapters.videoId = videoId
        let description = await YoutubeChapters.getDescriptionFromVideo(videoId)
        YoutubeChapters.chapters = YoutubeChapters.parseChapters(description)

        return (YoutubeChapters.chapters.length > 0)
    },

    async getDescriptionFromVideo(videoId) {
        let description
        let content

        const url = `http://127.0.0.1:5500/samples/live.txt?v=${videoId}`
        try {
            let response = await fetch(url)
            if (!response.ok) return
            content = await response.text()
        } catch (err) {
            return
        }
        const startSearch = "\\\"description\\\":{\\\"simpleText\\\":\\\""
        const endSearch = "\\\"}"

        let currentPosition = content.indexOf(startSearch)

        if (currentPosition < 0) return
        description = content.substr(currentPosition + (startSearch.length))
        currentPosition = description.indexOf(endSearch)

        if (currentPosition < 0) return
        description = description.substr(0,
            description.length - (description.length - currentPosition))

        description = description.replace(/\\\\n/g, '\n')

        return description
    },

    parseChapters(content) {
        if (!content) return []

        const startString = "0:00"
        let currentPosition = 0

        currentPosition = content.indexOf(startString)
        if (currentPosition < 0) return []

        let chapters = content.substr(currentPosition).split("\n")
        return YoutubeChapters.sanitizeChapters(chapters)

    },

    sanitizeChapters(chapters) {
        let newChapters = []

        for (item of chapters) {
            const timeRegExp = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]\d)/
            const textRegExp = /([A-Za-z0-9]{1})\w*/i
            const match = timeRegExp.exec(item)

            if (!match) break

            const timeInSeconds = YoutubeChapters.hmsToSeconds(match[0])

            let text = item.replace(timeRegExp, "");
            text = (textRegExp.exec(text).index > -1) ?
                text.substr(textRegExp.exec(text).index) :
                null

            if (timeInSeconds == 0 && !text) return []

            if (text) {

                let chapter = {
                    'text': text,
                    'time': match[0],
                    'timeInSeconds': timeInSeconds,
                    'link': YoutubeChapters.videoChapterLink(timeInSeconds)
                }
                newChapters.push(chapter)

            }

        }
        return newChapters

    },

    videoChapterLink(seconds) {
        return `https://www.youtube.com/watch?v=${YoutubeChapters.videoId}&t=${seconds}`
    },

    hmsToSeconds(hms) {
        let sec = 0,
            min = 1
        hms = hms.split(':')

        while (hms.length > 0) {
            sec += min * parseInt(hms.pop(), 10)
            min *= 60
        }

        return sec
    }

}