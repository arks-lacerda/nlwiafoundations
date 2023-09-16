import { pipeline } from "@xenova/transformers"
// import { summaryExample } from "./utils/summary.js"

export async function summarize(text) {
  try {
    //return summaryExample
    console.log("Carrying out the summary...")
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )

    const output = await generator(text)

    console.log(`Summary completed successfully!`)
    return output[0].summary_text
  } catch (error) {
    console.log(`Unable to complete the summary: ${error}`)
    throw new Error(error)
  }
}
