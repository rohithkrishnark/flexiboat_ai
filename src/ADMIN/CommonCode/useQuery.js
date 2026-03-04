import { useQuery } from "@tanstack/react-query";
import {
  FetchAllAluminiDetail,
  FetchAllAluminiDetailById,
  FetchAllDeprmentDetail,
  FetchAllDesignation,
  FetchAllProgramDetail,
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

export const useFetchAllDeprtmentDetail = () => {
  return useQuery({
    queryKey: ["getalldepdtl"],
    queryFn: FetchAllDeprmentDetail,
    staleTime: Infinity,
  });
};

export const useFetchAllProgramDetail = () => {
  return useQuery({
    queryKey: ["getAllProgram"],
    queryFn: FetchAllProgramDetail,
    staleTime: Infinity,
  });
};

export const useFetchAllDesignationDetail = () => {
  return useQuery({
    queryKey: ["getAllDesig"],
    queryFn: FetchAllDesignation,
    staleTime: Infinity,
  });
};
