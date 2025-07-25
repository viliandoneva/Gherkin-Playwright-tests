module.exports = {
    default: {
        require: ['tests/step-definitions/*.ts'],
        requireModule: ['ts-node/register'],
        format: ['html:report.html'],
        paths: ['features/*.feature']
    }
}