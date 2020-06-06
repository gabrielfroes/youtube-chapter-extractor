import { IChapter, getChaptersData } from "../models/youtube-chapters-model.ts";

let chapters = getChaptersData();

const getChapters = (
  { params, response }: { params: { id: string }; response: any },
) => {
  response.status = 200;
  response.body = chapters;
};

const searchChapter = (id: string, seconds: string): (IChapter | undefined) =>
  chapters.filter((item) => item.timeInSeconds === parseInt(seconds))[0];

const getChapter = (
  { params, response }: {
    params: { id: string; seconds: string };
    response: any;
  },
) => {
  const chapter: IChapter | undefined = searchChapter(
    params.id,
    params.seconds,
  );

  if (chapter) {
    response.status = 200;
    response.body = chapter;
  } else {
    response.status = 404;
    response.body = { message: `Chapter not found` };
  }
};

const addChapter = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const body = await request.body();
  const newChapter: IChapter = body.value;

  const chapter: IChapter | undefined = searchChapter(
    params.id,
    newChapter.timeInSeconds.toString(),
  );

  if (!chapter) {
    chapters.push(newChapter);
    response.status = 201;
    response.body = { message: "OK" };
  } else {
    response.status = 200;
    response.body = { message: "Chapter already exists." };
  }
};

const updateChapter = async (
  { params, request, response }: {
    params: { id: string; seconds: string };
    request: any;
    response: any;
  },
) => {
  let chapter: IChapter | undefined = searchChapter(
    params.id,
    params.seconds,
  );

  if (chapter) {
    const body = await request.body();
    const updatedChapter: { text?: string; time?: string } = body.value;

    chapter = { ...chapter, ...updatedChapter };

    for (let idx in chapters) {
      if (chapters[idx].timeInSeconds === parseInt(params.seconds)) {
        chapters[idx] = chapter;
        break;
      }
    }

    response.status = 200;
    response.body = { message: "OK" };
  } else {
    response.status = 404;
    response.body = { message: `Chapter not found.` };
  }
};

const deleteChapter = (
  { params, response }: {
    params: { id: string; seconds: string };
    response: any;
  },
) => {
  let chapter: IChapter | undefined = searchChapter(
    params.id,
    params.seconds,
  );
  if (chapter) {
    chapters = chapters.filter((item) =>
      item.timeInSeconds !== parseInt(params.seconds)
    );
    response.status = 200;
    response.body = { message: "OK" };
  } else {
    response.status = 404;
    response.body = { message: `Chapter not found` };
  }
};

export { getChapters, getChapter, addChapter, updateChapter, deleteChapter };
