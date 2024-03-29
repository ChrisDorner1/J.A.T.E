import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// logic method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  const jateDb = await openDB("jate", 1);
  const txt = jateDb.transaction("jate", "readwrite");
  const store = txt.objectStore("jate");
  const req = store.put({ id: id, value: content });
  const res = await req;
  console.log("updated", res);
};

// logic method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const txt = jateDb.transaction("jate", "readonly");
  const store = txt.objectStore("jate");
  const req = store.get(1);
  const res = await req;
  return res?.value;
};

initdb();
