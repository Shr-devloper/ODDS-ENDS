
// profile.js (ES module)
import { db, auth, storage } from "./firebase-config.js";
import { doc, getDoc, updateDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { ref as fbRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

// --------- CONFIG: set your deployed addresses & ABIs ----------
const CRAFT_BADGE_ADDRESS = "0x3c9b9d69bdb4783e63d701b2492fc750fafe2598"; // <-- replace if needed
const ECO_ADDRESS = "0x76d425af3b325c4c32ed6c150a3e307a46c93e2e";         // <-- replace if needed
const CRAFT_BADGE_ABI = [ {
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "adminMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mintBadge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasBadge",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
 ];
const ECO_ABI = [ {
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	} ];

const FUJI_CHAIN_ID_HEX = '0xA869';
const SNOWTRACE_TX_PREFIX = 'https://testnet.snowtrace.io/tx/';
const DEFAULT_BADGE_IMAGE = "https://yourdomain.com/assets/images/badge.png"; // set public badge image

// ----------------- helper -----------------
function escapeHtml(s){ if(!s) return ''; return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
function logStatus(t){ const el = document.getElementById("badgeStatus"); if(el) el.innerText = t; console.log(t); }

// Wrap everything inside DOMContentLoaded so elements exist
document.addEventListener("DOMContentLoaded", () => {
  // DOM handles (guarded)
  const connectWalletBtn = document.getElementById("connectWallet");
  const walletDisplay = document.getElementById("wallet-display");
  const claimArea = document.getElementById("claim-area");
  const claimBtn = document.getElementById("claimBadgeBtn");
  const badgeStatus = document.getElementById("badgeStatus");
  const usernameEl = document.getElementById("username-display");
  const creditsEl = document.getElementById("credits-display");
  const searchHistoryList = document.getElementById("search-history");

  // quick sanity checks
  if (!usernameEl || !creditsEl || !searchHistoryList) {
    console.warn("Some expected DOM elements are missing - check profile.html IDs (username-display, credits-display, search-history).");
  }

  // Load user profile + search history
  (async function loadProfile() {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // not logged in - redirect (same behaviour you had)
        window.location.href = "signin.html";
        return;
      }
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const u = userSnap.data();
        if (usernameEl) usernameEl.textContent = u.username || u.displayName || "User";
        if (creditsEl) creditsEl.textContent = u.credits ?? 0;
        if ((u.credits || 0) >= 100) {
          // generate certificate (if jsPDF available)
          if (window.jspdf) {
            try { await generateCertificate(u.username || u.displayName || 'User', u.credits || 0); }
            catch(e){ console.warn("certificate generation failed:", e); }
          } else {
            console.warn("jsPDF not loaded — certificate will not be generated until jsPDF is available.");
          }
        }
      }
      await loadSearchHistory();
      await refreshClaimUI();
    } catch (err) {
      console.error("loadProfile error:", err);
    }
  })();

  // ======================= search history =======================
  async function loadSearchHistory() {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId || !searchHistoryList) return;
      const historyRef = collection(db, "users", userId, "searchHistory");
      const snaps = await getDocs(historyRef);
      searchHistoryList.innerHTML = "";
      snaps.forEach(d => {
        const data = d.data();
        const li = document.createElement("li");
        li.textContent = `🔍 ${data.searchTerm} — ${new Date(data.timestamp).toLocaleString()}`;
        searchHistoryList.appendChild(li);
      });
    } catch (err) {
      console.error("loadSearchHistory error:", err);
    }
  }

  // ======================= logout =======================
  window.logout = async function () {
    try {
      await signOut(auth);
      localStorage.removeItem("userId");
      window.location.href = "signin.html";
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Logout error: " + error.message);
    }
  };

  // ======================= wallet & network helpers =======================
  async function ensureWalletAndNetwork() {
    if (!window.ethereum) throw new Error("MetaMask (or compatible) not installed");
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    // try switching to Fuji
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: FUJI_CHAIN_ID_HEX }] });
    } catch (switchErr) {
      if (switchErr.code === 4902 || /Unrecognized chain/i.test(switchErr.message || '')) {
        // add Fuji then switch
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: FUJI_CHAIN_ID_HEX,
            chainName: 'Avalanche Fuji C-Chain',
            nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://testnet.snowtrace.io']
          }]
        });
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: FUJI_CHAIN_ID_HEX }] });
      } else {
        throw switchErr;
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  }

  // connect wallet button
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', async () => {
      try {
        const { provider, signer, address } = await ensureWalletAndNetwork();
        if (walletDisplay) walletDisplay.innerText = address;
        // append small balance paragraph (safely)
        let be = document.getElementById("wallet-balance");
        if (!be) {
          be = document.createElement("p");
          be.id = "wallet-balance";
          // append only if profile container exists
          const pc = document.querySelector(".profile-container");
          if (pc) pc.appendChild(be);
          else document.body.appendChild(be);
        }
        const bal = await provider.getBalance(address);
        const balAvax = ethers.utils.formatEther(bal);
        be.textContent = `Balance: ${balAvax} AVAX`;
        await refreshClaimUI(); // in case claim area is hidden/shown
      } catch (err) {
        console.error("Wallet connect error:", err);
        alert("Wallet connect error: " + (err.message || err));
      }
    });
  }

  // ======================= claim UI logic =======================
  async function refreshClaimUI() {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        if (claimArea) claimArea.style.display = 'none';
        return;
      }
      const userRef = doc(db, "users", userId);
      const snap = await getDoc(userRef);
      const udata = snap.exists() ? snap.data() : {};
      const credits = parseInt(udata?.credits || 0);
      const badgeClaimed = !!udata?.badgeClaimed;
      if (credits >= 100 && !badgeClaimed) {
        if (claimArea) claimArea.style.display = 'block';
      } else {
        if (claimArea) claimArea.style.display = 'none';
      }
    } catch (err) {
      console.error("refreshClaimUI error:", err);
    }
  }

  // upload metadata JSON to Firebase Storage and return URL
  async function uploadBadgeMetadataFirebase(metadata) {
    const metaBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    const path = `badges/${localStorage.getItem('userId') || 'guest'}_${Date.now()}.json`;
    const ref = fbRef(storage, path);
    await uploadBytes(ref, metaBlob);
    const url = await getDownloadURL(ref);
    return url;
  }

  // ======================= claim (mint NFT) =======================
  if (claimBtn) {
    claimBtn.addEventListener('click', async () => {
      try {
        logStatus('Checking eligibility...');
        const userId = localStorage.getItem("userId");
        if (!userId) { alert('Login first'); return; }
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        const udata = userSnap.exists() ? userSnap.data() : {};
        if ((udata.credits || 0) < 100) { alert('Need 100 credits to claim'); return; }
        if (udata.badgeClaimed) { alert('Badge already claimed'); return; }

        logStatus('Preparing metadata...');
        const metadata = {
          name: `CraftBadge - ${udata.username || udata.displayName || 'User'}`,
          description: `Award for reaching 100 credits on Odds & Ends`,
          image: DEFAULT_BADGE_IMAGE,
          attributes: [{ trait_type: "Credits", value: 100 }]
        };

        logStatus('Uploading metadata to Firebase Storage...');
        const tokenURI = await uploadBadgeMetadataFirebase(metadata);
        logStatus('Metadata uploaded: ' + tokenURI);

        logStatus('Connecting wallet for mint...');
        const { signer, address } = await ensureWalletAndNetwork();

        const contract = new ethers.Contract(CRAFT_BADGE_ADDRESS, CRAFT_BADGE_ABI, signer);

        // optional: check on-chain (if contract has hasBadge)
        try {
          if (typeof contract.hasBadge === 'function') {
            const already = await contract.hasBadge(address);
            if (already) {
              await updateDoc(userRef, { badgeClaimed: true, badgeTokenURI: tokenURI });
              logStatus('On-chain badge already present. Firestore synced.');
              alert('You already have the badge (on-chain). Firestore updated.');
              return;
            }
          }
        } catch (e) {
          console.warn("hasBadge check skipped or failed (ABI mismatch?):", e);
        }

        logStatus('Sending mint transaction (confirm in wallet)...');
        // function name may be mintBadge or adminMint depending on your contract - adjust if needed
        // trying mintBadge first:
        let tx;
        if (typeof contract.mintBadge === 'function') {
          tx = await contract.mintBadge(tokenURI);
        } else if (typeof contract.adminMint === 'function') {
          // adminMint usually requires owner-only, so this will likely fail unless signer is owner
          tx = await contract.adminMint(address, tokenURI);
        } else {
          throw new Error("Contract has no mint function named 'mintBadge' or 'adminMint' — check the ABI");
        }

        logStatus('Tx sent: ' + tx.hash);
        const receipt = await tx.wait();
        logStatus('Mint confirmed: ' + receipt.transactionHash);

        // update Firestore
        await updateDoc(userRef, { badgeClaimed: true, badgeMintTx: receipt.transactionHash, badgeTokenURI: tokenURI });
        logStatus('Badge minted & Firestore updated.');
        window.open(SNOWTRACE_TX_PREFIX + receipt.transactionHash, '_blank');

        if (claimArea) claimArea.style.display = 'none';
      } catch (err) {
        console.error("Claim error:", err);
        logStatus('Error: ' + (err.message || err));
        alert('Claim error: ' + (err.message || err));
      }
    });
  }

  // ======================= admin mint ECO token (owner-only) =======================
  const adminMintBtn = document.getElementById('adminMintBtn');
  if (adminMintBtn) {
    adminMintBtn.addEventListener('click', async () => {
      try {
        const to = document.getElementById('adminAddress')?.value?.trim();
        const amount = document.getElementById('adminAmount')?.value;
        if (!to || !amount) { alert('Enter address and amount'); return; }
        const { signer } = await ensureWalletAndNetwork();
        const ecoContract = new ethers.Contract(ECO_ADDRESS, ECO_ABI, signer);
        // assume 18 decimals:
        const mintTx = await ecoContract.mint(to, ethers.utils.parseUnits(amount, 18));
        const rc = await mintTx.wait();
        alert('Mint tx: ' + rc.transactionHash);
      } catch (err) {
        console.error("Admin mint error:", err);
        alert('Admin mint error: ' + (err.message || err));
      }
    });
  }

  // call refreshClaimUI on load (safety)
  refreshClaimUI();

  // ------------------- Certificate generator (uses jsPDF) -------------------
  async function generateCertificate(username, credits) {
    if (!window.jspdf) { console.warn("jsPDF not loaded."); return; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "mm", "a4");
      doc.setFillColor(255,255,255); doc.rect(0,0,210,297,'F');
      doc.setDrawColor(153,133,51); doc.setLineWidth(3); doc.roundedRect(10,10,190,227,10,10);
      const logoUrl = "assests/images/logo.png";
      try { doc.addImage(logoUrl, 'PNG', 85, 15, 40, 40); } catch(e) { /* non-fatal */ }
      doc.setFont("times","bold"); doc.setFontSize(26); doc.setTextColor(0,0,0);
      doc.text("CERTIFICATE", 105, 70, { align: 'center' });
      doc.setFont("times","italic"); doc.setFontSize(16); doc.setTextColor(153,133,51);
      doc.text("OF APPRECIATION", 105, 80, { align: 'center' });
      doc.setFont("times","normal"); doc.setFontSize(12); doc.setTextColor(0,0,0);
      doc.text("THIS CERTIFICATE IS PROUDLY PRESENTED TO:", 105, 100, { align: 'center' });
      doc.setFont("cursive","bold"); doc.setFontSize(22); doc.setTextColor(0,0,102);
      doc.text(username, 105, 115, { align: 'center' });
      doc.setFont("times","normal"); doc.setFontSize(12); doc.setTextColor(102,102,102);
      const lines = [
        "In recognition of your exceptional dedication and achievement in",
        "successfully contributing to creative recycling and open-sourced DIY ideas.",
        "Your efforts inspire a greener and more creative community."
      ];
      let y = 140;
      lines.forEach(l => { doc.text(l, 105, y, { align: 'center' }); y += 8; });
      doc.setFont("times","bold"); doc.setFontSize(14); doc.setTextColor(204,102,0);
      doc.text(`Credits Earned: ${credits}`, 105, 190, { align: 'center' });
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const iframe = document.getElementById("certificateFrame");
      const section = document.getElementById("certificate-section");
      const download = document.getElementById("downloadCertificate");
      if (iframe && section) {
        iframe.src = pdfUrl; section.style.display = 'block';
        if (download) download.onclick = () => doc.save(`${username}_Certificate.pdf`);
      }
    } catch (err) {
      console.error("generateCertificate error:", err);
    }
  }

}); // DOMContentLoaded end
