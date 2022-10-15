import "./allQuestion.css";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "ID", label: "ID", width: 170, align: "center" },
  { id: "question", label: "Question", width: 100, align: "left" },
  {
    id: "Difficulty",
    label: "Difficulty",
    width: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function AllQuestion() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
    // axios
    //   .get("problems/all", {
    //     params: {
    //       limit: 20,
    //       page: page + 1,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setRows(res.data);
    //   });
  };

  const handleQuestionClick = (e, index) => {
    e.preventDefault();
    navigate("/question/" + rows[index].titleSlug);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    axios
      .get("problems/all", {
        params: {
          limit: 20,
          page: page,
        },
      })
      .then((res) => {
        console.log(res);
        setRows(res.data);
      });
  }, [page]);

  return (
    <>
      <div
        className="all-question"
        style={
          {
            //   paddingTop: "10px",
            //   paddingLeft: "25px",
            //   paddingRight: "25px",
            //   boxSizing: "border-box",
            //   paddingBottom: "25px",
            //   overflow: "hidden",
          }
        }
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer className="table">
            <Table
              className="only-table"
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
                {rows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row.questionId}
                      onClick={(e) => handleQuestionClick(e, index)}
                    >
                      <TableCell style={{ width: "10%" }} align="center">
                        {row.questionId}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell style={{ width: "10%" }} align="center">
                        <div
                          style={{
                            // backgroundColor: "#adadeb",
                            borderRadius: "5px",
                          }}
                        >
                          {row.difficulty == "Easy" ? (
                            <Typography
                              variant="subtitle2"
                              component="h2"
                              sx={{
                                color: "#1f7a1f",
                                fontWeight: "bold",
                              }}
                            >
                              Easy
                            </Typography>
                          ) : row.difficulty === "Hard" ? (
                            <Typography
                              variant="subtitle2"
                              component="h2"
                              sx={{
                                color: "#ff0000",
                                fontWeight: "bold",
                              }}
                            >
                              Hard
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle2"
                              component="h2"
                              sx={{
                                color: "#e2b032",
                                fontWeight: "bold",
                              }}
                            >
                              Medium
                            </Typography>
                          )}
                        </div>
                      </TableCell>

                      {/* {columns.map((column) =>{
                        <TableCell align={column.align}>{}</TableCell>
                      })} */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <Stack
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Pagination
              sx={{ flex: "1" }}
              boundaryCount={1}
              siblingCount={0}
              sixe="large"
              count={2400 / rowsPerPage}
              defaultPage={1}
              variant="outlined"
              color="primary"
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </Paper>
      </div>
    </>
  );
}
// export default AllQuestion;
