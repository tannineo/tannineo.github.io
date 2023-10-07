/** @jsxImportSource solid-js */

const InputField = (props: {
  value?: string
  onChange?: (val: string) => any
  placeholder?: string
}) => {
  return (
    <input
      class='w-full px-2 py-1 outline-none ring-none rounded-md'
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    ></input>
  )
}

export default InputField
