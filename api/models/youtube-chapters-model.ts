interface IChapter {
  text: string;
  time: string;
  timeInSeconds: number;
  link: string;
}

const getDescriptionFromVideo = async (videoId: string) => {
  let description;
  let content;

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  try {
    let response = await fetch(url);
    if (!response.ok) return;
    content = await response.text();
  } catch (err) {
    return;
  }
  const startSearch = '\\"description\\":{\\"simpleText\\":\\"';
  const endSearch = '\\"}';

  let currentPosition = content.indexOf(startSearch);

  if (currentPosition < 0) return;
  description = content.substr(currentPosition + (startSearch.length));
  currentPosition = description.indexOf(endSearch);

  if (currentPosition < 0) return;
  description = description.substr(
    0,
    description.length - (description.length - currentPosition),
  );

  description = description.replace(/\\\\n/g, "\n");

  return description;
};

// console.log(await getDescriptionFromVideo("O9wvnvyltgs"));
// console.log(await getDescriptionFromVideo("eUwiTnK0EA0"));

const parseChapters = (videoId: string, content: string | undefined) => {
  if (!content) return [];

  const startString = "0:00";
  let currentPosition = 0;

  currentPosition = content.indexOf(startString);
  if (currentPosition < 0) return [];

  let chapters = content.substr(currentPosition).split("\n");
  return sanitizeChapters(videoId, chapters);
};

const sanitizeChapters = (videoId: string, chapters: Array<string>) => {
  let newChapters = [];

  for (let item of chapters) {
    const timeRegExp = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]\d)/;
    const textRegExp = /([A-Za-z0-9]{1})\w*/i;
    const match = timeRegExp.exec(item);

    if (!match) break;

    const timeInSeconds = hmsToSeconds(match[0]);

    let text: string | null = item.replace(timeRegExp, "");
    let textSearch = textRegExp.exec(text);

    if (textSearch?.index) {
      text = (textSearch?.index > -1) ? text.substr(textSearch.index) : null;
    }

    if (timeInSeconds == 0 && !text) return [];

    if (text) {
      let chapter = {
        "text": text,
        "time": match[0],
        "timeInSeconds": timeInSeconds,
        "link": videoChapterLink(videoId, timeInSeconds),
      };
      newChapters.push(chapter);
    }
  }
  return newChapters;
};

const videoChapterLink = (videoId: string, seconds: number) => {
  return `https://www.youtube.com/watch?v=${videoId}&t=${seconds}`;
};

const hmsToSeconds = (time: string) => {
  let sec = 0,
    min = 1;
  let hms: Array<string | undefined> = time.split(":");

  while (hms.length > 0) {
    let lastPos = String(hms?.pop());
    sec += min * parseInt(lastPos?.toString(), 10);
    min *= 60;
  }

  return sec;
};

const getChaptersData = async (videoId: string) => {
  let description: string | undefined = await getDescriptionFromVideo(videoId);

  return parseChapters(videoId, description);
};

export { IChapter, getChaptersData };
