import { OpenAIStreamPayload } from '@/model/vgpt'
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser'


export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer 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`,
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })
  console.log(res)
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            console.log('DONE')
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
