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

  function FileSysObj(isdir, modified, path, children){
    this.isdir = isdir;
    this.modified = modified; 
    this.path = path;
    this.children = children;
  }
  
  // File system simulation
  let fs = {};

  function addFile(fileObj){
    parent = fileObj.path.slice(0, fileObj.path.slice(0, -2).lastIndexOf("/") + 1);
    if (parent == "")
      parent = "/";
    dirName = fileObj.path.slice(fileObj.path.slice(0, -2).lastIndexOf("/") + 1);
    fs[fileObj.path] = fileObj;
    fs[parent].children.push(dirName);
  }
  
  fs["/"] = new FileSysObj(true, new Date(), "/", []);
  
  addFile(new FileSysObj(true, new Date(), "/home/", []));
  addFile(new FileSysObj(true, new Date(), "/dev/", []));
  addFile(new FileSysObj(true, new Date(), "/usr/", []));
  addFile(new FileSysObj(true, new Date(), "/home/salastro/", []));
  addFile(new FileSysObj(false, new Date(), "/home/salastro/file.txt", []));

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
    ls: () => {
      // List the contents of the current directory
      if (fs[cwd]) {
        addLine(fs[cwd].children.join(' '));
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
      if (args.lenght > 1) {
        addLine('cd: too many arguments');
        return;
      } else if (args.length === 0) {
        cwd = '/';
        return;
      }
      const dir = args[0];
      if (dir === '..') {
        // Go to the parent directory (simplified)
        cwd = cwd.split('/').slice(0, -2).join('/') + '/';
      } else if (fs[`${cwd}${dir}/`]) {
        cwd = `${cwd}${dir}/`;
      } else {
        addLine(`cd: No such directory: ${dir}`);
      }
    },

    // File commands
    cat: (args) => {
      if (args.length === 0) {
        addLine("cat: missing file operand");
        return;
      }

      const filePath = args[0].startsWith("/") ? args[0] : `${cwd}${args[0]}`;
      
      if (fs[filePath] && typeof fs[filePath] === "string") {
        addLine(fs[filePath]);
      } else if (fs[filePath]) {
        addLine(`cat: ${args[0]}: Is a directory`);
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
