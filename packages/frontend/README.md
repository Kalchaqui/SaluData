<img width="825" height="811" alt="image" src="https://github.com/user-attachments/assets/09dba68b-5937-4c42-af7d-c006822a19dd" />

# SaluData - Decentralized Secure Medical Records Management

## 🩺 The Problem
Medical records management faces critical challenges in privacy, security, and access control. Patients lose control over their data once shared, and there's a constant risk of sensitive data breaches in traditional centralized systems.

## 💡 Our Solution
SaluData is a decentralized protocol that enables patients to maintain complete control over their medical records while facilitating secure, temporary access to healthcare professionals through consent NFTs.

## 🔐 Key Technical Features
### Integration with Ava Labs' EncryptedMetadata
Our smart contract incorporates the encrypted metadata mechanism from Ava Labs' EncryptedERC standard, implementing:

- Secure communication through encrypted events via the PrivateMessage event

- Secure DEK key transmission using EncryptedMetadata's encrypted messaging pattern

- Standardized metadata structure that preserves communication privacy

### Core Functionalities
1. Public key registration for asymmetric encryption

2. NFT-based consent receipts with status and expiration

3. Granular access control that patients can revoke anytime

4. Off-chain medical metadata with on-chain verifiable references

## 🏗️ Hybrid Architecture
###On-chain (Blockchain)
° Consent NFTs and access control

° Public keys and verification hashes

° Encrypted metadata events

### Off-chain (Decentralized Storage)
° Actual medical records (IPFS, Arweave, etc.)

° Data encrypted with DEKs (Data Encryption Keys)

## ⚡ Workflow
1. Registration: Patients and doctors register their public keys

2. Consent: Patients grant access through NFTs with encrypted DEKs

3. Access: Doctors retrieve DEKs through encrypted events

4. Decryption: Access to off-chain medical records using DEKs

5. Revocation: Patients can revoke access at any time

## 🛡️ Security Advantages
° Medical data never on blockchain - Only references and encrypted keys

° Dual encryption layer - Asymmetric (public keys) and symmetric (DEKs)

° Complete audit trail - All access is immutably recorded

° Patient-centric control - Only patients grant and revoke access

## 🌐 Use Cases
° Secure telemedicine - Temporary medical records sharing

° Medical research - Verifiable consent for data usage

° Health insurance - Audited access to relevant information

° Medical emergencies - Pre-approved emergency access protocols

SaluData represents the next generation of medical data management, combining the best of blockchain technology with advanced encryption standards to create a truly patient-centric and secure system that respects privacy while enabling necessary medical access.

---

## ✅ VERCEL

https://saludata-5y6nwehec-kalchas-projects.vercel.app/

---

## ✅ Video Demo

https://www.youtube.com/watch?v=jtIXY5SvUrc

---

## ✅ Deploy Contrat 

https://testnet.snowtrace.io/address/0x070018089b50cdac6b25bdb60b7c71a829c29f10

---

## 🛠️ Key Technologies

- **Blockchain:** Avalanche (Fuji Testnet, Higia L1)
- **Smart Contracts:** Solidity
- **Tokens:** ERC-721 + EncryptedMetadata.sol
- **Development:** Remix / Hardhat / Foundry
- **Wallets:** Core | Metamask
- **Decentralized Storage:** IPFS
- **Frontend:** Node.js, Web3.js / Ethers.js, Privy

---

## 🗺️ Growth Roadmap – 2 Weeks

### 🗓️ Week 1 – Fundamentals and Technical Foundation

#### **Milestone 1: Technical Setup (Day 1-2)**

* **Environment Configuration:**
    * Set up Remix / Hardhat / Foundry.
    * Connect Core | Metamask wallets to the Avalanche Fuji Testnet.
* **Creation of the eERC-20 `HealthToken (HLT)`:**
    * Fixed initial supply for the demo.
    * The token will be used to "pay for" and record data access.
* **Architecture Design:**
    * **Patient:** Owner of the medical record (identified by their public key).
    * **Medical Record:** A JSON file stored on IPFS, linked from the smart contract.
    * **Institutions:** Registered addresses in the contract (labs, clinics).
    * **Higia:** L1 configuration for the private solution development.

#### **Milestone 2: Digital Medical Record (Day 3-4)**

* **Smart Contract Development (Solidity):**
    * Function for patient registration.
    * Function for assigning medical records (storing the IPFS hash).
    * Logic for medical data encryption.
* **Minimal Interface (Backend/Frontend):**
    * Develop a basic DApp with `Node.js` and `Web3.js/Ethers.js` or `Privy`.
    * Implement wallet connection with Core | Metamask.
    * Create a flow to upload a medical exam: the file is uploaded to IPFS, and the hash is registered on the blockchain.
    * Panel for visualizing the record history.

---

### 🗓️ Week 2 – Permissions, Token, and Demo

#### **Milestone 3: Permissions and Access (Day 5-7)**

* **Smart Contract for Permissions:**
    * `requestAccess(entity, patientID)`: Function for an institution to request access.
    * `grantAccess(entity, recordID)`: Function for the patient to approve a request.
    * `revokeAccess(entity, recordID)`: Function for the patient to revoke access.
* **MVP Flow:**
    * A laboratory uploads an exam (registers on IPFS and the contract).
    * A clinic requests access to the exam.
    * The patient receives a notification in the DApp and can approve or reject the request.
* **eERC-20 Token Integration:**
    * Use the token for patient data encryption and security.

#### **Milestone 4: Interoperability and Final Demo (Day 8-10)**

* **Simulated APIs:**
    * **Laboratory:** A `POST` endpoint to simulate uploading an exam to IPFS and the contract.
    * **Clinic:** A `GET` endpoint to validate access through the permissions contract.
* **Unified Web Interface:**
    * **Patient Panel:** To approve access and view their history.
    * **Institution Panel:** To request access and read data once approved.

---

## 🗓️ Final Deliverables (Day 11-14)

1.  **eERC-20 Contract** deployed on the Avalanche Higia L1 Testnet for SaluData.
2.  **Medical Record and Permissions Contract** in Solidity, functional and deployed.
3.  **Web DApp (Proof of Concept):**
    * Core | Metamask connection.
    * Record management (upload).
    * Access management (approval/revocation).
4.  **End-to-End Functional Demo:**
    * Complete flow: Patient registers → Lab uploads exam → Clinic requests access → Patient approves.
5.  **Pitch Deck and Technical Report:**
    * A document detailing the architecture, the functional demo, and the next steps for the project.

---


<img width="1440" height="943" alt="image" src="https://github.com/user-attachments/assets/a8f63db4-d972-4d43-bded-294c64e12d51" />



