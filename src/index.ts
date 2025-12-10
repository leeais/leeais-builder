#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Types ---
type Template = 'react' | 'react-native' | 'next' | 'nest' | 'node';
type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

interface CLIOptions {
  template?: string;
  install?: boolean;
  pm?: string;
}

interface PromptAnswers {
  projectName?: string;
  template?: Template;
  packageManager?: PackageManager;
  shouldInstall?: boolean;
}

// --- Constants & Config ---
const TEMPLATES: Record<string, Template> = {
  REACT: 'react',
  REACT_NATIVE: 'react-native',
  NEXT: 'next',
  NEST: 'nest',
  NODE: 'node',
};

const PACKAGE_MANAGERS: PackageManager[] = ['npm', 'yarn', 'pnpm', 'bun'];

// --- Helper Functions ---

/**
 * Executes a shell command and returns a promise.
 */
function runCommand(
  command: string,
  args: string[],
  cwd: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', error => {
      reject(error);
    });
  });
}

/**
 * Validates project name.
 */
function validateProjectName(input: string): boolean | string {
  if (/^[a-z0-9-_]+$/i.test(input)) return true;
  return 'Project name may only include letters, numbers, dashes and underscores.';
}

/**
 * Rename template files that start with underscore to dot files
 */
function renameTemplateFiles(projectPath: string): void {
  const filesToRename = [
    { from: '_gitignore', to: '.gitignore' },
    // { from: '_prettierrc', to: '.prettierrc' },
    // { from: '_prettierignore', to: '.prettierignore' },
    // { from: '_eslintrc.json', to: '.eslintrc.json' },
    // { from: '_vscode', to: '.vscode' },
  ];

  filesToRename.forEach(({ from, to }) => {
    const fromPath = path.join(projectPath, from);
    if (fs.existsSync(fromPath)) {
      fs.renameSync(fromPath, path.join(projectPath, to));
    }
  });
}

/**
 * Update package.json with project name
 */
function updatePackageJson(projectPath: string, projectName: string): void {
  const pkgPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
}

/**
 * Install dependencies using selected package manager
 */
async function installDependencies(
  projectPath: string,
  packageManager: PackageManager
): Promise<void> {
  console.log(
    chalk.cyan(`\n📦 Installing dependencies using ${packageManager}...\n`)
  );

  try {
    const installCmd = packageManager === 'yarn' ? [] : ['install'];
    await runCommand(packageManager, installCmd, projectPath);
    console.log(chalk.green('\n✅ Dependencies installed successfully!\n'));
  } catch (error) {
    console.log(
      chalk.yellow('\n⚠️  Failed to install dependencies automatically.')
    );
    console.log(
      chalk.yellow(`Error: ${error instanceof Error ? error.message : error}`)
    );
  }
}

/**
 * Print success message with next steps
 */
function printSuccessMessage(
  projectName: string,
  packageManager: PackageManager,
  shouldInstall: boolean,
  template: Template
): void {
  console.log(chalk.green.bold('🎉 Done! Now run:\n'));
  console.log(chalk.white(`  cd ${projectName}`));

  if (!shouldInstall) {
    console.log(chalk.white(`  ${packageManager} install`));
  }

  // Different run commands for different templates
  if (template === TEMPLATES.REACT_NATIVE) {
    console.log(chalk.white(`  ${packageManager} start`));
    console.log(
      chalk.white(`  ${packageManager} run android  ${chalk.dim('(or ios)')}\n`)
    );
  } else {
    console.log(
      chalk.white(
        `  ${packageManager} ${packageManager === 'npm' ? 'run ' : ''}dev\n`
      )
    );
  }

  console.log(chalk.dim('------------------------------------'));
  console.log(
    chalk.white(
      `👉  Get started with Git:\n    git init\n    ${packageManager} run prepare`
    )
  );
  console.log(chalk.dim('------------------------------------\n'));
}

// --- Main CLI Logic ---

program
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .option(
    '-t, --template <template>',
    'Template to use (react, react-native, next, nest, node)'
  )
  .option('--install', 'Install dependencies immediately')
  .option('--no-install', 'Skip dependency installation')
  .option(
    '--pm <packageManager>',
    'Package manager to use (npm, yarn, pnpm, bun)'
  )
  .action(async (cliProjectName: string | undefined, options: CLIOptions) => {
    try {
      console.log(chalk.cyan.bold('\n🚀 Leeais Project Builder\n'));

      // 1. Collect User Inputs
      let projectName = cliProjectName;
      let template = options.template as Template | undefined;
      let packageManager = options.pm as PackageManager | undefined;
      let shouldInstall = options.install; // undefined if not specified

      const questions: any[] = [];

      if (!projectName) {
        questions.push({
          type: 'input',
          name: 'projectName',
          message: 'What is your project name?',
          default: 'my-app',
          validate: validateProjectName,
        });
      }

      if (!template || !Object.values(TEMPLATES).includes(template)) {
        questions.push({
          type: 'list',
          name: 'template',
          message: 'Which template would you like to use?',
          choices: [
            { name: 'React (Vite + TypeScript)', value: TEMPLATES.REACT },
            {
              name: 'React Native (Coming Soon)',
              value: TEMPLATES.REACT_NATIVE,
            },
            { name: 'Next.js (Coming Soon)', value: TEMPLATES.NEXT },
            { name: 'NestJS (Coming Soon)', value: TEMPLATES.NEST },
            { name: 'Node.js (Coming Soon)', value: TEMPLATES.NODE },
          ],
        });
      }

      if (!packageManager || !PACKAGE_MANAGERS.includes(packageManager)) {
        questions.push({
          type: 'list',
          name: 'packageManager',
          message: 'Which package manager do you want to use?',
          choices: PACKAGE_MANAGERS,
          default: 'npm',
        });
      }

      if (shouldInstall === undefined) {
        questions.push({
          type: 'confirm',
          name: 'shouldInstall',
          message: 'Would you like to install dependencies now?',
          default: true,
        });
      }

      const answers = (await inquirer.prompt(questions)) as PromptAnswers;

      // Merge answers
      projectName = projectName || answers.projectName!;
      template = template || answers.template!;
      packageManager = packageManager || answers.packageManager!;
      if (shouldInstall === undefined) {
        shouldInstall = answers.shouldInstall!;
      }

      // 2. Handle Logic based on Template
      const projectPath = path.join(process.cwd(), projectName);

      if (fs.existsSync(projectPath)) {
        console.log(
          chalk.red(`\n❌ Directory "${projectName}" already exists!\n`)
        );
        process.exit(1);
      }

      // Check for unimplemented templates
      if (template !== TEMPLATES.REACT) {
        console.log(
          chalk.yellow(
            `\n⚠️  The "${template}" template is coming soon! Stay tuned.\n`
          )
        );
        return;
      }

      // --- Template Generation ---
      const spinner = ora(
        `Creating ${template} project in ${projectPath}...`
      ).start();

      fs.mkdirSync(projectPath, { recursive: true });

      const templatePath = path.join(__dirname, '..', 'templates', template);

      if (!fs.existsSync(templatePath)) {
        spinner.fail();
        console.log(
          chalk.red(`\n❌ Template source not found at: ${templatePath}\n`)
        );
        process.exit(1);
      }

      fs.copySync(templatePath, projectPath);

      // Rename template files
      renameTemplateFiles(projectPath);

      // Update package.json
      updatePackageJson(projectPath, projectName);

      spinner.succeed('Project scaffolded successfully!');

      // 3. Install Dependencies
      if (shouldInstall) {
        await installDependencies(projectPath, packageManager);
      } else {
        console.log(chalk.yellow('\n⚠️  Skipped dependency installation.\n'));
      }

      // 4. Success Message
      printSuccessMessage(projectName, packageManager, shouldInstall, template);
    } catch (error) {
      console.error(
        chalk.red('\n❌ An error occurred:'),
        error instanceof Error ? error.message : error
      );
      process.exit(1);
    }
  });

program.parse(process.argv);
