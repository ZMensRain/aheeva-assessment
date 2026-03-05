export async function isTextOnly(): Promise<boolean> {
  console.log("checking if text only");
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return false;
  } catch (error) {
    console.log("Error accessing microphone:", error);
    return true;
  }
}
