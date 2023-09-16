import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const contentSummary = document.querySelector("#content-summary")
const contentTranscription = document.querySelector("#content-transcription")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  contentSummary.classList.add("placeholder")
  contentTranscription.classList.add("placeholder")

  const videoURL = input.value
  // console.log("Data submitted", videoURL)
  if (!videoURL.includes("shorts")) {
    return (contentSummary.textContent =
      "It's a long video, only upload short videos")
    // console.log("It's a long video, only upload short videos")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  // console.log(videoID)

  contentTranscription.textContent = "Getting the text from the audio..."
  contentSummary.textContent = "Carrying out the summary..."

  const transcription = await server.get(`/summary/${videoID}`)

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  contentSummary.textContent = summary.data.result
  contentTranscription.textContent = transcription.data.result

  contentSummary.classList.remove("placeholder")
  contentTranscription.classList.remove("placeholder")
})
