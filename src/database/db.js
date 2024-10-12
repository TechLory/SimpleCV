// db.js
import Dexie from 'dexie';
import curriculum from '../preloadedObjects/curriculum.json'
import moment from 'moment';


export const db = new Dexie('myDatabase');

db.version(1).stores({
  curricula: '++id, &name, createdtime, lastedittime'
});





export async function dbPrint() {
  const all = await db.curricula.toArray()
  console.log(JSON.stringify(all))
}

async function getIDByName(filename) {
  const x = await db.curricula.where({"name": filename}).first();
  return x.id
}





// Updates data object of the curriculum with name "filename" in DB
export async function dbUpdateCurriculum(filename, newData) {
  const id = await getIDByName(filename)
  console.log(`Updating ${filename} (${id})`);
  const result = await db.curricula.update(id, {
    lastedittime: moment().format(),
    data: newData,
  })
  const response = (result == 0) ? true : false
  return response
}





// Creates new curriculum in DB with name "filename" and default values for data
export async function dbNewCurriculum(filename) {
  try {
    const id = await db.curricula.add({
      name: filename,
      createdtime: moment().format(),
      lastedittime: moment().format(),
      data: curriculum
    })
    console.log("Added ID " + id + " with name " + filename);
    return null
  } catch (error) {
    return error
  }
}




// Returns curriculum in DB with name "filename"
export async function dbGetCurriculum(filename) {
  try {
    const result = await db.curricula.where({"name": filename}).first()
    return {
      data: result.data,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error
    }
  }
}

// Returns true if curriculum with name "filename" exists, false otherwise
export async function dbCurriculumExists(filename) {
  try {
    const result = await db.curricula.where({"name": filename}).first()
    const exists = (result == undefined) ? false : true
    return exists
  } catch (error) {
    return false
  }
}




// Returns array with all the curricula in DB
export async function dbGetCurricula() {
  try {
    const result = await db.curricula.toArray()
    return {
      data: result,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error
    }
  }
}




export async function dbDeleteCurriculum(filename) {
  const id = await getIDByName(filename)
  console.log(`Deleting ${filename} (${id})`);
  const result = await db.curricula.delete(id)
  return result
}

