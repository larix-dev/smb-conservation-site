export default function FormAction({handleSubmit, type = 'Button', action = 'submit', text}) {
  return (
    <>
      {type === 'Button' ? (
        <button type={action} className="accent-button" onSubmit={handleSubmit}>
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  )
}
