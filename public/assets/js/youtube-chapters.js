const YoutubeChapters = {
  videoId: "",
  chapters: [],

  async load(videoId) {
    YoutubeChapters.videoId = videoId;
    YoutubeChapters.chapters = await YoutubeChapters.getChapters(videoId);

    return (YoutubeChapters.chapters.length > 0);
  },

  async getChapters(videoId) {
    const hostname = window.location.hostname;
    const url = `http://${hostname}:8080/api/v1/video-chapters/${videoId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const content = await response.text();
      console.log(content);
      return JSON.parse(content);
    } catch (err) {
      return;
    }
  },

  videoIdFromURL(url) {
    const match = url.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/i,
    );
    const [, videoId] = (match) ? match : [];
    return (videoId) ? videoId : undefined;
  },
};
