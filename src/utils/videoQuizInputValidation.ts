import { Feedback } from "@/types/quizTypes";

/**
 * Checks if a given year is a four-digit number.
 * @param {string} year - The year to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateYear(year: string): boolean {
  const FIRST_YEAR_OF_APP = 2024;
  const yearInt = parseInt(year, 10);
  if (isNaN(yearInt)) {
    return false; // Safeguard against non-numeric inputs that pass the regex check
  }
  return /^\d{4}$/.test(year) && yearInt >= FIRST_YEAR_OF_APP;
}

/**
 * Verifies that a lesson number is a non-empty string. Additional pattern checks can be added if necessary.
 * @param {string} lessonNumber - The lesson number to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateLessonNumber(lessonNumber: string): boolean {
  return lessonNumber.trim().length > 0;
}

/**
 * Ensures a string is not empty.
 * @param {string} text - The string to check.
 * @returns {boolean} True if not empty, false otherwise.
 */
export function validateNotEmpty(text: string): boolean {
  return text.trim().length > 0;
}

/**
 * Validates a timestamp to be a valid number.
 * @param {number} timestamp - The timestamp to validate.
 * @returns {boolean} True if the timestamp is a valid number, false otherwise.
 */
export function validateTimestamp(timestamp: number): boolean {
  return Number.isInteger(timestamp) && timestamp > 0;
}

/**
 * Validates that the choices array has at least one non-empty string.
 * @param {string[]} choices - The choices array to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateChoices(choices: string[]): boolean {
  return (
    choices.length > 0 && choices.every((choice) => choice.trim().length > 0)
  );
}

/**
 * Validates that the correct answer matches one of the provided choices.
 * @param {string} correctAnswer - The correct answer to validate.
 * @param {string[]} choices - The list of choices.
 * @returns {boolean} True if the correct answer is among the choices, false otherwise.
 */
export function validateCorrectAnswer(
  correctAnswer: string,
  choices: string[],
): boolean {
  return choices.includes(correctAnswer);
}

/**
 * Validates non-empty feedback for correct and incorrect answers.
 * @param {Feedback} feedback - The feedback object to validate.
 * @returns {boolean} True if both feedback entries are non-empty, false otherwise.
 */
export function validateFeedback(feedback: Feedback): boolean {
  return (
    validateNotEmpty(feedback.correct) && validateNotEmpty(feedback.incorrect)
  );
}
