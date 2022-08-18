const { promises: fs } = require('fs')
const path = require('path')
const axios = require('axios').default
const cheerio = require('cheerio')

const secondsToHoursMinutesSeconds = (input) => {
  const hours = Math.floor(input / 3600)
  const minutes = Math.floor((input - hours * 3600) / 60)
  const seconds = input - hours * 3600 - minutes * 60

  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`
}

async function generate() {
  const podcastUrl = process.argv[2]
  console.log(podcastUrl)
  const parts = podcastUrl.split('?t=')
  const timestamp = parts.length > 1 ? parts[1] : '0'
  const podcastData = await axios.get(podcastUrl).then((res) => res.data)

  const $ = cheerio.load(podcastData)

  const podcastEpTitle = $('title').text().split('-')[0].trim()
  const podcastTitle = $('title').text().split('-')[1].trim()

  const epFileName = podcastEpTitle
    .replaceAll('#', '')
    .replaceAll('–', '')
    .replaceAll('$', '')
    .replaceAll(':', '')
    .replaceAll("'", '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
  let existingFile
  try {
    existingFile = await fs.readFile(
      path.join(__dirname, '..', 'pages', 'podcasts', `${epFileName}.mdx`),
      { encoding: 'utf8' }
    )
  } catch (err) {
    console.log(err)
    // no file
  }

  let notesToAdd

  if (existingFile && existingFile.length && timestamp !== '0') {
    console.log('found an existing file, grabbing previous notes')
    // no existing file, what do we do
    const ulIndex = existingFile.indexOf(`<ul id="notes">`)
    const ulIndexEnd = existingFile.indexOf(`<span id="end" />`)
    const existingNotes = existingFile.slice(ulIndex, ulIndexEnd - 7)
    console.log(existingNotes)

    notesToAdd = `${existingNotes}
\{${timestamp} !== 0 \&\& (<li><a href="${podcastUrl}">${secondsToHoursMinutesSeconds(
      timestamp
    )}</a></li>) \} 
</ul><span id="end" />
    `
  } else if (timestamp === '0') {
    notesToAdd = `<ul id="notes">
\{${timestamp} === 0 \&\& (<li>This whole podcast was pretty great. Listen <a href="${podcastUrl}">here</a>.</li>) \} 
</ul><span id="end" />
    `
  } else if (timestamp !== '0') {
    notesToAdd = `<ul id="notes">
\{${timestamp} !== 0 \&\& (<li><a href="${podcastUrl}">${secondsToHoursMinutesSeconds(
      timestamp
    )}</a></li>) \}
      </ul><span id="end" />
      `
  }

  const podcastDate = $('#episode_date').text()
  const podcastCanonicalUrl = $('.website a').attr('href')
  const artworkUrl = $('#artwork img').attr('src')
  const itunesUrl = $('.itunes_button a').attr('href')
  let description = $('meta[property="og:description"]').attr('content')

  const regex = /\r|\n/g
  const matches = [...description.matchAll(regex)]
  console.log(matches)
  if (matches.length > 0) {
    description = description.slice(0, matches[0]['index'])
  }

  // things to find:
  // <div class="website"><a href="https://fs.blog/knowledge-project/">https://fs.blog/knowledge-project</a></div>
  // <h1>#105 Seth Godin: Failing On Our Way To Mastery</h1>
  // <div id="episode_date">Tuesday 23 February 2021</div>
  // <div id="artwork">
  // <a href="https://pca.st/podcast/693ab9f0-d0f0-0132-0356-059c869cc4eb"><img src="https://static.pocketcasts.com/discover/images/400/693ab9f0-d0f0-0132-0356-059c869cc4eb.jpg" onError="onImageError(this, 'https://ssl-static.libsyn.com/p/assets/1/3/0/8/130880bf67879f6ed959afa2a1bf1c87/podcast-cover.png');" /></a>
  // </div>
  //   <title>#105 Seth Godin: Failing On Our Way To Mastery - The Knowledge Project with Shane Parrish</title>
  //       <meta property="og:title" content="#105 Seth Godin: Failing On Our Way To Mastery - The Knowledge Project with Shane Parrish">
  //     <meta property="og:description" content="Seth Godin is the author of 20 bestselling books, founder of altMBA, the Akimbo podcast and runs one of the most popular blogs in the world. Seth and Shane chat about creative work, fear, shame, trusting yourself, what it means to be a professional,...">
  // <div class="button itunes_button"><a href="https://podcasts.apple.com/us/podcast/feed/id990149481" target="_blank">iTunes</a></div>

  const fileName = new Date().toISOString().split('T')[0]

  const document = `---

title: "${podcastEpTitle} — ${podcastTitle}"\n
date: ${fileName}\n
podcast_url: ${podcastUrl}\n
author: Drew Bredvick\n
tag: podcast, ${podcastTitle.replaceAll(' ', '-')}\n
description: "${description.replaceAll('_____', '').replaceAll('---', '\n')}"\n

---

import Image from 'next/image'

# ${podcastEpTitle}
<div style={{display: "flex", justifyContent: "center"}}>
    <Image src="${artworkUrl}" width="400" height="400" />
</div>


## Description

${podcastDate}

${description}

## Notes

${notesToAdd}

## Links

- [Listen on Pocket Casts](${podcastUrl})
- [Listen on Apple Podcasts](${itunesUrl})
- [${podcastTitle}](${podcastCanonicalUrl})
  `

  fs.writeFile(
    path.join(__dirname, '..', 'pages', 'podcasts', `${epFileName}.mdx`),
    document
  )
}
generate()
