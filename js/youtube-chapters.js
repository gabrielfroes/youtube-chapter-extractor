const YoutubeChapters = {
    videoId: '',
    chapters: [],

    async load(videoId) {
        this.videoId = videoId
        const description = await YoutubeChapters.getDescriptionFromVideo(videoId)

        this.chapters = YoutubeChapters.parseChapters(description)
        return this.chapters.length > 0
    },

    async getDescriptionFromVideo(videoId) {
        let description
        let content

        const url = /[localhost|127.0.01]/ig.test(window.location.href) ? `http://127.0.0.1:5500/samples/live.txt?v=${videoId}` : `https://www.youtube.com/?v=${videoId}`

        try {
            const response = await fetch(url)
            if (!response.ok) return
            content = await response.text()
        } catch (err) {
            return
        }
        const startSearch = '\"description\":{\"simpleText\":\"'
        const endSearch = '\"}'

        let currentPosition = content.indexOf(startSearch)

        if (currentPosition < 0) return
        description = content.substr(currentPosition + startSearch.length)
        currentPosition = description.indexOf(endSearch)

        if (currentPosition < 0) return
        description = description.substr(
            0,
            description.length - (description.length - currentPosition)
        )

        description = description.replace(/\\\\n/g, '\n')

        return description
    },

    parseChapters(content) {
        if (!content) return []

        const startString = '0:00'
        const currentPosition = content.indexOf(startString)
        if (currentPosition < 0) return []

        const chapters = content.substr(currentPosition).split('\\n')
        return this.sanitizeChapters(chapters)
    },

    sanitizeChapters(chapters) {
        const newChapters = []

        for (item of chapters) {
            const timeRegExp = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]\d)/
            const textRegExp = /([A-Za-z0-9]{1})\w*/i
            const match = timeRegExp.exec(item)

            if (!match) break

            const timeInSeconds = this.hmsToSeconds(match[0])

            let text = item.replace(timeRegExp, '')
            text =
                textRegExp.exec(text).index > -1
                    ? text.substr(textRegExp.exec(text).index)
                    : null

            if (timeInSeconds == 0 && !text) return []

            if (text) {
                const chapter = {
                    text: text,
                    time: match[0],
                    timeInSeconds: timeInSeconds,
                    link: YoutubeChapters.videoChapterLink(timeInSeconds),
                }
                newChapters.push(chapter)
            }
        }
        return newChapters
    },

    videoChapterLink(seconds) {
        return `https://www.youtube.com/watch?v=${this.videoId}&t=${seconds}`
    },

    hmsToSeconds(hms) {
        let sec = 0;
        let min = 1;

        hms = hms.split(':')

        while (hms.length > 0) {
            sec += min * parseInt(hms.pop(), 10)
            min *= 60
        }

        return sec
    },
}
