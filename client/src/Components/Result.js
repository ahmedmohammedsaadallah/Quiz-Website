import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { CreateAPIEndPoint, ENDPOINTS } from "../api/index";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { getFormattedTime } from "../helper";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import Answer from "./Answer";
const Result = () => {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(0);
  const [AnswersAndQuestions, setAnswersAndQuestions] = useState([]);
  const navigate = useNavigate();
  const fetchAnswers = async (ids) => {
    const selectedQuestions = await CreateAPIEndPoint(
      ENDPOINTS.getAnswers
    ).post(ids);
    return context.selectedOptions.map((x) => ({
      ...x,
      ...selectedQuestions.find((y) => y.qnId == x.QuestionId),
    }));
  };
  const calculateScore = async (ids) => {
    const AnsAndQuest = await fetchAnswers(ids);
    setAnswersAndQuestions(AnsAndQuest);
    let temp_score = AnsAndQuest.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(temp_score);
  };
  const restart = () => {
    setContext({ timeTaken: 0, selectedOptions: [] });
    navigate("/quiz");
  };
  const submitScore = async () => {
    const response = await CreateAPIEndPoint(ENDPOINTS.participant).put(
      context.participantId,
      {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
      }
    );
    try {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {}
  };
  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.QuestionId);
    calculateScore(ids);
  }, []);
  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant="h6">
              Took {getFormattedTime(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={AnswersAndQuestions} />
    </>
  );
};
export default Result;
