module.exports = {
    name: 'roll',
    description: 'The $roll command rolls a random number from 1-100. Can be supplied a number to change range i.e $roll 20 => 1-20',
    execute(message, args) {

        num = -1;
        response = '';
        invalidNum = 'Please enter a number between 1 and 1000'
        
        if(args.length === 0){
            num = getRandomNum(100)
            response = num === undefined ? invalidNum : 'You rolled ' + num
        }
        else if(args[0].startsWith('-help')){
           response = this.description
        }else{
            num = getRandomNum(args[0])
            response = num === undefined ? invalidNum : 'You rolled ' + num
        }
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