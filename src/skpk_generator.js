const crypto = require("crypto");
const bip39 = require("bip39");

// Generate RSA private key
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem", // Use PEM format
    },
  });

  return { publicKey, privateKey };
}

const privateKey = generateKeyPair();

// Convert the PEM string to a Buffer
const pemBuffer = Buffer.from(privateKey);

// Convert the Buffer to a mnemonic
const mnemonic = bip39.entropyToMnemonic(pemBuffer.toString("hex"));

console.log("Mnemonic: ", mnemonic);

// Convert the mnemonic back to a Buffer
const entropyHex = bip39.mnemonicToEntropy(mnemonic);
const recoveredPemBuffer = Buffer.from(entropyHex, "hex");

// Convert the Buffer back to a PEM string
const recoveredPrivateKey = recoveredPemBuffer.toString();

console.log("Recovered Private Key: ", recoveredPrivateKey);
