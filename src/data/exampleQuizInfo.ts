import { Video } from "@/types/quizTypes";

export const exampleQuizInfo1: Video = {
  year: "2024",
  lessonNumber: 1,
  videoSrc: "https://www.youtube.com/watch?v=zF_dBk8EPDk",
  category: "World Cultures",
  questions: [
    {
      id: 1,
      question: "What type of meal can French students expect for lunch?",
      timestamp: 19,
      answered: false,
      choices: [
        "A simple sandwich and fruit",
        "A fast food meal",
        "Up to a four-course meal",
        "A snack and a drink",
      ],
      correctAnswer: "Up to a four-course meal",
      feedback: {
        correct:
          "Correct! French students can expect up to a four-course meal at lunch.",
        incorrect:
          "Incorrect. French students actually get up to a four-course meal for lunch.",
      },
    },
    {
      id: 2,
      question: "What is unique about how Japanese kids are served meals?",
      timestamp: 37,
      answered: false,
      choices: [
        "They get fast food",
        "They serve themselves",
        "They have a buffet",
        "They are served by teachers",
      ],
      correctAnswer: "They serve themselves",
      feedback: {
        correct:
          "Correct! In Japan, kids serve themselves to teach healthy cooking and responsibility.",
        incorrect:
          "Incorrect. In Japan, kids serve themselves to learn healthy cooking.",
      },
    },
    {
      id: 3,
      question: "What is a common lunch item for students in Nigeria?",
      timestamp: 53,
      answered: false,
      choices: ["Jollof rice with chicken", "Hamburgers", "Pizza", "Pasta"],
      correctAnswer: "Jollof rice with chicken",
      feedback: {
        correct:
          "Correct! Nigerian students often have jollof rice with chicken and steamed vegetables.",
        incorrect:
          "Incorrect. Nigerian students typically have jollof rice with chicken.",
      },
    },
    {
      id: 4,
      question:
        "Which country was the first to provide free lunch to every student?",
      timestamp: 60,
      answered: false,
      choices: ["United States", "Japan", "Finland", "France"],
      correctAnswer: "Finland",
      feedback: {
        correct:
          "Correct! Finland was the first country to provide free lunch to every student.",
        incorrect:
          "Incorrect. Finland was the pioneer in providing free lunch to every student.",
      },
    },
    {
      id: 5,
      question: "What do students in South Korea use for portion control?",
      timestamp: 22,
      answered: false,
      choices: ["Plastic trays", "Bento boxes", "Steel trays", "Paper plates"],
      correctAnswer: "Steel trays",
      feedback: {
        correct:
          "Correct! South Korean students eat off steel trays that are sectioned for portion control.",
        incorrect:
          "Incorrect. South Korean students use steel trays for portion control.",
      },
    },
  ],
};

export const exampleQuizInfo2: Video = {
  year: "2024",
  lessonNumber: 2,
  videoSrc: "https://www.youtube.com/watch?v=zF_dBk8EPDk",
  category: "Data Analysis",
  questions: [
    {
      id: 1,
      question: "What can numbers and data help us understand?",
      timestamp: 70,
      answered: false,
      choices: [
        "Only mathematical problems",
        "Nothing much, really",
        "Facts about something, like bugs",
        "Only scientific experiments",
      ],
      correctAnswer: "Facts about something, like bugs",
      feedback: {
        correct:
          "Exactly right! Numbers and data can help us understand facts about various topics, including fun ones like bugs.",
        incorrect:
          "Not quite. Numbers and data are powerful tools that help us understand facts about a wide range of topics.",
      },
    },
    {
      id: 2,
      question:
        "What is a way to count using special lines mentioned in the video?",
      timestamp: 203,
      answered: false,
      choices: ["Number lines", "Tally marks", "Drawing circles", "Alphabets"],
      correctAnswer: "Tally marks",
      feedback: {
        correct:
          "Absolutely correct! Tally marks are a simple yet effective way to count and keep track of numbers.",
        incorrect:
          "Not quite correct. The video introduces tally marks as a way to count using special lines.",
      },
    },
    {
      id: 3,
      question:
        "Which bug did most of the speaker's brothers and sisters like the best?",
      timestamp: 341,
      answered: false,
      choices: ["Spider", "Ladybug", "Butterfly", "They didn't like bugs"],
      correctAnswer: "Butterfly",
      feedback: {
        correct:
          "That's right, the butterfly was the most popular bug among the speaker's brothers and sisters!",
        incorrect:
          "Actually, the butterfly was the most popular bug choice among the speaker's brothers and sisters.",
      },
    },
    {
      id: 4,
      question: "What is a pictograph?",
      timestamp: 549,
      answered: false,
      choices: [
        "A way to write pictures with words",
        "A chart that uses pictures to represent data",
        "A graph that shows pictures of insects",
        "An ancient form of writing",
      ],
      correctAnswer: "A chart that uses pictures to represent data",
      feedback: {
        correct:
          "Correct! A pictograph uses pictures to represent and show data in an easy-to-understand way.",
        incorrect:
          "Not quite. A pictograph is specifically a chart that uses pictures to represent data.",
      },
    },
  ],
};

export const exampleQuizInfos: Video[] = [exampleQuizInfo1, exampleQuizInfo2];
