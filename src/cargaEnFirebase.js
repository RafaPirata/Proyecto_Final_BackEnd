// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// const { initializeApp } = require("firebase/app");
// const { collection, addDoc, getFirestore } = require("firebase/firestore");
// // import { collection, doc, addDoc, getFirestore } from "firebase/firestore";

let admin = require("firebase-admin");

let serviceAccount = require("./back-piotti-firebase-adminsdk-jn47r-ca4408d10e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const firebaseConfig = {
//   type: "service_account",
//   project_id: "back-piotti",
//   private_key_id: "ca4408d10effe216f8bc86759ae196aeda1ccadd",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfOI253T9uVEnG\n0DpvEkdYjKk3uz1uXGAeVpO8QHYLfpJRnK+KwOcC8NeS54XATr6YK6ltUS0Hkm51\no4kg27dnRudOlcs/kKUEcwK3tYkctek0vg7J47aCjihQh+2/+tFjEz97WGsnkkEq\n7sDbsRxJOPDe++nR9GLc3z+QR4xqRl6N1MXrMwuX50tZX9+e+dIGFlcdJ3/y0zNh\nSDU9yb+mbXpcEZwZyFgd6/y/aczzulMgIB88JgwhXW/PjKy3sNL/Gtpa96wq6+xD\nbAlZEE+bERbKtnhoxszLzu9X5z6k0uAi8hTmRdpbmcMBDw0+joHh1yXYk06jDxwx\nbIjmyVFVAgMBAAECggEAJeynU5kt4jJK2I7fJqjN21MGmvPiY4IpSG5AKl8vTxOh\ni2EaB/JvLTY7Aff45uvaAOOGJQ8CHgO4ZZ8zuJPrzI2k1dqoTfPmvWNG5mxez7Ru\nWyohPBbGltbNLaVydMgJ1BHcmrmyduYn0UIAHTMxkZUtg0z8dFHXjBwX4gzt484g\ndc5VcAVKZmqtGMlRoUwOuT11Yluuh4RivSe3W1kg8xMVHPLrfVPYY+o+wq4Uf9TX\nO/2DAjLEIJ2NzJwI8UT0FT/lAPHLgho8L6VMYSYQfC9Nndqb/X7bvOAwYYYxM/MH\nyI5FQ54ku/aDkmiR3GH04pbs04fFiNp6xhpVvmsULwKBgQD+kHf8xTKatPxZasD4\nehkoc/H5732J2/h+V9EFDmdHU+Hy+LYtcifKRDOB1Gfpj6aV9YQiGXHd9Fi/qNL4\n5i9LVF8SSRrQmGTw0z12MsFYUzyymDabSuTfmm24rW6QADoScEoVthS9zWL7hW/4\nyLtRwzPc6ntHz7kX/TlY8efqQwKBgQDgetUVbSq/UUaT6KgFYBaQ0zcw9U9anZBn\nZ6bWihNKpRtt0hthCb9kb8WvTluV+vCvzPtbpjKvJmR+/dDOysKlQ5IaebKK8XQ5\n1CNmemm8kNgns+cKyYG/TsmloUXpWUhT2hXpjkOcl+NC7TVKE+htEcFiAOAwp+eP\n1HvAmjeYhwKBgCw/8Jt/q8w4qaThaanHj5f4j5diie/szMUpfqviVRGRAzW5BfHg\nZgpC0LFAus9eqRZoFw/WXHS4hLTMI+AgIxh1EhGbo42e7+zsy0JAkFtKHMLuso9L\n9Xzo2ym++/kMEQwjeL1NaU2U5h/SkiQswGL2C43bNJLHCOWintVXN3kBAoGAVbky\nlDsbHvJntGYde+gE1guCwRR82ErhcUuY38bctR22Css4n2b8ittQL7EJso2gylHK\nD2a5Zj+QExrUWZP+nuPd8HRW5U5tpwPG/QR0Sok5sne2HF11SdxJjxG2Q/VPdI4M\n3iLw2OT76XvyZLaThMtKASX6dzo3aKqpE5UQ9BMCgYARtU9HtWliIVAUs5bKQKdK\nAtTEtEOir5G6DfgF8r5EIKvxffcdDlQNPVsO56poSUpSlHRZDFPy/lSm5h+gDdMD\niqXZCcU7ZtF4k0Vy09qBtl9fbsJJftQa7Aqm2FLNXYhgvecIWu4VVWTv172xaa+R\nHunvFL5hBaRebVt841UoMQ==\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-jn47r@back-piotti.iam.gserviceaccount.com",
//   client_id: "102716284370125826742",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jn47r%40back-piotti.iam.gserviceaccount.com",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore();

// const cargarBdFirestore = async () => {
//   const promise = await fetch("./json/productos.json");
//   const productos = await promise.json();
//   productos.forEach(async (prod) => {
//     await addDoc(collection(db, "productos"), {
//       nombre: prod.nombre,
//       descripcion: prod.descripcion,
//       codigo: prod.codigo,
//       foto: prod.foto,
//       precio: prod.precio,
//       stock: prod.stock,
//     });
//   });
// };

// CRUD();

async function CRUD() {
  const db = admin.firestore();
  const query = db.collection("productos");

  try {
    //   /// create
    //   let id = "2";

    const doc = query.doc();
    await doc.create({
      nombre: "hambuerguesa",
      descripcion: "Simple",
      codigo: "1A",
      foto: "",
      precio: 550,
      stock: 20,
    });
  } catch (error) {
    console.log(error);
  }

  // try {
  //     /// leer por id
  //     const queryUsuarios = await query.get()
  //     // let docs = queryUsuarios.docs

  //     const respuesta = queryUsuarios.docs.map(documentos => ({ id: documentos.id, ...documentos.data() }) ) // []

  //     console.log(respuesta) // resp.docs.map(doc => doc.data())
  // } catch (error) {
  //     console.log(error)
  // }

  // try {
  //     /// leer por id
  //     let id = '2'
  //     const queryUsuario = query.doc(`${id}`)
  //     const item = await queryUsuario.get()
  //     const respuesta = {id: item.id, ...item.data()}

  //     // const respuesta = queryUsuarios.docs.map(documentos => ({ id: documentos.id, ...documentos.data() }) ) // []

  //     console.log(respuesta) // resp.docs.map(doc => doc.data())
  // } catch (error) {
  //     console.log(error)
  // }

  // try {
  //     const id = '1'
  //     const doc = query.doc(id)
  //     const item = await doc.update({
  //         nombre: 'Fede',
  //         apellido: 'Osandon',
  //         email: 'f@gmail.com'
  //     })
  //     console.log(`Item actualizado: ${item}`)
  // } catch (error) {
  //     console.log(error)
  // }

  ////////////////// Delete ////////////////////////
  // try {
  //     const id = '2'
  //     const doc = query.doc(id)
  //     const item = await doc.delete()
  //     console.log(`Item eliminado: ${item}`)
  // } catch (error) {
  //     console.log(error)
  // }

  // try {
  //     /// leer todos los documentos
  //     const queryUsuarios = await query.get()
  //     // let docs = queryUsuarios.docs

  //     const respuesta = queryUsuarios.docs.map(documentos => ({ id: documentos.id, ...documentos.data() }) ) // []

  //     console.log(respuesta) // resp.docs.map(doc => doc.data())
  // } catch (error) {
  //     console.log(error)
  // }
}

module.exports = { CRUD };
