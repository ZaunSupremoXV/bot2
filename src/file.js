fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');

const File = require('../src/assets')
class CreateFile {
    criar(msg) {
        //
        var data = new Date();
        var nome = data.getHours() + "-" + data.getMinutes() + "-" + data.getSeconds();
        var pasta = data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();

        // const dir = __dirname + '/DB/Files/' + pasta;
        const dir = '../DB/Files/' + pasta;
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, (err) => {
                if (err) {
                    console.log("Ocorreu um erro ao criar o diretório")
                    return
                }

                console.log("Diretório criado com sucesso")
            });
        }

        var logger = fs.createWriteStream('../DB/Files/' + pasta + "/" + nome + '.txt', {
            flags: 'a'
        });

        logger.write(msg);
        notifier.notify({
            title: 'Olha uma notificação',
            message: "Um novo arquivo foi criado na pasta, dê uma olhada nela",
            icon: path.join('../src/assets/icon.png'),
            sound: true,
            wait: true
        });

        notifier.on('click', function(notifierObject, options, event) {
            require('child_process').exec('start ' + dir);
        });
    }
}
module.exports = CreateFile;