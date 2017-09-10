#!/usr/bin/env node
'use scrict'

const program = require('commander')
const chalk = require('chalk')
const CEPAberto = require('cepaberto')

const formatAddress = (address) => {
    let log = console.log
    let def = 'N/A'

    log(chalk.red('Results of your search for ') + chalk.red.bold(address.zipcode) + chalk.red(': '))
    log('')

    log(chalk.blue.bold('Street: ') + chalk.white((typeof address.street !== undefined) ? address.street : def))
    log(chalk.blue.bold('Neighborhood: ') + chalk.white((typeof address.neighborhood !== undefined) ? address.neighborhood : def)) 
    log(chalk.blue.bold('City: ') + chalk.white((typeof address.city !== undefined) ? address.city : def))
    log(chalk.blue.bold('State: ') + chalk.white((typeof address.state !== undefined) ? address.state : def))
    log('')
    log(chalk.blue.bold('IBGE Code: ') + chalk.white((typeof address.ibge !== undefined) ? address.ibge : def))
    log(chalk.blue.bold('Area Code: ') + chalk.white((typeof address.area !== undefined) ? address.area : def))
    log('')
    log(chalk.blue.bold('Altitude: ') + chalk.white((typeof address.altitude !== undefined) ? address.altitude : def))
    log(chalk.blue.bold('Latitude: ') + chalk.white((typeof address.latitude !== undefined) ? address.latitude : def))
    log(chalk.blue.bold('Longitude: ') + chalk.white((typeof address.longitude !== undefined) ? address.longitude : def))
}

program
    .version('0.0.0')
    .description('Find information about a zipcode')
    .option('-t, --token <token>', 'Your CEPAberto\'s API token')
    .usage('<input>')
    .arguments('<input>')
    .action((input) => {
        let zipcode = input.replace('-','')
        let cepaberto = new CEPAberto(program.token)

        cepaberto.findByCode(zipcode)
                    .then((address) => {
                        if (address) {
                            formatAddress(address)
                        } else {
                            console.warn('Address not found')
                        }
                 })
                 .catch((err) => console.error(err))
    })
    .parse(process.argv)

if (program.args && program.args.length === 0) {
    program.help()
}

