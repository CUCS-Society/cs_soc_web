import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export interface DocumentItem {
  id: string
  title: string
  content?: ReactNode
  open?: boolean
  children?: DocumentItem[]
}

interface RecursiveAccordionContentProps {
  items: DocumentItem[]
  depth?: number
}

export const RecursiveAccordionContent = ({
  items,
  depth = 0,
}: RecursiveAccordionContentProps) => {
  if (depth === 0) {
    // Top level: use Accordion
    return (
      <div className="flex justify-center">
        <Accordion
          className="w-full max-w-md -space-y-1"
          defaultValue={[items[0]?.id]}
        >
          {items.map((item) => (
            <AccordionItem
              className="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg last:border-b"
              key={item.id}
              value={item.id}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">{item.title}</div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {item.children && item.children.length > 0 && (
                  <RecursiveAccordionContent
                    items={item.children}
                    depth={depth + 1}
                  />
                )}
                {item.content && (
                  <div className="px-4 py-3">{item.content}</div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  }

  // Nested levels: use Collapsible
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <Collapsible
          className="border-t border-border bg-accent px-4 py-3"
          defaultOpen={item.open}
          key={item.id}
        >
          <CollapsibleTrigger className="flex gap-2 font-medium [&[data-state=open]>svg]:rotate-180">
            <ChevronDown
              aria-hidden="true"
              className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
              size={16}
              strokeWidth={2}
            />
            {item.title}
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden ps-6 text-sm text-muted-foreground transition-all">
            {item.children && item.children.length > 0 ? (
              <RecursiveAccordionContent
                items={item.children}
                depth={depth + 1}
              />
            ) : (
              <div>{item.content}</div>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
