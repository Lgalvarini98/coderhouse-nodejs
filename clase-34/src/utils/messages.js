
const { normalize, schema } = require("normalizr");

var admin = require("firebase-admin");
var serviceAccount = require(process.env.CREDENTIAL_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const query = db.collection("messages").orderBy("date", "asc");
const queryCollection = db.collection("messages");

const getMessages = async () => {
  const querySnapshot = await query.get();
  let docs = querySnapshot.docs;

  return docs.map((doc) => ({
    id: doc.id,
    author: {
      id: doc.data().author.id,
      nombre: doc.data().author.nombre,
      apellido: doc.data().author.apellido,
      edad: doc.data().author.edad,
      alias: doc.data().author.alias,
      avatar: doc.data().author.avatar,
    },
    text: doc.data().text,
    date: doc.data().date,
  }));
};


const normalizerMsg = (data, compress) => {
  const authorSchema = new schema.Entity("author");
  const msgSchema = new schema.Entity(
    "messages",
    {
      author: authorSchema,
    },
    { idAttribute: "id" }
  );
  let normalizedMsg = normalize(data, [msgSchema]);
  if (!compress) {
    return { normalizedMsg };
  }
  let dataSize = JSON.stringify(data).length;
  let dataNormSize = JSON.stringify(normalizedMsg).length;
  let result = 100 - (dataNormSize * 100) / dataSize;
  return { normalizedMsg, result };
};

const createMessage = async (data) => {
    const doc = queryCollection.doc();
    await doc.create(data);
  };
  

module.exports = { getMessages, createMessage, normalizerMsg };
