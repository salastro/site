document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const userInput = document.getElementById("user-input");

  // Add a new line to the output
  function addLine(text) {
    const line = document.createElement("div");
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  // File system simulation
  let fs = {
    "/": ["home/", "bin/", "etc/", "txt"],
    "/txt" : " ",
    "/home/": ["user/"],
    "/home/user/": ["documents/", "pictures/", "notes.txt"],
    "/home/user/notes.txt": "This is a text file with some notes.",
    "/home/user/documents/": [],
    "/home/user/pictures/": [],
    "/bin/": ["bash", "ls", "echo"],
    "/etc/": ["hosts", "passwd"],
  };

  console.log(fs);

  let cwd = "/"; // The initial directory is the root

  // Command handlers
  const commandHandlers = {
    // General commands
    help: () => {
      const commands = Object.keys(commandHandlers).join(", ");
      addLine("Welcome to my website!");
      addLine(`Available commands: ${commands}`);
    },
    clear: () => {
      output.innerHTML = "";
    },
    echo: (args) => addLine(args.join(" ")),

    // Personal commands
    whoami: () => addLine("SalahDin Ahmed Salh Rezk"),
    hostname: () => addLine("salastro"),
    date: () => addLine(new Date().toLocaleString()),

    // File system commands
    ls: (args) => {
      // List the contents of the current directory
      if (args.length > 1) {
        addLine('ls: too many arguments');
        return;
      } else if (args.length === 1) {
        const target = args[0];
        if (fs[`${cwd}${target}/`]) {
          addLine(fs[`${cwd}${target}/`].join(' '));
        } else if (fs[`${cwd}${target}`]) {
          addLine(target);
        } else {
          addLine(`ls: No such file or directory: ${target}`);
        }
        return;
      }
      if (fs[cwd]) {
        addLine(fs[cwd].join(' '));
      } else {
        addLine('ls: No such file or directory');
      }
    },
    pwd: () => {
      // Print the current working directory
      addLine(cwd);
    },
    cd: (args) => {
      // Change the current directory
      if (args.length > 1) {
        addLine('cd: too many arguments');
        return;
      } else if (args.length === 0) {
        cwd = '/';
        return;
      }
      // Remove trailing slash
      const dir = args[0].endsWith('/') ? args[0].slice(0, -1) : args[0];
      if (dir === '..') {
        // Go to the parent directory
        cwd = cwd.split('/').slice(0, -2).join('/') + '/';
      } else if (fs[`${cwd}${dir}/`]) {
        cwd = `${cwd}${dir}/`;
      } else if (dir.startsWith('/') && fs[`${dir}/`]) {
        cwd = `${dir}/`;
      } else {
        addLine(`cd: No such directory: ${dir}`);
      }
    },
    mkdir: (args) => {
      // Create a new directory
      if (args.length === 0) {
        addLine('mkdir: missing operand');
        return;
      }
      const dir = args[0];
      fs[`${cwd}${dir}/`] = []; // Create a new directory
      fs[cwd].push(dir); // Add the new directory to the current directory
    },

    touch: (args) => {
      // Create a new file
      if (args.length === 0) {
        addLine('touch: missing file operand');
        return;
      }
      const file = args[0];
      fs[`${cwd}${file}`] = " "; // Create a new directory
      fs[cwd].push(file); // Add the new directory to the current directory
    },

    // File commands
    cat: (args) => {
      if (args.length === 0) {
        addLine("cat: missing file operand");
        return;
      }

      const filePath = args[0].startsWith("/") ? args[0] : `${cwd}${args[0]}`;
      
      if (fs[filePath]) {
        if (typeof fs[filePath] === "string") {
          addLine(fs[filePath]);
        } else {
          addLine(`cat: ${args[0]}: Is a directory`);
        }
      } else {
        addLine(`cat: ${args[0]}: No such file or directory`);
      }
    },

  };

  function handleCommand(command) {
    const [cmd, ...args] = command.split(" "); // Split command into name and arguments
    const handler = commandHandlers[cmd];

    // If handler exists in command list call it with arguments, otherwise print error
    if (handler) {
      handler(args); // Call the appropriate handler with arguments
    } else {
      addLine(`Command not found: ${command}`);
    }
  }

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = userInput.value.trim();
      addLine(`$ ${command}`);
      handleCommand(command);
      userInput.value = "";
    }
  });

  addLine('Greetings, human! Type "help" to see the available commands.');
});

// Force focus on input field
document.addEventListener("click", () => {
  const userInput = document.getElementById("user-input");
  userInput.focus();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const userInput = document.getElementById("user-input");
    userInput.focus();
  }
});
