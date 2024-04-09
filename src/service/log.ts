import fs from 'fs';
import path from 'path';

class Log {
  async generateFile() {
    const srcFolderPath = path.join(__dirname, '../'); // Obtém o caminho absoluto para o diretório 'src'
    console.log(__dirname)
    console.log(srcFolderPath)
    const logFolderPath = path.join(srcFolderPath, 'logs'); 

    fs.stat(srcFolderPath, (err, folderStats) => {
      fs.stat(logFolderPath, (err, stats) => {
        if (err?.code === 'ENOENT') {
          console.error("diretorio não existe");
          const folderLog = './src/logs'
          fs.mkdir(folderLog, {recursive: true}, (err) => {
            if (err) {
              console.log('erro ao criar')
            } else {
              console.log("pasta criada")
              const fileLog = './src/logs/log.txt'
              fs.writeFile(fileLog, '', (err) => {
                if(err) {
                  console.log('erro ao criar arquivo')
                } else {
                  console.log("arquivo criado")
                }
              })
            }
          })
          return;
        }
        
        if (stats.isDirectory()) {
          console.log("achou")
        }
      })  
    })
    

  }

  async warn(payload: any) {
    await this.generateFile()

  }
}

export {Log}