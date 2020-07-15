# youtube-chapter-extractor

Aplicação desenvolvida no episódio [Mao no Código #34](https://www.youtube.com/watch?v=ThDTt_wd2Y4).

## Pre-requisitos

Para executar essa aplicação localmente você precisará:

- [Deno](https://deno.land/manual/getting_started/installation)
- Navegador (ex. [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/))

## Execução

Para executar localmente o componente de backend (`api`), faça:

```bash
cd youtube-chapter-extractor/api
deno run --allow-read --allow-net app.ts
```

Para executar localmente o componente de front-end (`public`), faça:

```bash
cd app-src/youtube-chapter-extractor/public
firefox index.html
```

Ao abrir o navegador, use o link do video abaixo como exemplo:

https://www.youtube.com/watch?v=BvyQ70PVI4s
