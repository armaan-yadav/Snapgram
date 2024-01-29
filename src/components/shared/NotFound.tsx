const NotFound = ({
  text,
  image,
  classname,
}: {
  text: string;
  image: string;
  classname?: string;
}) => {
  return (
    <div
      className={`w-full flex-center h-[50vh]  text-2xl font-[500] gap-1 ${classname}`}
    >
      <img src={`/assets/icons/${image}.svg`} alt="posts" className="h-8 w-8" />
      <span className=""> {text}</span>
    </div>
  );
};

export default NotFound;
