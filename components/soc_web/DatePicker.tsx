"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

interface DatePickerInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
}

export function DatePickerInput({
  value: controlledDate,
  onChange,
  label = "Publish Date",
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(controlledDate)
  const [month, setMonth] = React.useState<Date | undefined>(controlledDate)
  const [inputValue, setInputValue] = React.useState(formatDate(controlledDate))

  // Sync if parent controls the value
  React.useEffect(() => {
    setDate(controlledDate)
    setMonth(controlledDate)
    setInputValue(formatDate(controlledDate))
  }, [controlledDate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputValue(raw)
    const parsed = new Date(raw)
    if (isValidDate(parsed)) {
      setDate(parsed)
      setMonth(parsed)
      onChange?.(parsed)
    }
  }

  const handleCalendarSelect = (selected: Date | undefined) => {
    setDate(selected)
    setInputValue(formatDate(selected))
    setOpen(false)
    onChange?.(selected)
  }

  return (
    <Field className="w-full">
      <FieldLabel htmlFor="date-required">{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={inputValue}
          placeholder="June 01, 2025"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleCalendarSelect}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
