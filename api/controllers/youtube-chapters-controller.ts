import { IChapter, getChaptersData } from "../models/youtube-chapters-model.ts";

const getChapters = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  let chapters = await getChaptersData(params.id);

  response.status = 200;
  response.body = chapters;
};

export { getChapters };
