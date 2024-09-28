"use client";

import React, { useState, useEffect } from "react";
import styles from "./Training.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const piDigits =
  "14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019";

const groupDigits = (digits, groupSize = 5) => {
  return digits.match(new RegExp(`.{1,${groupSize}}`, "g")) || [];
};

const piGroups = groupDigits(piDigits);

const Training = () => {
  const [mode, setMode] = useState("basic");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const generateBasicQuestion = () => {
    const isSequentialNumber = Math.random() < 0.5;
    if (isSequentialNumber) {
      const index = Math.floor(Math.random() * piGroups.length);
      setQuestion(`What are the digits for sequential number ${index + 1}?`);
      return { type: "sequential", correct: piGroups[index], index: index + 1 };
    } else {
      const group = piGroups[Math.floor(Math.random() * piGroups.length)];
      setQuestion(`What is the sequential number for the digits ${group}?`);
      return {
        type: "digits",
        correct: group,
        index: piGroups.indexOf(group) + 1,
      };
    }
  };

  const generateMatrixQuestion = () => {
    const index = Math.floor(Math.random() * (piGroups.length - 2)) + 1;
    setQuestion(
      `For the chunk "${piGroups[index]}", what are the chunks before and after?`
    );
    return {
      before: piGroups[index - 1],
      after: piGroups[index + 1],
      current: piGroups[index],
    };
  };

  const checkAnswer = () => {
    if (mode === "basic") {
      const userAnswer = answer.trim();
      const correct =
        currentQuestion.type === "sequential"
          ? userAnswer === currentQuestion.correct
          : parseInt(userAnswer) === currentQuestion.index;

      if (correct) {
        setFeedback("Correct!");
        setScore(score + 1);
      } else {
        setFeedback(
          `Incorrect. The correct answer is ${
            currentQuestion.type === "sequential"
              ? currentQuestion.correct
              : currentQuestion.index
          }.`
        );
      }
    } else {
      const [before, after] = answer.split(",").map((a) => a.trim());
      const correctBefore = before === currentQuestion.before;
      const correctAfter = after === currentQuestion.after;

      if (correctBefore && correctAfter) {
        setFeedback("Correct!");
        setScore(score + 1);
      } else {
        setFeedback(
          `Incorrect. The correct answer is ${currentQuestion.before}, ${currentQuestion.after}.`
        );
      }
    }
    setAnswer("");
    generateQuestion();
  };

  const generateQuestion = () => {
    setCurrentQuestion(
      mode === "basic" ? generateBasicQuestion() : generateMatrixQuestion()
    );
  };

  useEffect(() => {
    generateQuestion();
  }, [mode]);

  return (
    <div className={styles.container}>
      <h1>Pi Matrix App</h1>
      <p>Current score: {score}</p>
      <Select onValueChange={setMode} defaultValue={mode}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="basic">Basic Training</SelectItem>
          <SelectItem value="matrix">Pi Matrix Training</SelectItem>
        </SelectContent>
      </Select>
      <p>{question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer..."
        className={styles.input}
      />
      <button className={styles.button} onClick={checkAnswer}>
        Check
      </button>
      <p>{feedback}</p>
    </div>
  );
};

export default Training;
