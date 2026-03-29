import { axiosLogin } from "../../Axios/axios";
import {
  errorNotify,
  infoNotify,
  warningNotify,
} from "../../constant/Constant";

export const FetchExistingPdf = async () => {
  try {
    const response = await axiosLogin.get("/training/existing");
    const { success, data } = response.data;
    //  Files exist
    if (success === 1) return data;
    //  No files found
    if (success === 2) return [];
    // fallback (just in case)
    return [];
  } catch (error) {
    console.error("FetchExistingPdf error:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch PDFs");
  }
};

export const FetchAllAluminiDetail = async () => {
  try {
    const response = await axiosLogin.get("/training/alumini/fetchall");
    const { success, data } = response.data;

    console.log({
      success,
      data,
    });

    //  Record exist
    if (success !== 0) return data;
    //  No Record found
    return [];
  } catch (error) {
    console.error("FetchExistingPdf error:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch PDFs");
  }
};

export const FetchAllAluminiDetailById = async (id) => {
  try {
    const response = await axiosLogin.post("/training/alumini/fetchallbyid", {
      alumini_slno: id,
    });
    const { success, data } = response.data;
    //  Record exist
    if (success !== 0) return data;
    //  No Record found
    return [];
  } catch (error) {
    console.error("FetchExistingPdf error:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch PDFs");
  }
};

export const FetchAllDeprmentDetail = async () => {
  try {
    const response = await axiosLogin.get("/training/department/get");
    const { success, data } = response.data;
    //  Record exist
    if (success !== 0) return data;
    //  No Record found
    return [];
  } catch (error) {
    console.error("FetchExistingPdf error:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch PDFs");
  }
};

export const FetchAllProgramDetail = async () => {
  try {
    const response = await axiosLogin.get("/training/program/get");
    const { success, data } = response.data;
    if (success === 1) return data;

    return [];
  } catch (error) {
    console.error("FetchAllProgramDetail error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch programs",
    );
  }
};

export const FetchAllDesignation = async () => {
  try {
    const response = await axiosLogin.get("/training/designation/get");
    const { success, data } = response.data;

    if (success === 1) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const FetchAllProgramDetailMast = async () => {
  try {
    const response = await axiosLogin.get("/training/program-detail/get");
    const { success, data } = response.data;

    if (success === 1) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const FetchAllUserGroup = async () => {
  try {
    const response = await axiosLogin.get("/training/group/get");
    const { success, data } = response.data;

    if (success === 1) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const FetchAllFaculity = async () => {
  try {
    const response = await axiosLogin.get("/training/faculty/fetchall");
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};
export const getAllActiveAlumini = async () => {
  try {
    const response = await axiosLogin.get("/alumini/getall");
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const fetchAllActiveStudents = async () => {
  try {
    const response = await axiosLogin.get("/student/totalstudents");
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const fetchchatuser = async (userId) => {
  if (!userId) return warningNotify("Id is Missing");
  try {
    const response = await axiosLogin.get(`/chat/users/${userId}`);
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const fetchAllAluminipostDetail = async () => {
  try {
    const response = await axiosLogin.post(`/alumini/posts/fullpostfetch`);
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const fetchAllAluminipostMediaDetail = async () => {
  try {
    const response = await axiosLogin.post(`/alumini/posts/fullpostfetchmedia`);
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const FetchAllProgramDetaiById = async (id) => {
  try {
    const response = await axiosLogin.get(`/training/program-detail/get/${id}`);
    const { success, data } = response.data;

    if (success === 1) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const FetchAllMyConnections = async (user_id, user_type) => {
  if (!user_id || !user_type) return warningNotify("Id is Missing");
  try {
    const response = await axiosLogin.post("/student/get-connection", {
      user_id,
      user_type,
    });
    const { success, data } = response.data;
    if (success === 1) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const FetchAllStudents = async (id) => {
  try {
    const response = await axiosLogin.post("/student/all", {
      dep_id: id,
    });
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const FetchAllBatchStudent = async (id, prgrm_id, year_id) => {
  try {
    const response = await axiosLogin.post("/student/batchstudent", {
      dep_id: id,
      std_program_id: prgrm_id,
      std_program_year: year_id,
    });
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetStudentPosts = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.post("/student/allpost", {
      std_id: id,
    });
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetStudentMedia = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");

  try {
    const response = await axiosLogin.get(`/student/fullmedia/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetStudentActivity = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.post("/student/activity/allpost", {
      std_id: id,
    });
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchProfilePicture = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/student/myprofilepic/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchLoggedStudetnDetail = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.post("/student/loggedstudentdetail", {
      std_id: id,
    });
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }
    if (success === 2) {
      return data || [];
    }
    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetStudentActivityMedia = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/student/activity/full/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchallAluminiPosts = async (id) => {
  if (!id || id === null)
    return warningNotify("Alumini Session is Expired Login to Continue");

  try {
    const response = await axiosLogin.post(`/alumini/posts/getall`, {
      alum_id: id,
    });
    const { success, data, message } = response.data;

    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      // infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchallAluminiEventPosts = async (id) => {
  if (!id || id === null)
    return warningNotify("Alumini Session is Expired Login to Continue");

  try {
    const response = await axiosLogin.post(`/alumini/events/getall`, {
      alum_id: id,
    });
    const { success, data, message } = response.data;

    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      // infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllSingleEventMedia = async (id) => {
  if (!id || id === null)
    return warningNotify("Alumini Session is Expired Login to Continue");

  try {
    const response = await axiosLogin.get(`/alumini/event/fullmedia/${id}`);

    const { success, data, message } = response.data;

    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      // infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllSingleMedia = async (id) => {
  if (!id || id === null)
    return warningNotify("Alumini Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/alumini/post/fullmedia/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      // infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAluminiDetailSinlge = async (id) => {
  if (!id || id === null)
    return warningNotify("Alumini Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.post("/alumini/getsingledetail", {
      alum_id: id,
    });
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAluminiProfilePicture = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/alumini/myprofilepic/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllaluminiHeading = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/alumini/profile/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllAluminiEduction = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/alumini/education/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllAluminiExperience = async (id) => {
  if (!id || id === null)
    return warningNotify("Student Session is Expired Login to Continue");
  console.log({ id });

  try {
    const response = await axiosLogin.get(`/alumini/experience/${id}`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const getMessages = async ({ user1, user2, user1_type, user2_type }) => {
  if (!user1 || !user2 || !user1_type || !user2_type)
    return warningNotify("Missing fields");
  try {
    const response = await axiosLogin.get(`/chat/messages`, {
      params: {
        user1,
        user2,
        user1_type,
        user2_type,
      },
    });

    const { success, data } = response.data;

    if (success === 1 || success === 2) return data;

    return [];
  } catch (error) {
    throw new Error("Failed to fetch messages");
  }
};

export const fetchAllAluminiEventDetail = async () => {
  try {
    const response = await axiosLogin.post(
      `/alumini/events/getAllAluminiEvent`,
    );
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const fetchAllAluminiEvenMedialDetail = async () => {
  try {
    const response = await axiosLogin.post(
      `/alumini/events/getAllAluminiEventMedia`,
    );
    const { success, data, message } = response.data;
    if (success === 0) return errorNotify(message);
    if (success === 1 || success === 2) return data;
    return [];
  } catch (error) {
    throw new Error("Failed to fetch designation");
  }
};

export const fetchAllStudentActivityDtail = async (id) => {
  if (!id || id === null)
    return warningNotify("Faculity Session is Expired Login to Continue");
  try {
    const response = await axiosLogin.post(
      `/student/activity/getallstudent/detail`,
      {
        dep_id: id,
      },
    );
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllStudtnActivityMediaDetail = async () => {
  try {
    const response = await axiosLogin.get(`/student/activity/allstudent/post`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};

export const fetchAllAdminAlerts = async () => {
  try {
    const response = await axiosLogin.get(`/training/alert/get`);
    const { success, data, message } = response.data;
    if (success === 0) {
      errorNotify(message);
      return [];
    }

    if (success === 2) {
      infoNotify(message);
      return data || [];
    }

    if (success === 1) {
      return data || [];
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
};
