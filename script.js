document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const userInput = document.getElementById('user-input');

  // Add a new line to the output
  function addLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  // Command handlers
  const commandHandlers = {
    help: () => addLine('Available commands: help, clear, echo [text]'),
    clear: () => { output.innerHTML = ''; },
    echo: (args) => addLine(args.join(' ')),
  };

  function handleCommand(command) {
    const [cmd, ...args] = command.split(' '); // Split command into name and arguments
    const handler = commandHandlers[cmd];

    // If handler exists in command list call it with arguments, otherwise print error
    if (handler) {
      handler(args); // Call the appropriate handler with arguments
    } else {
      addLine(`Command not found: ${command}`);
    }
  }

  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = userInput.value.trim();
      addLine(`$ ${command}`);
      handleCommand(command);
      userInput.value = '';
    }
  });

  addLine('Welcome to the terminal website! Type "help" for a list of commands.');
});

// Force focus on input field
document.addEventListener('click', () => {
  const userInput = document.getElementById('user-input');
  userInput.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const userInput = document.getElementById('user-input');
    userInput.focus();
  }
});
