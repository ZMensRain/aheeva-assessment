type Props = {
  open?: boolean;
};

import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";
import MessageContainer from "./MessageContainer";
import type { Message } from "../models/message";

export default function AIChatWidget(props: Props) {
  const [dialogOpen, setDialogOpen] = useState(props.open ?? false);

  const messages: Message[] = [
    {
      role: "assistant",
      content:
        "Sure thing! To get started, open the Settings menu, tap **Account**, and then select **Change Password**. After you’ve entered your current password, choose a strong new one and confirm it. Let me know once you’ve updated it, or if you run into any trouble.",
    },
    {
      role: "user",
      content:
        "I tried that, but the app keeps showing an error that says &lt;code&gt;Invalid credentials&lt;/code&gt;. What could be causing this?",
    },

    {
      role: "assistant",
      content:
        "That error usually means the password you entered doesn’t match the one on record. Double‑check that you’re typing the current password correctly, paying attention to capitalization and any special characters. If you’re still stuck, you can reset the password via the web portal:\n\n1. Go to https://account.proton.me/login.\n2. Click **Forgot password?**\n3. Follow the email link to set a new password.\n\nGive that a try and let me know how it goes.",
    },
    {
      role: "user",
      content:
        "Thanks! I followed those steps and got a reset email, but when I click the link it redirects to a page that says &lt;strong&gt;Link expired&lt;/strong&gt;. Is there a way to extend the link’s validity?",
    },

    {
      role: "assistant",
      content:
        "Password‑reset links are only valid for 24 hours for security reasons. If the link has expired, you’ll need to request a new one. Just repeat the **Forgot password?** process, and make sure to click the link promptly after receiving the email. If you continue to see expiration issues, let me know and we can investigate further.",
    },
    {
      role: "user",
      content:
        "Got it. While I’m waiting for the new email, could you explain how end‑to‑end encryption works in Proton Mail? I’d like a brief overview.",
    },

    {
      role: "assistant",
      content:
        "Absolutely! End‑to‑end encryption (E2EE) means that only the sender and the intended recipient can read the message content. Here’s a quick rundown:\n\n* **Key generation** – When you create a Proton Mail account, a pair of cryptographic keys (public & private) is generated locally on your device.\n* **Public key sharing** – Your public key is stored on Proton’s servers and can be shared with anyone who wants to send you encrypted mail.\n* **Encryption** – When someone composes a message to you, their client encrypts the body using your public key. Only the matching private key (which lives on your device) can decrypt it.\n* **Zero‑access** – Because the private key never leaves your device, Proton’s servers can’t read the message content, even if they wanted to.\n\nThe result is that the email remains confidential from end‑to‑end, protecting it from interception, server‑side scans, or data‑center breaches.\n\nIf you’d like a deeper dive—like how PGP‑style signatures work or how to manage keys manually—just let me know!",
    },
    {
      role: "user",
      content:
        "That helps a lot. One more thing: I’m interested in setting up a custom domain for my Proton Mail address. Could you walk me through the DNS records I need to add?",
    },

    {
      role: "assistant",
      content:
        'Certainly! To use a custom domain with Proton Mail, you’ll need to add several DNS records at your domain registrar:\n\n1. **MX Records** – Direct inbound mail to Proton’s servers.\n   \n   mx1.protonmail.ch   priority 10\n   mx2.protonmail.ch   priority 20\n   \n2. **SPF Record** – Prevents spammers from sending mail on behalf of your domain.\n   \n   v=spf1 include:_spf.protonmail.ch mx ~all\n   \n3. **DKIM Records** – Two CNAME entries (one per signing key) that allow recipients to verify your messages.\n   \n   protonmail._domainkey.yourdomain.com   CNAME   protonmail.domainkey.protonmail.ch\n   protonmail2._domainkey.yourdomain.com  CNAME   protonmail2.domainkey.protonmail.ch\n   \n4. **DMARC Record** (optional but recommended) – Gives you control over how unauthenticated mail is handled.\n   \n   _dmarc.yourdomain.com   TXT   "v=DMARC1; p=none; rua=mailto:postmaster@yourdomain.com"\n   \n\nAfter you add these records, go back to the **Custom Domains** section in your Proton Mail settings and click **Verify**. It may take up to 48 hours for DNS propagation, but most changes appear within a few minutes.\n\nLet me know once you’ve added the records or if you hit any snags along the way.',
    },
    {
      role: "user",
      content:
        "Will do. Lastly, can you give me a short example of how to embed a secure image in an email using Proton Mail’s composer? I want the image to display inline, not as an attachment.",
    },

    {
      role: "assistant",
      content:
        "Sure! Proton Mail lets you embed images directly in the message body. Here’s a quick step‑by‑step:\n\n1. In the composer, click the **Insert Image** icon (it looks like a picture frame).\n2. Choose **Upload from computer** and select the image you want.\n3. Once uploaded, the image will appear inline where your cursor was placed. Proton automatically converts it to a base64‑encoded data URI, which keeps the image encrypted end‑to‑end.\n4. Finish writing your email and hit **Send**.\n\nBecause the image is embedded as part of the encrypted payload, recipients who use Proton Mail will see it instantly. Recipients on other providers will receive the image as an attachment, preserving privacy while still delivering the visual content.\n\nThat’s all there is to it! If you need any more tips, feel free to ask.",
    },
  ];

  function handleClick() {
    setDialogOpen(!dialogOpen);
  }

  return (
    <>
      <button
        className="rounded-xl bg-accent p-4 fixed bottom-4 right-4 cursor-pointer hover:scale-110 transition"
        onClick={handleClick}
        aria-label="Toggle AI chat"
        aria-toggle="true"
        aria-expanded={dialogOpen}
      >
        <BotMessageSquare scale={3} />
      </button>
      {dialogOpen && (
        <div className="fixed right-4 bottom-20 max-w-100 w-full min-h-150 max-h-[50vh] bg-gray-800 p-4 rounded-xl flex flex-col shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Aheeva AI Chat</h2>
          <MessageContainer messages={messages} />
          <ChatBox onMessageSend={(message) => console.log(message)} />
        </div>
      )}
    </>
  );
}
