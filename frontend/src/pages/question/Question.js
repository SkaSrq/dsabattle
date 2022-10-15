import "./allQuestion.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Split from "react-split";
import axios from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function Question() {
  // <div style={{ width: "100%" }}>
  //       <Box
  //         sx={{
  //           display: "flex",
  //         }}
  //       >
  //         <div className="main-container">
  //           <td dangerouslySetInnerHTML={{ __html: innerHTML }} />
  //         </div>
  //       </Box>
  //       <Box
  //         sx={{
  //           display: "flex",
  //         }}
  //       >
  //         <div className="main-container">Second Part</div>
  //       </Box>
  //     </div>
  const { slug } = useParams();
  const [innerHTML, setInnerHTML] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  console.log(slug);
  useEffect(() => {
    axios.get("scrap/leetcode/" + `${slug}`).then((res) => {
      console.log(res);
      setInnerHTML(res.data);
      setPageLoading(false);
    });
  }, []);
  return (
    // <>
    //   {!pageLoading ? (
    //     <div style={{ width: "100%" }}>
    //       <Box
    //         sx={{
    //           display: "grid",
    //           //   xs: { gridTemplateColumns: "repeat(1, 1fr)" },
    //           //   md: { gridTemplateColumns: "repeat(2, 1fr)" },
    //           gridTemplateColumns: "repeat(2, 1fr)",
    //         }}
    //       >
    //         <Item sx={{ maxHeight: "calc(100vh - 81px);", overflow: "auto" }}>
    //           <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
    //         </Item>
    //         <Item>Here You can right your code.</Item>
    //       </Box>
    //     </div>
    //   ) : (
    //     <div>
    //       <Backdrop
    //         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //         open={pageLoading}
    //       >
    //         <CircularProgress color="inherit" />
    //       </Backdrop>
    //     </div>
    //   )}
    // </>
    // <>
    //   <div style={{ width: "100%" }}>
    //     <Box
    //       sx={{
    //         display: "grid",
    //         //   xs: { gridTemplateColumns: "repeat(1, 1fr)" },
    //         //   md: { gridTemplateColumns: "repeat(2, 1fr)" },
    //         gridTemplateColumns: "repeat(2, 1fr)",
    //       }}
    //     >
    //       <Item sx={{ maxHeight: "calc(100vh - 81px);", overflow: "auto" }}>
    //         {/* <div dangerouslySetInnerHTML={{ __html: innerHTML }} /> */}
    //         <div>
    //           <div>
    //             <p>
    //               Given an array of integers <code>nums</code>&nbsp;and an
    //               integer
    //               <code>target</code>, return
    //               <em>
    //                 indices of the two numbers such that they add up to
    //                 <code>target</code>
    //               </em>
    //               .
    //             </p>
    //             <p>
    //               You may assume that each input would have
    //               <strong>
    //                 <em>exactly</em> one solution
    //               </strong>
    //               , and you may not use the <em>same</em> element twice.
    //             </p>
    //             <p>You can return the answer in any order.</p>
    //             <p>&nbsp;</p>
    //             <p>
    //               <strong>Example 1:</strong>
    //             </p>
    //             <pre>
    //               <strong>Input:</strong> nums = [2,7,11,15], target = 9
    //               <strong>Output:</strong> [0,1]
    //               <strong>Explanation:</strong> Because nums[0] + nums[1] == 9,
    //               we return [0, 1].
    //             </pre>
    //             <p>
    //               <strong>Example 2:</strong>
    //             </p>
    //             <pre>
    //               <strong>Input:</strong> nums = [3,2,4], target = 6
    //               <strong>Output:</strong> [1,2]
    //             </pre>
    //             <p>
    //               <strong>Example 3:</strong>
    //             </p>
    //             <pre>
    //               <strong>Input:</strong> nums = [3,3], target = 6
    //               <strong>Output:</strong> [0,1]
    //             </pre>
    //             <p>&nbsp;</p>
    //             <p>
    //               <strong>Constraints:</strong>
    //             </p>
    //             <ul>
    //               <li>
    //                 <code>
    //                   2 &lt;= nums.length &lt;= 10<sup>4</sup>
    //                 </code>
    //               </li>
    //               <li>
    //                 <code>
    //                   -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
    //                 </code>
    //               </li>
    //               <li>
    //                 <code>
    //                   -10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup>
    //                 </code>
    //               </li>
    //               <li>
    //                 <strong>Only one valid answer exists.</strong>
    //               </li>
    //             </ul>
    //             <p>&nbsp;</p>
    //             <strong>Follow-up:&nbsp;</strong>Can you come up with an
    //             algorithm that is less than&nbsp;
    //             <code>
    //               O(n<sup>2</sup>)&nbsp;
    //             </code>
    //             time complexity?
    //           </div>
    //         </div>
    //       </Item>
    //       <div
    //         style={{
    //           overflow: "auto",
    //           resize: "horizontal",
    //           border: "1px solid",
    //         }}
    //       >
    //         <Item>Here You can right your code.</Item>
    //       </div>
    //     </Box>
    //   </div>
    // </>

    <>
      {!pageLoading ? (
        <Split
          //   sizes={[25, 75]}
          //   minSize={25}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          style={{
            height: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "row",
          }}
          className="split-main"
        >
          <div className="left-split">
            <Item className="block" overflow="auto">
              <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
            </Item>
          </div>
          <div
            // style={{ backgroundColor: "blue" }}
            className="right-split"
          >
            <Item className="block" overflow="auto">
              <div className="code-top">Header</div>
              <div className="code-middle">
                <textarea className="code-area"></textarea>
              </div>
              <div className="code-Bottom">Bottom</div>
            </Item>
          </div>
        </Split>
      ) : (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={pageLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
    </>
  );
}

export default Question;
