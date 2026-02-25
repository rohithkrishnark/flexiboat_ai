import { useQuery } from "@tanstack/react-query";
import {
  FetchAllAluminiDetail,
  FetchAllAluminiDetailById,
  FetchExistingPdf,
} from "./CommonFun";

export const useFetchExistingFile = () => {
  return useQuery({
    queryKey: ["training-pdfs"],
    queryFn: FetchExistingPdf,
    staleTime: 5 * 60 * 1000, // optional (5 min cache)
  });
};

export const useFetchAllAluminDetail = () => {
  return useQuery({
    queryKey: ["getallAlumini"],
    queryFn: FetchAllAluminiDetail,
    staleTime: Infinity, // optional (5 min cache)
  });
};

export const useFetchAllAluminDetailById = (id) => {
  return useQuery({
    queryKey: ["getallAluminibyid", id],
    queryFn: () => FetchAllAluminiDetailById(id),
    staleTime: Infinity, // optional (5 min cache)
    enabled: !!id,
  });
};
