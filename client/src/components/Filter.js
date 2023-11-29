import cx from 'classnames'

function Filter(props) {
  const selected = props.filter === props.tag
  const buttonClass = cx({'bg-stone-400': selected}, 'bg-stone-300 text-sm py-1 px-4 rounded')
  const handleClick = () => props.callback(selected ? null : props.tag)

  return (
    <div className="flex">
      <button className={buttonClass} onClick={handleClick}>
        {props.tag}
      </button>
    </div>
  )
}

export default Filter