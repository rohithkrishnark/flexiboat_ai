import { useQuery } from "@tanstack/react-query";
import {
  fetchAllActiveStudents,
  fetchAllAdminAlerts,
  FetchAllAluminiDetail,
  FetchAllAluminiDetailById,
  fetchAllAluminiEduction,
  fetchAllAluminiEvenMedialDetail,
  fetchAllAluminiEventDetail,
  fetchallAluminiEventPosts,
  fetchAllAluminiExperience,
  fetchAllaluminiHeading,
  fetchAllAluminipostDetail,
  fetchAllAluminipostMediaDetail,
  fetchallAluminiPosts,
  FetchAllBatchStudent,
  FetchAllDeprmentDetail,
  FetchAllDesignation,
  FetchAllFaculity,
  FetchAllMyConnections,
  FetchAllProgramDetaiById,
  FetchAllProgramDetail,
  FetchAllProgramDetailMast,
  fetchAllSingleEventMedia,
  fetchAllSingleMedia,
  fetchAllStudentActivityDtail,
  FetchAllStudents,
  fetchAllStudtnActivityMediaDetail,
  FetchAllUserGroup,
  fetchAluminiDetailSinlge,
  fetchAluminiProfilePicture,
  fetchchatuser,
  FetchExistingPdf,
  fetchlatestChatdtail,
  fetchLoggedStudetnDetail,
  fetchProfilePicture,
  fetStudentActivity,
  fetStudentActivityMedia,
  fetStudentMedia,
  fetStudentPosts,
  getAllActiveAlumini,
  getMessages,
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

export const useFetchSingleAluminiPost = (alum_id) => {
  return useQuery({
    queryKey: ["alumidposts", alum_id],
    queryFn: () => fetchallAluminiPosts(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFetchAlumniFullMediaSingle = (alum_id) => {
  return useQuery({
    queryKey: ["alumsingle", alum_id],
    queryFn: () => fetchAllSingleMedia(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFetchSingleAluminiEvent = (alum_id) => {
  return useQuery({
    queryKey: ["aluminievent", alum_id],
    queryFn: () => fetchallAluminiEventPosts(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFetchAlumniFullEventMedia = (alum_id) => {
  return useQuery({
    queryKey: ["aluminieventpost", alum_id],
    queryFn: () => fetchAllSingleEventMedia(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFetchSingleAluminiDetail = (alum_id) => {
  return useQuery({
    queryKey: ["singlealumini", alum_id],
    queryFn: () => fetchAluminiDetailSinlge(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFetchAluminiProfilePic = (alum_id) => {
  return useQuery({
    queryKey: ["aluminiprofilepic", alum_id],
    queryFn: () => fetchAluminiProfilePicture(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFectchAluminiHeading = (alum_id) => {
  return useQuery({
    queryKey: ["aluminiheading", alum_id],
    queryFn: () => fetchAllaluminiHeading(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFectchAluminiEducation = (alum_id) => {
  return useQuery({
    queryKey: ["alumedu", alum_id],
    queryFn: () => fetchAllAluminiEduction(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFectchAluminiExperience = (alum_id) => {
  return useQuery({
    queryKey: ["alumexp", alum_id],
    queryFn: () => fetchAllAluminiExperience(alum_id),
    staleTime: Infinity,
    enabled: !!alum_id,
  });
};

export const useFetchMessages = ({ user1, user2, user1_type, user2_type }) => {


  return useQuery({
    queryKey: ["messages", user1, user2, user1_type, user2_type],

    queryFn: () =>
      getMessages({
        user1,
        user2,
        user1_type,
        user2_type,
      }),

    enabled: !!user1 && !!user2 && !!user1_type && !!user2_type,
    staleTime: Infinity,
  });
};

export const useFetchAllActiveStudents = () => {
  return useQuery({
    queryKey: ["activestudent"],
    queryFn: fetchAllActiveStudents,
    staleTime: Infinity,
  });
};

export const useFetchChatUsers = (userId) => {
  return useQuery({
    queryKey: ["chatUsers", userId],
    queryFn: () => fetchchatuser(userId),
    enabled: !!userId,
    staleTime: Infinity,
  });
};




export const useFectchAllAlumini = () => {
  return useQuery({
    queryKey: ["aluminipost"],
    queryFn: fetchAllAluminipostDetail,
    staleTime: Infinity,
  });
};


export const useFectchAllAluminiPostDetail = () => {
  return useQuery({
    queryKey: ["aluminimedia"],
    queryFn: fetchAllAluminipostMediaDetail,
    staleTime: Infinity,
  });
};



export const useFectchAllAluminiEventDetail = () => {
  return useQuery({
    queryKey: ["aluminievnt"],
    queryFn: fetchAllAluminiEventDetail,
    staleTime: Infinity,
  });
};


export const useFetchAllAluminiEvenMedialDetail = () => {
  return useQuery({
    queryKey: ["alumineventmedia"],
    queryFn: fetchAllAluminiEvenMedialDetail,
    staleTime: Infinity,
  });
};




export const useFetchAllStudtentAcitivty = (dep_id) => {
  return useQuery({
    queryKey: ["studentallact"],
    queryFn: ()=>fetchAllStudentActivityDtail(dep_id),
    staleTime: Infinity,
    enabled:!!dep_id
  });
};


export const useFetchAllAcitivtyMediaDetail = () => {
  return useQuery({
    queryKey: ["studentallactmedia"],
    queryFn: fetchAllStudtnActivityMediaDetail,
    staleTime: Infinity,
  });
};



export const useFetchAllAlerts = () => {
  return useQuery({
    queryKey: ["adminalert"],
    queryFn: fetchAllAdminAlerts,
    staleTime: Infinity,
  });
};



export const useFetchLatestChat = () => {
  return useQuery({
    queryKey: ["latestchat"],
    queryFn: fetchlatestChatdtail,
    staleTime: Infinity,
  });
};