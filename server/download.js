import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = `https://www.youtube.com/shorts/${videoId}`
    // console.log(`Downloading the video... : ${videoId}`)
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error(
            `Video is too long, it should be less than 60 seconds.`
          )
        }
      })
      .on("end", () => {
        console.log(`The video has been downloaded successfully.`)
        resolve()
      })
      .on("error", () => {
        console.log(
          `The video could not be downloaded. Error details: ${error}`
        )
        reject(error)
      })
      .pipe(fs.createWriteStream(`./tmp/audio.mp4`))
  })
