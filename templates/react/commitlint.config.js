const VALID_COMMIT_TYPES = [
  'init',
  'feat',
  'fix',
  'chore',
  'docs',
  'style',
  'improve',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'revert',
  'merge',
  'wip',
  'release',
  'upgrade',
  'downgrade',
  'bump',
  'security',
  'hotfix',
  'maintainer',
];

export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [2, 'always', VALID_COMMIT_TYPES],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 10],
    'subject-max-length': [2, 'always', 120],
  },
};
