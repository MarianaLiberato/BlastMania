import * as Phaser from 'phaser';
import backend from '../backend'; // Update the path to your backend file
import { MAX_PLAYERS, COUNTDOWN_SECONDS } from '../lobby-constants'; // Update the path to your constants file
import Button from '../components/Button';

export default class LobbyScene extends Phaser.Scene {
  private countdownTimer: Phaser.Time.TimerEvent | null = null;
  private timerText: Phaser.GameObjects.Text | null = null;
  private countdownTime: number = COUNTDOWN_SECONDS;
  private playerData: { username: string; avatar: string }[] = []; // Store player data

  constructor() {
    super({ key: 'LobbyScene' });
  }

  init(data: { playerData: { username: string; avatar: string }[] }): void {
    // Retrieve player data from the preloader scene.
    this.playerData = data.playerData;
  }

  preload(): void {
    this.playerData.forEach((player) => {
      const test = this.load.image(player.avatar, `assets/avatars/${player.avatar}.png`);
    });
  }


  create(): void {
    // Create UI elements, including placeholders for player avatars and usernames.
    this.createPlayerUI();

    // Add a countdown timer text element starting at 30 seconds.
    this.timerText = this.add.text(400, 50, 'Time: 30', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#fff',
    });

    // Implement logic to update the timer.
    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  update(): void {
    // Implement any necessary updates, e.g., player data refresh.
  }

  private updateTimer(): void {
    if (this.countdownTimer && this.timerText) {
      this.countdownTime -= 1;
      this.timerText.setText(`Time: ${this.countdownTime}`);

      if (this.countdownTime <= 0) {
        // Implement logic for what happens when the countdown reaches zero (e.g., start a game).
        this.countdownTimer.remove(); // Stop the countdown timer
      }
    }
  }

  private createPlayerUI(): void {
    console.log(this.playerData)
    // Create UI elements for each player using playerData.
    this.playerData.forEach((player, index) => {
      const x = 100; // Adjust X position based on your layout.
      const y = 100 + index * 80; // Adjust Y position based on your layout.

      // Load and display the player's avatar image using this.add.image.
      const avatarImage = this.add.image(x + 40, y + 60, player.avatar);

      // Set the fixed size for the avatar image.
      const avatarSize = 90;

      // Crop the avatar image to fit within the fixed size.
      avatarImage.setDisplaySize(avatarSize, avatarSize);

      // Display the player's username.
      const usernameText = this.add.text(x + 90, y + 40, player.username, {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#fff',
      });
    });

    // Add a "Join" button
    const joinButton = new Button(this, 400, 500, 'Join', () => {
      // Open the UserInputScene when the "Join" button is clicked.
      this.scene.launch('UserInputScene');
      this.scene.bringToTop('UserInputScene');
    });
  }

  // Method to add a new player to the lobby
  addPlayer(username: string, avatar: string): void {
    // Update the player data with the new player
    this.playerData.push({ username, avatar });

    // Re-create the player UI with the updated player data
    this.createPlayerUI();
  }
}
