export default {
    '/api/videoInfo': () => {
        return {
            code: 200,
            message: '成功',
            scriptList
        }
    },
    '/api/uploadVideo': ({ res, body}) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return {
            code: 200,
            message: '成功',
            url: body.url
        }
    },
    '/api/generateScript': ({ res, body}) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        const duration = body.duration
        const sections = ['Introduction', 'Key Features', 'Demonstration', 'Conclusion'];
        const chapterDuration = Math.floor(duration / (sections.length * 4));
        const script = [];
        let currentTime = 0;

        for (let p = 0; p < sections.length; p++) {
            const paragraph = { sectionTitle: sections[p], chapters: [] };
            for (let c = 0; c < 4; c++) {
                const start = currentTime;
                currentTime += chapterDuration;
                const end = currentTime;
                paragraph.chapters.push({ id: crypto.randomUUID(), start, end , text: `${content[p + c]}`});
            }
            script.push(paragraph);
        }
        scriptList = JSON.stringify(script)

        return {
            code: 200,
            message: '成功',
            script: scriptList
        }
    }
}

let scriptList = []

const content = [
    "We're no strangers to love",
    "You know the rules and so do I",
    "A full commitment's what I'm thinkin' of",
    "You wouldn't get this from any other guy",
    "I just wanna tell you how I'm feeling",
    "Gotta make you understand",
    "Never gonna give you up",
    "Never gonna let you down",
    "Never gonna run around and desert you",
    "Never gonna make you cry",
    "Never gonna say goodbye",
    "Never gonna tell a lie and hurt you",
    "We've known each other for so long:",
    "Your heart's been aching, but you're too shy to say it",
    "Inside, we both know what's been going on",
    "We know the game and we're gonna play it",
]
