import * as Phaser from 'phaser';

class UserInputScene extends Phaser.Scene {
  private gameContainer!: HTMLElement;
  private submitButton: HTMLButtonElement | null = null;

  constructor() {
    super({ key: 'UserInputScene' });
  }

  create(): void {
    this.gameContainer = document.getElementById('game-container') as HTMLElement;

    // Create a form element
    const form = document.createElement('form');
    form.id = 'user-input-form';
    form.style.position = 'absolute';
    form.style.left = '50%';
    form.style.top = '50%';
    form.style.transform = 'translate(-50%, -50%)';

    // Create an input field for the username
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Enter your username';
    usernameInput.required = true;
    usernameInput.id = 'username-input';

    // Create a container for avatar options
    const avatarContainer = document.createElement('div');
    avatarContainer.id = 'avatar-container';

    // Create and add avatar images with click events
    const avatarOptions = ['avatar1', 'avatar2']; // Add your avatar filenames here

    avatarOptions.forEach((avatar) => {
      const avatarImage = document.createElement('img');
      avatarImage.src = `assets/avatars/${avatar}.png`;
      avatarImage.alt = avatar;
      avatarImage.className = 'avatar-option';

      // Set the dimensions of the avatar image
      avatarImage.width = 90;
      avatarImage.height = 90;

      // Add a click event to handle avatar selection
      avatarImage.addEventListener('click', () => {
        // Remove the 'selected-avatar' class from all avatars
        document.querySelectorAll('.avatar-option').forEach((element) => {
          element.classList.remove('selected-avatar');
        });

        // Add the 'selected-avatar' class to the clicked avatar
        avatarImage.classList.add('selected-avatar');
      });

      avatarContainer.appendChild(avatarImage);
    });

    // Create a submit button
    this.submitButton = document.createElement('button');
    this.submitButton.type = 'button'; // Use 'button' type to prevent form submission
    this.submitButton.textContent = 'Submit';

    // Add a click event to handle user submission
    this.submitButton.addEventListener('click', () => {
      const usernameInput = document.getElementById('username-input') as HTMLInputElement;
      const selectedAvatar = document.querySelector('.selected-avatar') as HTMLImageElement;

      // Check if both username and avatar are selected
      if (usernameInput.value && selectedAvatar) {
        // Get the selected avatar filename (e.g., 'avatar1.png')
        const avatar = selectedAvatar.alt;

        // Send the selected username and avatar back to the LobbyScene
        this.scene.get('LobbyScene').events.emit('userInputComplete', {
          username: usernameInput.value,
          avatar,
        });
      } else {
        // Handle the case where username or avatar is not selected
        console.log('Please select a username and avatar.');
      }
    });

    // Append form elements to the form
    form.appendChild(usernameInput);
    form.appendChild(avatarContainer);
    form.appendChild(this.submitButton);

    // Append the form to the game container
    this.gameContainer.appendChild(form);
  }
}

export default UserInputScene;
