import { tileMapInfo } from './tiles.js';

/** @type {HTMLCanvasElement} */
// @ts-ignore
export const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D } */
// @ts-ignore
export const ctx = canvas.getContext('2d');

canvas.width  = tileMapInfo.tileSize;
canvas.height = tileMapInfo.tileSize;

