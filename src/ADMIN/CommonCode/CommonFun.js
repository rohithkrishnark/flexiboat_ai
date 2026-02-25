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
