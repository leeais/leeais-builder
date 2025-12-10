# Leeais Builder CLI

A powerful CLI tool to scaffold modern web projects with ease.

## Features

- **Interactive Setup**: User-friendly prompts for project configuration.
- **Multiple Templates**:
  - ⚛️ **React**: Vite + React + TypeScript + TailwindCSS + (Husky, ESLint, Prettier, Commitlint, Lint-staged) setup (Available).
  - ⚛️ **React Native**: Coming soon.
  - ⚡ **Next.js**: Coming soon.
  - 🦁 **NestJS**: Coming soon.
  - 🟢 **Node.js**: Coming soon.
- **Dependencies**: Options to auto-install dependencies using your preferred package manager (npm, yarn, pnpm, bun).

## Installation

You can run the CLI directly using `npx`:

```bash
npx create-leeais-builder@latest
```

Or install it globally:

```bash
npm install -g create-leeais-builder
```

## Usage

### Interactive Mode

Simply run the command without arguments to start the interactive wizard:

```bash
create-leeais-builder
```

You will be prompted for:

1.  **Project Name**: The name of your new folder.
2.  **Template**: Choose the tech stack (React, etc.).
3.  **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`.
4.  **Install Dependencies**: Whether to run install automatically.

### Command Line Arguments

You can also bypass prompts by providing arguments:

```bash
create-leeais-builder <project-name> [options]
```

#### Options

- `-t, --template <template>`: Specify template (`react`, `react-native`, `next`, `nest`, `node`).
- `--install`: Automatically install dependencies.
- `--no-install`: Skip dependency installation.
- `--pm <manager>`: Specify package manager (`npm`, `yarn`, `pnpm`, `bun`).
- `-V, --version`: Output the version number.
- `-h, --help`: Display help for command.

### Example

Create a React app named `my-dream-app` using `pnpm` and install dependencies:

```bash
create-leeais-builder my-dream-app --template react --pm pnpm --install
```

## Project Structure

The generated project will have a standard structure based on the selected template.

## Git Integration

The generated project comes with **Husky** configured for git hooks (pre-commit, commit-msg, etc.).

Since the CLI does not automatically initialize a git repository, you should run the following commands to set up git and hooks:

```bash
git init
npm run prepare
```

_Note: If you use a different package manager, run `yarn prepare`, `pnpm prepare`, or `bun run prepare` accordingly._

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
