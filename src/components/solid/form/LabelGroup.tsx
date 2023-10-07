/** @jsxImportSource solid-js */
import { children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

const LabelGroup = (props: { label: string; children: JSX.Element }) => {
  const ch = children(() => props.children)

  return (
    <div class='w-full flex flex-col'>
      <label class='font-bold p-1'>{props.label}</label>
      {ch()}
    </div>
  )
}

export default LabelGroup
