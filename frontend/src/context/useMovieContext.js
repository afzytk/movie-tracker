import { useContext } from "react";
import { MovieContext } from "./MovieContextDef";

export const useMovieContext = () => useContext(MovieContext);
