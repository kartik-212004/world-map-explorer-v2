'use client';

let clickSound: HTMLAudioElement;
let closeSound: HTMLAudioElement;
let successSound: HTMLAudioElement;
let bordercrossSound: HTMLAudioElement;

if (typeof window !== 'undefined') {
  clickSound = new Audio("/audio/click.mp3");
  closeSound = new Audio("/audio/close.mp3");
  successSound = new Audio("/audio/sucessfull.mp3");
  bordercrossSound = new Audio("/audio/border-crossing.mp3");
}

export { clickSound, closeSound, successSound, bordercrossSound };
