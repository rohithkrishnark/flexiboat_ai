import { useQuery } from "@tanstack/react-query";
import {
  FetchAllAluminiDetail,
  FetchAllAluminiDetailById,
  FetchAllBatchStudent,
  FetchAllDeprmentDetail,
  FetchAllDesignation,
  FetchAllFaculity,
  FetchAllMyConnections,
  FetchAllProgramDetaiById,
  FetchAllProgramDetail,
  FetchAllProgramDetailMast,
  FetchAllStudents,
  FetchAllUserGroup,
  FetchExistingPdf,
  fetchLoggedStudetnDetail,
  fetchProfilePicture,
  fetStudentActivity,
  fetStudentActivityMedia,
  fetStudentMedia,
  fetStudentPosts,
  getAllActiveAlumini,
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

export const useFetchAllStudentDetail = (id) => {
  return useQuery({
    queryKey: ["allstudents", id],
    queryFn: () => FetchAllStudents(id),
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const useFetchAllStudentofSeperateDep = (id, progrm_id, year_id) => {
  return useQuery({
    queryKey: ["batchstudent", id, progrm_id, year_id],
    queryFn: () => FetchAllBatchStudent(id, progrm_id, year_id),
    staleTime: Infinity,
    enabled: !!id && !!progrm_id && !!year_id,
  });
};

export const useFetchSingleStudentPost = (std_id) => {
  return useQuery({
    queryKey: ["studentpost", std_id],
    queryFn: () => fetStudentPosts(std_id),
    staleTime: Infinity,
    enabled: !!std_id,
  });
};

export const useFetchProfilePic = (std_id) => {
  return useQuery({
    queryKey: ["mypfpic", std_id],
    queryFn: () => fetchProfilePicture(std_id),
    staleTime: Infinity,
    enabled: !!std_id,
  });
};

export const useFetchSingleStudentMedia = (std_id) => {
  return useQuery({
    queryKey: ["studentmedia", std_id],
    queryFn: () => fetStudentMedia(std_id),
    staleTime: Infinity,
    enabled: !!std_id,
  });
};

export const useFetchSingleStudentActivity = (std_id) => {
  return useQuery({
    queryKey: ["studentactivity", std_id],
    queryFn: () => fetStudentActivity(std_id),
    staleTime: Infinity,
    enabled: !!std_id,
  });
};

export const useFetchLoggedStudentDetail = (std_id) => {
  return useQuery({
    queryKey: ["currentstudent", std_id],
    queryFn: () => fetchLoggedStudetnDetail(std_id),
    staleTime: Infinity,
    enabled: !!std_id,
  });
};

//

export const useFetchStudentActivityMedia = (std_id) => {
  return useQuery({
    queryKey: ["studentactivitymedia", std_id],
    queryFn: () => fetStudentActivityMedia(std_id),
    staleTime: Infinity,
    enabled: !!std_id,
  });
};

//Alumini Fetch
export const useFetchAllAlumini = () => {
  return useQuery({
    queryKey: ["aluminiactive"],
    queryFn: getAllActiveAlumini,
    staleTime: Infinity,
  });
};

export const useFetchMyConnections = ({ user_id, user_type }) => {
  return useQuery({
    queryKey: ["myconnection", user_id, user_type],
    queryFn: () => FetchAllMyConnections(user_id, user_type),
    staleTime: Infinity,
    enabled: !!user_id && !!user_type,
  });
};
