const fs = require("fs");
// const { readFile } = require("fs/promises");

class Contenedor {
  //creamos el constructor
  archivo = "";
  listaArr = [];

  constructor(archivo, listaArr) {
    this.archivo = archivo;
    this.listaArr = listaArr;
  }

  //promesa para leer el documento txt

  async crearArchivo(contenido) {
    try {
      const contenidotxt = JSON.stringify(contenido);

      const creado = await fs.promises.writeFile(
        `./${this.archivo}.txt`,
        contenidotxt,
        "utf-8"
      );
    } catch (err) {
      console.log(err);
    }
  }
  //Importante ya me copila__________--------------//
  async leerArchivo() {
    try {
      const contenidoDocumento = await fs.promises.readFile(
        `./${this.archivo.toString()}.txt`,
        "utf-8"
      );
      console.log(contenidoDocumento);
    } catch (err) {
      console.log(`Error de lectura ${err}`);
    }
  }

  //promesa para guardar un objeto en el documento txt
  async save(obj) {
    let id = 0;
    console.log(id);
    console.log(obj);
    try {
      const documento = await fs.promises.readFile(
        `./${this.archivo}.txt`,
        "utf-8"
      );
      console.log(documento);
      // creamos una constante donde agregamos el archivo que se pasa por parametro como Fichero.
      const documentoParse = JSON.parse(documento.toString());
      //El documento lo parseamos a string
      this.listaArr = documentoParse;
      console.log(this.listaArr);
      //-------------------------------------------
      //ejemplo para incluir el id en un objeto
      const nuevoArr = [];
      const bojeto = { ...obj, id };
      nuevoArr.push(bojeto);
      console.log(nuevoArr);
      console.log(nuevoArr.length);
      //-------------------------------------------
      //el documentoParse lo asignamos a listaObjeto
      //haremos una condicional para añadir el ID

      const arr = [this.listaArr];
      console.log(arr);
      console.log(id);
      console.log(arr);

      if (arr.length) {
        console.log(arr);
        id = arr[arr.length - 1].id + 1;
        console.log(id);
        console.log(obj);
        const objetoId = { ...obj, id }; //creamos un nuevo objeto con el id
        console.log(objetoId);
        //añadimos el id al objeto
        arr.push(objetoId);
        const contenidotxt = JSON.stringify(arr);
        console.log(objetoId);
        await fs.promises.writeFile(
          `./${this.archivo}.txt`,
          contenidotxt,
          "utf-8"
        );
      } else {
        id = 1;
        console.log(id);
        const objetoId = {
          ...obj,
          id,
        };
        arr.push(objetoId);
        const contenidotxt = JSON.stringify(arr);
        await fs.promises.writeFile(
          `./${this.archivo}.txt`,
          contenidotxt,
          "utf-8"
        );
      }
    } catch (err) {
      console.log(`No hace el proceso ${err}`);
    }
    return id;
  }

  async getById() {
    const documento = await fs.promises.readFile(`./${this.archivo}.txt`);
    console.log(documento);
    const documentoParse = JSON.parse(documento.toString());
    console.log(documentoParse);
    this.listaArr = documentoParse;
    console.log(this.listaArr);
    const documentFind = this.listaArr.find(({ id: objetoId }) => {
      id === objetoId;
    });

    if (!documentFind) {
      return "El documento no existe";
    } else {
      return documentFind;
    }
  }

  async getAll() {
    const documento = await fs.promises.readFile(`./${this.archivo}.txt`);
    const documentoParse = JSON.parse(documento.toString());
    this.listaArr = documentoParse;
    return documentoParse;
  }

  async deleteById() {
    try {
      const documento = await fs.promises.readFile(`./${this.archivo}.txt`);
      const documentoParse = JSON.parse(documento.toString());
      this.listaArr = documentoParse;

      if (!this.listaArr.some(({ id: objetoId }) => objetoId === id))
        return console.log(`No existe el objeto con la id  ${id}`);
      const documentRemoved = this.listaArr.filter(
        ({ id: objetoId }) => id !== objetoId
      );
      const contenidotxt = JSON.stringify(documentRemoved);
      await fs.promises.writeFile(
        `./${this.archivo}.txt`,
        contenidotxt,
        "utf-8"
      );
      console.log("Borrado Exitoso");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      const totalErase = JSON.stringify([]);
      await fs.promises.writeFile(`./${this.archivo}.txt`, totalErase, "utf-8");
    } catch (err) {
      console.log(err);
    }
  }
}

// const Ficheros = new Contenedor("Fichero");
// console.log(Ficheros);
// Ficheros.save({ titulo: "Capitan America", Price: 344343 });
// Ficheros.getById();
// Ficheros.getAll();
// Ficheros.deleteById();
// Ficheros.deleteAll();
const archivo1 = new Contenedor("Archivo");
console.log("El usuario contiene lo siguiente: " + archivo1.toString());
archivo1.crearArchivo({ titulo: "Capitan America", Price: 344343 });
archivo1.leerArchivo();
archivo1.save({ titulo: "Capitan America", Price: 34434 });
