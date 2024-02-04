import React, { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { BiCalendar as CalendarIcon } from 'react-icons/bi'

import moment from 'moment'

export default function DatePicker({ date, setDate, ...props }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={props.id}
            variant={'outline'}
            className={cn('justify-between text-left font-normal', !date && 'text-muted-foreground')}
          >
            {date ? moment(date).format('MMMM D, YYYY') : <span>Pick a date</span>}
            <CalendarIcon className='mr-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  )
}

export const DefaultDatePicker = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      type='date'
      // value={transactionDate}
      // onChange={(e) => setTransactionDate(e.target.value)}
      {...props}
      ref={ref}
      // id='transaction_date'
    />
  )
})
