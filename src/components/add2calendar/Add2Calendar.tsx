import 'solid-js'

import {
  getGoogleCalendarLink,
  getOutlookCalendarLink,
  getYahooCalendarLink,
} from '../../utils/getCalendarLink'
import { getIANATimezoneByCode } from '../../consts/timezones'

const testData = {
  title: 'Test Event',
  details: 'Test Event Details',

  allDay: true,

  datetimeRange: {
    startDate: new Date(),
    endDate: new Date(),
  },

  timezone: getIANATimezoneByCode('Europe/Dublin'),
  location: 'TCD, Dublin 2, Ireland',
}
const Add2Calendar = () => {
  const a2cHref = getGoogleCalendarLink(testData)

  const a2cHref2 = getOutlookCalendarLink(testData)

  const a2cHref3 = getYahooCalendarLink(testData)

  return (
    <div class='flex flex-col'>
      <a href={a2cHref}>{a2cHref}</a>

      <a href={a2cHref2}>{a2cHref2}</a>

      <a href={a2cHref3}>{a2cHref3}</a>
    </div>
  )
}

export default Add2Calendar
