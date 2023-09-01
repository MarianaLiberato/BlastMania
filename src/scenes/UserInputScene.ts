import * as Phaser from 'phaser';

class UserInputScene extends Phaser.Scene {
  private gameContainer!: HTMLElement;

  private avatarOptions: string[] = ['avatar1.png', 'avatar2.png']; // Add your avatar filenames here

  constructor() {
    super({ key: 'UserInputScene' });
  }

  preload(): void {
    // Preload any necessary assets (e.g., avatar images)
    this.avatarOptions.forEach((avatar) => {
      this.load.image(avatar, `assets/avatars/${avatar}`);
    });
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

    // Create a container for avatar options
    const avatarContainer = document.createElement('div');
    avatarContainer.id = 'avatar-container';

    // Create and add avatar images with click events
    this.avatarOptions.forEach((avatar) => {
      const avatarImage = document.createElement('img');
      avatarImage.src = `assets/avatars/${avatar}`;
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

        // Implement logic to handle avatar selection (e.g., store the selected avatar)
        console.log(`Selected avatar: ${avatar}`);
      });

      avatarContainer.appendChild(avatarImage);
    });

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    // Append form elements to the form
    form.appendChild(usernameInput);
    form.appendChild(avatarContainer);
    form.appendChild(submitButton);

    // Append the form to the game container
    this.gameContainer.appendChild(form);
  }

  // Other methods for handling form submission and scene transitions
}

export default UserInputScene;
