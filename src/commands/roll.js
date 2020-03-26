module.exports = {
    name: 'roll',
    description: 'The $roll command rolls a random from 1-100. Can be supplied a number to change range i.e $roll 20 => 1-20',
    execute(message, args) {
        if(args[0].startsWith('-help')){
            message.reply(this.description)
            return
        }
        num = args[0] ? getRandomNum(args[0]) : getRandomNum(100)
        response = ''

        if(num !== undefined)
            response = 'You rolled ' + num
        else
            response = 'Please enter a number between 1 and 1000'

        message.reply(response)
    }
}

function getRandomNum(max) {
        min = 1;
        max = Math.floor(max);
        rolledNum = -1;

        if(max > 1000 || max < 1)
            rolledNum = undefined
        else
            rolledNum = Math.floor(Math.random() * (max - min + 1)) + min;

        return rolledNum
}