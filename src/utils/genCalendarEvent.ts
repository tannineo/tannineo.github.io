import { format } from 'date-fns'
import { createEvent } from 'ics'

import { IANATimezone } from '../consts/timezones'
import { reject } from 'lodash'

export interface IEventInput {
  title: string // title: title of the event
  details: string // details of the event

  // dates: a start and a end should always appear togather,
  datetimeRange: {
    startDate: Date
    endDate: Date
  }
  allDay?: boolean // if the datetimeRange is in all-day format, will omit hr:min:sec

  timezone: IANATimezone // ctz: timezone code, see: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  location: string // location: location of the even
}

// add-to-calendar links
// ref: https://www.maxkohler.com/posts/calendar-links/
// ref: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs
// ref: AddEvent

export const getGoogleCalendarLink = (event: IEventInput): string => {
  const dateToStr = (date: Date) => format(date, event.allDay ? 'yyyyMMdd' : "yyyyMMdd'T'HHmmss")
  const dates = `${dateToStr(event.datetimeRange.startDate)}/${dateToStr(
    event.datetimeRange.endDate,
  )}`

  return (
    `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      event.title,
    )}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(
      event.location,
    )}&ctz=${event.timezone.timezone}` + (dates ? `&dates=${dates}` : '')
  )
}

// Outlook link does NOT support timezone
// Date.toISOString() alway give time in UTC
export const getOutlookCalendarLink = (event: IEventInput): string => {
  return `https://outlook.office.com/calendar/action/compose?path=%2Fcalendar%2Faction%2Fcompose&subject=${encodeURIComponent(
    event.title,
  )}&location=${encodeURIComponent(event.location)}&body=${encodeURIComponent(
    event.details,
  )}&allday=${
    event.allDay ? 'true' : 'false'
  }&startdt=${event.datetimeRange.startDate.toISOString()}&enddt=${event.datetimeRange.endDate.toISOString()}`
}

// Yahoo! link does NOT support timezone
export const getYahooCalendarLink = (event: IEventInput): string => {
  const dateToStr = (date: Date) => format(date, "yyyyMMdd'T'HHmmss")

  // https://calendar.yahoo.com/?v=60&TITLE=Birthday&ST=20201231T193000&ET=20201231T223000&DESC=With%20clowns%20and%20stuff&in_loc=North%20Pole&inv_list=John%20Doe%20%3Cjohn%40example.com%3E%2CJane%20Doe%20%3Cjane%40example.com%3E&guccounter=1  // TODO probably 60 is a version number, no documentation / might be changed
  return `https://calendar.yahoo.com/?v=60&TITLE=${encodeURIComponent(
    event.title,
  )}&DESC=${encodeURIComponent(event.details)}&in_loc=${encodeURIComponent(
    event.location,
  )}&ST=${dateToStr(event.datetimeRange.startDate)}&ET=${dateToStr(event.datetimeRange.endDate)}` +
    event.allDay
    ? '&dur=allday'
    : ''
}

const getDateArray = (
  date: Date,
  allDay?: boolean,
): [number, number, number, number, number] | [number, number, number] => {
  if (allDay) {
    return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()]
  }

  return [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
  ]
}

export const genICS = async (event: IEventInput): Promise<string> => {
  return new Promise((resolve, reject) => {
    createEvent(
      {
        title: event.title,
        description: event.details,
        location: event.location,

        status: 'CONFIRMED',

        start: getDateArray(event.datetimeRange.startDate, event.allDay),
        end: getDateArray(event.datetimeRange.endDate, event.allDay),
      },
      (err, result) => {
        if (err) {
          reject(err)
        }
        console.log(result)
        resolve(result)
      },
    )
  })
}
