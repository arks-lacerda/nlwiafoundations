import { pipeline } from "@xenova/transformers"
// import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio) {
  try {
    // return transcriptionExample
    console.log("Transcribing the video...")
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )

    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "english",
      task: "transcribe",
    })

    console.log(`Completed transcription successfully!`)
    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error(`Transcription error: ${error}`)
  }
}
