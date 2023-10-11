function Page(props) {
  return (
    <div className="bg-stone-200 text-slate-900 w-full flex justify-center pb-8">
      <div className="max-w-screen-lg w-full p-4">
        <h1 className="text-2xl lg:text-4xl tracking-tight font-bold mb-4">{props.name}</h1>
        {props.children}
      </div>
    </div>
  )
}

export default Page
