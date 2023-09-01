// PreloaderScene.ts

import * as Phaser from 'phaser';
import backend from '../backend';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  async preload(): Promise<void> {
    // Fetch player data from the backend.
    const playerData = await backend.fetchPlayerData();

    // Once everything is preloaded, transition to the lobby scene.
    this.scene.start('LobbyScene', { playerData });
  }
}
