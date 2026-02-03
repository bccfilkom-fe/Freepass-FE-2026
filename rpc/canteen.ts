/**
 * Canteen RPC
 * Public API for canteen-related operations
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */

import { createRpc } from './utils';
import { getCanteensMock, getCanteenByIdMock, getCanteenMenuMock } from './_mock/canteen.mock';
import { getCanteensReal, getCanteenByIdReal, getCanteenMenuReal } from './_real/canteen.real';

/**
 * Get all canteens
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getCanteens = createRpc(getCanteensMock, getCanteensReal);

/**
 * Get canteen by ID
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getCanteenById = createRpc(getCanteenByIdMock, getCanteenByIdReal);

/**
 * Get menu items for a canteen
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getCanteenMenu = createRpc(getCanteenMenuMock, getCanteenMenuReal);
