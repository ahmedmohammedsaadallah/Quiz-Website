import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { BASE_URL, CreateAPIEndPoint, ENDPOINTS } from "../api/index";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { getFormattedTime } from "../helper";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [Questions, setQuestions] = useState([]);
  const [QnIdx, setQnIdx] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();
  let timer;
  const updateAnswer = (QuestionId, OptionIdx) => {
    console.log(QuestionId, OptionIdx);
    const temp = [...context.selectedOptions];
    temp.push({
      QuestionId,
      selected: OptionIdx,
    });
    if (QnIdx < 4) {
      setContext({ selectedOptions: [...temp] });
      setQnIdx(QnIdx + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken });
      navigate("/result");
    }
    console.log(context);
  };
  const startTimer = () => {
    setInterval(() => {
      timer = setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };
  const fetchQuestions = async () => {
    const result = await CreateAPIEndPoint(ENDPOINTS.question).fetch();
    setQuestions(result);
    startTimer();
    return result;
  };
  useEffect(() => {
    if (context.participantId == 0) navigate("/");
    setContext({ timeTaken: 0, selectedOptions: [] });
    setQuestions([]);
    fetchQuestions();
    return () => {
      clearInterval(timer);
    };
  }, []);
  return Questions.length != 0 ? (
    <Card
      sx={{
        maxWidth: 640,
        mx: "auto",
        mt: 5,
        "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
      }}
    >
      <CardHeader
        title={"Question " + (QnIdx + 1) + " of 5"}
        action={<Typography>{getFormattedTime(timeTaken)}</Typography>}
      />
      <Box>
        <LinearProgress variant="determinate" value={((QnIdx + 1) * 100) / 5} />
      </Box>
      {Questions[QnIdx].imageName != null ? (
        <CardMedia
          component="img"
          image={BASE_URL + "Images/" + Questions[QnIdx].imageName}
          sx={{ width: "auto", m: "10px auto" }}
        />
      ) : null}
      <CardContent>
        <Typography variant="h6">{Questions[QnIdx].qnInWords}</Typography>
      </CardContent>
      <List>
        {Questions[QnIdx].options.map((item, idx) => (
          <ListItemButton
            key={idx}
            disableRipple
            onClick={() => updateAnswer(Questions[QnIdx].qnId, idx)}
          >
            <div>
              <b>{String.fromCharCode(65 + idx) + "."}</b>
              {item}
            </div>
          </ListItemButton>
        ))}
      </List>
    </Card>
  ) : null;
};
export default Quiz;
