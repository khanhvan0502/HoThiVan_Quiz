import styled, { css } from "styled-components";

export const QuizWrapper = styled.div`
  background-color: #252d4a;
  color: #ffffff;
  border-radius: 8px;
  width: 400px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ffffff;

  ${(props) =>
    props.isFinish &&
    css`
      justify-content: center;
    `}
`;

export const QuestionNumber = styled.div``;

export const ButtonClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 99px;

  :hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const IconWrapper = styled.span`
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuestionTopic = styled.div``;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const QuestionDifficulty = styled.div``;

export const QuestionContent = styled.div`
  padding-bottom: 10px;
`;

export const QuestionTitle = styled.div`
  padding-bottom: 8px;
  font-size: 20px;
`;

export const Answers = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const Answer = styled.li`
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 4px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${(props) =>
    props.isDisabled &&
    css`
      :hover {
        cursor: not-allowed;
      }
    `}

  ${(props) =>
    props.isCorrect &&
    css`
      &.correct-ans {
        border: 1px solid green;
        color: green;
        background: #fff;
        opacity: 1;
      }
    `}

  &.incorrect-ans {
    border: 1px solid red;
    color: red;
    background: #fff;
    opacity: 1;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  padding: 10px;
  width: auto;
  border-top: 1px solid #ffffff;

  button {
    border: none;
    height: 30px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;

    :hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
`;

export const ButtonFinish = styled.button`
  flex: 1;
  background-color: red;
`;

export const ButtonNext = styled.button`
  flex: 1;
  background-color: green;
`;

export const DifficultyEasy = styled.div`
  background-color: #1b9c85;
  padding: 2px 4px;
  border-radius: 4px;
  color: #fff;
`;

export const DifficultyMedium = styled.div`
  background-color: #f6fa70;
  padding: 2px 4px;
  border-radius: 4px;
  color: #000;
`;

export const DifficultyHard = styled.div`
  background-color: #f79327;
  padding: 2px 4px;
  border-radius: 4px;
  color: #000;
`;

export const FinishHeader = styled.div``;

export const FinishWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const TotalScore = styled.div``;

export const TotalQuestion = styled.div`
  padding: 10px 0;
`;

export const ButtonPlayAgain = styled.button`
  flex: 1;
  background-color: green;
`;

export const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 450px;
  background: #eeeeee;
  border-radius: 8px;
  gap: 20px;
`;

export const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

export const Button = styled.button`
  width: 200px;
  height: 40px;
  font-size: 24px;
  background-color: #00adb5;
  color: #222831;
  border: none;
  border-radius: 4px;
  font-weight: bold;

  :hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const LoadingHeader = styled.div``;

export const LoadingWrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  &.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  &.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
