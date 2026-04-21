import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Modal,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFetchAllActiveStudents, useFetchAllDepartmentDocument, useFetchAllDeparmentDocuements } from '../../ADMIN/CommonCode/useQuery'

import { getAuthUser } from '../../constant/Constant';
import { BACKEND_IMAGE } from "../../constant/Static";

const ViewFaculityDocumens = () => {
  const user = getAuthUser();

  const { data: AllStudentData = [] } = useFetchAllActiveStudents();

  const studentDtail = AllStudentData?.find(
    (item) => item?.std_id === user?.user_id
  );

  const { data: documentdetail = [] } =
    useFetchAllDepartmentDocument(studentDtail?.std_dep_id);

  const { data: documentFiles = [] } =
    useFetchAllDeparmentDocuements(studentDtail?.std_dep_id);

  // MERGE DATA
  const mergedDocs = useMemo(() => {
    return documentdetail.map((doc) => {
      const fileMatch = documentFiles.find(
        (f) => f.document_id === doc.document_id
      );

      return {
        ...doc,
        files: fileMatch?.files || [],
      };
    });
  }, [documentdetail, documentFiles]);

  console.log({ mergedDocs });

  // ✅ MODAL STATE
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = (file) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Faculty Documents
      </Typography>

      <Grid container spacing={2}>
        {mergedDocs?.map((doc) => (
          <Grid item xs={12} md={6} lg={4} key={doc.document_id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {doc.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  {doc.description}
                </Typography>

                <Typography mt={1} fontSize={13}>
                  🎓 {doc.program_name} ({doc.program_year_name})
                </Typography>

                <Typography fontSize={13}>
                  📂 {doc.department_name}
                </Typography>
              </CardContent>

              <Box p={2}>
                {doc.files.length > 0 ? (
                  doc.files.map((file, i) => (
                    <Button
                      key={i}
                      variant="contained"
                      fullWidth
                      sx={{ mb: 1 }}
                      onClick={() => handleOpen(file)}
                    >
                      View PDF {i + 1}
                    </Button>
                  ))
                ) : (
                  <Typography color="error">No Files</Typography>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ PDF MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "#000",
            borderRadius: 2,
            p: 2,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ color: "#fff", position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>

          {selectedFile && (
            <iframe
              src={`${BACKEND_IMAGE}${selectedFile.path}`}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewFaculityDocumens;