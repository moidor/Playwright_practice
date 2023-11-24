import { test, expect, Locator, Browser, Page, Fixtures } from '@playwright/test';
import * as fs from 'fs';

// Reading data from the text file
export const readTextFile = async function readTextFile(file_path: string): Promise<string> {
  let search_value = 'default_value';

  try {
    const data_file = await fs.promises.readFile(`${file_path}`, 'utf-8');
    // Ensuring that it is a ".txt" file
    const [fileName, extension] = file_path.split('.');
    console.log(`Path without extension: ${fileName} - Extension: ${extension}`);
    
    if (extension == 'txt' && extension != null) {
      const wordList = data_file.split('\r\n');
      search_value = wordList[0];
      expect(search_value.length).not.toBeNull();
      console.log(`Read value from the text file: \'${search_value}\'`);
      return search_value;
    } else {
      throw "Error on the file extension... It should be a '.txt' file";
    }
  } catch (error) {
    console.log(new Error(error), new Error().name, new Error().message);
  } finally {
    console.log('Operation terminated');
    // Ensuring that the function always returns the text file value or a default one
    return search_value;
  }
};







/* export const readTextFile = function readTextFile(file_path: string): string {
  let default_value = 'default';

  try {
    const data_file = fs.readFileSync(`${file_path}`, 'utf-8');
    const wordList = data_file.split('\r\n');
    let search_value = wordList[0];
    expect(search_value.length).not.toBeNull();
    console.log(`Read value from the text file: \'${search_value}\'`);
    return search_value;
  } catch (error) {
    console.log(new Error(error), new Error().name, new Error().message);
  } 
  finally {
    console.log('Operation terminated');
    // Ensure that the function always returns a value
    return default_value;
  }
} */
 