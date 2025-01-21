# $ite

$ite is a simple, browser-based terminal emulator that accepts user commands and provides output dynamically. The project is designed to demonstrate JavaScript-based interactivity and modular command handling.

## Features

- **Dynamic Command Execution:** Handles user-input commands and executes corresponding functions.
- **Customizable Commands:** Add new commands easily through a modular handler structure.
- **Predefined Commands:**
  - `help`: Lists all available commands.
  - `clear`: Clears the terminal screen.
  - `echo [text]`: Displays the provided text back to the user.
- **Interactive Terminal UI:** Simulates a terminal environment for user interaction.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/salastro/site.git
   ```
2. Navigate to the project directory:
   ```bash
   cd site
   ```
3. Open `index.html` in your web browser:
   ```bash
   firefox index.html
   ```

## Usage

1. Start typing commands in the input field at the bottom of the terminal.
2. Press `Enter` to execute a command.
3. Use the `help` command to see the list of available commands.

## Adding New Commands

To add new commands:

1. Open the JavaScript file.
2. Locate the `commandHandlers` object.
3. Add a new key-value pair where the key is the command name and the value is the corresponding function. For example:
   ```javascript
   const commandHandlers = {
     ...,
     newCommand: (args) => {
       addLine(`You executed the newCommand with args: ${args.join(' ')}`);
     },
   };
   ```

## Code Structure

- **HTML:**
  - Provides the layout for the terminal interface.
- **CSS:**
  - Styles the terminal UI for a sleek appearance.
- **JavaScript:**
  - Manages user input and command execution.
  - Implements a modular approach to handling commands.

## Known Issues

- No built-in validation for input arguments.
- Limited support for multiline commands or complex parsing.

## Future Enhancements

- Add support for multiline commands.
- Implement command history navigation (e.g., using arrow keys).
- Include additional utility commands like `date`, `calc`, or `time`.
- Provide a configuration file for customizing commands and output styles.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
