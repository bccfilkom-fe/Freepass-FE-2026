/**
 * Feedback RPC
 * Public API for feedback-related operations
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */

import {
  getOrderFeedbackMock,
  submitFeedbackMock,
} from "./_mock/feedback.mock";
import {
  getOrderFeedbackReal,
  submitFeedbackReal,
} from "./_real/feedback.real";
import { createRpc } from "./utils";

/**
 * Get feedback for an order
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getOrderFeedback = createRpc(
  getOrderFeedbackMock,
  getOrderFeedbackReal,
);

/**
 * Submit feedback
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const submitFeedback = createRpc(submitFeedbackMock, submitFeedbackReal);
