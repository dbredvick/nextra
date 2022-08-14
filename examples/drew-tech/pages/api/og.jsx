import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge'
}

export default async function OGImage(req) {
  const { searchParams } = new URL(req.url)

  // ?title=<title>
  const hasTitle = searchParams.has('title')
  const title = hasTitle
    ? searchParams.get('title').slice(0, 100)
    : <div style={{
      marginLeft: '48px',
      fontStyle: 'normal',
      letterSpacing: '-0.025em',
      color: '#1a202c',
      marginTop: 20,
      paddingRight: '80px',
      paddingLeft: '80px',
      lineHeight: 1.4,
      whiteSpace: 'pre-wrap',
      display: "flex",
      justifyContent: "space-around",
      width: '90%',
    }}>
      <div>
        <img
          alt='drew.tech'
          height={30 * 1}
          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%231a202c%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M9.75%2017L9%2020l-1%201h8l-1-1-.75-3M3%2013h18M5%2017h14a2%202%200%20002-2V5a2%202%200%2000-2-2H5a2%202%200%2000-2%202v10a2%202%200%20002%202z%22%20%2F%3E%0A%3C%2Fsvg%3E"
          style={{ margin: '20px 10px' }}
          width={30 * 1}
        />
        SaaS</div>
      <div>
        <img
          alt='drew.tech'
          height={30 * 1}
          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M12%208c-1.657%200-3%20.895-3%202s1.343%202%203%202%203%20.895%203%202-1.343%202-3%202m0-8c1.11%200%202.08.402%202.599%201M12%208V7m0%201v8m0%200v1m0-1c-1.11%200-2.08-.402-2.599-1M21%2012a9%209%200%2011-18%200%209%209%200%200118%200z%22%20%2F%3E%0A%3C%2Fsvg%3E"
          style={{ margin: '20px 10px' }}
          width={30 * 1}
        />
        side projects
      </div>
      <div>
        <img
          alt='drew.tech'
          height={30 * 1}
          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M10%2020l4-16m4%204l4%204-4%204M6%2016l-4-4%204-4%22%20%2F%3E%0A%3C%2Fsvg%3E"
          style={{ margin: '20px 10px' }}
          width={30 * 1}
        />web dev
      </div>

    </div>

  // ?image=<svg_url>
  let image = searchParams.get('image')
  let imageRatio = 1
  let imageScale = 0.5


  if (image && image.startsWith('http')) {
    const res = await fetch(image)
    const type = res.headers.get('content-type')

    if (type !== 'image/svg+xml') {
      throw new Error('Unsupported image type')
    }

    image = await res.text()
    /* eslint-disable prefer-named-capture-group */
    const size = image.match(
      /viewBox=['"][.\d]+ [.\d]+ ([.\d]+) ([.\d]+)['"]/
    )
    /* eslint-enable prefer-named-capture-group */
    if (!size) throw new Error('Missing viewBox in SVG')
    imageRatio = Number(size[1]) / Number(size[2])
    image = `data:image/svg+xml;base64,${btoa(image)}`
    imageScale = 0.4
  } else {
    image = null
  }


  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          backgroundSize: '84px 48px',

          backgroundImage: `url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3Csvg%20width%3D%2284px%22%20height%3D%2248px%22%20viewBox%3D%220%200%2084%2048%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Ctitle%3Esignal%3C%2Ftitle%3E%0A%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%0A%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22signal%22%20fill-opacity%3D%220.05%22%20fill%3D%22%2323b8b8b8%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M0%2C0%20L12%2C0%20L12%2C6%20L0%2C6%20L0%2C0%20Z%20M28%2C8%20L40%2C8%20L40%2C14%20L28%2C14%20L28%2C8%20Z%20M42%2C0%20L54%2C0%20L54%2C6%20L42%2C6%20L42%2C0%20Z%20M56%2C0%20L68%2C0%20L68%2C6%20L56%2C6%20L56%2C0%20Z%20M56%2C8%20L68%2C8%20L68%2C14%20L56%2C14%20L56%2C8%20Z%20M42%2C8%20L54%2C8%20L54%2C14%20L42%2C14%20L42%2C8%20Z%20M42%2C24%20L54%2C24%20L54%2C30%20L42%2C30%20L42%2C24%20Z%20M56%2C16%20L68%2C16%20L68%2C22%20L56%2C22%20L56%2C16%20Z%20M70%2C16%20L82%2C16%20L82%2C22%20L70%2C22%20L70%2C16%20Z%20M70%2C0%20L82%2C0%20L82%2C6%20L70%2C6%20L70%2C0%20Z%20M28%2C32%20L40%2C32%20L40%2C38%20L28%2C38%20L28%2C32%20Z%20M14%2C16%20L26%2C16%20L26%2C22%20L14%2C22%20L14%2C16%20Z%20M0%2C24%20L12%2C24%20L12%2C30%20L0%2C30%20L0%2C24%20Z%20M0%2C32%20L12%2C32%20L12%2C38%20L0%2C38%20L0%2C32%20Z%20M14%2C32%20L26%2C32%20L26%2C38%20L14%2C38%20L14%2C32%20Z%20M28%2C40%20L40%2C40%20L40%2C46%20L28%2C46%20L28%2C40%20Z%20M14%2C40%20L26%2C40%20L26%2C46%20L14%2C46%20L14%2C40%20Z%20M42%2C40%20L54%2C40%20L54%2C46%20L42%2C46%20L42%2C40%20Z%20M56%2C32%20L68%2C32%20L68%2C38%20L56%2C38%20L56%2C32%20Z%20M56%2C24%20L68%2C24%20L68%2C30%20L56%2C30%20L56%2C24%20Z%20M70%2C32%20L82%2C32%20L82%2C38%20L70%2C38%20L70%2C32%20Z%20M70%2C40%20L82%2C40%20L82%2C46%20L70%2C46%20L70%2C40%20Z%20M14%2C24%20L26%2C24%20L26%2C30%20L14%2C30%20L14%2C24%20Z%20M28%2C16%20L40%2C16%20L40%2C22%20L28%2C22%20L28%2C16%20Z%20M14%2C8%20L26%2C8%20L26%2C14%20L14%2C14%20L14%2C8%20Z%20M0%2C8%20L12%2C8%20L12%2C14%20L0%2C14%20L0%2C8%20Z%22%20id%3D%22Combined-Shape%22%3E%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E)`,
          // backgroundImage:
          //   'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <img
            alt='drew.tech'
            height={500 * imageScale}
            src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%231a202c%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M9.75%2017L9%2020l-1%201h8l-1-1-.75-3M3%2013h18M5%2017h14a2%202%200%20002-2V5a2%202%200%2000-2-2H5a2%202%200%2000-2%202v10a2%202%200%20002%202z%22%20%2F%3E%0A%3C%2Fsvg%3E"
            style={{ margin: '0 0px' }}
            width={500 * imageScale}
          />
          {image ? (
            <span
              style={{
                fontSize: 40,
                color: '#aaa',
                margin: '0 40px',
              }}
            >
              +
            </span>
          ) : null}
          {image ? (
            <img
              alt='extra logo'
              height={400 * imageScale}
              src={image}
              style={{ margin: '0 0px' }}
              width={400 * imageScale * imageRatio}
            />
          ) : null}
        </div>
        <div
          style={{
            // When the title is very short we increase the font size.
            // We choose 14 here because that'll be the maximum width to keep it
            // one line (14 “W” characters).
            fontSize: 56,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: '#1a202c',
            marginTop: 90,
            padding: '0 80px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          drew.tech
        </div>
        <div
          style={{
            // When the title is very short we increase the font size.
            // We choose 14 here because that'll be the maximum width to keep it
            // one line (14 “W” characters).
            fontSize: title.length < 14 ? 50 : 42,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: '#1a202c',
            marginTop: 20,
            padding: '0 80px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>
      </div >
    ),
  )
}
