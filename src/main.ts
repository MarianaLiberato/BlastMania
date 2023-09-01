import 'phaser';
import LobbyScene from './scenes/LobbyScene'; // Import the LobbyScene
import UserInputScene from './scenes/UserInputScene';
import PreloaderScene from './scenes/PreloadedScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [PreloaderScene, LobbyScene, UserInputScene], // Use LobbyScene as the main scene
};

const game = new Phaser.Game(config);
