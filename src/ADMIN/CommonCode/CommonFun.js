import axiosLogin from "../../Axios/axios";

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
