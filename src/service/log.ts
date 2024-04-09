import fs from 'fs';
import path from 'path';

class Log {
  private folderLog = './src/logs';
  private fileLog = './src/logs/info.log';
  private srcFolderPath = path.join(__dirname, '../');
  private logFolderPath = path.join(this.srcFolderPath, 'logs'); 

  private async logInfo(info: any) {
    return console.log(info);
  }

  private async changeAccessFolder() {
    fs.chmod(this.folderLog, 0o444, async (err) => {
      if (err) {
        await this.logInfo("Error blocked file")
      } else {
        await this.logInfo("File only read")
      }
    })
    
    fs.chmod(this.folderLog, 0o555, async (err) => {
      if (err) {
        await this.logInfo("Error blocked file")
      } else {
        await this.logInfo("File blocked deleted")
      }
    })
  }

  private async createFile() {
    fs.writeFile(this.fileLog, 'Info Log: ', async (err) => {
      if(err) {
        await this.logInfo('Error create file ' + err)
      } else {
        await this.logInfo('File created successfully')
        await this.changeAccessFolder()
      }
    })
  }

  private async createFolder() {
    fs.mkdir(this.folderLog, {recursive: true}, async (err) => {
      if (err) {
        await this.logInfo('Error create folder ' + err)
      } else {
        await this.logInfo('Folder created successfully')
       
        await this.createFile()
      }
    })
  }

  private async createLogFolder() {
    fs.stat(this.logFolderPath, async (err, stats) => {
      
      if (err?.code === 'ENOENT') {
        await this.logInfo("Folder not found");
        await this.createFolder()          
        return true;
      }  
      
      if (stats.isDirectory()) {
        await this.logInfo("Folder generated successfully")
        return false;
      }
    })
  }

  private async generateFolder() {
    fs.stat(this.srcFolderPath, async (err, folderStats) => {
      if (err) {
        await this.logInfo("Folder not found");
        return;
      }
      await this.createLogFolder()
    })
  }

  private async generateFileLog() {
    return await this.generateFolder()
  }

  private async formatDateToPtBr(data: Date) {
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const year = data.getFullYear();
    const time = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    const seconds = String(data.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${time}:${minutes}:${seconds}`;
  }

  private async saveInfo(info: string) {
    fs.readFile(this.fileLog, 'utf8', async (err, data) => {
      if (err) await this.logInfo(err);

      const text = data + info;

      fs.writeFile(this.fileLog, text, async (err) => {
        if (err) {
          await this.logInfo(err);
        } else {
          await this.logInfo("Information recorded in the file")
        }
      })
    })
  }

  async saveLog(info: string = "Log info not informed", type = "log") {
    await this.generateFileLog()

    const formatDate = await this.formatDateToPtBr(new Date())
    const textToSave = `\n[${formatDate}] ${type} - ${info}`

    await this.saveInfo(textToSave)    
  }
}

export default new Log()