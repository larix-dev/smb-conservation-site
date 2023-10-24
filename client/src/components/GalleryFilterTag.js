function GalleryFilterTag(props) {
  return (
    <div className="flex">
      <button className="bg-teal-900 text-stone-200 font-bold py-2 px-4 rounded">{props.tag}</button>
    </div>
  );
}

export default GalleryFilterTag;
