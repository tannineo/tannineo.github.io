/** @jsxImportSource solid-js */
// required for solid-js components

import { Show, createResource } from 'solid-js'
import { createStore } from 'solid-js/store'

import {
  genICS,
  getGoogleCalendarLink,
  getOutlookCalendarLink,
  getYahooCalendarLink,
} from '../../../utils/genCalendarEvent'
import { getIANATimezoneByCode } from '../../../consts/timezones'
import InputField from '../form/InputField'
import LabelGroup from '../form/LabelGroup'

const testData = {
  title: 'Test Event',
  details: 'Test Event Details',

  allDay: false,

  datetimeRange: {
    startDate: new Date(),
    endDate: new Date(),
  },

  timezone: getIANATimezoneByCode('Europe/Dublin'),
  location: 'TCD, Dublin 2, Ireland',
}
const Add2Calendar = () => {
  const [inputEventStore, setInputEventStore] = createStore({
    title: 'Wonderful Event',
    details: 'This event is a must-go!',
    allDay: false,
    datetimeRange: {
      startDate: new Date(),
      endDate: new Date(),
    },
    timezone: getIANATimezoneByCode('Europe/Dublin'),
    location: 'Somewhere on the Earth',
  })

  // using store and resource, the reactiveness is on every member of the store, see: https://github.com/solidjs/solid/discussions/902
  const [icsData] = createResource(() => ({ ...inputEventStore }), genICS)

  return (
    <div class='w-full flex flex-col p-4'>
      <LabelGroup label='Event Title'>
        <InputField
          value={inputEventStore.title}
          onChange={val =>
            setInputEventStore('title', _title => {
              console.log(`setInputEventStore - title: ${_title} => ${val}`)
              return val
            })
          }
          placeholder='Event Title'
        />
      </LabelGroup>

      <LabelGroup label='Event Details'>
        <InputField
          value={inputEventStore.details}
          onChange={val => setInputEventStore('details', _details => val)}
          placeholder='Event Details'
        />
      </LabelGroup>

      <LabelGroup label='Event Location'>
        <InputField
          value={inputEventStore.location}
          onChange={val => setInputEventStore('location', _location => val)}
          placeholder='Event Location'
        />
      </LabelGroup>

      <div class='w-full border-white border-b h-1 my-4'></div>

      <LabelGroup label='Generated Links'>
        <div class='w-full flex flex-col p-1 items-start'>
          <a class='underline hover:text-white' href={getGoogleCalendarLink(inputEventStore)}>
            Add to Google Calendar
          </a>

          <a
            class='underline hover:text-white'
            href={getOutlookCalendarLink(inputEventStore)}
          >
            Add to Outlook Calendar
          </a>

          <a class='underline hover:text-white' href={getYahooCalendarLink(inputEventStore)}>
            Add to Yahoo! Calendar
          </a>
        </div>
      </LabelGroup>

      {/* TODO now fixed data */}
      <div class='w-full flex flex-row'>
        <LabelGroup label='Start Time - TODO'>
          <p class='p-1'>NOW</p>
        </LabelGroup>

        <LabelGroup label='End Time - TODO'>
          <p class='p-1'>NOW</p>
        </LabelGroup>
      </div>

      <LabelGroup label='All Day Event - TODO'>
        <p class='p-1'>No</p>
      </LabelGroup>

      <LabelGroup label='Generated .ics Code'>
        <Show when={icsData()} fallback={<p>generating...</p>}>
          <div class='w-full flex flex-col p-1 items-start'>
            <a
              class='underline hover:text-white my-1'
              href={'data:text/plain;charset=utf-8,' + encodeURIComponent(icsData())}
              download='exported.ics'
            >
              {'-> download .ics'}
            </a>
            <textarea class='w-full' rows='10' value={icsData()}></textarea>
          </div>
        </Show>
      </LabelGroup>
    </div>
  )
}

export default Add2Calendar
