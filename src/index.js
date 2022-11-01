'use strict';
import fs from 'fs';

let data = {
    title: 'Primer objeto.',
    price: 23,
    thumbnail: 'Aca va la primera url.'
}

let data1 = {
    title: 'segundos',
    price: 2543,
    thumbnail: 'Aca va la segunda url.'
}

let data2 = {
    title: 'tercero',
    price: 143.89,
    thumbnail: 'Aca va la tercera url.'
}

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;
        this.fileInfo=[]
    }
    async verifyId() {
        try {
            const fileRead = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.fileInfo = JSON.parse(fileRead);
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    }
    async save(objeto) {
        let idSet=0;
        await this.verifyId();
        try {
            if (this.fileInfo.length > 0) {
                this.fileInfo.push({ ...objeto, id: this.fileInfo[this.fileInfo.length - 1].id + 1 });
                idSet = this.fileInfo[this.fileInfo.length - 1].id;
            } else {
                this.fileInfo.push({ ...objeto, id: 1 });
                idSet = 1;
            }
            await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.fileInfo), 'utf-8');
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
        return idSet;
    }
    async getById(Number) {
        let find;
        try {
            const fileRead = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.fileInfo = JSON.parse(fileRead);
            find = this.fileInfo.find(item => item.id === Number);
            if (find) {
                return this.fileInfo.find(item => item.id === Number)
            } else {
                return null
            }
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
            return null;
        }
    }
    async getAll() {
        try {
            const fileRead = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.fileInfo = JSON.parse(fileRead);
            return this.fileInfo;
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    }
    async deleteById(Number=0) {
        try {
            const fileRead = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.fileInfo = JSON.parse(fileRead);
            if (this.fileInfo.find(item => item.id === Number)) {
                this.fileInfo = this.fileInfo.filter(item => item.id !== Number);
                await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.fileInfo), 'utf-8');
                console.log('Se borró el registro: ' + Number);
            } else {
                console.log(`No existe el registro ${Number} para borrar.`)
            }
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    }
    async deleteAll() {
        await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify([]), 'utf-8');
        console.log('Se borraron todos los objetos del archivo.')
    }
}
//Para que funcione el hay que instanciar el archivo de la clase Contenedor con su respectiva extensión: ejemplo ('lo_que_sea.drf', 'pruductos.txt'...etc).
const archivo = new Contenedor('lo_que_sea.drf');

//Reemplazar data por data1 y data2 sucesivamente para cargar diferentes  registros en el archivo.
//archivo.save(data).then(res => console.log(res));

//Obtiene el objeto mediante su respectiva ID.
//archivo.getById(2).then(res => console.log(res))

//Obtiene la lista completa de objetos del archivo
//archivo.getAll().then(res => console.log(res))

//Borra un objeto determinado por su ID.
//archivo.deleteById(1);

//Borra todos los objetos del archivo.
//archivo.deleteAll()