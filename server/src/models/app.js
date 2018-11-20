import fs from 'fs';

export default class App {
  /**
   * read json file and return object
   *
   * @param  string path
   * @return object
   */
  readDataFile(path) {
    this.rawData = fs.readFileSync(path, 'utf-8');
    this.data = JSON.parse(this.rawData);

    return this.data;
  }

  /**
   * write into a json file
   *
   * @param  string path
   * @param  object dataObject
   */
  writeDataFile(path, dataObject) {
    this.data = JSON.stringify(dataObject, null, 4);
    fs.writeFileSync(path, this.data);
  }
}
