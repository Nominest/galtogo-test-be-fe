import { useState } from "react";
import axios from "axios";

function Verification() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  async function sendVerificationCode() {
    try {
      const response = await axios.post(
        "http://localhost:3030/verify/send-code",
        { phoneNumber }
      );
      console.log(response.data);
      setVerificationStatus("Code sent!");
    } catch (error) {
      console.error(error);
      setVerificationStatus("Error sending code.");
    }
  }

  async function checkVerificationCode() {
    try {
      const response = await axios.post(
        "http://localhost:3030/verify/check-code",
        {
          phoneNumber,
          code: verificationCode,
        }
      );
      console.log(response.data);
      setVerificationStatus("Verification successful!");
    } catch (error) {
      console.error(error);
      setVerificationStatus("Verification failed.");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendVerificationCode}>Send verification code</button>

      <br />

      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={checkVerificationCode}>Check verification code</button>

      <br />

      <div>{verificationStatus}</div>
    </div>
  );
}

export default Verification;
