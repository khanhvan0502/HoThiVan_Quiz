import axios from "axios";
import classNames from "classnames";
import { decode } from "html-entities";
import React, { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import LogoQuiz from "../../assets/quiz.png";
import { DIFFICULT_TYPE } from "../../constants/common";
import * as S from "./style";

const Quiz = () => {
  const [isStart, setIsStart] = useState(true);
  const [currentQuestion, setCurQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isStart) {
      getQuestion();
    }
  }, [isFinish, isStart]);

  const getQuestion = () => {
    setLoading(true);
    axios
      .get(`https://opentdb.com/api.php?amount=10`)
      .then(function (response) {
        const result = response?.data?.results.map((q) => {
          return {
            ...q,
            answers: [q?.correct_answer, ...q?.incorrect_answers].sort(),
          };
        });
        setLoading(false);
        setQuestions(result);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
  };

  const handleClose = () => {
    setIsStart(true);
    setIsFinish(false);
    setQuestions([]);
    setCurQuestion(0);
  };

  const handleStartQuiz = () => {
    start();
    setIsStart(false);
    setCorrectAns(0);
  };

  const handlePlayAgain = () => {
    start();
    setIsStart(true);
    setIsFinish(false);
    setQuestions([]);
    setCurQuestion(0);
    setCorrectAns(0);
  };

  const handleNextOption = () => {
    const nexQuestion = currentQuestion + 1;
    setCurQuestion(nexQuestion);
    setIsDisabled(false);
    setCurrentIndex(null);
    setIsCorrect(null);
  };

  const handleFinish = () => {
    end();
    setIsFinish(true);
  };

  const handleClickAnswer = (ans, correctAnswer, index) => {
    setIsDisabled(true);
    setCurrentIndex(index);
    if (ans === correctAnswer) {
      setIsCorrect(true);
      setScore(score + 5);
      setCorrectAns(correctAns + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const renderDifficulty = (difficult) => {
    switch (difficult) {
      case DIFFICULT_TYPE.EASY:
        return <S.DifficultyEasy>easy</S.DifficultyEasy>;
      case DIFFICULT_TYPE.MEDIUM:
        return <S.DifficultyMedium>medium</S.DifficultyMedium>;
      case DIFFICULT_TYPE.HARD:
        return <S.DifficultyHard>hard</S.DifficultyHard>;
      default:
        break;
    }
  };

  function start() {
    setStartTime(Date.now());
  }

  function end() {
    const elapsedTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const elapsedTimeDecimal =
      (Date.now() - startTime) / 1000 - elapsedTimeSeconds;
    const roundedTime =
      elapsedTimeDecimal >= 0.5 ? elapsedTimeSeconds + 1 : elapsedTimeSeconds;
    setElapsedTime(roundedTime);
  }

  const currQues = questions[currentQuestion];
  const isPass = correctAns >= 5;

  return (
    <>
      {isStart ? (
        <S.StartPageWrapper>
          <S.Logo srcSet={LogoQuiz} alt="logo quiz" />
          <S.Button onClick={handleStartQuiz}>Start Quiz!</S.Button>
        </S.StartPageWrapper>
      ) : (
        <S.QuizWrapper>
          <S.HeaderWrapper isFinish={isFinish}>
            {isFinish ? (
              <S.FinishHeader>
                {isPass ? "Congratulations!!" : "Completed!"}
              </S.FinishHeader>
            ) : (
              <>
                {loading ? (
                  <S.LoadingHeader>Loading...</S.LoadingHeader>
                ) : (
                  <>
                    <S.QuestionNumber>
                      Question {currentQuestion + 1} of {questions.length}
                    </S.QuestionNumber>
                    <S.ButtonClose onClick={handleClose}>
                      <S.IconWrapper>
                        <CloseIcon />
                      </S.IconWrapper>
                    </S.ButtonClose>
                  </>
                )}
              </>
            )}
          </S.HeaderWrapper>
          <S.ContentWrapper>
            {isFinish ? (
              <S.FinishWrapper>
                <S.TotalScore>
                  {isPass ? "You are amazing!!" : "Better luck next time"}
                </S.TotalScore>
                <S.TotalQuestion>
                  {`${correctAns}/${questions.length} correct answers in ${elapsedTime} seconds.`}
                </S.TotalQuestion>
              </S.FinishWrapper>
            ) : (
              <>
                {loading ? (
                  <S.LoadingWrapper>
                    <S.Loading className="lds-dual-ring" />
                  </S.LoadingWrapper>
                ) : (
                  <>
                    <S.ContentHeader>
                      <S.QuestionTopic>{currQues?.category}</S.QuestionTopic>
                      <S.QuestionDifficulty>
                        {renderDifficulty(currQues?.difficulty)}
                      </S.QuestionDifficulty>
                    </S.ContentHeader>
                    <S.QuestionContent>
                      <S.QuestionTitle>
                        {decode(currQues?.question)}
                      </S.QuestionTitle>
                      <S.Answers>
                        {currQues?.answers?.map((ans, index) => {
                          const correctAnswer = currQues?.correct_answer;
                          return (
                            <S.Answer
                              key={index}
                              onClick={() =>
                                !isDisabled &&
                                handleClickAnswer(ans, correctAnswer, index)
                              }
                              isDisabled={isDisabled}
                              isCorrect={isCorrect}
                              className={classNames(
                                correctAnswer === ans && "correct-ans",
                                currentIndex === index &&
                                  correctAnswer !== ans &&
                                  "incorrect-ans"
                              )}
                            >
                              {decode(ans)}
                            </S.Answer>
                          );
                        })}
                      </S.Answers>
                    </S.QuestionContent>
                  </>
                )}
              </>
            )}
          </S.ContentWrapper>
          <S.Footer>
            {isFinish ? (
              <S.ButtonPlayAgain onClick={handlePlayAgain}>
                Play again
              </S.ButtonPlayAgain>
            ) : (
              <>
                {currentQuestion + 1 !== questions.length ? (
                  <S.ButtonNext onClick={handleNextOption}>Next</S.ButtonNext>
                ) : (
                  <S.ButtonFinish onClick={handleFinish}>Finish</S.ButtonFinish>
                )}
              </>
            )}
          </S.Footer>
        </S.QuizWrapper>
      )}
    </>
  );
};

export default Quiz;
