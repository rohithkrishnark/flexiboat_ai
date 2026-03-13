import { useQuery } from "@tanstack/react-query";
import {
  FetchAllAluminiDetail,
  FetchAllAluminiDetailById,
  FetchAllDeprmentDetail,
  FetchAllDesignation,
  FetchAllFaculity,
  FetchAllProgramDetaiById,
  FetchAllProgramDetail,
  FetchAllProgramDetailMast,
  FetchAllStudents,
  FetchAllUserGroup,
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

export const useFetchAllProgramDetailMast = () => {
  return useQuery({
    queryKey: ["getAllprogrmdtl"],
    queryFn: FetchAllProgramDetailMast,
    staleTime: Infinity,
  });
};

export const useFetchAllUserGroup = () => {
  return useQuery({
    queryKey: ["getallgroup"],
    queryFn: FetchAllUserGroup,
    staleTime: Infinity,
  });
};

export const useFetchAllFaculity = () => {
  return useQuery({
    queryKey: ["facfetch"],
    queryFn: FetchAllFaculity,
    staleTime: Infinity,
  });
};

export const useFetchAllProgramDetailById = (id) => {
  return useQuery({
    queryKey: ["pgmdtlbyid", id],
    queryFn: () => FetchAllProgramDetaiById(id),
    staleTime: Infinity,
  });
};


export const useFetchAllStudentDetail = () => {
  return useQuery({
    queryKey: ["allstudents"],
    queryFn: FetchAllStudents,
    staleTime: Infinity,
  });
};



