import fs from 'fs';
import path from 'path';
import LogEntity from "../entity/LogEntity"
import { AppDataSource } from '../data-source';

class Log {
  private folderLog = './src/logs';
  private fileLog = '/logs/info.log';
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

  private async clearfile() {
    fs.writeFile(this.fileLog, '', async (err) => {
      if (err) {
        await this.logInfo(err);
      }
    })
  }

  private async saveInfo(info: string) {
    await this.clearfile()
    fs.writeFile(this.fileLog, info, async (err) => {
      if (err) {
        await this.logInfo(err);
      } else {
        await this.logInfo("Information recorded in the file")
      }
    })
  }

  private async saveInfoInFiler() {
    let infoToSaveInFile: string = `Info Log: `;
    const repositoryEntity = AppDataSource.getRepository(LogEntity)
    const logs: any = await repositoryEntity.find()

    for (let i = 0; i < logs.length; i++) {
      const {type, log, date} = logs[i]
      const formatDate = await this.formatDateToPtBr(new Date(date));
      const textToSave = `\n[${formatDate}] ${type} - ${log}`
      infoToSaveInFile += textToSave
    }

    await this.saveInfo(infoToSaveInFile)
  }

  private async setFolderRoot(root: string) {
    this.folderLog = `${root}/logs`
    this.fileLog = `${root}/logs/info.log`
  }

  async saveLog(info: string = "Log info not informed", type = "log") {
    const log = new LogEntity(info, type)
   
    await AppDataSource.manager.save(log)
    await this.saveInfoInFiler()    
  }

  async configRoot(root: string) {
    await this.setFolderRoot(root)
    await this.generateFileLog()
    await this.saveInfoInFiler()
  }
}

export default new Log()