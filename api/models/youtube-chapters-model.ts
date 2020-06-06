interface IChapter {
  text: string;
  time: string;
  timeInSeconds: number;
  link: string;
}

let chapters: Array<IChapter> = [{
  "text": "Apresentação dos Participantes",
  "time": "0:00",
  "timeInSeconds": 0,
  "link": "https://www.youtube.com/watch?v=lkj&t=0",
}, {
  "text": "Jacob Moura (Flutterando)",
  "time": "11:56",
  "timeInSeconds": 716,
  "link": "https://www.youtube.com/watch?v=lkj&t=716",
}, {
  "text": "Rodrigo Branas",
  "time": "20:35",
  "timeInSeconds": 1235,
  "link": "https://www.youtube.com/watch?v=lkj&t=1235",
}, {
  "text": "Igor Oliveira (ProgramadorBR)",
  "time": "31:19",
  "timeInSeconds": 1879,
  "link": "https://www.youtube.com/watch?v=lkj&t=1879",
}, {
  "text": "pausa para poesia",
  "time": "50:01",
  "timeInSeconds": 3001,
  "link": "https://www.youtube.com/watch?v=lkj&t=3001",
}, {
  "text": "Leonardo Leitão",
  "time": "51:42",
  "timeInSeconds": 3102,
  "link": "https://www.youtube.com/watch?v=lkj&t=3102",
}, {
  "text": "chegada Filipe Deschamps",
  "time": "59:01",
  "timeInSeconds": 3541,
  "link": "https://www.youtube.com/watch?v=lkj&t=3541",
}, {
  "text": "Paulo Silvera",
  "time": "1:02:34",
  "timeInSeconds": 3754,
  "link": "https://www.youtube.com/watch?v=lkj&t=3754",
}, {
  "text": "Lucas Montano",
  "time": "1:12:09",
  "timeInSeconds": 4329,
  "link": "https://www.youtube.com/watch?v=lkj&t=4329",
}, {
  "text": "Gabriel Fróes (Código Fonte TV)",
  "time": "1:20:31",
  "timeInSeconds": 4831,
  "link": "https://www.youtube.com/watch?v=lkj&t=4831",
}, {
  "text": "Filipe Alves",
  "time": "1:31:40",
  "timeInSeconds": 5500,
  "link": "https://www.youtube.com/watch?v=lkj&t=5500",
}, {
  "text": "Fabio Akita",
  "time": "1:43:50",
  "timeInSeconds": 6230,
  "link": "https://www.youtube.com/watch?v=lkj&t=6230",
}, {
  "text": "Neto Marin",
  "time": "2:01:18",
  "timeInSeconds": 7278,
  "link": "https://www.youtube.com/watch?v=lkj&t=7278",
}, {
  "text": "Bullas Atekkita",
  "time": "2:11:42",
  "timeInSeconds": 7902,
  "link": "https://www.youtube.com/watch?v=lkj&t=7902",
}, {
  "text": "Loiane Groner",
  "time": "2:18:11",
  "timeInSeconds": 8291,
  "link": "https://www.youtube.com/watch?v=lkj&t=8291",
}, {
  "text": "André Baltieri (Balta.IO)",
  "time": "2:29:20",
  "timeInSeconds": 8960,
  "link": "https://www.youtube.com/watch?v=lkj&t=8960",
}, {
  "text": "Reinaldo Silotto (TekZoom)",
  "time": "2:43:09",
  "timeInSeconds": 9789,
  "link": "https://www.youtube.com/watch?v=lkj&t=9789",
}, {
  "text": "Vanessa Weber (Código Fonte TV)",
  "time": "2:49:34",
  "timeInSeconds": 10174,
  "link": "https://www.youtube.com/watch?v=lkj&t=10174",
}, {
  "text": "Filipe Deschamps",
  "time": "2:58:35",
  "timeInSeconds": 10715,
  "link": "https://www.youtube.com/watch?v=lkj&t=10715",
}, {
  "text": "Dicas finais de todos",
  "time": "3:12:51",
  "timeInSeconds": 11571,
  "link": "https://www.youtube.com/watch?v=lkj&t=11571",
}];

const getChaptersData = () => {
  return chapters;
};

export { IChapter, getChaptersData };
