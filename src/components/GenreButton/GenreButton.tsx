import ButtonCSS from "./GenreButton.module.css";
interface ButtonProps {
  id: number;
  fn: ((id: number) => void | undefined | null) | undefined;
  text: string;
}

const GenreButton = ({ id, fn, text }: ButtonProps) => {

  const handleOnClick = () => {
    if(fn != undefined) {
      fn(id);
    }
  }
  return (
    <button onClick={handleOnClick} className={ButtonCSS.genreButton}>
      {text}
    </button>
  );
};

export default GenreButton;