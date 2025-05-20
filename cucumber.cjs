// cucumber.cjs
module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require test/e2e/support/**/*.ts',
    '--require test/e2e/step_definitions/**/*.ts',
    '--format progress',
    '--format html:reports/report.html',
    '--format json:reports/report.json',
    'test/e2e/features'
  ].join(' ')
}
