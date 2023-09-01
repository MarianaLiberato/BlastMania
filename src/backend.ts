class Backend {
    async fetchPlayerData() {
      // Mocked player data for testing.
      return [
        { username: 'Player1', avatar: 'avatar1' },
        { username: 'Player2', avatar: 'avatar2' },
        // ... (up to 15 players)
        // ... (up to 15 players)
      ];
    }
  
    // Implement other backend functions as needed.
  }
  
  const backend = new Backend();
  export default backend;
  