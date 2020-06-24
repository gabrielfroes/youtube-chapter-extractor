import { expect } from "https://deno.land/x/expect/expect.ts";
import { getChaptersData } from "../../models/youtube-chapters-model.ts";

const validVideoIds = [
  "O9wvnvyltgs",
  "eUwiTnK0EA0",
  "ScGwWsoC_-I",
];

const invalidVideoIds = [
  "@_LBunKhAzzhk", // Invalid ID
  "123456", // Just numbers
  "https://youtu.be/ThDTt_wd2Y4", // Video Link
  "ThDTt_wd2Y4", // Valid ID but with no Chapter
  "", // Empty
];

Deno.test("model/getChaptersData", async () => {
  for (let item of validVideoIds) {
    const result = await getChaptersData(item);
    const [chapter] = result;
    expect(chapter.timeInSeconds).toEqual(0);
  }

  for (let item of invalidVideoIds) {
    const result = await getChaptersData(item);
    expect(result).toEqual([]);
  }
});
