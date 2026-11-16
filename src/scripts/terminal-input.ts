export {};

const terminal = document.querySelector<HTMLElement>("[data-terminal]");
const form = terminal?.querySelector("form");
const input = form?.querySelector("input");
const log = terminal?.querySelector<HTMLElement>(".terminal-log");
const pathLabel = terminal?.querySelector("[data-terminal-path]");
const controls = terminal?.querySelector<HTMLElement>(
  "[data-terminal-controls]",
);
const projectList =
  terminal?.querySelector<HTMLTemplateElement>("[data-projects]");
const entryTemplate = terminal?.querySelector<HTMLTemplateElement>(
  "[data-entry-template]",
);
const shortcut = document.querySelector<HTMLButtonElement>(
  "[data-open-terminal]",
);

if (
  terminal &&
  form &&
  input &&
  log &&
  pathLabel &&
  controls &&
  projectList &&
  entryTemplate
) {
  const initialResponse = log.querySelector("[data-response]");
  const projects = Array.from(
    projectList.content.querySelectorAll("a"),
    (link) => link.hash.slice(1),
  );
  const files = Array.from(
    document.querySelectorAll<HTMLElement>("[data-terminal-file]"),
  );
  const sections = ["inicio", "proyectos", "sobre-mi", "contacto"];
  const home = "~/portfolio";
  const directories = ["proyectos", "premios"];
  const commands = [
    "whoami",
    "pwd",
    "cd",
    "ls",
    "cat",
    "open",
    "./contacto.sh",
    "help",
    "clear",
  ];
  const history: string[] = [];
  let directory = "";
  let historyIndex = 0;
  let draft = "";

  function currentPath() {
    return directory ? home + "/" + directory : home;
  }

  function resolvePath(path: string) {
    if (path === "~" || path === home) return "";
    const rooted = path.startsWith(home + "/") || path.startsWith("/");
    const parts = rooted || !directory ? [] : [directory];
    const relativePath = path.startsWith(home + "/")
      ? path.slice(home.length)
      : path;
    for (const part of relativePath.split("/")) {
      if (part === "..") parts.pop();
      else if (part && part !== ".") parts.push(part);
    }
    return parts.join("/");
  }

  function completions(value: string) {
    if (!value.includes(" ")) return commands;
    const [name, path = ""] = value.split(" ");
    const slash = path.lastIndexOf("/");
    const prefix = path.slice(0, slash + 1);
    const parent = resolvePath(prefix);
    let names: string[] = [];

    if (name === "cd" || name === "ls") {
      if (!parent) names = directories;
    } else if (name === "cat" || name === "open") {
      if (parent === "proyectos") names = projects;
      else if (!parent) {
        names =
          name === "cat"
            ? [
                "proyectos/",
                ...files.map((file) => file.dataset.terminalFile ?? ""),
              ]
            : [...sections, "proyectos/"];
      }
    }
    return names.map((entry) => name + " " + prefix + entry);
  }

  controls.hidden = false;
  const focusInput = () => {
    input.focus({ preventScroll: true });
    terminal.scrollIntoView({ block: "nearest" });
  };

  if (shortcut) {
    shortcut.hidden = false;
    shortcut.addEventListener("click", focusInput);
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.key !== "/" ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      event.defaultPrevented ||
      event.isComposing
    )
      return;
    if (
      event.target instanceof HTMLElement &&
      (event.target.isContentEditable ||
        event.target.closest("input, textarea, select"))
    )
      return;

    event.preventDefault();
    focusInput();
  });

  function list(entries: (string | Node)[]) {
    const list = document.createElement("ul");
    for (const entry of entries) {
      const item = document.createElement("li");
      item.append(entry);
      list.append(item);
    }
    return list;
  }

  function paragraph(text: string) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }

  function linksFrom(container: Element | null | undefined) {
    return Array.from(container?.querySelectorAll("a") ?? [], (source) => {
      const link = document.createElement("a");
      link.href = source.href;
      link.textContent =
        source.protocol === "mailto:"
          ? source.pathname
          : (source.textContent?.trim() ?? source.href);
      link.target = source.target;
      link.rel = source.rel;
      return link;
    });
  }

  function read(path: string, project: HTMLElement | null): (string | Node)[] {
    if (project) {
      const description =
        project.querySelector("[data-terminal-description]")?.textContent ?? "";
      const output = Array.from(
        project.querySelectorAll("[data-terminal-output] > div"),
        (row) =>
          Array.from(row.children, (part) => part.textContent?.trim()).join(
            " · ",
          ),
      );
      const links = linksFrom(
        project.querySelector("[data-terminal-project-links]"),
      );
      return [paragraph(description), list(output), list(links)];
    }

    const file = files.find((entry) => entry.dataset.terminalFile === path);
    if (!file) return ["Archivo no encontrado. Usá ls para ver los archivos."];
    const paragraphs = Array.from(file.querySelectorAll("p"), (entry) =>
      entry.innerText.trim(),
    );
    return (paragraphs.length ? paragraphs : [file.innerText.trim()]).map(
      paragraph,
    );
  }

  const run = (command: string) => {
    if (!command) return;

    history.push(command);
    if (history.length > 30) history.shift();
    historyIndex = history.length;
    draft = "";
    input.value = "";

    const [verb, ...args] = command.toLowerCase().split(" ");
    const name = resolvePath(verb) === "contacto.sh" ? "contacto" : verb;
    const path = resolvePath(args[0] ?? "");
    const slug = path.startsWith("proyectos/")
      ? path.slice(10).replace(/(\/readme)?\.md$/, "")
      : path;
    const project =
      args[0] && projects.includes(slug) ? document.getElementById(slug) : null;
    let response: (string | Node)[];
    let destination: HTMLElement | null = null;

    if (args.length > 1) {
      response = [
        "Usá un solo nombre de archivo o sección. Escribí help para ver ejemplos.",
      ];
    } else {
      switch (name) {
        case "clear":
          log.replaceChildren();
          log.removeAttribute("tabindex");
          return;
        case "whoami":
          response = Array.from(initialResponse?.childNodes ?? [], (node) =>
            node.cloneNode(true),
          );
          break;
        case "pwd":
          response = [currentPath()];
          break;
        case "cd":
          if (args[0] && path && !directories.includes(path)) {
            response = ["cd: No existe esa carpeta."];
            break;
          }
          directory = args[0] ? path : "";
          pathLabel.textContent = currentPath();
          response = [currentPath()];
          break;
        case "ls":
        case "proyectos":
          if (path === "proyectos" || name === "proyectos") {
            response = [projectList.content.cloneNode(true)];
          } else if (path === "premios") {
            const awards = document.querySelectorAll(
              "[data-terminal-awards] tbody tr",
            );
            response = [
              list(
                Array.from(awards, (award) =>
                  Array.from(award.children, (part) => part.textContent?.trim())
                    .filter(Boolean)
                    .join(" — "),
                ),
              ),
            ];
          } else if (!path) {
            response = [
              list([
                ...directories.map((folder) => folder + "/"),
                ...files.map((file) => file.dataset.terminalFile ?? ""),
                "contacto.sh",
              ]),
            ];
          } else {
            response = ["Carpeta no encontrada. Usá ls para ver las carpetas."];
          }
          break;
        case "cat":
        case "about":
        case "sobre-mi":
          response =
            name === "cat" ? read(path, project) : read("sobre-mi.md", null);
          break;
        case "contacto":
        case "./contacto.sh":
          response = [
            list(linksFrom(document.querySelector("[data-terminal-contact]"))),
          ];
          break;
        case "open":
          destination =
            project ??
            (args[0] && sections.includes(path)
              ? document.getElementById(path)
              : null);
          response = destination
            ? [
                "Abriendo " +
                  (destination
                    .querySelector("h1, h2, h3")
                    ?.textContent?.trim() ?? path) +
                  "…",
              ]
            : [
                "No encontré esa sección o proyecto. Escribí help para ver ejemplos.",
              ];
          break;
        case "help":
          response = [
            list([
              "ls · Listar archivos y carpetas",
              "cd proyectos · Entrar a una carpeta",
              "cd .. · Subir un nivel",
              "cd · Volver a ~/portfolio",
              "ls ./proyectos · Listar proyectos",
              "cat ./proyectos/hydroengine · Leer una ficha",
              "cat ./sobre-mi.md · Leer la bio",
              "open ./proyectos/hydroengine · Ir a un proyecto",
              "open ./contacto · Ir a una sección",
              "./contacto.sh · Ver correo y redes",
              "whoami · Ver quién soy",
              "pwd · Ver la ubicación",
              "clear · Limpiar la pantalla",
            ]),
            paragraph("↑ y ↓ recorren el historial. Tab completa el comando."),
          ];
          break;
        default:
          response = [
            "Comando desconocido. Escribí help para ver las opciones.",
          ];
      }
    }

    const entry = entryTemplate.content.firstElementChild?.cloneNode(
      true,
    ) as HTMLElement;
    entry.querySelector("[data-command-text]")!.textContent = command;
    entry.querySelector("[data-response]")!.append(...response);
    log.append(entry);
    if (log.childElementCount > 30) log.firstElementChild?.remove();
    if (log.scrollHeight > log.clientHeight) {
      log.tabIndex = 0;
      log.scrollTop = Math.min(
        log.scrollHeight - log.clientHeight,
        log.scrollTop +
          entry.getBoundingClientRect().top -
          log.getBoundingClientRect().top -
          12,
      );
    }

    if (destination) {
      destination.tabIndex = -1;
      if (window.location.hash === "#" + destination.id) {
        destination.scrollIntoView();
      } else {
        window.location.hash = destination.id;
      }
      destination.focus({ preventScroll: true });
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run(input.value.trim().replace(/\s+/g, " "));
  });

  for (const button of controls.querySelectorAll<HTMLButtonElement>(
    "[data-command]",
  )) {
    button.addEventListener("click", () => run(button.dataset.command ?? ""));
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && !event.shiftKey && input.value.trim()) {
      const value = input.value.trimStart().replace(/\s+/g, " ").toLowerCase();
      const matches = completions(value).filter((command) =>
        command.startsWith(value),
      );
      if (matches.length === 1 && matches[0] !== value) {
        event.preventDefault();
        input.value = matches[0];
      }
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (historyIndex === history.length) draft = input.value;
    historyIndex = Math.max(
      0,
      Math.min(
        history.length,
        historyIndex + (event.key === "ArrowUp" ? -1 : 1),
      ),
    );
    input.value = history[historyIndex] ?? draft;
  });
}
