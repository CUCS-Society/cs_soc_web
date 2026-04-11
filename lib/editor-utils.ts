import {
  $getRoot,
  type LexicalEditor,
  type SerializedEditorState,
} from "lexical"

/**
 * Converts Lexical editor state to HTML
 * This is a basic implementation - you may need to extend it based on your custom nodes
 */
export async function convertEditorStateToHtml(
  jsonEditorState: string,
  editor?: LexicalEditor
): Promise<string> {
  try {
    const serializedState = JSON.parse(jsonEditorState) as SerializedEditorState

    if (editor) {
      // If we have an editor instance, use its parseEditorState method
      editor.parseEditorState(serializedState)

      // Get the root node and export as HTML
      const root = $getRoot()
      return root.getTextContent()
    } else {
      // Fallback: basic text extraction from serialized state
      // This is a simplified approach - for production, you'd want proper HTML generation
      return extractTextFromSerializedState(serializedState)
    }
  } catch (error) {
    console.error("Error converting editor state to HTML:", error)
    return "<div>Error converting content</div>"
  }
}

/**
 * Basic text extraction from serialized editor state
 * This is a fallback when we don't have an editor instance
 */
function extractTextFromSerializedState(state: SerializedEditorState): string {
  try {
    const root = state.root
    return extractTextFromNode(root)
  } catch (error) {
    console.error("Error extracting text from serialized state:", error)
    return ""
  }
}

function extractTextFromNode(node: any): string {
  if (node.type === "text") {
    return node.text || ""
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("")
  }

  // For other node types, you might want to add specific handling
  // For example, paragraphs, headings, etc.
  switch (node.type) {
    case "paragraph":
      return `<p>${extractTextFromNode({ children: node.children })}</p>`
    case "heading":
      const level = node.tag || "h1"
      return `<${level}>${extractTextFromNode({ children: node.children })}</${level}>`
    case "linebreak":
      return "<br>"
    default:
      return extractTextFromNode({ children: node.children })
  }
}

/**
 * Hook to convert editor state to HTML when editor changes
 */
export function useEditorStateToHtml() {
  const convertToHtml = async (
    serializedState: SerializedEditorState,
    editor?: LexicalEditor
  ): Promise<string> => {
    return convertEditorStateToHtml(JSON.stringify(serializedState), editor)
  }

  return { convertToHtml }
}
