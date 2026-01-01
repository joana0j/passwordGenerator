const passwordOutput = document.getElementById("password");
const securityBar = document.getElementById("security-bar");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
let passwordLength = 16;

function generatePassword() {
    let chars = "abcdefgjklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const numbersChars = "0123456789";
    const symbolsChars  = "?!@&*()[]"
    let password = "";

    if (uppercaseEl.checked) {
        chars += uppercaseChars;
    }
    if (numbersEl.checked) {
        chars += numbersChars;
    }
    if (symbolsEl.checked) {
        chars += symbolsChars;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomChar = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomChar, randomChar + 1);
    }
    passwordOutput.value = password;
    calculateSecurity();
}

function calculateSecurity() {
    const percent =
        Math.round((passwordLength / 64 ) * 25 +
            (uppercaseEl.checked ? 10 : 0) +
            (numbersEl.checked ? 20 : 0) +
            (symbolsEl.checked ? 30 : 0));

    securityBar.style.width = `${percent}%`;

    if (percent > 65) {
        securityBar.classList.remove("critical");
        securityBar.classList.remove("warning");
        securityBar.classList.add("safe");

    } else if (percent > 30) {
        securityBar.classList.remove("critical");
        securityBar.classList.add("warning");
        securityBar.classList.remove("safe");
    } else {
        securityBar.classList.add("critical");
        securityBar.classList.remove("warning");
        securityBar.classList.remove("safe");
    }
}

const passwordRange = document.getElementById("password-range");
passwordRange.addEventListener("input", () => {
    passwordLength = passwordRange.value;
    document.getElementById("customize-length").innerText = passwordLength;
    generatePassword();
});

const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordOutput.value);
});

const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", generatePassword)

uppercaseEl.addEventListener("click", generatePassword);
numbersEl.addEventListener("click", generatePassword);
symbolsEl.addEventListener("click", generatePassword);

generatePassword();