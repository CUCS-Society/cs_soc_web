import { TPlateEditor } from "platejs/react"
import { serializeHtml } from "platejs/static"

export async function getMyHtml(editor: TPlateEditor) {
  const html = await serializeHtml(editor)

  return html
}

// ... (previous setup from generate-html.ts)

export async function getFullHtmlDocument(editor: TPlateEditor) {
  const editorHtmlContent = await getMyHtml(editor) // From previous example

  const fullHtml = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/path/to/your-global-styles.css" />
      <link rel="stylesheet" href="/path/to/tailwind-or-component-styles.css" />
      <title>Serialized Content</title>
    </head>
    <body>
      <div class="my-document-wrapper prose dark:prose-invert">
        ${editorHtmlContent}
      </div>
    </body>
  </html>`
  return fullHtml
}
