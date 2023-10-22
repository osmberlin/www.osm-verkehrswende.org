# TODOs

## Texte

Entscheiden, was wir mit den Homepage Text machen. Die müssten aktualisiert werden. Oder ganz verschoben auf die Projekte…

## TODOs Migration

- URL Recirects…

  ```
  # Build settings
  permalink: /posts/:year-:month-:day-:title
  ```

- Github Link pro Projekt
  ```
    <a
        class="underline hover:text-gray-500"
        href="https://github.com/osmberlin/www.osm-verkehrswende.org"
        target="_blank"
      >
        Code auf GitHub
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox="0 0 512 512"
          class="inline-block h-3 w-3 object-cover align-baseline"
        >
          <path
            fill="currentColor"
            d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
          ></path>
        </svg>
      </a>
  ```

## TODOs old www-version

- [] Liste der Subdomains auf Startseite
- [x] Favicon
- [x] Social Sharing Bild
- [x] h1 mit padding und gradient; dann hx mit text gradient
      `font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600`
      https://daily-dev-tips.com/posts/making-gradient-text-with-tailwind-css/

## Content

- [] Home: Video von Bits Bäume verwenden?
- [] "TODO BaWü Projekt aufnehmen"
- [] "Kampagnenunterstützung und Datenabgleich"
  Links zu den Tools und Möglichkeiten; oder Blogpost dazu.
- [] Describe the generic project steps; and status per Projekt.
  Maybe using http://mermaid-js.github.io/mermaid/#/

## LATER: Design: Experiment with background image

```
<div
class="flex flex-col bg-[#ceeeab] bg-no-repeat lg:flex-row lg:gap-5"
style="background-position: top left; background-size: 500px; background-image: url('{{ '/images/osm-inspired-background.svg' | relative_url }}')"
>
```

Plus

```
<section class="my-6 xl:mt-0 flex-1 rounded bg-white/10 p-6 md:ml-60">
```

Vor dem /Body

```
 <img
src="{{ '/images/osm-inspired-background.svg' | relative_url }}"
class="fixed inset-0 -z-50 block h-full w-full object-cover"
/>
```
